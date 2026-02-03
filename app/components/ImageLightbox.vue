<template>
    <Teleport to="body">
        <div 
            v-if="isOpen" 
            ref="lightboxRef"
            class="lightbox"
            tabindex="-1"
            @click="close"
        >
            <div class="lightbox__overlay"></div>
            <button 
                class="lightbox__close"
                @click="close"
                aria-label="Sluiten"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <div class="lightbox__content" @click.stop>
                <img 
                    :src="imageUrl" 
                    :srcset="imageSrcset"
                    :sizes="imageSizes"
                    :alt="alt"
                    class="lightbox__image"
                />
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import type { Image } from '~~/types/Image';
import { getStrapiImageUrl } from '~~/utils/strapi';

interface Props {
    isOpen: boolean;
    image: Image | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
    close: [];
}>();

const close = () => {
    emit('close');
};

const imageUrl = computed(() => {
    if (!props.image) return '';
    return getStrapiImageUrl(props.image) || '';
});

const imageSrcset = computed(() => {
    if (!props.image?.formats) return '';

    const srcsetParts: string[] = [];
    const formats = props.image.formats;

    if (formats.thumbnail) {
        const url = useStrapiMedia(formats.thumbnail.url);
        srcsetParts.push(`${url} ${formats.thumbnail.width}w`);
    }

    if (formats.small) {
        const url = useStrapiMedia(formats.small.url);
        srcsetParts.push(`${url} ${formats.small.width}w`);
    }

    if (formats.medium) {
        const url = useStrapiMedia(formats.medium.url);
        srcsetParts.push(`${url} ${formats.medium.width}w`);
    }

    if (formats.large) {
        const url = useStrapiMedia(formats.large.url);
        srcsetParts.push(`${url} ${formats.large.width}w`);
    }

    // Add original image
    if (props.image.url) {
        const url = useStrapiMedia(props.image.url);
        srcsetParts.push(`${url} ${props.image.width}w`);
    }

    return srcsetParts.join(', ');
});

const imageSizes = computed(() => {
    return '100vw';
});

const alt = computed(() => {
    return props.image?.alternativeText || '';
});

const lightboxRef = ref<HTMLElement | null>(null);

// Handle escape key and body overflow
const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && props.isOpen) {
        close();
    }
};

watch(() => props.isOpen, (isOpen) => {
    if (isOpen) {
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleKeyDown);
        // Focus the lightbox for accessibility
        nextTick(() => {
            lightboxRef.value?.focus();
        });
    } else {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeyDown);
    }
});

onUnmounted(() => {
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleKeyDown);
});
</script>

<style lang="scss" scoped>
.lightbox {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    cursor: pointer;

    &__overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(4px);
    }

    &__close {
        position: absolute;
        top: 16px;
        right: 16px;
        z-index: 10000;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        padding: 8px;
        cursor: pointer;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s, border-color 0.2s;

        &:hover {
            background: rgba(255, 255, 255, 0.2);
            border-color: rgba(255, 255, 255, 0.3);
        }

        &:focus {
            outline: 2px solid white;
            outline-offset: 2px;
        }
    }

    &__content {
        position: relative;
        max-width: 100%;
        max-height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: default;
    }

    &__image {
        max-width: 100%;
        max-height: calc(100vh - 32px);
        width: auto;
        height: auto;
        object-fit: contain;
    }
}
</style>
