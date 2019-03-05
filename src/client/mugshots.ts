import { Browser, Page } from 'puppeteer';
import { Mugshot } from './types/Mugshot';

interface StringMap { [key: string]: string };

const scrapeFields = (page: Page) => page.evaluate(() => {
  const fields: StringMap = {};
  const keys = Array.from(document.querySelectorAll('.name'))
    .map(el => el.innerHTML)
    .map(s => s.toLowerCase());
  const values = Array.from(document.querySelectorAll('.value'))
    .map(f => f.innerHTML);
  keys.forEach((key, i) => fields[key] = values[i]);

  return fields;
});

const scrapeTable = (page: Page) => page.evaluate(() => {
  const table: StringMap = {};
  const rows = Array.from(document.querySelectorAll('tr'));

  rows.map(tr => [tr.querySelector('th'), tr.querySelector('td')])
    .filter(([th, td]) => th && td && th.innerHTML && td.innerHTML)
    .map(([th, td]) => [th.innerHTML, td.innerHTML])
    .forEach(([key, value]) => table[key.toLowerCase()] = value);
  
  return table;
});

const scrapeName = (page: Page) => page.evaluate(() => {
  return window.location.href
    .split('/')
    .pop()
    .replace(/.[0-9]+.html/, '')
    .replace(/-/g, ' ');
});

const scrapeImgUrl = (page: Page) => page.evaluate(() => {
  return document
    .querySelector('img.hidden-narrow')
    .getAttribute('src');
});

export async function scrapeMugshot(browser: Browser, url: string): Promise<Mugshot> {
  const page = await browser.newPage();
  await page.goto(url);

  const [fields, table, name, imgUrl] = await Promise.all([
    scrapeFields(page),
    scrapeTable(page),
    scrapeName(page),
    scrapeImgUrl(page)
  ]);
  
  const charge = fields['charge'] || table['charge'];
  const age = parseInt(fields['age'], 10);
  await page.close();

  return { url, name, imgUrl, age, charge };
}

export async function scrapeMugshots(browser: Browser, urls: string[], max: number = 100) {
  const mugshots = [];
  for (const [i, href] of urls.entries()) {
    if (i === max) break;
    mugshots.push(await scrapeMugshot(browser, href));
  }
  return mugshots;
}

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