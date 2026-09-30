export default function Footer() {
  return (
    <footer
      className="
        border-t border-black/10
        bg-white
        text-black
        transition-colors

        dark:border-white/10
        dark:bg-[#090909]
        dark:text-white
      "
    >
      <div
        className="
          mx-auto flex max-w-7xl
          flex-col gap-6
          px-6 py-8
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >

        {/* Brand */}
        <a
          href="/"
          className="
            flex items-center gap-3
            text-xs font-bold
            tracking-[0.18em]
          "
        >
          {/* Logo */}
          <div className="relative flex h-4 w-4 items-center justify-center">

            <div
              className="
                absolute inset-0
                border border-black/70
                dark:border-white/70
              "
            />

            <div
              className="
                h-2 w-2
                border border-black/80
                dark:border-white/80
              "
            />

            <span
              className="
                absolute -top-1 -left-1
                h-1 w-1
                bg-black
                dark:bg-white
              "
            />

            <span
              className="
                absolute -top-1 -right-1
                h-1 w-1
                bg-black
                dark:bg-white
              "
            />

            <span
              className="
                absolute -bottom-1 -left-1
                h-1 w-1
                bg-black
                dark:bg-white
              "
            />

            <span
              className="
                absolute -bottom-1 -right-1
                h-1 w-1
                bg-black
                dark:bg-white
              "
            />

          </div>

          <span>PASSPORT CROPPER</span>
        </a>

        {/* Links */}
        <div
          className="
            flex items-center gap-6
            text-[10px]
            font-medium
            uppercase
            tracking-[0.15em]
            text-black/50

            dark:text-white/50
          "
        >
          <a
            href="/"
            className="
              transition
              hover:text-black
              dark:hover:text-white
            "
          >
            Home
          </a>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="
              transition
              hover:text-black
              dark:hover:text-white
            "
          >
            GitHub
          </a>
        </div>

        {/* Copyright */}
        <span
          className="
            text-[10px]
            uppercase
            tracking-[0.12em]
            text-black/40

            dark:text-white/40
          "
        >
          © {new Date().getFullYear()} PASSPORT CROPPER
        </span>

      </div>
    </footer>
  )
}