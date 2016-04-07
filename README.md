# co-ramda-utils

[![Travis](https://img.shields.io/travis/panosoft/co-ramda-utils.svg)](https://travis-ci.org/panosoft/co-ramda-utils)

Utilities built on top of **co** and **Ramda** to support common functional iterators with generators as callbacks instead of simple functions.

## Installation

```sh
npm install @panosoft/co-ramda-utils
```

## Usage

```js
var cRu = require('@panosoft/co-ramda-utils');
```

## API

- [`filterG`](#filterG)
- [`forEachG`](#forEachG)
- [`mapG`](#mapG)
- [`reduceG`](#reduceG)

---

<a name="filterG"></a>
### filterG(genFn, list)

Filter a list where the predicate is an **async** function.

__Arguments__

- `genFn` - A Generator Function that's a predicate which may ONLY yield a [`yieldable`](https://github.com/tj/co#yieldables).
- `list` - List to filter.

__Returns__

A filtered list.

__Example__

In this example, the `Promise.resolve(item % 2)` would normally be an async function that yields a Promise.

```js

yield cRu.filterG(function* (item) {
	return yield Promise.resolve(item % 2);
}, [1, 2, 3, 4, 5, 6])); // [1, 3, 5]

```

---

<a name="forEachG"></a>
### forEachG(genFn, list)

Iterator over a list where callback is an async function and iteration **must** be done in order.

To execute the iteration in parallel, `R.map` could be used to return a list of Promises which would be yielded to `co.wrap` which will wait for all Promises to be resolved.

__Arguments__

- `genFn` - A Generator Function which may ONLY yield a [`yieldable`](https://github.com/tj/co#yieldables).
- `list` - List to iterate over.

__Example__

In this example, the `Promise.resolve(item)` would normally be an async function that yields a Promise.

```js

var i = 0;
yield cRu.forEachG(function* (item) {
	i = yield Promise.resolve(item);
}, [1, 2, 3]); // i = 3

```

---

<a name="mapG"></a>
### mapG(genFn, list)

Map over a list where callback is an async function and iteration **must** be done in order.

To execute the iteration in parallel, `R.map` could be used to return a list of Promises which would be yielded to `co.wrap` which will wait for all Promises to be resolved returning the final mapped list.

__Arguments__

- `genFn` - A Generator Function which may ONLY yield a [`yieldable`](https://github.com/tj/co#yieldables).
- `list` - List to map over.

__Returns__

A list of the same size.

__Example__

In this example, the `Promise.resolve(item)` would normally be an async function that yields a Promise.

```js

cRu.mapG(function* (item) {
	return (yield Promise.resolve(item)) * 10;
}, [1, 2, 3])); // [10, 20, 30]

```
---

<a name="reduceG"></a>
### reduceG(genFn, acc, list)

Reduce list where callback is an async function.

__Arguments__

- `genFn` - A Generator Function which may ONLY yield a [`yieldable`](https://github.com/tj/co#yieldables).
- `acc` - Initial accumulator value.
- `list` - List to map over.

__Returns__

The final accumulator.

__Example__

In this example, the `Promise.resolve(item)` would normally be an async function that yields a Promise.

```js

cRu.reduceG(function* (acc, item) {
	return acc + (yield Promise.resolve(item));
}, 0, [1, 2, 3])); // 6
```

---
