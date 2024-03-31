import { describe, bench } from 'vitest'
import { uuidv1, uuidv4 } from '../src'
import { randomBytes, getRandomValues } from '../src/polyfill'

describe('uuid generation', () => {
  bench('uuid v1', () => {
    uuidv1()
  })

  bench('uuid v4', () => {
    uuidv4()
  })
})

describe('polyfills', () => {
  bench('getRandomValues', () => {
    getRandomValues(new Uint8Array(16))
  })

  bench('randomBytes', () => {
    randomBytes(32)
  })
})
