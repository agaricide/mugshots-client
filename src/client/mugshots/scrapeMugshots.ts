import { Browser, Page } from 'puppeteer';
import { scrapeMugshot } from './scrapeMugshot';
import * as pool from 'generic-pool';

export interface Options {
  count?: number,
  pool?: pool.Options
}

const defaults: Options = {
  count: 100,
  pool: { max: 2 }
};

const pageFactory = (browser: Browser) => ({
  create: () => browser.newPage(),
  destroy: (page: Page) => page.close()
});

export async function scrapeMugshots(browser: Browser, urls: string[], opts: Options = {}) {
  const options = { ...opts, ...defaults };
  const pagePool = pool.createPool(pageFactory(browser), { ...options.pool });
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