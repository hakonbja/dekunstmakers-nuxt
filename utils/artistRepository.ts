interface Artist {
  id: number
  firstName: string
  lastName: string
  email: string
  slug: string
  art_pieces?: any[]
}

interface StrapiArtistsResponse {
  data: Artist[]
}

export class ArtistRepository {
  get() {
    return useAsyncData<Artist[]>(
      'artists',
      async (_nuxtApp, { signal }) => {
        const config = useRuntimeConfig()
        const baseURL = config.public.strapiUrl
        const apiToken = config.strapiApiToken

        if (!apiToken) {
          throw new Error('STRAPI_API_TOKEN is not configured')
        }

        const url = `${baseURL}/api/artists?populate=*`
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiToken}`
        }

        const response = await $fetch<StrapiArtistsResponse>(url, {
          headers,
          signal,
        })

        return response.data || []
      },
      {
        server: true,
        default: () => [],
        getCachedData: (key, nuxtApp) => {
          // Return cached data from payload if it exists
          return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
        }
      }
    )
  }

  async getBySlug(slug: string) {
    const { data: artists } = await this.get();
    
    const artist = artists.value?.find(a => a.slug === slug);

    if (!artist) {
      throw createError({
        statusCode: 404,
        statusMessage: `Artist with slug "${slug}" not found`
      })
    }

    return artist
  }
}
