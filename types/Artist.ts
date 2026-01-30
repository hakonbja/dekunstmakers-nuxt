import type { ArtPiece } from './ArtPiece'

export interface Artist {
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
    art_pieces?: ArtPiece[];
}
