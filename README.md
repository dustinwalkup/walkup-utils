# @walkup/walkup-utils

[![npm version](https://img.shields.io/npm/v/@walkup/walkup-utils.svg)](https://www.npmjs.com/package/@walkup/walkup-utils) [![Build Status](https://github.com/dustinwalkup/walkup-utils/actions/workflows/ci.yml/badge.svg)](https://github.com/dustinwalkup/walkup-utils/actions) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A lightweight, TypeScript-first collection of essential utility functions for modern web development.  
Currently includes a resilient `tryCatch` helper for wrapping `Promise` calls into a safe `Result<T, E>` union.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
  - [`debounce`](#debounce)
  - [`tryCatch`](#trycatch)
  - [Types](#types)
- [Development](#development)
  - [Build](#build)
  - [Testing](#testing)
  - [Linting & Formatting](#linting--formatting)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)
- [Author](#author)

---

## Installation

```bash
npm install @walkup/walkup-utils
# or
yarn add @walkup/walkup-utils
# or
pnpm add @walkup/walkup-utils
# or
bun add @walkup/walkup-utils
```

## Usage

```ts
import { debounce, tryCatch } from '@walkup/walkup-utils';

// Debounce example:
const onResize = debounce(() => {
  console.log(`Resized to: ${window.innerWidth}×${window.innerHeight}`);
}, 200);
window.addEventListener('resize', onResize);

// tryCatch example:
async function main() {
  const result = await tryCatch(
    fetch('https://example.com').then((r) => r.json())
  );

  if (result.data) {
    console.log('Success:', result.data);
  } else {
    console.error('Error:', result.error);
  }
}
```

## API Reference

### `debounce`

Creates a debounced version of the provided function, delaying its invocation until after a specified wait time has elapsed since the last call.

#### Parameters

| Name   | Type     | Description                                                          |
| :----- | :------- | :------------------------------------------------------------------- |
| `fn`   | `F`      | The function to debounce; invoked with the last arguments after wait |
| `wait` | `number` | Milliseconds to wait after the last call before invoking `fn`.       |

#### Returns

`(...args: Parameters<F>) => void` A debounced wrapper around fn that returns void.

---

### `tryCatch`

Wraps any promise and returns a `Result<T, E>` instead of throwing.

#### Type Parameters

| Name | Type    | Default |
| :--- | :------ | :------ |
| `T`  | `any`   | `any`   |
| `E`  | `Error` | `Error` |

#### Parameters

| Name      | Type            | Description                  |
| :-------- | :-------------- | :--------------------------- |
| `promise` | `Promise`<`T`\> | A Promise that resolves to T |

#### Returns

`Promise`<[`Result`](#types)<`T`, `E`\>\>

---

### Types

#### `Success`

| Name    | Type   |
| :------ | :----- |
| `data`  | `T`    |
| `error` | `null` |

#### `Failure`

| Name    | Type   |
| :------ | :----- |
| `data`  | `null` |
| `error` | `E`    |

#### `Result`

The discriminated union `Result<T, E>`
– either a `Success<T>` or a `Failure<E>` (defaults to `Error`)

| Name | Type    |
| :--- | :------ |
| `T`  | `any`   |
| `E`  | `Error` |

---

## Development

### Build

```bash
npm run build
```

### Testing

```bash
npm run test
```

### Linting & Formatting

```bash
npm run lint
npm run format
```

## Contributing

Contributions are welcome! Please:

Fork the repository.

Create a feature branch (git checkout -b feat/my-helper).

Add your utility under src/, write accompanying tests and update src/index.ts.

Run npm test && npm run build to ensure everything passes.

Open a pull request against the main branch, describing your changes.

Please adhere to the existing code style and add unit tests for any new functionality.

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## License

MIT License.  
Copyright (c) 2023 Dustin Walkup

## Author

👤 **Dustin Walkup**

- Website: https://dustinwalkup.com
- Github: [@dustinwalkup](https://github.com/dustinwalkup)
- LinkedIn: [@dustinwalkup](https://linkedin.com/in/dustinwalkup)

---

Made with [contributors-img](https://contrib.rocks).  
This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
