"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generic_pool_1 = require("generic-pool");
const PageFactory = (browser) => {
    const cache = [];
    const create = () => {
        return (cache.length > 0)
            ? Promise.resolve(cache.pop())
            : browser.newPage();
    };
    const destroy = (page) => {
        cache.push(page);
        return Promise.resolve();
    };
    return { create, destroy };
};
const PagePool = (browser, opts) => generic_pool_1.createPool(PageFactory(browser), opts);
exports.PagePool = PagePool;
//# sourceMappingURL=PagePool.js.map