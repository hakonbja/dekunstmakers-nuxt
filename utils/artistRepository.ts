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
      const { find } = useStrapi<Artist>()
      const response = await find('artists', {
        populate: '*',
      }) as unknown as { data: Array<{ attributes?: Artist; id?: number } | Artist> }
      return response.data?.map((item) => ('attributes' in item ? item.attributes : item) as Artist) || []
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
