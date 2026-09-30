export type PhotoSize = {
  id: string
  name: string
  description: string
  width: number
  height: number
  aspect: number
}

export const photoSizes: PhotoSize[] = [
  {
    id: 'singapore-passport',
    name: 'Singapore Passport',
    description: '35 × 45 mm',
    width: 413,
    height: 531,
    aspect: 35 / 45,
  },
  {
    id: 'us-passport',
    name: 'US Passport',
    description: '2 × 2 in',
    width: 600,
    height: 600,
    aspect: 1,
  },
  {
    id: 'uk-passport',
    name: 'UK Passport',
    description: '35 × 45 mm',
    width: 413,
    height: 531,
    aspect: 35 / 45,
  },
  {
    id: 'eu-passport',
    name: 'EU Passport',
    description: '35 × 45 mm',
    width: 413,
    height: 531,
    aspect: 35 / 45,
  },
]