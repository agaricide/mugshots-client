import { Page } from 'puppeteer';
import { scrapeMugshot } from './scrapeMugshot';
import { Pool } from 'generic-pool';

export interface ScrapeOptions {
  maxChunkSize?: number
}

const defaults: ScrapeOptions = {
  maxChunkSize: 100
};

export async function scrapeMugshots(pagePool: Pool<Page>, urls: string[], opts: ScrapeOptions = {}) {
  const options = {  ...defaults, ...opts };
  const mugshots = urls
    .slice(0, options.maxChunkSize)
    .map(async (url) => {
      const page = await pagePool.acquire();
      const mugshot = await scrapeMugshot(page, url);
      pagePool.release(page);
      return mugshot;
    });

  return Promise.all(mugshots);
}