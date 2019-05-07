import { Page } from 'puppeteer';
import { Mugshot } from '../types/Mugshot';
export declare function scrapeMugshot(page: Page, url: string): Promise<Mugshot>;
