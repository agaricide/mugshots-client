import { Page } from 'puppeteer';
import { County } from '../types/County';
import { State } from '../types/State';
import { startFromState, startFromCounty } from './utils/startFrom';
import parseCounty from './utils/parseCounty';
import parseState from './utils/parseState';

const origin = 'https://mugshots.com';

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
  await page.goto(`${origin}/US-States/`);
  const hrefs = await scrapeStateHrefs(page);
  return hrefs.map(href => parseState({ href, origin })).filter(state => state.name);
};

const getCounties = async (page: Page, state: State): Promise<County[]> => {
  await page.goto(state.url);
  const hrefs = await scrapeCountyHrefs(page);

  return hrefs
    .map(href => parseCounty({ href, origin }))
    .filter(county => county)
    .reduce((results, county) => {
      results.push(county);
      return results;
    }, []);
};

const CountyIterator = async (page: Page, startFrom?: County) => {
  const states = await getStates(page);
  return (async function*() {
    for (const state of startFromState(states, startFrom)) {
      const counties = await getCounties(page, state);
      for (const county of startFromCounty(counties, startFrom)) {
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
