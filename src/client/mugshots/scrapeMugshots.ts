import { Browser, Page } from 'puppeteer';
import { scrapeMugshot } from './scrapeMugshot';
import * as pool from 'generic-pool';

export interface Options {
  count?: number,
  pool?: pool.Options
}

const defaults: Options = {
  count: 100,
  pool: { max: 10 }
};

const PageFactory = (browser: Browser) => {
  const cache: Page[] = [];

  const create = () => {
    return (cache.length > 0)
      ? Promise.resolve(cache.pop())
      : browser.newPage();
  };

  const destroy = (page: Page) => {
    cache.push(page);
    return Promise.resolve();
  };

  return { create, destroy };
};

export async function scrapeMugshots(browser: Browser, urls: string[], opts: Options = {}) {
  const options = { ...opts, ...defaults };
  const pagePool = pool.createPool(PageFactory(browser), { ...options.pool });
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