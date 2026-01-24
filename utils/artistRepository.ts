interface Artist {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
  intro: string;
  biography: string;
  coverImage: Record<string, any>;
  biographyImage: Record<string, any>;
  email: string;
  slug: string;
  art_pieces?: any[];
}

export const useArtists = () => {
  return useAsyncData<Artist[]>(
    'artists',
    async () => {
      try {
        const config = useRuntimeConfig()
        const token = config.strapiApiToken || config.strapi?.token
        
        if (!token) {
          throw new Error('STRAPI_API_TOKEN is not configured')
        }
        
        // Use useStrapiClient directly with explicit headers to ensure token is sent
        const client = useStrapiClient()
        const response = await client<{ data: Array<{ attributes?: Artist; id?: number } | Artist> }>(
          '/artists',
          {
            params: {
              populate: {
                art_pieces: {
                  populate: '*',
                },
                coverImage: true,
                biographyImage: true,
              },
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          } as any
        )
        
        return response.data?.map((item) => ('attributes' in item ? item.attributes : item) as Artist) || []
      } catch (error: any) {
        console.error('Error fetching artists:', error)
        console.error('Error message:', error?.message)
        console.error('Error status:', error?.error?.status)
        if (error?.response) {
          console.error('Error response:', error.response)
        }
        throw error
      }
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

export const useArtistBySlug = async (slug: string) => {
  const { data: artists } = await useArtists()
  
  const artist = artists.value?.find(a => a.slug === slug)

  if (!artist) {
    throw createError({
      statusCode: 404,
      statusMessage: `Artist with slug "${slug}" not found`
    })
  }

  return artist
}

export const useArtPieces = (artistId?: number) => {
  return useAsyncData<any[]>(
    artistId ? `art-pieces-${artistId}` : 'art-pieces',
    async () => {
      try {
        const { find } = useStrapi()
        const filters = artistId ? { artist: { id: { $eq: artistId } } } : {}
        const response = await find('art-pieces', {
          filters,
          populate: {
            images: true,
            artist: true,
          },
        }) as unknown as { data: Array<{ attributes?: any; id?: number } | any> }
        return response.data?.map((item) => ('attributes' in item ? item.attributes : item)) || []
      } catch (error) {
        console.error('Error fetching art pieces:', error)
        return []
      }
    },
    {
      server: true,
      default: () => [],
    }
  )
}
