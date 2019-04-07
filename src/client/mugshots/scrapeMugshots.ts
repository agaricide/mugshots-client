import { Browser, Page } from 'puppeteer';
import { scrapeMugshot } from './scrapeMugshot';
import { PagePool } from '../utils/PagePool';
import { Options as PoolOptions } from 'generic-pool';

export interface ScrapeOptions {
  count?: number,
  pool?: PoolOptions
}

const defaults: ScrapeOptions = {
  count: 100,
  pool: { max: 10 }
};

export async function scrapeMugshots(browser: Browser, urls: string[], opts: ScrapeOptions = {}) {
  const options = { ...opts, ...defaults };
  const pagePool = PagePool(browser, { ...options.pool })
  const mugshots = urls
    .slice(0, options.count)
    .map(async (url) => {
      const page = await pagePool.acquire();
      const mugshot = await scrapeMugshot(page, url);
      pagePool.release(page);
      return mugshot;
    });

  return Promise.all(mugshots);
}