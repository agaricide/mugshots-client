import { Browser, Page } from 'puppeteer';
import { Factory, createPool,  Options as PoolOptions } from 'generic-pool';

const PageFactory = (browser: Browser): Factory<Page> => {
  const create = () => browser.newPage();
  const destroy = (page: Page) => page.close();
  return { create, destroy };
};

const PagePool = (browser: Browser, opts: PoolOptions) =>
  createPool(PageFactory(browser), opts);

export { PoolOptions, PagePool }