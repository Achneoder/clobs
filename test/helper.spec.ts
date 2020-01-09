import { addFileExtension } from '../src/helper';

describe('addFileExtension', () => {
  it('should add extension with simple filename', () => {
    const filename = 'this-is-a-simple-filename';

    const result = addFileExtension(filename);
    expect(result).toEqual(filename + '.json');
  });

  it('should add extension with complex filename', () => {
    const filename = 'a/quite/deep/path/to/my.fancy.file';

    const result = addFileExtension(filename);
    expect(result).toEqual(filename + '.json');
  });

  it('should not add extension with simple filename', () => {
    const filename = 'this-is-a-simple-filename.json';

    const result = addFileExtension(filename);
    expect(result).toEqual(filename);
  });

  it('should not add extension with complex filename', () => {
    const filename = 'a/quite/deep/path/to/my-file.json';

    const result = addFileExtension(filename);
    expect(result).toEqual(filename);
  });
});
