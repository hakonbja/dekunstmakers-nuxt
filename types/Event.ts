import type { ArtPiece } from './ArtPiece'

export interface Event {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    date: string;
    endDate: string | null;
    location: string;
    description: string;
    website: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    art_pieces?: ArtPiece[];
}
