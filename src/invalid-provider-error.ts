import { Provider } from './provider';

export class InvalidProviderError extends Error {
  constructor(selectedProvider: Provider) {
    super(`invalid provider ${selectedProvider}, must be one of [${Object.keys(Provider).toString()}]`);
  }
}
