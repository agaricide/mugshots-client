import { Page } from 'puppeteer';
import { County } from '../types/County';
declare const CountyIterator: (page: Page) => Promise<AsyncIterableIterator<County>>;
declare const CountyIterable: (page: Page) => Promise<{
    [Symbol.asyncIterator]: () => AsyncIterableIterator<County>;
}>;
export { CountyIterator, CountyIterable };
