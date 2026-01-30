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

export const getPreviousArtPiece = (artist: Artist, slug: string): ArtPiece | null => {
    if (!artist.art_pieces || artist.art_pieces.length === 0) {
        return null
    }

    const sortedPieces = [...artist.art_pieces].sort((a, b) => {
        const dateA = new Date(a.date).getTime()
        const dateB = new Date(b.date).getTime()
        return dateA - dateB
    })

    const currentIndex = sortedPieces.findIndex((piece: ArtPiece) => piece.slug === slug)
    
    if (currentIndex === -1 || currentIndex === 0) {
        return null
    }

    return sortedPieces[currentIndex - 1] ?? null;
}

export const getNextArtPiece = (artist: Artist, slug: string): ArtPiece | null => {
    if (!artist.art_pieces || artist.art_pieces.length === 0) {
        return null
    }

    const sortedPieces = [...artist.art_pieces].sort((a, b) => {
        const dateA = new Date(a.date).getTime()
        const dateB = new Date(b.date).getTime()
        return dateA - dateB
    })

    const currentIndex = sortedPieces.findIndex((piece: ArtPiece) => piece.slug === slug)
    
    if (currentIndex === -1 || currentIndex === sortedPieces.length - 1) {
        return null
    }

    return sortedPieces[currentIndex + 1] ?? null;
}
