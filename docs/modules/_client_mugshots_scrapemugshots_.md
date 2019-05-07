[mugshots-client](../README.md) > ["client/mugshots/scrapeMugshots"](../modules/_client_mugshots_scrapemugshots_.md)

# External module: "client/mugshots/scrapeMugshots"

## Index

### Interfaces

* [ScrapeOptions](../interfaces/_client_mugshots_scrapemugshots_.scrapeoptions.md)

### Functions

* [scrapeMugshots](_client_mugshots_scrapemugshots_.md#scrapemugshots)

### Object literals

* [defaults](_client_mugshots_scrapemugshots_.md#defaults)

---

## Functions

<a id="scrapemugshots"></a>

###  scrapeMugshots

▸ **scrapeMugshots**(pagePool: *`Pool`<`Page`>*, urls: *`string`[]*, opts?: *[ScrapeOptions](../interfaces/_client_mugshots_scrapemugshots_.scrapeoptions.md)*): `Promise`<[Mugshot](../interfaces/_client_types_mugshot_.mugshot.md)[]>

*Defined in [client/mugshots/scrapeMugshots.ts:13](https://github.com/agaricide/mugshots-client/blob/63bcee9/src/client/mugshots/scrapeMugshots.ts#L13)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| pagePool | `Pool`<`Page`> | - |
| urls | `string`[] | - |
| `Default value` opts | [ScrapeOptions](../interfaces/_client_mugshots_scrapemugshots_.scrapeoptions.md) |  {} |

**Returns:** `Promise`<[Mugshot](../interfaces/_client_types_mugshot_.mugshot.md)[]>

___

## Object literals

<a id="defaults"></a>

### `<Const>` defaults

**defaults**: *`object`*

*Defined in [client/mugshots/scrapeMugshots.ts:9](https://github.com/agaricide/mugshots-client/blob/63bcee9/src/client/mugshots/scrapeMugshots.ts#L9)*

<a id="defaults.maxchunksize"></a>

####  maxChunkSize

**● maxChunkSize**: *`number`* = 100

*Defined in [client/mugshots/scrapeMugshots.ts:10](https://github.com/agaricide/mugshots-client/blob/63bcee9/src/client/mugshots/scrapeMugshots.ts#L10)*

___

___

