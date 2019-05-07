[mugshots-client](../README.md) > ["client/mugshots/scrapeMugshot"](../modules/_client_mugshots_scrapemugshot_.md)

# External module: "client/mugshots/scrapeMugshot"

## Index

### Interfaces

* [StringMap](../interfaces/_client_mugshots_scrapemugshot_.stringmap.md)

### Functions

* [scrapeChargeList](_client_mugshots_scrapemugshot_.md#scrapechargelist)
* [scrapeCity](_client_mugshots_scrapemugshot_.md#scrapecity)
* [scrapeFields](_client_mugshots_scrapemugshot_.md#scrapefields)
* [scrapeImgUrl](_client_mugshots_scrapemugshot_.md#scrapeimgurl)
* [scrapeMugshot](_client_mugshots_scrapemugshot_.md#scrapemugshot)
* [scrapeName](_client_mugshots_scrapemugshot_.md#scrapename)
* [scrapeState](_client_mugshots_scrapemugshot_.md#scrapestate)
* [scrapeTable](_client_mugshots_scrapemugshot_.md#scrapetable)

---

## Functions

<a id="scrapechargelist"></a>

### `<Const>` scrapeChargeList

▸ **scrapeChargeList**(page: *`Page`*): `Promise`<`string`[]>

*Defined in [client/mugshots/scrapeMugshot.ts:27](https://github.com/agaricide/mugshots-client/blob/ddd2d5c/src/client/mugshots/scrapeMugshot.ts#L27)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| page | `Page` |

**Returns:** `Promise`<`string`[]>

___
<a id="scrapecity"></a>

### `<Const>` scrapeCity

▸ **scrapeCity**(page: *`Page`*): `Promise`<`string`>

*Defined in [client/mugshots/scrapeMugshot.ts:57](https://github.com/agaricide/mugshots-client/blob/ddd2d5c/src/client/mugshots/scrapeMugshot.ts#L57)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| page | `Page` |

**Returns:** `Promise`<`string`>

___
<a id="scrapefields"></a>

### `<Const>` scrapeFields

▸ **scrapeFields**(page: *`Page`*): `Promise`<[StringMap](../interfaces/_client_mugshots_scrapemugshot_.stringmap.md)>

*Defined in [client/mugshots/scrapeMugshot.ts:6](https://github.com/agaricide/mugshots-client/blob/ddd2d5c/src/client/mugshots/scrapeMugshot.ts#L6)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| page | `Page` |

**Returns:** `Promise`<[StringMap](../interfaces/_client_mugshots_scrapemugshot_.stringmap.md)>

___
<a id="scrapeimgurl"></a>

### `<Const>` scrapeImgUrl

▸ **scrapeImgUrl**(page: *`Page`*): `Promise`<`string`>

*Defined in [client/mugshots/scrapeMugshot.ts:43](https://github.com/agaricide/mugshots-client/blob/ddd2d5c/src/client/mugshots/scrapeMugshot.ts#L43)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| page | `Page` |

**Returns:** `Promise`<`string`>

___
<a id="scrapemugshot"></a>

###  scrapeMugshot

▸ **scrapeMugshot**(page: *`Page`*, url: *`string`*): `Promise`<[Mugshot](../interfaces/_client_types_mugshot_.mugshot.md)>

*Defined in [client/mugshots/scrapeMugshot.ts:66](https://github.com/agaricide/mugshots-client/blob/ddd2d5c/src/client/mugshots/scrapeMugshot.ts#L66)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| page | `Page` |
| url | `string` |

**Returns:** `Promise`<[Mugshot](../interfaces/_client_types_mugshot_.mugshot.md)>

___
<a id="scrapename"></a>

### `<Const>` scrapeName

▸ **scrapeName**(page: *`Page`*): `Promise`<`string`>

*Defined in [client/mugshots/scrapeMugshot.ts:35](https://github.com/agaricide/mugshots-client/blob/ddd2d5c/src/client/mugshots/scrapeMugshot.ts#L35)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| page | `Page` |

**Returns:** `Promise`<`string`>

___
<a id="scrapestate"></a>

### `<Const>` scrapeState

▸ **scrapeState**(page: *`Page`*): `Promise`<`string`>

*Defined in [client/mugshots/scrapeMugshot.ts:49](https://github.com/agaricide/mugshots-client/blob/ddd2d5c/src/client/mugshots/scrapeMugshot.ts#L49)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| page | `Page` |

**Returns:** `Promise`<`string`>

___
<a id="scrapetable"></a>

### `<Const>` scrapeTable

▸ **scrapeTable**(page: *`Page`*): `Promise`<[StringMap](../interfaces/_client_mugshots_scrapemugshot_.stringmap.md)>

*Defined in [client/mugshots/scrapeMugshot.ts:17](https://github.com/agaricide/mugshots-client/blob/ddd2d5c/src/client/mugshots/scrapeMugshot.ts#L17)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| page | `Page` |

**Returns:** `Promise`<[StringMap](../interfaces/_client_mugshots_scrapemugshot_.stringmap.md)>

___

