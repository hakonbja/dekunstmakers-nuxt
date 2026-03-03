<template>
    <PageHeading title="Contact" subtitle="" />
    <div class="contact-content" v-html="formattedBody"></div>
</template>

<script setup lang="ts">
import { markdownToHtml } from '~~/utils/markdownFormatter'

const config = useRuntimeConfig()
const token = config.strapiApiToken || config.strapi?.token
const client = useStrapiClient()
const { data: contact } = await useAsyncData(
    'contact',
    () => client<{ data?: { attributes?: { body?: string }; body?: string }; attributes?: { body?: string }; body?: string }>(
        '/contact',
        token ? { headers: { Authorization: `Bearer ${token}` } } : {}
    )
)

const body = computed(() => {
    const raw = contact.value as Record<string, unknown> | undefined
    const data = (raw?.data ?? raw) as { attributes?: { body?: string }; body?: string } | undefined
    if (!data) return ''
    return data.attributes?.body ?? data.body ?? ''
})

const formattedBody = computed(() => markdownToHtml(body.value))
</script>

<style lang="scss" scoped>
@use '../styles/mixins/media-query';

.contact-content {
    grid-column: 1 / -1;

    :deep(h1), :deep(h2), :deep(h3), :deep(h4), :deep(h5), :deep(h6) {
        margin-top: 0.4em;
        margin-bottom: 0.3em;
    }

    :deep(p + p) {
        margin-top: 8px;

        @include media-query.up(md) {
            margin-top: 12px;
        }
    }
}
</style>
