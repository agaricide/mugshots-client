"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
;
const scrapeFields = (page) => page.evaluate(() => {
    const keys = Array.from(document.querySelectorAll('.name'))
        .map(el => el.innerHTML)
        .map(s => s.toLowerCase());
    const values = Array.from(document.querySelectorAll('.value'))
        .map(el => el.innerHTML);
    return keys
        .map((key, i) => [key, values[i]])
        .reduce((fields, [key, value]) => (Object.assign({}, fields, { [key]: value })), {});
});
const scrapeTable = (page) => page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('tr'));
    return rows
        .map(tr => [tr.querySelector('th'), tr.querySelector('td')])
        .filter(([th, td]) => th && td && th.innerHTML && td.innerHTML)
        .map(([th, td]) => [th.innerHTML, td.innerHTML])
        .map(([key, value]) => [key.toLowerCase(), value])
        .reduce((table, [key, value]) => (Object.assign({}, table, { [key]: value })), {});
});
const scrapeChargeList = (page) => page.evaluate(() => {
    const lis = document
        .querySelector('.fieldvalues')
        .querySelectorAll('li');
    return Array.from(lis)
        .map(li => li.innerHTML);
});
const scrapeName = (page) => page.evaluate(() => {
    return window.location.href
        .split('/')
        .pop()
        .replace(/.[0-9]+.html/, '')
        .replace(/-/g, ' ');
});
const scrapeImgUrl = (page) => page.evaluate(() => {
    return document
        .querySelector('img.hidden-narrow')
        .getAttribute('src');
});
const scrapeState = (page) => page.evaluate(() => {
    return window.location.href
        .split('/')
        .slice(-2, -1)[0]
        .split('-')
        .slice(-1)[0];
});
const scrapeCity = (page) => page.evaluate(() => {
    return window.location.href
        .split('/')
        .slice(-2, -1)[0]
        .split('-')
        .slice(0, -1)
        .join(' ');
});
function scrapeMugshot(page, url) {
    return __awaiter(this, void 0, void 0, function* () {
        yield page.goto(url);
        const [fields, table, name, imgUrl, state, city, chargeList] = yield Promise.all([
            scrapeFields(page),
            scrapeTable(page),
            scrapeName(page),
            scrapeImgUrl(page),
            scrapeState(page),
            scrapeCity(page),
            scrapeChargeList(page)
        ]);
        const charge = fields['charge']
            || table['charge']
            || table['sex crime']
            || table['details']
            || table['description']
            || table['offense description']
            || chargeList[0];
        const age = fields['age'] ? parseInt(fields['age'], 10) : -1;
        return { url, name, imgUrl, age, charge, city, state };
    });
}
exports.scrapeMugshot = scrapeMugshot;
//# sourceMappingURL=scrapeMugshot.js.map