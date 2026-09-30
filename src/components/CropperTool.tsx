import { useRef, useState } from 'react'
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  type Crop,
  type PixelCrop,
} from 'react-image-crop'

import 'react-image-crop/dist/ReactCrop.css'

import { photoSizes } from '../constants/photoSizes'

export default function CropperTool() {
  const imageRef = useRef<HTMLImageElement | null>(null)

  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [fileName, setFileName] = useState('passport-photo')

  const [selectedSize, setSelectedSize] = useState(photoSizes[0])

  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()

  const [croppedImage, setCroppedImage] = useState<string | null>(null)

  // --------------------------------------------------
  // File Upload
  // --------------------------------------------------

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]

    if (!file) return

    const imageUrl = URL.createObjectURL(file)

    setImageSrc(imageUrl)
    setFileName(file.name.replace(/\.[^/.]+$/, ''))

    setCrop(undefined)
    setCompletedCrop(undefined)
    setCroppedImage(null)
  }

  // --------------------------------------------------
  // Image Loaded
  // --------------------------------------------------

  const handleImageLoad = (
    event: React.SyntheticEvent<HTMLImageElement>
  ) => {
    const { width, height } = event.currentTarget

    imageRef.current = event.currentTarget

    const newCrop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 80,
        },
        selectedSize.aspect,
        width,
        height
      ),
      width,
      height
    )

    setCrop(newCrop)
  }

  // --------------------------------------------------
  // Change Photo Size
  // --------------------------------------------------

  const handleSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const size = photoSizes.find(
      (item) => item.id === event.target.value
    )

    if (!size) return

    setSelectedSize(size)
    setCroppedImage(null)

    if (imageRef.current) {
      const { width, height } = imageRef.current

      const newCrop = centerCrop(
        makeAspectCrop(
          {
            unit: '%',
            width: 80,
          },
          size.aspect,
          width,
          height
        ),
        width,
        height
      )

      setCrop(newCrop)
    }
  }

  // --------------------------------------------------
  // Crop Image
  // --------------------------------------------------

  const handleCrop = () => {
    if (!completedCrop || !imageRef.current) {
      return
    }

    const image = imageRef.current

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    const canvas = document.createElement('canvas')

    canvas.width = selectedSize.width
    canvas.height = selectedSize.height

    const ctx = canvas.getContext('2d')

    if (!ctx) return

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      selectedSize.width,
      selectedSize.height
    )

    const result = canvas.toDataURL('image/jpeg', 0.95)

    setCroppedImage(result)
  }

  // --------------------------------------------------
  // Download
  // --------------------------------------------------

  const handleDownload = () => {
    if (!croppedImage) return

    const link = document.createElement('a')

    link.href = croppedImage
    link.download = `${fileName}-${selectedSize.id}.jpg`

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-32">

      {/* Header */}

      <div className="mb-10 text-center">

        <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-black/40 dark:text-white/40">
          Passport Photo Tool
        </p>

        <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
          Crop your photo.
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-black/50 dark:text-white/50">
          Upload a photo, select the required passport size,
          position the crop and download your finished photo.
        </p>

      </div>

      {/* Tool */}

      <div
        className="
          border border-black/10
          bg-black/[0.02]
          dark:border-white/10
          dark:bg-white/[0.02]
        "
      >

        {/* Controls */}

        <div
          className="
            flex flex-col gap-4
            border-b border-black/10
            p-4
            sm:flex-row
            sm:items-center
            sm:justify-between
            dark:border-white/10
          "
        >

          {/* Upload */}

          <label
            className="
              flex h-10 cursor-pointer
              items-center justify-center
              border border-black/15
              px-5
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.18em]
              transition
              hover:bg-black
              hover:text-white

              dark:border-white/15
              dark:hover:bg-white
              dark:hover:text-black
            "
          >
            {imageSrc ? 'Change Photo' : 'Upload Photo'}

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {/* Photo Size Selector */}

          <div className="w-full sm:w-auto">

            <div className="relative w-full sm:w-auto">

              <select
                id="photo-size"
                value={selectedSize.id}
                onChange={handleSizeChange}
                className="
                  h-10
                  w-full
                  appearance-none
                  border border-black/15
                  bg-white
                  px-4
                  pr-12
                  text-xs
                  outline-none

                  sm:w-auto

                  dark:border-white/15
                  dark:bg-[#090909]
                  dark:text-white
                "
              >
                {photoSizes.map((size) => (
                  <option key={size.id} value={size.id}>
                    {size.name} - {size.description}
                  </option>
                ))}
              </select>

              {/* Custom Dropdown Arrow */}

              <svg
                viewBox="0 0 24 24"
                className="
                  pointer-events-none
                  absolute
                  right-4
                  top-1/2
                  h-3.5
                  w-3.5
                  -translate-y-1/2
                  text-black/50
                  dark:text-white/50
                "
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>

            </div>

          </div>

        </div>

        {/* Image Area */}

        <div
          className="
            flex
            min-h-[400px]
            items-center
            justify-center
            overflow-hidden
            bg-black/[0.03]
            p-6
            dark:bg-black/30
          "
        >

          {!imageSrc && (
            <div className="text-center">

              <div
                className="
                  mx-auto mb-5
                  flex h-20 w-20
                  items-center justify-center
                  border border-dashed
                  border-black/20
                  dark:border-white/20
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 text-black/30 dark:text-white/30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <path d="M12 16V4" />
                  <path d="m7 9 5-5 5 5" />
                  <path d="M4 20h16" />
                </svg>
              </div>

              <p className="text-xs uppercase tracking-[0.15em] text-black/40 dark:text-white/40">
                Upload an image to begin
              </p>

            </div>
          )}

          {imageSrc && !croppedImage && (
            <ReactCrop
              crop={crop}
              onChange={(newCrop) => setCrop(newCrop)}
              onComplete={(newCrop) => setCompletedCrop(newCrop)}
              aspect={selectedSize.aspect}
              minWidth={50}
            >
              <img
                ref={imageRef}
                src={imageSrc}
                alt="Photo to crop"
                onLoad={handleImageLoad}
                className="max-h-[60vh] max-w-full"
              />
            </ReactCrop>
          )}

          {croppedImage && (
            <div className="flex flex-col items-center gap-5">

              <img
                src={croppedImage}
                alt="Cropped passport photo"
                className="
                  max-h-[60vh]
                  max-w-full
                  object-contain
                  shadow-2xl
                "
              />

              <div className="text-center">

                <p className="text-[10px] uppercase tracking-[0.18em] text-black/40 dark:text-white/40">
                  {selectedSize.name}
                </p>

                <p className="mt-1 text-xs text-black/50 dark:text-white/50">
                  {selectedSize.width} × {selectedSize.height}px
                </p>

              </div>

            </div>
          )}

        </div>

        {/* Bottom Action */}

        <div
          className="
            flex
            justify-end
            border-t border-black/10
            p-4
            dark:border-white/10
          "
        >

          {!croppedImage ? (
            <button
              type="button"
              onClick={handleCrop}
              disabled={!imageSrc || !completedCrop}
              className="
                flex h-10
                items-center gap-3
                bg-black
                px-6
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-white
                transition

                hover:bg-black/80

                disabled:cursor-not-allowed
                disabled:opacity-30

                dark:bg-white
                dark:text-black
                dark:hover:bg-white/80
              "
            >
              Crop Photo
              <span className="text-sm">→</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleDownload}
              className="
                flex h-10
                items-center gap-3
                bg-black
                px-6
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-white
                transition
                hover:bg-black/80

                dark:bg-white
                dark:text-black
                dark:hover:bg-white/80
              "
            >
              Download Photo
              <span className="text-sm">↓</span>
            </button>
          )}

        </div>

      </div>

    </section>
  )
}
