import * as gcStorage from '@google-cloud/storage';

/**
 * Reads a prior created data object from GCP Cloud Storage.
 */
export class ObjectReader {
  private readonly storage: gcStorage.Storage;

  constructor(options?: gcStorage.StorageOptions) {
    this.storage = new gcStorage.Storage(options);
  }

  /**
   * Tries to read the given file from bucket and returns it as an object;
   * @param bucket
   * @param fileName
   */
  public async readObject<T>(bucket: string, fileName: string): Promise<T> {
    const content = await this.storage
      .bucket(bucket)
      .file(fileName)
      .download();
    return JSON.parse(content.toString()) as T;
  }
}
