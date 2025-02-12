import { SUPPORTED_DISPLAYABLE_MEDIA_TYPES } from './constants'

/**
 * Checks if a given MIME type is supported as displayable media.
 *
 * Uses the SUPPORTED_DISPLAYABLE_MEDIA_TYPES constant from './constants'.
 *
 * @param mime - The MIME type of the file.
 * @param type - An object specifying if images and/or videos should be checked (default is both).
 * @returns True if the MIME type is supported, false otherwise.
 */
export const isSupportedDisplayableMedia = (
  mime: File['type'],
  type: { image?: boolean; video?: boolean } = { image: true, video: true },
) =>
  (type.image && SUPPORTED_DISPLAYABLE_MEDIA_TYPES.images.includes(mime)) ||
  (type.video && SUPPORTED_DISPLAYABLE_MEDIA_TYPES.videos.includes(mime))
