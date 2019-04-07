import { Browser, Page } from 'puppeteer';
import { createPool,  Options as PoolOptions } from 'generic-pool';

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

const PagePool = (browser: Browser, options: PoolOptions) => createPool(PageFactory(browser), options);

export {
  PageFactory,
  PagePool
}