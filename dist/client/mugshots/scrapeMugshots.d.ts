import { Page } from 'puppeteer';
import { Pool } from 'generic-pool';
export interface ScrapeOptions {
    maxChunkSize?: number;
}
export declare function scrapeMugshots(pagePool: Pool<Page>, urls: string[], opts?: ScrapeOptions): Promise<import("../..").Mugshot[]>;
