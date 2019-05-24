import { Page } from 'puppeteer';
import { County } from '../types/County';

const scrapeMugshotUrls = (page: Page) => page.evaluate(() => {
  const els = document.querySelectorAll('a.image-preview');
  return Array.from(els)
    .filter(el => !el.querySelector('.no-image'))
    .map(el => window.origin + el.getAttribute('href'));
});

const scrapeNextCountyPage = (page: Page) => page.evaluate(() => {
  const { protocol, host, pathname } = location;
  const next = document.querySelector('a.next.page');
  if (!next) return '';
  const nextHref = next.getAttribute('href');
  return `${protocol}//${host}${pathname}${nextHref}`;
});

const is404 = (page: Page) => page.evaluate(() => {
  const segment = window.location.href.split('/').pop();
  return segment === 'None' ? true : false;
});

const MugshotUrlIterator = async (page: Page, county: County) => {
  await page.goto(county.url);
  return async function* () {
    while (!await is404(page)) {
      const urls = await scrapeMugshotUrls(page);
      const next = await scrapeNextCountyPage(page);
      if (!next) break;
      while (urls.length > 0) {
        yield urls.pop();
      }
    }
  }();
};

const MugshotUrlChunkIterator = async (page: Page, county: County) => {
  await page.goto(county.url);
  return async function* () {
    while (!await is404(page)) {
      const urls = await scrapeMugshotUrls(page);
      const next = await scrapeNextCountyPage(page);
      if (!next) break;
      await page.goto(next);
      yield urls;
    }
  }();
};

const MugshotUrlIterable = async (page: Page, county: County) => {
  const mugshotUrlIterator = await MugshotUrlIterator(page, county);
  return {
    [Symbol.asyncIterator]: () => mugshotUrlIterator
  };
};


const MugshotUrlChunkIterable = async (page: Page, county: County) => {
  const mugshotUrlChunkIterator = await MugshotUrlChunkIterator(page, county);
  return {
    [Symbol.asyncIterator]: () => mugshotUrlChunkIterator
  };
};

export {
  MugshotUrlIterator,
  MugshotUrlIterable,
  MugshotUrlChunkIterator,
  MugshotUrlChunkIterable
};