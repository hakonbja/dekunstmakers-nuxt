// Module-level cache that persists during static generation build
const cache = new Map<string, any>()

export const fetchStrapi = async <T>(endpoint: string, options: { headers?: Record<string, string>; [key: string]: any } = {}) => {
  // Only allow fetching on server-side (during build or SSR)
  // On client-side, return null so useAsyncData can use cached data
  if (!import.meta.server) {
    return null as T
  }

  const cacheKey = `strapi:${endpoint}:${JSON.stringify(options)}`
  
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey) as T
  }

  const config = useRuntimeConfig()
  const baseURL = config.public.strapiUrl
  const apiToken = config.strapiApiToken

  const url = `${baseURL}/api${endpoint}`
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }

  if (apiToken) {
    headers.Authorization = `Bearer ${apiToken}`
  }

  const { headers: _, ...restOptions } = options

  const response = await $fetch<T>(url, {
    headers,
    ...restOptions,
  })

  cache.set(cacheKey, response)
  return response
}

export const getStrapiImageUrl = (image: Record<string, any> | null | undefined): string | null => {
  if (!image) return null

  const config = useRuntimeConfig()
  const strapiBaseUrl = config.public.strapiUrl

  // Handle Strapi v4 format: { data: { attributes: { url: '...' } } }
  if (image.data?.attributes?.url) {
    const url = image.data.attributes.url
    return url.startsWith('http') ? url : `${strapiBaseUrl}${url}`
  }

  // Handle direct url format: { url: '...' }
  if (image.url) {
    const url = image.url
    return url.startsWith('http') ? url : `${strapiBaseUrl}${url}`
  }

  return null
}
