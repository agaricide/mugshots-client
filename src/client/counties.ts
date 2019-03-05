import * as puppeteer from 'puppeteer';
import { County } from './types/County';
import { State } from './types/State';

const ORIGIN = 'https://mugshots.com';

export async function scrapeCounties(onBatch?: Function): Promise<County[]> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const states = await getStates(page);
  const counties = await getCountiesFromStates(page, states, onBatch);
  await browser.close();
  return counties;
}

async function getCountiesFromStates(page: puppeteer.Page, states: State[], onBatch?: Function): Promise<County[]> {
  const result: County[] = [];

  for (const [i, state] of states.entries()) {
    const counties = await getCounties(page, state);
    result.push(...counties);
    if (onBatch) onBatch(counties, i, states.length);
  }

  return result;
}

async function getCounties(page: puppeteer.Page, state: State): Promise<County[]> {
  await page.goto(state.url);
  const hrefs = await getGeoHrefs(page);

  return hrefs.reduce((results: County[], path: string) => {
    const county = toCounty(path);
    if (county) results.push(county);
    return results;
  }, []);
}

async function getStates(page: puppeteer.Page): Promise<State[]> {
  await page.goto(`${ORIGIN}/US-States/`);
  const hrefs = await getGeoHrefs(page);
  return hrefs.map(toState);
}

function getGeoHrefs(page: puppeteer.Page): Promise<string[]> {
  return page.evaluate(() => {
    const els: NodeListOf<Element> = document.querySelectorAll('a[href*=US-Counties]');
    return Array.from(els).map(el => el.getAttribute('href'));
  });
}

function toCounty(path: string): County | null {
  const split = path.split('/');

  if (split.length < 4) return null;

  return {
    state: format(split[2]),
    name: format(split[3]),
    url: ORIGIN + path
  };
}

function toState(path: string): State {
  return {
    name: path.split('/')[2],
    url: ORIGIN + path
  };
}

function format(str: string): string {
  return str.replace(/-/g, ' ');
}
