import type { Image } from './Image'

export interface ArtPiece {
    id: number;
    documentId: string;
    title: string;
    date: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    size: string | null;
    technology: string | null;
    sold: boolean | null;
    slug: string;
    images: Image[];
    artist: {
        id: number;
        documentId: string;
        firstName: string;
        lastName: string;
        slug: string;
        email: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        title: string;
        intro: string;
        biography: string;
    };
    event: Record<string, any> | null;
}
