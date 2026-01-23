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
