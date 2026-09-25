import { useAsyncData, useRuntimeConfig, createError } from '#imports';
import type { Event } from '~~/types/Event';

const todayIso = (): string => new Date().toISOString().slice(0, 10);

export const isUpcomingEvent = (event: Event, today: string = todayIso()): boolean => {
    const lastDay = event.endDate ?? event.date;
    return lastDay >= today;
};

export const sortEventsSoonestFirst = (events: Event[]): Event[] => {
    return [...events].sort((a, b) => a.date.localeCompare(b.date));
};

export const sortEventsMostRecentFirst = (events: Event[]): Event[] => {
    return [...events].sort((a, b) => b.date.localeCompare(a.date));
};

export const groupEventsByYear = (events: Event[]): Array<{ year: string; events: Event[] }> => {
    const grouped = events.reduce((acc: Record<string, Event[]>, event) => {
        const year = event.date?.split('-')[0];

        if (!year) return acc;

        if (!acc[year]) {
            acc[year] = [];
        }

        acc[year].push(event);

        return acc;
    }, {} as Record<string, Event[]>);

    return Object.entries(grouped)
        .map(([year, yearEvents]) => ({ year, events: sortEventsMostRecentFirst(yearEvents) }))
        .sort((a, b) => parseInt(b.year) - parseInt(a.year));
};

const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
};

export const formatEventDateRange = (event: Event): string => {
    const start = formatDate(event.date);

    if (!event.endDate || event.endDate === event.date) {
        return start;
    }

    return `${start} - ${formatDate(event.endDate)}`;
};

export const useEvents = () => {
    return useAsyncData<Event[]>(
        'events',
        async () => {
            try {
                const config = useRuntimeConfig()
                const token = config.strapiApiToken || config.strapi?.token

                if (!token) {
                    throw new Error('STRAPI_API_TOKEN is not configured')
                }

                const client = useStrapiClient()
                const response = await client<{ data: Array<{ attributes?: Event; id?: number } | Event> }>(
                    '/events',
                    {
                        params: {
                            populate: {
                                art_pieces: {
                                    populate: {
                                        images: true,
                                        artist: true,
                                    },
                                },
                            },
                        },
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    } as any
                )

                return response.data?.map((item) => ('attributes' in item ? item.attributes : item) as Event) || []
            } catch (error: any) {
                console.error('Error fetching events:', error)
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
        }
    )
}

export const useEventBySlug = async (slug: string): Promise<Event> => {
    const { data: events } = await useEvents()

    const event = events.value?.find(e => e.slug === slug)

    if (!event) {
        throw createError({
            statusCode: 404,
            statusMessage: `Event with slug "${slug}" not found`
        })
    }

    return event
}
