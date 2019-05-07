import { Page } from 'puppeteer';
import { County } from '../types/County';
declare const MugshotUrlIterator: (page: Page, county: County) => Promise<AsyncIterableIterator<string>>;
declare const MugshotUrlChunkIterator: (page: Page, county: County) => Promise<AsyncIterableIterator<string[]>>;
declare const MugshotUrlIterable: (page: Page, county: County) => Promise<{
    [Symbol.asyncIterator]: () => AsyncIterableIterator<string>;
}>;
declare const MugshotUrlChunkIterable: (page: Page, county: County) => Promise<{
    [Symbol.asyncIterator]: () => AsyncIterableIterator<string[]>;
}>;
export { MugshotUrlIterator, MugshotUrlIterable, MugshotUrlChunkIterator, MugshotUrlChunkIterable };
