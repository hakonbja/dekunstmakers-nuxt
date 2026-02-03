export const getStrapiImageUrl = (
    image: Record<string, any> | null | undefined,
    format?: 'thumbnail' | 'small' | 'medium' | 'large'
): string | null => {
    if (!image) return null

    // Try to use specified format if provided
    if (format) {
        // Handle Strapi v4 format: { data: { attributes: { formats: { ... } } } }
        const formats = image.data?.attributes?.formats || image.formats
        if (formats?.[format]?.url) {
            return useStrapiMedia(formats[format].url)
        }
    }

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
