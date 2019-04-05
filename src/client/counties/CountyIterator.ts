import { Browser, Page } from 'puppeteer';
import { County } from '../types/County';
import { State } from '../types/State';

const ORIGIN = 'https://mugshots.com';

const toCounty = (path: string): County | null => {
  const split = path.split('/');

  if (split.length < 4) return null;

  return {
    state: format(split[2]),
    name: format(split[3]),
    url: ORIGIN + path
  };
};

const toState = (path: string): State => {
  return {
    name: path.split('/')[2],
    url: ORIGIN + path
  };
};

const format = (str: string): string => {
  return str.replace(/-/g, ' ');
};

const scrapeCountyHrefs = (page: Page): Promise<string[]> => {
  return page.evaluate(() => {
    const els: NodeListOf<Element> = document.querySelectorAll('a[href*=US-Counties]');
    return Array.from(els).map(el => el.getAttribute('href'));
  });
};

const scrapeStateHrefs = (page: Page): Promise<string[]> => {
  return page.evaluate(() => {
    const els: NodeListOf<Element> = document.querySelectorAll('a[href*=US-States]');
    return Array.from(els).map(el => el.getAttribute('href'));
  });
};

const getStates = async (page: Page): Promise<State[]> => {
  await page.goto(`${ORIGIN}/US-States/`);
  const hrefs = await scrapeStateHrefs(page);
  return hrefs
    .map(toState)
    .filter(state => state.name);
};

const getCounties = async (page: Page, state: State): Promise<County[]> => {
  await page.goto(state.url);
  const hrefs = await scrapeCountyHrefs(page);

  return hrefs.reduce((results: County[], path: string) => {
    const county = toCounty(path);
    if (county) results.push(county);
    return results;
  }, []);
};

const CountyIterator = async (browser: Browser) => {
  const page = await browser.newPage();
  const states = await getStates(page);
  return {
    async *[Symbol.asyncIterator]() {
      for (const state of states) {
        const counties = await getCounties(page, state);
        for (const county of counties) {
          yield county;
        }
      }
      page.close();
    }
  }
};

export {
  CountyIterator
};