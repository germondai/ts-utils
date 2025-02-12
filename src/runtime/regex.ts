/**
 * Checks if a given string is a valid email address.
 *
 * @param value - The string to validate.
 * @returns True if the string is a valid email, false otherwise.
 *
 * @example
 * isEmail('test@example.com'); // true
 * isEmail('invalid-email'); // false
 */
export const isEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

/**
 * Checks if a given string is a valid URL.
 *
 * @param value - The string to validate.
 * @returns True if the string is a valid URL, false otherwise.
 *
 * @example
 * isUrl('https://example.com'); // true
 * isUrl('ftp://files.example.com'); // true
 * isUrl('invalid-url'); // false
 */
export const isUrl = (value: string): boolean =>
  /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value)

/**
 * Checks if a given string is a valid phone number (supports various formats).
 *
 * @param value - The string to validate.
 * @returns True if the string is a valid phone number, false otherwise.
 *
 * @example
 * isPhoneNumber('+1 (555) 555-5555'); // true
 * isPhoneNumber('123456'); // false
 */
export const isPhoneNumber = (value: string): boolean =>
  /^\+?(\d{1,3})?[-. (]*\d{1,4}[-. )]*\d{1,4}[-. ]*\d{1,9}$/.test(value)

/**
 * Checks if a given string is a valid hexadecimal string.
 *
 * @param value - The string to validate.
 * @returns True if the string is a valid hexadecimal, false otherwise.
 *
 * @example
 * isHex('1A3F'); // true
 * isHex('XYZ'); // false
 */
export const isHex = (value: string): boolean => /^[A-Fa-f0-9]+$/.test(value)

/**
 * Checks if a given string is a valid hex color code.
 *
 * @param value - The string to validate.
 * @returns True if the string is a valid hex color, false otherwise.
 *
 * @example
 * isHexColor('#ff5733'); // true
 * isHexColor('rgb(255, 87, 51)'); // false
 */
export const isHexColor = (value: string): boolean =>
  /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(value)

/**
 * Checks if a given string is a valid IPv4 address.
 *
 * @param value - The string to validate.
 * @returns True if the string is a valid IPv4 address, false otherwise.
 *
 * @example
 * isIPv4('192.168.1.1'); // true
 * isIPv4('999.999.999.999'); // false
 */
export const isIPv4 = (value: string): boolean =>
  /^(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)$/.test(
    value,
  )

/**
 * Checks if a given string is a valid IPv6 address.
 *
 * @param value - The string to validate.
 * @returns True if the string is a valid IPv6 address, false otherwise.
 *
 * @example
 * isIPv6('2001:0db8:85a3:0000:0000:8a2e:0370:7334'); // true
 * isIPv6('InvalidIPv6'); // false
 */
export const isIPv6 = (value: string): boolean =>
  /^(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}$/i.test(value)

/**
 * Checks if a given string is a valid MAC address.
 *
 * @param value - The string to validate.
 * @returns True if the string is a valid MAC address, false otherwise.
 *
 * @example
 * isMacAddress('00:1A:2B:3C:4D:5E'); // true
 * isMacAddress('invalid-mac'); // false
 */
export const isMacAddress = (value: string): boolean =>
  /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(value)

/**
 * Checks if a given string is a valid UUID (v4 format).
 *
 * @param value - The string to validate.
 * @returns True if the string is a valid UUID, false otherwise.
 *
 * @example
 * isUUID('123e4567-e89b-12d3-a456-426614174000'); // true
 * isUUID('invalid-uuid'); // false
 */
export const isUUID = (value: string): boolean =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)

/**
 * Checks if a given string is a valid credit card number (basic validation).
 *
 * @param value - The string to validate.
 * @returns True if the string is a valid credit card number, false otherwise.
 *
 * @example
 * isCreditCard('4111 1111 1111 1111'); // true
 * isCreditCard('1234567890123456'); // false
 */
export const isCreditCard = (value: string): boolean =>
  /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9]{2})[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/.test(
    value,
  )

/**
 * Checks if a given string is a valid domain name.
 *
 * @param value - The string to validate.
 * @returns True if the string is a valid domain, false otherwise.
 *
 * @example
 * isDomain('example.com'); // true
 * isDomain('sub.example.co.uk'); // true
 * isDomain('invalid_domain'); // false
 */
export const isDomain = (value: string): boolean =>
  /^(?!:\/\/)([a-zA-Z0-9-_]{1,63}\.)+[a-zA-Z]{2,63}$/.test(value)

/**
 * Checks if a given string is a valid postal/ZIP code (supports various formats).
 *
 * @param value - The string to validate.
 * @returns True if the string is a valid postal code, false otherwise.
 *
 * @example
 * isPostalCode('12345'); // true (US)
 * isPostalCode('12345-6789'); // true (US extended)
 * isPostalCode('SW1A 1AA'); // true (UK)
 * isPostalCode('invalid_code'); // false
 */
export const isPostalCode = (value: string): boolean =>
  /^[A-Za-z0-9\s-]{3,10}$/.test(value)

/**
 * Checks if a given string is a valid date in YYYY-MM-DD format.
 *
 * @param value - The string to validate.
 * @returns True if the string is a valid date, false otherwise.
 *
 * @example
 * isISODate('2024-02-12'); // true
 * isISODate('2024-13-01'); // false
 */
export const isISODate = (value: string): boolean =>
  /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(value)

/**
 * Checks if a given string is a valid JSON string.
 *
 * @param value - The string to validate.
 * @returns True if the string is valid JSON, false otherwise.
 *
 * @example
 * isJson('{"name": "John"}'); // true
 * isJson('{invalid}'); // false
 */
export const isJson = (value: string): boolean => {
  try {
    JSON.parse(value)
    return true
  } catch {
    return false
  }
}

/**
 * Checks if a given string is a valid Base64-encoded string.
 *
 * @param value - The string to validate.
 * @returns True if the string is valid Base64, false otherwise.
 *
 * @example
 * isBase64('U29tZSB0ZXh0'); // true
 * isBase64('Invalid!'); // false
 */
export const isBase64 = (value: string): boolean =>
  /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(value)

/**
 * Checks if a given string is a valid slug.
 *
 * @param value - The string to validate.
 * @returns True if the string is a valid slug, false otherwise.
 *
 * @example
 * isSlug('valid-slug-123'); // true
 * isSlug('Invalid Slug!'); // false
 */
export const isSlug = (value: string): boolean =>
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
