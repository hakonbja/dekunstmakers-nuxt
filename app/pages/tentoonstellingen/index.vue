<template>
    <PageHeading
        title="Tentoonstellingen"
        subtitle="Actueel en archief"
    />
    <div class="events">
        <section v-if="upcomingEvents.length > 0" class="events__section">
            <h3 class="events__section-label h4">Actueel</h3>
            <div class="events__list">
                <EventCard v-for="event in upcomingEvents" :key="event.id" :event="event" :heading-level="4" />
            </div>
        </section>

        <section v-if="archiveByYear.length > 0" class="events__section">
            <h3 class="events__section-label h4">Archief</h3>
            <div v-for="{ year, events: yearEvents } in archiveByYear" :key="year" class="events__year">
                <h4 :id="year" class="events__year-label h5">{{ year }}</h4>
                <div class="events__list">
                    <EventCard v-for="event in yearEvents" :key="event.id" :event="event" :heading-level="5" />
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { useEvents, isUpcomingEvent, sortEventsSoonestFirst, groupEventsByYear, todayIso } from '~~/utils/eventRepository'

const { data: events } = await useEvents()

const today = useState('tentoonstellingen-today', () => todayIso())

const upcomingEvents = computed(() => sortEventsSoonestFirst((events.value || []).filter(e => isUpcomingEvent(e, today.value))))
const pastEvents = computed(() => (events.value || []).filter(e => !isUpcomingEvent(e, today.value)))
const archiveByYear = computed(() => groupEventsByYear(pastEvents.value))
</script>

<style lang="scss" scoped>
@use '../../styles/mixins/media-query';

.events {
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
    row-gap: 40px;

    &__section-label {
        margin-bottom: 16px;
        color: var(--color-black);
    }

    &__list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
        column-gap: var(--grid-column-gap);
        row-gap: var(--grid-column-gap);
    }

    &__year {
        margin-top: 24px;

        &:first-child {
            margin-top: 0;
        }
    }

    &__year-label {
        margin-bottom: 12px;
        color: var(--color-gray);
    }
}
</style>
