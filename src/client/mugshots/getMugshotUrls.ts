import { Browser, Page } from 'puppeteer';
import { Mugshot } from '../types/Mugshot';

export async function getMugshotUrls(browser: Browser, url: string): Promise<string[]> {
  const page = await browser.newPage();
  await page.goto(url);

  const hrefs = await page.evaluate(() => {
    const els: NodeListOf<Element> = document.querySelectorAll('a.image-preview');
    return Array.from(els)
      .filter(el => !el.querySelector('div.no-image'))
      .map(el => window.origin + el.getAttribute('href'));
  });
  await page.close();

  return hrefs;
}