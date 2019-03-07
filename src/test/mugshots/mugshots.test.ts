import * as puppeteer from 'puppeteer';
import { scrapeMugshot } from '../../client/mugshots/scrapeMugshot';
import { scrapeMugshots } from '../../client/mugshots/scrapeMugshots';
import { getMugshotUrls } from '../../client/mugshots/getMugshotUrls';
import { cases as testCases } from './cases.json';

jest.setTimeout(15 * 1000);

let browser: puppeteer.Browser;

beforeAll(async (done) => {
  browser = await puppeteer.launch();
  done();
});

afterAll(async (done) => {
  await browser.close();
  done();
});

describe('getMugshotUrls', () => {
  it('returns a list of urls w/ a valid mugshot on a page', async (done) => {
    const TEST_COUNTY = 'https://mugshots.com/US-Counties/Alabama/Autauga-County-AL/';
    const result = await getMugshotUrls(browser, TEST_COUNTY);
    expect(typeof result).toBe('object');
    expect(typeof result[0]).toBe('string');
    done();
  });
});

describe('scrapeMugshots', () => {
  it('returns a list of mugshot objects of the length specified', async (done) => {
    // tslint:disable-next-line:max-line-length
    const TEST_MUGSHOT = 'https://mugshots.com/US-Counties/Alabama/Autauga-County-AL/Matthew-Jerald-Sanders.175347488.html';
    const results = await scrapeMugshots(browser, [TEST_MUGSHOT], { count: 1 });
    expect(results.length).toBe(1);
    expect(typeof results[0]).toBe('object');
    done();
  });
});


describe('scrapeMugshot', () => {
  const test = testCases[0];
  it(`handles mugshot test case #1 (Jeffrey Thomas Pendzimas) from cases.json`, async (done) => {
    const page = await browser.newPage();
    const mugshot = await scrapeMugshot(page, test.url);
    await page.close();
    expect(mugshot.name).toBe(test.expected.name);
    expect(mugshot.imgUrl).toBe(test.expected.imgUrl);
    expect(mugshot.age).toBe(test.expected.age);
    expect(mugshot.charge).toBe(test.expected.charge);
    expect(mugshot.city).toBe(test.expected.city);
    expect(mugshot.state).toBe(test.expected.state);
    done();
  });
});
