[mugshots-client](../README.md) > ["client/counties/CountyIterable"](../modules/_client_counties_countyiterable_.md)

# External module: "client/counties/CountyIterable"

## Index

### Variables

* [ORIGIN](_client_counties_countyiterable_.md#origin)

### Functions

* [CountyIterable](_client_counties_countyiterable_.md#countyiterable)
* [CountyIterator](_client_counties_countyiterable_.md#countyiterator)
* [format](_client_counties_countyiterable_.md#format)
* [getCounties](_client_counties_countyiterable_.md#getcounties)
* [getStates](_client_counties_countyiterable_.md#getstates)
* [scrapeCountyHrefs](_client_counties_countyiterable_.md#scrapecountyhrefs)
* [scrapeStateHrefs](_client_counties_countyiterable_.md#scrapestatehrefs)
* [toCounty](_client_counties_countyiterable_.md#tocounty)
* [toState](_client_counties_countyiterable_.md#tostate)

---

## Variables

<a id="origin"></a>

### `<Const>` ORIGIN

**● ORIGIN**: *"https://mugshots.com"* = "https://mugshots.com"

*Defined in [client/counties/CountyIterable.ts:5](https://github.com/agaricide/mugshots-client/blob/ddd2d5c/src/client/counties/CountyIterable.ts#L5)*

___

## Functions

<a id="countyiterable"></a>

### `<Const>` CountyIterable

▸ **CountyIterable**(page: *`Page`*): `Promise`<`object`>

*Defined in [client/counties/CountyIterable.ts:75](https://github.com/agaricide/mugshots-client/blob/ddd2d5c/src/client/counties/CountyIterable.ts#L75)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| page | `Page` |

**Returns:** `Promise`<`object`>

___
<a id="countyiterator"></a>

### `<Const>` CountyIterator

▸ **CountyIterator**(page: *`Page`*): `Promise`<`AsyncIterableIterator`<[County](../interfaces/_client_types_county_.county.md)>>

*Defined in [client/counties/CountyIterable.ts:63](https://github.com/agaricide/mugshots-client/blob/ddd2d5c/src/client/counties/CountyIterable.ts#L63)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| page | `Page` |

**Returns:** `Promise`<`AsyncIterableIterator`<[County](../interfaces/_client_types_county_.county.md)>>

___
<a id="format"></a>

### `<Const>` format

▸ **format**(str: *`string`*): `string`

*Defined in [client/counties/CountyIterable.ts:26](https://github.com/agaricide/mugshots-client/blob/ddd2d5c/src/client/counties/CountyIterable.ts#L26)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| str | `string` |

**Returns:** `string`

___
<a id="getcounties"></a>

### `<Const>` getCounties

▸ **getCounties**(page: *`Page`*, state: *[State](../interfaces/_client_types_state_.state.md)*): `Promise`<[County](../interfaces/_client_types_county_.county.md)[]>

*Defined in [client/counties/CountyIterable.ts:52](https://github.com/agaricide/mugshots-client/blob/ddd2d5c/src/client/counties/CountyIterable.ts#L52)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| page | `Page` |
| state | [State](../interfaces/_client_types_state_.state.md) |

**Returns:** `Promise`<[County](../interfaces/_client_types_county_.county.md)[]>

___
<a id="getstates"></a>

### `<Const>` getStates

▸ **getStates**(page: *`Page`*): `Promise`<[State](../interfaces/_client_types_state_.state.md)[]>

*Defined in [client/counties/CountyIterable.ts:44](https://github.com/agaricide/mugshots-client/blob/ddd2d5c/src/client/counties/CountyIterable.ts#L44)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| page | `Page` |

**Returns:** `Promise`<[State](../interfaces/_client_types_state_.state.md)[]>

___
<a id="scrapecountyhrefs"></a>

### `<Const>` scrapeCountyHrefs

▸ **scrapeCountyHrefs**(page: *`Page`*): `Promise`<`string`[]>

*Defined in [client/counties/CountyIterable.ts:30](https://github.com/agaricide/mugshots-client/blob/ddd2d5c/src/client/counties/CountyIterable.ts#L30)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| page | `Page` |

**Returns:** `Promise`<`string`[]>

___
<a id="scrapestatehrefs"></a>

### `<Const>` scrapeStateHrefs

▸ **scrapeStateHrefs**(page: *`Page`*): `Promise`<`string`[]>

*Defined in [client/counties/CountyIterable.ts:37](https://github.com/agaricide/mugshots-client/blob/ddd2d5c/src/client/counties/CountyIterable.ts#L37)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| page | `Page` |

**Returns:** `Promise`<`string`[]>

___
<a id="tocounty"></a>

### `<Const>` toCounty

▸ **toCounty**(path: *`string`*): [County](../interfaces/_client_types_county_.county.md) \| `null`

*Defined in [client/counties/CountyIterable.ts:7](https://github.com/agaricide/mugshots-client/blob/ddd2d5c/src/client/counties/CountyIterable.ts#L7)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| path | `string` |

**Returns:** [County](../interfaces/_client_types_county_.county.md) \| `null`

___
<a id="tostate"></a>

### `<Const>` toState

▸ **toState**(path: *`string`*): [State](../interfaces/_client_types_state_.state.md)

*Defined in [client/counties/CountyIterable.ts:19](https://github.com/agaricide/mugshots-client/blob/ddd2d5c/src/client/counties/CountyIterable.ts#L19)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| path | `string` |

**Returns:** [State](../interfaces/_client_types_state_.state.md)

___

