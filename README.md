# typeflex

Typescript implementation of CSS flexbox layout algorithm, a pure typescript port of Facebook's Yoga.

## Status

- Fully compatible with Yoga javascript API.
- Passing all tests.

## Why?

The main reason of this port is to be able to run Yoga in older devices that don't support asm.js and WebAssembly.

And it is possible to compile it to WebAssembly using [AssemblyScript](https://github.com/AssemblyScript/assemblyscript).

This was inspired by https://github.com/kjk/flex (golang yoga port)
