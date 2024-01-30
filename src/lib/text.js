/**
 * Truncate length with three dots suffix or the original string if its short
 * @param {string} text text on wich operate
 * @param {numeric} len the max len that text could be
 * @returns text truncated length with three dots suffix or the original string if its short
 */
export function ellipsys (text, len) {
    if (text.length <= len) {
        return text
    }
    const sub = text.substring(0, len)
    const lastSpace = sub.lastIndexOf(' ')
    const str = lastSpace > 0 ? sub.substring(0, lastSpace) : sub
    return `${str}...`
}