# GCP Object Storage

This package is intended for use in GCP Cloud Functions and to write and read JavaScript objects as JSON files to/from Cloud Storage.

## Installation

```bash
npm install gcp-object-storage
```

## Usage

```javascript
await new ObjectWriter().writeObject({ any: 'data' }, 'my-gcp-bucket', 'folder/to/my/file.json');
console.log(await new ObjectReader().readObject('my-gcp-bucket', 'folder/to/my/file.json'));
// Object { any: "data" }
```

## Test

```bash
npm run test
```
