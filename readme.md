# GCP Object Storage

This package is intended for use in GCP Cloud Functions and to write and read JavaScript objects as JSON files to/from Cloud Storage.

## Installation

```bash
npm install gcp-object-storage
```

## Usage

JavaScript

```javascript
const gcpObjectStorage = new require('gcp-object-storage');
const ObjectReader = new gcpObjectStorage.ObjectReader();
const ObjectWriter = new gcpObjectStorage.ObjectWriter();

const metadata = {
  contentType: 'application/x-font-ttf',
  metadata: {
    my: 'custom',
    properties: 'go here'
  }
};

// providing optional metadata
ObjectWriter().writeObject({ any: 'data' }, 'my-gcp-bucket', 'folder/to/my/file.json', metadata);

// without metadata
ObjectWriter().writeObject({ any: 'data' }, 'my-gcp-bucket', 'folder/to/my/file.json');

ObjectReader().readObject('my-gcp-bucket', 'folder/to/my/file.json');
// Object { any: "data" }
```

TypeScript

```typescript
import { ObjectWriter, ObjectReader } from 'gcp-object-storage';

new ObjectWriter()
  .writeObject({ any: 'data' }, 'my-gcp-bucket', 'folder/to/my/file.json')
  .then(() => new ObjectReader().readObject('my-gcp-bucket', 'folder/to/my/file.json'))
  .then((data: any) => console.log(data));
// Object { any: "data" }
```

## Test

```bash
npm run test
```
