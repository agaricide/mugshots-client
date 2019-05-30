import { Page } from 'puppeteer';
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
  return hrefs.map(toState).filter(state => state.name);
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

const startFrom = <T extends State | County>(models: T[], start?: County): T[] => {
  if (!start) return models;
  const index = models.findIndex(model => model.name === start.state);
  if (index === -1) return models;
  return models.slice(index);
};

const CountyIterator = async (page: Page, start?: County) => {
  const states = await getStates(page);
  return (async function*() {
    for (const state of startFrom(states, start)) {
      const counties = await getCounties(page, state);
      for (const county of startFrom(counties, start)) {
        yield county;
      }
    }
  })();
};

const CountyIterable = async (page: Page, startFrom?: County) => {
  const countyIterator = await CountyIterator(page, startFrom);
  return {
    [Symbol.asyncIterator]: () => countyIterator
  };
};

export { CountyIterator, CountyIterable };
