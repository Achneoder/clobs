import { ObjectReader } from '../src';

let bucketData: { [key: string]: { [key: string]: any } } = {};

const storageInstanceMock = {
  bucket: (bucketName: string) => ({
    file: (fileName: string) => ({
      download: () => {
        if (!bucketData[bucketName] || !bucketData[bucketName][fileName]) {
          return Promise.reject(new Error('no bucket or file found'));
        }
        return Promise.resolve(Buffer.from(JSON.stringify(bucketData[bucketName][fileName])));
      }
    })
  })
};

jest.mock('@google-cloud/storage', () => ({
  Storage: jest.fn(() => storageInstanceMock)
}));

beforeEach(() => {
  bucketData = {};
});

describe('readObject', () => {
  it('should read an object', async () => {
    const data = {
      asNumber: 456789.34,
      custom: 'field',
      hasValue: true,
      some: 'special'
    };

    const bucket = 'my-bucket';
    const fileName = 'path/to-my-file.json';
    bucketData = {
      [bucket]: {
        [fileName]: data
      }
    };

    const reader = new ObjectReader();

    expect(await reader.readObject(bucket, fileName)).toEqual(data);
  });
});
