import { FileOptions } from '@google-cloud/storage';
import * as gcStorage from '@google-cloud/storage';
import { Writable } from 'stream';
import { addFileExtension } from './helper';

/**
 * StorageWriter for writing data objects to a GCP Storage Bucket as a JSON file.
 */
export class ObjectWriter {
  private readonly storage: gcStorage.Storage;

  constructor(options?: gcStorage.StorageOptions) {
    this.storage = new gcStorage.Storage(options);
  }

  /**
   * Writes the data to given bucket as given filename.
   * Automatically adds .json extension to filename, if not provided.
   *
   * @param data
   * @param targetBucket
   * @param filename
   * @param metaData
   */
  public async writeObject(data: object, targetBucket: string, filename: string, metaData?: any): Promise<void> {
    if (!targetBucket || !filename) {
      return Promise.reject('no targetBucket or filename provided');
    }

    if (!data) {
      return Promise.reject('no data to write');
    }

    await new Promise((resolve, reject) => {
      const writeStream = this.createWriteStream(targetBucket, addFileExtension(filename));
      writeStream.write(JSON.stringify(data), (error: Error | null | undefined) => {
        if (error) {
          reject(error);
        } else {
          writeStream.end();
          resolve();
        }
      });
    });

    if (metaData) {
      await this.storage
        .bucket(targetBucket)
        .file(filename)
        .setMetadata(metaData);
    }
  }

  private createWriteStream(targetBucket: string, filename: string): Writable {
    return this.storage
      .bucket(targetBucket)
      .file(filename)
      .createWriteStream();
  }
}
