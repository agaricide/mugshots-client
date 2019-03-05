import { Browser, Page } from 'puppeteer';
import { Mugshot } from './types/Mugshot';

interface StringMap { [key: string]: string };

export async function getMugshotHrefs(browser: Browser, href: string): Promise<string[]> {
  const page = await browser.newPage();
  await page.goto(href);
  const hrefs = await page.evaluate(() => {
    const els: NodeListOf<Element> = document.querySelectorAll('a.image-preview');
    return Array.from(els)
      .filter(el => !el.querySelector('div.no-image'))
      .map(el => window.origin + el.getAttribute('href'));
  });
  await page.close();

  return hrefs;
}

export async function getMugshotsFromHrefs(browser: Browser, hrefs: string[], max: number = 100) {
  const mugshots = [];
  for (const [i, href] of hrefs.entries()) {
    if (i >= max) break;
    mugshots.push(await scrapeMugshot(browser, href));
  }

  return mugshots;
}

const parseMugshotFields = (page: Page): Promise<StringMap> => {
  return page.evaluate(() => {
    const fields: StringMap = {};
    const keys = Array.from(document.querySelectorAll('.name'))
      .map(f => f.innerHTML)
      .map(s => s.toLowerCase());
    const values = Array.from(document.querySelectorAll('.value'))
      .map(f => f.innerHTML);
    keys.forEach((key, i) => fields[key] = values[i]);

    return fields;
  });
};

const parseMugshotTable = (page: Page): Promise<StringMap> => {
  return page.evaluate(() => {
    const table: StringMap = {};
    const rows = Array.from(document.querySelectorAll('tr'));

    rows.map(tr => [tr.querySelector('th'), tr.querySelector('td')])
      .filter(([th, td]) => th && td && th.innerHTML && td.innerHTML)
      .map(([th, td]) => [th.innerHTML, td.innerHTML])
      .forEach(([key, value]) => table[key.toLowerCase()] = value);

    return table;
  });
};

const parseMugshotName = (page: Page): Promise<string> => {
  return page.evaluate(() => {
    return window.location.href
      .split('/')
      .pop()
      .replace(/.[0-9]+.html/, '')
      .replace(/-/g, ' ');
  });
};

const parseMugshotImgUrl = (page: Page): Promise<string> => {
  return page.evaluate(() => {
    return document
      .querySelector('img.hidden-narrow')
      .getAttribute('src');
  });
};

export async function scrapeMugshot(browser: Browser, href: string): Promise<Mugshot> {
  const page = await browser.newPage();
  await page.goto(href);
  const fields = await parseMugshotFields(page);
  const table = await parseMugshotTable(page);
  const name = await parseMugshotName(page);
  const imgUrl = await parseMugshotImgUrl(page); 
  const charge = fields['charge'] || table['charge'];
  const age = parseInt(fields['age'], 10);
  await page.close();

  return {
    url: href,
    name,
    imgUrl,
    age,
    charge
  };
}
