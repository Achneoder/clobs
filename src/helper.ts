/**
 * Checks for .json file extension and adds it, if not present.
 *
 * @param fileName the original filename
 */
export function addFileExtension(fileName: string): string {
  if (!fileName.endsWith('.json')) {
    return fileName + '.json';
  }
  return fileName;
}
