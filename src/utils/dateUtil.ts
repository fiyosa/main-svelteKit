/**
 * Returns the current date and time in the format 'YYYY-MM-DD HH:mm:ss'.
 *
 * @returns {string} The current date and time formatted as 'YYYY-MM-DD HH:mm:ss'.
 */
export const now = (): string => {
  const now = new Date()

  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

/**
 * Formats a given date object into the specified format.
 *
 * @param {Date} date - The date object to be formatted.
 * @param {string} format - The format to be applied to the date object. Defaults to 'yyyy-mm-dd hh:MM:ss'.
 * @returns {string} The formatted date string according to the specified format.
 */
export const formatByDate = (date: Date, format: string = 'yyyy-mm-dd hh:MM:ss'): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return format
    .replace('yyyy', year.toString())
    .replace('mm', month)
    .replace('dd', day)
    .replace('hh', hours)
    .replace('MM', minutes)
    .replace('ss', seconds)
}

/**
 * Formats a given date string into the specified format.
 * If the date string is invalid, an empty string is returned.
 *
 * @param {string} dateString - The date string to be formatted.
 * @param {string} format - The format to be applied to the date string. Defaults to 'yyyy-mm-dd hh:MM:ss'.
 * @returns {string} The formatted date string according to the specified format.
 */
export const formatByStr = (dateString: string, format: string = 'yyyy-mm-dd hh:MM:ss'): string => {
  const date = new Date(dateString)
  if (isNaN(date.getTime())) {
    return ''
  }
  return formatByDate(date, format)
}
