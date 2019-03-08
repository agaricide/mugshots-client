import { Page } from 'puppeteer';
import { Mugshot } from '../types/Mugshot';

interface StringMap { [key: string]: string };

const scrapeFields = (page: Page) => page.evaluate(() => {
  const keys = Array.from(document.querySelectorAll('.name'))
    .map(el => el.innerHTML)
    .map(s => s.toLowerCase());
  const values = Array.from(document.querySelectorAll('.value'))
    .map(el => el.innerHTML);
  return keys
    .map((key, i) => [key, values[i]])
    .reduce<StringMap>((fields, [key, value]) => ({ ...fields, [key]: value }), {});
});

const scrapeTable = (page: Page) => page.evaluate(() => {
  const rows = Array.from(document.querySelectorAll('tr'));
  return rows
    .map(tr => [tr.querySelector('th'), tr.querySelector('td')])
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

const scrapeState = (page: Page) => page.evaluate(() => {
  return window.location.href
    .split('/')
    .slice(-2, -1)[0]
    .split('-')
    .slice(-1)[0];
});

const scrapeCity = (page: Page) => page.evaluate(() => {
  return window.location.href
    .split('/')
    .slice(-2, -1)[0]
    .split('-')
    .slice(0, -1)
    .join(' ');
});

export async function scrapeMugshot(page: Page, url: string): Promise<Mugshot> {
  await page.goto(url);

  const [fields, table, name, imgUrl, state, city] = await Promise.all([
    scrapeFields(page),
    scrapeTable(page),
    scrapeName(page),
    scrapeImgUrl(page),
    scrapeState(page),
    scrapeCity(page)
  ]);
  
  const charge = fields['charge'] || table['charge'] || table['sex crime'];
  const age = parseInt(fields['age'], 10);

  return { url, name, imgUrl, age, charge, city, state };
}
