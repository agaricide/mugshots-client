"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const scrapeMugshotUrls = (page) => page.evaluate(() => {
    const els = document.querySelectorAll('a.image-preview');
    return Array.from(els)
        .filter(el => !el.querySelector('.no-image'))
        .map(el => window.origin + el.getAttribute('href'));
});
const scrapeNextCountyPage = (page) => page.evaluate(() => {
    const next = document.querySelector('a.next.page');
    if (!next)
        return '';
    const nextHref = next.getAttribute('href');
    return `${location.protocol}//${location.host}${location.pathname}${nextHref}`;
});
const is404 = (page) => page.evaluate(() => {
    const segment = window.location.href.split('/').pop();
    return segment === 'None' ? true : false;
});
const MugshotUrlIterator = (page, county) => __awaiter(this, void 0, void 0, function* () {
    yield page.goto(county.url);
    return function () {
        return __asyncGenerator(this, arguments, function* () {
            while (!(yield __await(is404(page)))) {
                const urls = yield __await(scrapeMugshotUrls(page));
                const next = yield __await(scrapeNextCountyPage(page));
                if (!next)
                    break;
                while (urls.length > 0) {
                    yield yield __await(urls.pop());
                }
            }
        });
    }();
});
exports.MugshotUrlIterator = MugshotUrlIterator;
const MugshotUrlChunkIterator = (page, county) => __awaiter(this, void 0, void 0, function* () {
    yield page.goto(county.url);
    return function () {
        return __asyncGenerator(this, arguments, function* () {
            while (!(yield __await(is404(page)))) {
                const urls = yield __await(scrapeMugshotUrls(page));
                const next = yield __await(scrapeNextCountyPage(page));
                if (!next)
                    break;
                yield __await(page.goto(next));
                yield yield __await(urls);
            }
        });
    }();
});
exports.MugshotUrlChunkIterator = MugshotUrlChunkIterator;
const MugshotUrlIterable = (page, county) => __awaiter(this, void 0, void 0, function* () {
    const mugshotUrlIterator = yield MugshotUrlIterator(page, county);
    return {
        [Symbol.asyncIterator]: () => mugshotUrlIterator
    };
});
exports.MugshotUrlIterable = MugshotUrlIterable;
const MugshotUrlChunkIterable = (page, county) => __awaiter(this, void 0, void 0, function* () {
    const mugshotUrlChunkIterator = yield MugshotUrlChunkIterator(page, county);
    return {
        [Symbol.asyncIterator]: () => mugshotUrlChunkIterator
    };
});
exports.MugshotUrlChunkIterable = MugshotUrlChunkIterable;
//# sourceMappingURL=MugshotUrlIterable.js.map