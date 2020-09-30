import * as gcStorage from '@google-cloud/storage';
import { S3 } from 'aws-sdk';
import { Provider } from '../provider';

export interface IOptions {
  provider: Provider;
  providerOptions?: gcStorage.StorageOptions | S3.Types.ClientConfiguration;
}
