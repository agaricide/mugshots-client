import * as puppeteer from 'puppeteer';
import { Mugshot } from './types/Mugshot';
import { County } from './types/County';

const ORIGIN = 'https://mugshots.com';

export async function scrapeAllCountyPages(county: County, limit: number = 300): Promise<Array<Mugshot>> {
    const browser = await puppeteer.launch();
    let page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);

    await page.goto(county.url);
    const results: Array<Mugshot> = [];

    while (results.length < limit) {
        if (await isNotFound(page)) break; 
        console.log('Mugshot page scraped.');
        const next = await getNextCountyPageUrl(page);
        const mugshots = await getMugshotFromPage(page, county);
        results.push(...mugshots);
        if (!next) break;
        page.close();
        page = undefined;
        page = await browser.newPage();
        page.setDefaultNavigationTimeout(0);
        await page.goto(next);
    }

    return results;
}

export async function getMugshotsFromUrl(url: string): Promise<Array<Mugshot>> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    return getMugshotFromPage(page);
}

export async function getMugshotFromPage(page: puppeteer.Page, county?: County): Promise<Array<Mugshot>> {
    const hrefs = await getMugshotHrefs(page);
    const mugshots = [];

    for (const [i, href] of hrefs.entries()) {
        if (i > 100) break;
        await page.goto(href);
        mugshots.push(await scrapeMugshot(page, county));
        console.log('Mugshot scraped.');
    }

    return mugshots;
}

// Returns all Mugshot profile urls w/ a picture on a given page
export async function getMugshotHrefs(page: puppeteer.Page): Promise<Array<string>> {
    return await page.evaluate(() => {
        const els: NodeListOf<Element> = document.querySelectorAll('a[class="image-preview"]');
        return Array.from(els)
            .filter(el => !el.querySelector('div[class="no-image"]'))
            .map(el => window.origin + el.getAttribute('href'));
    });
}

async function scrapeMugshot(page: puppeteer.Page, county: County): Promise<Mugshot> {
    const model: Mugshot = await page.evaluate(() => {
        const fieldNames = document.querySelectorAll('[class="name"]');
        const names = Array.from(fieldNames)
            .map(f => f.innerHTML)
            .map(s => s.toLowerCase());
        const fieldValues = document.querySelectorAll('[class="value"]');
        const values = Array.from(fieldValues).map(f => f.innerHTML);
    
        const name = window.location.href.split('/').pop()
            .replace(/.[0-9]+.html/, '')
            .replace('-', ' ');
        const imgUrl = document.querySelector('img[class="hidden-narrow"]')
            .getAttribute('src');
        
        let charges = '';
        let age = 0;
        
        try {
            charges = values[names.indexOf(
                names.find(name => name.includes('charge'))
            )];
            age = parseInt(values[names.indexOf(
                names.find(name => name.includes('age'))
            )]);
        } catch (e) {
            // do nothing
        }

        return {
            url: window.location.href,
            name,
            imgUrl,
            age,
            charges
        };
    });

    model.state = county.state;
    model.county = county.name;

    return model;
}

async function getNextCountyPageUrl(page: puppeteer.Page): Promise<string> {
    return page.evaluate(() => {
        const nextDiv = document.querySelector('a[class*=next]');
        if (!nextDiv) return '';
        const nextHref = nextDiv.getAttribute('href');
        return window.location.href + nextHref;
    });
}

export function isNotFound(page: puppeteer.Page): Promise<Boolean> {
    return page.evaluate(
        () => (window.location.href.split('/').pop() === 'None')  ? true : false
    );
}