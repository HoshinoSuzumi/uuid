# @ctfever/uuid

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/HoshinoSuzumi/uuid/ci.yml)
![NPM Downloads](https://img.shields.io/npm/dm/%40ctfever%2Fuuid)
![NPM Version (with dist tag)](https://img.shields.io/npm/v/%40ctfever%2Fuuid/latest)
![npm bundle size](https://img.shields.io/bundlephobia/min/%40ctfever%2Fuuid)
![GitHub License](https://img.shields.io/github/license/HoshinoSuzumi/uuid)

Fast UUID Generator for TypeScript/JavaScript

## Usage

```bash
npm i @ctfever/uuid
```

```typescript
import { NIL, uuidv1, uuidv4 } fromo '@ctfever/uuid';

console.log(NIL);       // 00000000-0000-0000-0000-000000000000
console.log(uuidv1());  // fbc0f1a0-ef67-11ee-9e13-396902bb4dbf
console.log(uuidv4());  // 301d3087-1961-41d6-992d-66fe1b5fee49
```

## API

### `NIL`

```typescript
/**
 * Represents a nil UUID.
 */
const NIL: string;
```

### `uuidv1`

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

### `uuidv4`

```typescript
/**
 * Generate a version 4 UUID.
 */
const uuidv4: (buf?: Uint8Array, offset?: number) => UUID;
```
