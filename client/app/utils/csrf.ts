/**
 * Get APi Django cookie
 *
 * @export
 * @param {string} name
 * @returns {string}
 */
export function getCookie(name: string): string {
  try {
    return document.cookie.split(';')
      .filter(cookie => cookie.match(new RegExp(`${name}=`)))
      .map(cookie => cookie.trim().substring(name.length + 1))
      .map(decodeURIComponent)[0]
  } catch (error) {
    return ''
  }
}
