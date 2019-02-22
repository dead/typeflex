# typeflex

[![CircleCI](https://circleci.com/gh/dead/typeflex/tree/master.svg?style=svg)](https://circleci.com/gh/dead/typeflex/tree/master)
[![NPM](https://nodei.co/npm/typeflex.png?mini=true)](https://nodei.co/npm/typeflex/)

Typescript implementation of CSS flexbox layout algorithm, a pure typescript port of Facebook's Yoga.

## Status

- Fully compatible with Yoga javascript API.
- Passing all tests.

## Why?

The main reason of this port is to be able to run Yoga in older devices that don't support asm.js and WebAssembly.

~~And it is possible to compile it to WebAssembly using [AssemblyScript](https://github.com/AssemblyScript/assemblyscript).~~ (not yet)

This was inspired by https://github.com/kjk/flex (golang yoga port)
