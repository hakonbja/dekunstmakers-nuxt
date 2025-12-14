export const useStrapi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.strapiUrl
  const apiToken = config.strapiApiToken

  const fetchStrapi = async <T>(endpoint: string, options: { headers?: Record<string, string>; [key: string]: any } = {}) => {
    const url = `${baseURL}/api${endpoint}`
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    }

    if (apiToken) {
      headers.Authorization = `Bearer ${apiToken}`
    }

    const { headers: _, ...restOptions } = options

    return await $fetch<T>(url, {
      headers,
      ...restOptions,
    })
  }

  return {
    fetchStrapi,
  }
}

