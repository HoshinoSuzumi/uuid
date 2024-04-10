# @uniiem/uuid

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/HoshinoSuzumi/uuid/ci.yml)
![NPM Downloads](https://img.shields.io/npm/dm/%40uniiem%2Fuuid)
![NPM Version (with dist tag)](https://img.shields.io/npm/v/%40uniiem%2Fuuid/latest)
![npm bundle size](https://img.shields.io/bundlephobia/min/%40uniiem%2Fuuid)
![GitHub License](https://img.shields.io/github/license/HoshinoSuzumi/uuid)

Fast UUID Generator for TypeScript/JavaScript

## Usage

```bash
npm i @uniiem/uuid
```

```typescript
import { NIL, uuidv1, uuidv4 } fromo '@uniiem/uuid';

console.log(NIL);       // 00000000-0000-0000-0000-000000000000
console.log(uuidv1());  // fbc0f1a0-ef67-11ee-9e13-396902bb4dbf
console.log(uuidv4());  // 301d3087-1961-41d6-992d-66fe1b5fee49
```

## APIs

### `NIL`

```typescript
/**
 * Represents a nil UUID.
 */
const NIL: string;
```

### `uuidv1([options[], buf, offset])`

```typescript
/**
 * Generate a version 1 UUID.
 */
const uuidv1: (options?: UUIDv1Options, buf?: Uint8Array, offset?: number) => UUID;

interface UUIDv1Options {
    node_id?: Uint8Array;
    clock_sequence?: number;
    millsecs?: number;
    nanosecs?: number;
    seed?: Uint8Array;
}
```

### `uuidv4()`

```typescript
/**
 * Generate a version 4 UUID.
 */
const uuidv4: () => UUID;
```

## Benchmark

```bash
  name             hz     min     max    mean     p75     p99    p995    p999     rme  samples
· uuid v1  308,696.40  0.0025  0.8270  0.0032  0.0029  0.0067  0.0126  0.0535  ±1.42%   154349
· uuid v4  319,743.17  0.0023  8.6766  0.0031  0.0027  0.0069  0.0128  0.0241  ±5.44%   159872
```
