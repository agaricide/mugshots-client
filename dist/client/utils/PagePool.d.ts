import { Browser, Page } from 'puppeteer';
import { Options as PoolOptions } from 'generic-pool';
declare const PagePool: (browser: Browser, opts: PoolOptions) => import("generic-pool").Pool<Page>;
export { PoolOptions, PagePool };
