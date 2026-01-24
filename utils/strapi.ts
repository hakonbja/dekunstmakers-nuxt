export const getStrapiImageUrl = (image: Record<string, any> | null | undefined): string | null => {
  if (!image) return null

  // Handle Strapi v4 format: { data: { attributes: { url: '...' } } }
  if (image.data?.attributes?.url) {
    return useStrapiMedia(image.data.attributes.url)
  }

  // Handle direct url format: { url: '...' }
  if (image.url) {
    return useStrapiMedia(image.url)
  }

  return null
}
