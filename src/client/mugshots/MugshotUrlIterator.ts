import { Browser, Page } from 'puppeteer';
import { County } from '../types/County';

const scrapeMugshotUrls = (page: Page) => page.evaluate(() => {
  const els = document.querySelectorAll('a.image-preview');
  return Array.from(els)
    .filter(el => !el.querySelector('.no-image'))
    .map(el => window.origin + el.getAttribute('href'));
});

const scrapeNextCountyPage = (page: Page) => page.evaluate(() => {
  const next = document.querySelector('a.next.page');
  if (!next) return '';
  const nextHref = next.getAttribute('href');
  return `${location.protocol}//${location.host}${location.pathname}${nextHref}`;
});

const is404 = (page: Page) => page.evaluate(() => {
  const segment = window.location.href.split('/').pop();
  return segment === 'None' ? true : false;
});

const MugshotUrlIterator = async (page: Page, county: County) => {
  await page.goto(county.url);
  return {
    async *[Symbol.asyncIterator]() {
      while (!await is404(page)) {
        const urls = await scrapeMugshotUrls(page);
        const next = await scrapeNextCountyPage(page);
        if (next) await page.goto(next);
        while (urls.length > 0) {
          yield urls.pop();
        }
      }
    }
  };
};

const MugshotUrlChunkIterator = async (page: Page, county: County) => {
  await page.goto(county.url);
  return {
    async *[Symbol.asyncIterator]() {
      try {
        while (!await is404(page)) {
          const urls = await scrapeMugshotUrls(page);
          const next = await scrapeNextCountyPage(page);
          await page.goto(next);
          yield urls;
        }
      } catch(error) {
        console.log(error);
      }
    }
  };
};

export {
  MugshotUrlIterator,
  MugshotUrlChunkIterator
};