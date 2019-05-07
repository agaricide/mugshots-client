[mugshots-client](../README.md) > ["client/mugshots/MugshotUrlIterable"](../modules/_client_mugshots_mugshoturliterable_.md)

# External module: "client/mugshots/MugshotUrlIterable"

## Index

### Functions

* [MugshotUrlChunkIterable](_client_mugshots_mugshoturliterable_.md#mugshoturlchunkiterable)
* [MugshotUrlChunkIterator](_client_mugshots_mugshoturliterable_.md#mugshoturlchunkiterator)
* [MugshotUrlIterable](_client_mugshots_mugshoturliterable_.md#mugshoturliterable)
* [MugshotUrlIterator](_client_mugshots_mugshoturliterable_.md#mugshoturliterator)
* [is404](_client_mugshots_mugshoturliterable_.md#is404)
* [scrapeMugshotUrls](_client_mugshots_mugshoturliterable_.md#scrapemugshoturls)
* [scrapeNextCountyPage](_client_mugshots_mugshoturliterable_.md#scrapenextcountypage)

---

## Functions

<a id="mugshoturlchunkiterable"></a>

### `<Const>` MugshotUrlChunkIterable

▸ **MugshotUrlChunkIterable**(page: *`Page`*, county: *[County](../interfaces/_client_types_county_.county.md)*): `Promise`<`object`>

*Defined in [client/mugshots/MugshotUrlIterable.ts:58](https://github.com/agaricide/mugshots-client/blob/63bcee9/src/client/mugshots/MugshotUrlIterable.ts#L58)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| page | `Page` |
| county | [County](../interfaces/_client_types_county_.county.md) |

**Returns:** `Promise`<`object`>

___
<a id="mugshoturlchunkiterator"></a>

### `<Const>` MugshotUrlChunkIterator

▸ **MugshotUrlChunkIterator**(page: *`Page`*, county: *[County](../interfaces/_client_types_county_.county.md)*): `Promise`<`AsyncIterableIterator`<`string`[]>>

*Defined in [client/mugshots/MugshotUrlIterable.ts:37](https://github.com/agaricide/mugshots-client/blob/63bcee9/src/client/mugshots/MugshotUrlIterable.ts#L37)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| page | `Page` |
| county | [County](../interfaces/_client_types_county_.county.md) |

**Returns:** `Promise`<`AsyncIterableIterator`<`string`[]>>

___
<a id="mugshoturliterable"></a>

### `<Const>` MugshotUrlIterable

▸ **MugshotUrlIterable**(page: *`Page`*, county: *[County](../interfaces/_client_types_county_.county.md)*): `Promise`<`object`>

*Defined in [client/mugshots/MugshotUrlIterable.ts:50](https://github.com/agaricide/mugshots-client/blob/63bcee9/src/client/mugshots/MugshotUrlIterable.ts#L50)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| page | `Page` |
| county | [County](../interfaces/_client_types_county_.county.md) |

**Returns:** `Promise`<`object`>

___
<a id="mugshoturliterator"></a>

### `<Const>` MugshotUrlIterator

▸ **MugshotUrlIterator**(page: *`Page`*, county: *[County](../interfaces/_client_types_county_.county.md)*): `Promise`<`AsyncIterableIterator`<`string`>>

*Defined in [client/mugshots/MugshotUrlIterable.ts:23](https://github.com/agaricide/mugshots-client/blob/63bcee9/src/client/mugshots/MugshotUrlIterable.ts#L23)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| page | `Page` |
| county | [County](../interfaces/_client_types_county_.county.md) |

**Returns:** `Promise`<`AsyncIterableIterator`<`string`>>

___
<a id="is404"></a>

### `<Const>` is404

▸ **is404**(page: *`Page`*): `Promise`<`boolean`>

*Defined in [client/mugshots/MugshotUrlIterable.ts:18](https://github.com/agaricide/mugshots-client/blob/63bcee9/src/client/mugshots/MugshotUrlIterable.ts#L18)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| page | `Page` |

**Returns:** `Promise`<`boolean`>

___
<a id="scrapemugshoturls"></a>

### `<Const>` scrapeMugshotUrls

▸ **scrapeMugshotUrls**(page: *`Page`*): `Promise`<`string`[]>

*Defined in [client/mugshots/MugshotUrlIterable.ts:4](https://github.com/agaricide/mugshots-client/blob/63bcee9/src/client/mugshots/MugshotUrlIterable.ts#L4)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| page | `Page` |

**Returns:** `Promise`<`string`[]>

___
<a id="scrapenextcountypage"></a>

### `<Const>` scrapeNextCountyPage

▸ **scrapeNextCountyPage**(page: *`Page`*): `Promise`<`string`>

*Defined in [client/mugshots/MugshotUrlIterable.ts:11](https://github.com/agaricide/mugshots-client/blob/63bcee9/src/client/mugshots/MugshotUrlIterable.ts#L11)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| page | `Page` |

**Returns:** `Promise`<`string`>

___

