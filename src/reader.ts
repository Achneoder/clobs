import { DownloadResponse } from '@google-cloud/storage';
import * as gcStorage from '@google-cloud/storage';
import { AWSError, S3 } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import { IOptions } from './interfaces/options';
import { InvalidProviderError } from './invalid-provider-error';
import { Provider } from './provider';

/**
 * Reads a prior created data object from GCP Cloud Storage.
 */
export class ObjectReader {
  private readonly storage: gcStorage.Storage | S3;

  constructor(options: IOptions) {
    if (options.provider === Provider.AWS) {
      this.storage = new S3(options.providerOptions as S3.Types.ClientConfiguration);
    } else if (options.provider === Provider.GCP) {
      this.storage = new gcStorage.Storage(options.providerOptions as gcStorage.StorageOptions);
    } else {
      throw new InvalidProviderError(options.provider);
    }
  }

  /**
   * Tries to read the given file from bucket and returns it as an object;
   * @param bucket
   * @param fileName
   */
  public async readObject<T>(bucket: string, fileName: string): Promise<T> {
    let content: string;
    if (this.storage instanceof S3) {
      content = (await this.readObjectAWS(bucket, fileName)).Body?.toString() || '';
    } else {
      content = (await this.readObjectGCP(bucket, fileName)).toString();
    }
    return JSON.parse(content) as T;
  }

  private readObjectAWS(bucket: string, fileName: string): Promise<PromiseResult<S3.Types.GetObjectOutput, AWSError>> {
    return (this.storage as S3).getObject({ Bucket: bucket, Key: fileName }).promise();
  }

  private readObjectGCP(bucket: string, fileName: string): Promise<DownloadResponse> {
    return (this.storage as gcStorage.Storage)
      .bucket(bucket)
      .file(fileName)
      .download();
  }
}
