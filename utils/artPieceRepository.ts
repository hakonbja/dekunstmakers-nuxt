import { createError } from '#imports'
import type { Artist } from '~~/types/Artist'
import type { ArtPiece } from '~~/types/ArtPiece'

export const useArtPieceBySlug = async (artist: Artist, slug: string): Promise<ArtPiece> => {
    const artPiece = artist.art_pieces?.find((piece: ArtPiece) => piece.slug === slug)

    if (!artPiece) {
        throw createError({
            statusCode: 404,
            statusMessage: `Art piece with slug "${slug}" not found for artist "${artist.slug}"`
        })
    }

    return artPiece
}
