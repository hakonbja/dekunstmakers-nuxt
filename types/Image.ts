import type { ImageFormat } from './ImageFormat'

export interface Image {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string;
    caption: string | null;
    width: number;
    height: number;
    formats: {
        large?: ImageFormat;
        small?: ImageFormat;
        medium?: ImageFormat;
        thumbnail?: ImageFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: Record<string, any> | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}
