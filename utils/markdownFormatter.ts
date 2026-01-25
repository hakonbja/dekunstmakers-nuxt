import { marked } from 'marked'

/**
 * Converts markdown text to HTML
 * @param markdown - The markdown string to convert
 * @returns The HTML string
 */
export const markdownToHtml = (markdown: string): string => {
    if (!markdown) return ''
    return marked.parse(markdown) as string
}
