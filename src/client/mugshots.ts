import * as puppeteer from 'puppeteer';
import { Mugshot } from './types/Mugshot';
import { County } from './types/County';
import { stringify } from 'querystring';

// Returns all Mugshot profile urls w/ a picture on a given page
export async function getMugshotHrefs(browser: puppeteer.Browser, href: string): Promise<string[]> {
    const page = await browser.newPage();
    await page.goto(href);
    const hrefs = await page.evaluate(() => {
        const els: NodeListOf<Element> = document.querySelectorAll('a[class="image-preview"]');
        return Array.from(els)
            .filter(el => !el.querySelector('div[class="no-image"]'))
            .map(el => window.origin + el.getAttribute('href'));
    });
    await page.close();
    return hrefs;
}

export async function getMugshotsFromHrefs(browser: puppeteer.Browser, hrefs: string[], max: number = 100) {
    const mugshots = [];
    for (const [i, href] of hrefs.entries()) {
        if (i >= max) break;
        mugshots.push(await scrapeMugshot(browser, href));
    }
    return mugshots;
}

const parseMugshotFields = (page: puppeteer.Page) : Promise<any> => {
    return page.evaluate(() => {
        const fields: { [key: string]: string } = {};
        const keys = Array.from(document.querySelectorAll('.name'))
            .map(f => f.innerHTML)
            .map(s => s.toLowerCase());
        const values = Array.from(document.querySelectorAll('.value'))
            .map(f => f.innerHTML);
        keys.forEach((key, i) => fields[key] = values[i]);
        return fields;
    });
};

const parseMugshotTable = (page: puppeteer.Page) : Promise<any> => {
    return page.evaluate(() => {
        const table: { [key: string]: string } = {};
        const row = Array.from(document.querySelectorAll('tr'));
        row.forEach(el => {
            const key = el.querySelector('th').innerHTML;
            const value = el.querySelector('tr').innerHTML || '';
            table[key] = value;
        })
        return table;
    });
}

const parseMugshotName = (page: puppeteer.Page): Promise<string> => {
    return page.evaluate(() => {
        return window.location.href
        .split('/')
        .pop()
        .replace(/.[0-9]+.html/, '')
        .replace(/-/g, ' ');
    });
};

const parseMugshotImgUrl = (page: puppeteer.Page): Promise<string> => {
    return page.evaluate(() => {
        return document
            .querySelector('img[class="hidden-narrow"]')
            .getAttribute('src');
    });
}

export async function scrapeMugshot(browser: puppeteer.Browser, href: string): Promise<Mugshot> {
    const page = await browser.newPage();
    await page.goto(href);
    const fields = await parseMugshotFields(page);
    // const table = await parseMugshotTable(page);
    const name = await parseMugshotName(page);
    const imgUrl = await parseMugshotImgUrl(page);
    // const charge = fields['charge'] || table['charge'];
    const age = parseInt(fields['age']);
    await page.close();
    return {
        url: window.location.href,
        name,
        imgUrl,
        age,
        // charge
    };
}