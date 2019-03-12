import { Browser, Page } from 'puppeteer';
import { County } from '../types/County';

const scrapeMugshotUrls = (page: Page) => page.evaluate(() => {
  const els = document.querySelectorAll('a.image-preview');
  return Array.from(els)
    .filter(el => !el.querySelector('.no-image'))
    .map(el => window.origin + el.getAttribute('href'));
});

const scrapeNextCountyPage = (page: Page) => page.evaluate(() => {
  const nextHref = document
    .querySelector('a[class*=next]')
    .getAttribute('href');
  return window.location.href + nextHref;
});

const is404 = (page: Page) => page.evaluate(() => {
  const segment = window.location.href.split('/').pop();
  return segment === 'None' ? true : false;
});

const MugshotUrlGenerator = async (browser: Browser, county: County) => {
  const page = await browser.newPage();
  await page.goto(county.url);
  return {
    async *[Symbol.iterator]() {
      while (!await is404(page)) {
        const [urls, next] = await Promise.all([
          scrapeMugshotUrls(page),
          scrapeNextCountyPage(page)
        ]);
        await page.goto(next);
        yield urls;
      }
      page.close();
    }
  };
};

export { MugshotUrlGenerator };