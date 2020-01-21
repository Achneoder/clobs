import { CreateWriteStreamOptions, FileOptions } from '@google-cloud/storage';
import * as gcStorage from '@google-cloud/storage';
import { Writable } from 'stream';
import { addFileExtension } from './helper';
import { IWriteOptions } from './write-options';

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
   * @param options
   */
  public writeObject(data: object, targetBucket: string, filename: string, options?: IWriteOptions): Promise<void> {
    if (!targetBucket || !filename) {
      return Promise.reject('no targetBucket or filename provided');
    }

    if (!data) {
      return Promise.reject('no data to write');
    }

    return new Promise((resolve, reject) => {
      const writeStream = this.createWriteStream(targetBucket, addFileExtension(filename), options);
      writeStream.on('error', err => {
        reject(err);
      });
      writeStream.on('finish', () => {
        resolve();
      });
      writeStream.write(JSON.stringify(data));
      writeStream.end();
    });
  }

  private createWriteStream(targetBucket: string, filename: string, options?: IWriteOptions): Writable {
    return this.storage
      .bucket(targetBucket)
      .file(filename)
      .createWriteStream(options);
  }
}
