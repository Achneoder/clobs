# GCP Object Storage

![npm](https://img.shields.io/npm/v/gcp-object-storage)
[![Build Status](https://travis-ci.org/Achneoder/gcp-object-storage.svg?branch=master)](https://travis-ci.org/Achneoder/gcp-object-storage)
[![Coverage Status](https://coveralls.io/repos/github/Achneoder/gcp-object-storage/badge.svg?branch=master)](https://coveralls.io/github/Achneoder/gcp-object-storage?branch=master)

This package is intended for use in GCP Cloud Functions and to write and read JavaScript objects as JSON files to/from Cloud Storage.

## Installation

```bash
npm install gcp-object-storage
```

## Usage

JavaScript

```javascript
const gcpObjectStorage = new require('gcp-object-storage');
const objectReader = new gcpObjectStorage.ObjectReader();
const objectWriter = new gcpObjectStorage.ObjectWriter();

const options = {
  contentType: 'application/x-font-ttf',
  metadata: {
    my: 'custom',
    properties: 'go here'
  },
  public: true
};

// providing optional metadata
objectWriter.writeObject({ any: 'data' }, 'my-gcp-bucket', 'folder/to/my/file.json', options);

// without metadata
objectWriter.writeObject({ any: 'data' }, 'my-gcp-bucket', 'folder/to/my/file.json');

objectReader.readObject('my-gcp-bucket', 'folder/to/my/file.json');
// Object { any: "data" }
```

TypeScript

```typescript
import { ObjectWriter, ObjectReader, IWriteOptions } from 'gcp-object-storage';

const options: IWriteOptions = {
  contentType: 'application/x-font-ttf',
  metadata: {
    my: 'custom',
    properties: 'go here'
  },
  public: true
};
new ObjectWriter()
  .writeObject({ any: 'data' }, 'my-gcp-bucket', 'folder/to/my/file.json', options)
  .then(() => new ObjectReader().readObject('my-gcp-bucket', 'folder/to/my/file.json'))
  .then((data: any) => console.log(data));
// Object { any: "data" }
```

## Test

```bash
npm run test
```
