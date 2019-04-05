import * as puppeteer from 'puppeteer';
import { scrapeMugshot } from '../../client/mugshots/scrapeMugshot';
import { scrapeMugshots } from '../../client/mugshots/scrapeMugshots';
import { cases as testCases } from './cases.json';
import { MugshotUrlIterator, MugshotUrlChunkIterator } from '../../client/mugshots/MugshotUrlIterator';
import { County } from '../../client/types/County';

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
  it('handles test case #1: Jeffrey Thomas Pendzimas', async (done) => {
    const test = testCases[0];
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

  it('handles test case #2: CARLTON MCCRARY Jr.', async (done) => {
    const test = testCases[1];
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

  it('handles test case #3: Lucas Jamil Mahi', async (done) => {
    const test = testCases[2];
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

  it('handles test case #4: Kevin Verdie Sukhu', async (done) => {
    const test = testCases[3];
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
  
  it('handles test case #5: Cody Alan Payton', async (done) => {
    const test = testCases[4];
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

  it('handles test case #6: Ritchard Kerry Johnson', async (done) => {
    const test = testCases[5];
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


const county: County = {
  name: 'Autauga County',
  state: 'Alabama',
  url: 'https://mugshots.com/US-Counties/Alabama/Autauga-County-AL/'
};

describe('MugshotUrlIterator', () => {
  it('is an async iterator that iterates through mugshot strings', async (done) => {
    const mugshotUrls = await MugshotUrlIterator(browser, county);
    for await (const url of mugshotUrls) {
      expect(url).toBeTruthy();
      expect(typeof url).toBe('string');
      break;
    }
    done();
  });
});

describe('MugshotUrlChunkIterator', () => {
  it('is an async iterator that iterates through mugshot strings', async (done) => {
    const mugshotUrls = await MugshotUrlChunkIterator(browser, county);
    for await (const chunk of mugshotUrls) {
      expect(chunk.length).toBeTruthy();
      expect(typeof chunk[0]).toBe('string');
      break;
    }
    done();
  });
});