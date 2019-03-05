import * as mugshots from '../client/mugshots';
import * as puppeteer from 'puppeteer';
import { cases as testCases } from './cases.json';

jest.setTimeout(15 * 1000);

let browser: puppeteer.Browser;
let page: puppeteer.Page;

beforeAll(async (done) => {
    browser = await puppeteer.launch();
    done();
});

afterAll(async (done) => {
    await browser.close();
    done();
});

describe('getMugshotHrefs', () => {
    it('returns a list of urls w/ a valid mugshot on a page', async (done) => {            
        const TEST_COUNTY = 'https://mugshots.com/US-Counties/Alabama/Autauga-County-AL/';
        const result = await mugshots.getMugshotHrefs(browser, TEST_COUNTY);
        expect(typeof result).toBe('object');
        expect(typeof result[0]).toBe('string');
        done();
    });
});

describe('getMugshotsFromHrefs', () => {
    it('returns a list of mugshot objects of the length specified', async (done) => {
        const TEST_MUGSHOT = 'https://mugshots.com/US-Counties/Alabama/Autauga-County-AL/Matthew-Jerald-Sanders.175347488.html';
        const results = await mugshots.getMugshotsFromHrefs(browser, [TEST_MUGSHOT], 1);
        expect(results.length).toBe(1);
        expect(typeof results[0]).toBe('object');
        done();
    });
});


describe('scrapeMugshot', () => {
    it(`handles mugshot test case #1 from cases.json`, async (done) => {
        const test = testCases[0];
        const mugshot = await mugshots.scrapeMugshot(browser, test.url);
        expect(mugshot.name).toBe(test.expected.name);
        expect(mugshot.imgUrl).toBe(test.expected.imgUrl);
        expect(mugshot.age).toBe(test.expected.age);
        expect(mugshot.charge).toBe(test.expected.charge);
        // expect(mugshot.state).toBe(test.expected.state);
        done();
    });
});