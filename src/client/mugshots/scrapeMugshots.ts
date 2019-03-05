import { Browser, Page } from 'puppeteer';
import { Mugshot } from '../types/Mugshot';
import { scrapeMugshot } from './scrapeMugshot';

export async function scrapeMugshots(browser: Browser, urls: string[], max: number = 100) {
  const mugshots = [];
  for (const [i, href] of urls.entries()) {
    if (i === max) break;
    mugshots.push(await scrapeMugshot(browser, href));
  }
  return mugshots;
}