
import { Browser, Page } from 'puppeteer';
import { Mugshot } from '../types/Mugshot';

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
  const rows = Array.from(document.querySelectorAll('tr'));
  return rows.map(tr => [tr.querySelector('th'), tr.querySelector('td')])
    .filter(([th, td]) => th && td && th.innerHTML && td.innerHTML)
    .map(([th, td]) => [th.innerHTML, td.innerHTML])
    .map(([key, value]) => [key.toLowerCase(), value])
    .reduce<StringMap>((table, [key, value]) => ({ ...table, [key]: value }), {});
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

export async function scrapeMugshot(page: Page, url: string): Promise<Mugshot> {
  await page.goto(url);

  const [fields, table, name, imgUrl] = await Promise.all([
    scrapeFields(page),
    scrapeTable(page),
    scrapeName(page),
    scrapeImgUrl(page)
  ]);
  
  const charge = fields['charge'] || table['charge'];
  const age = parseInt(fields['age'], 10);

  return { url, name, imgUrl, age, charge };
}
