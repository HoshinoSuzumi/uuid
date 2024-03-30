import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'
import { getRandomValues, randomBytes } from '../src/polyfill'

describe('getRandomValues', () => {
  it('is defined and callable', () => {
    expect(getRandomValues).toBeDefined()
    expect(getRandomValues).toBeInstanceOf(Function)
  })

  it('generates random values into a buffer', () => {
    let buf = new Uint8Array(10)
    getRandomValues(buf)
    expect(buf).toHaveLength(10)
    expect(buf).toBeInstanceOf(Uint8Array)
    expect(buf).not.toEqual(new Uint8Array(10))
  })

  describe('polyfill', () => {
    let _crypto: any
    beforeAll(() => {
      _crypto = globalThis.crypto
      vi.stubGlobal('crypto', undefined)
    })

    it('is defined and callable', () => {
      expect(getRandomValues).toBeDefined()
      expect(getRandomValues).toBeInstanceOf(Function)
    })

    it('generates random values into a buffer', () => {
      let buf = new Uint8Array(10)
      getRandomValues(buf)
      expect(buf).toHaveLength(10)
      expect(buf).toBeInstanceOf(Uint8Array)
      expect(buf).not.toEqual(new Uint8Array(10))
    })

    afterAll(() => {
      globalThis.crypto = _crypto
    })
  })
})

describe('randomBytes', () => {
  it('generate random bytes into a buffer', () => {
    const buf = randomBytes(10)
    expect(buf).toHaveLength(10)
    expect(buf).toBeInstanceOf(Uint8Array)
    expect(buf).not.toEqual(new Uint8Array(10))
  })

  it('generate random bytes with a callback', () => {
    randomBytes(10, (err, buf) => {
      expect(err).toBeNull()
      expect(buf).toHaveLength(10)
      expect(buf).toBeInstanceOf(Uint8Array)
      expect(buf).not.toEqual(new Uint8Array(10))
    })
  })

  describe('polyfill', () => {
    let _crypto: any
    beforeAll(() => {
      _crypto = globalThis.crypto
      vi.stubGlobal('crypto', undefined)
    })

    it('generate random bytes into a buffer', () => {
      const buf = randomBytes(10)
      expect(buf).toHaveLength(10)
      expect(buf).toBeInstanceOf(Uint8Array)
      expect(buf).not.toEqual(new Uint8Array(10))
    })

    it('generate random bytes with a callback', () => {
      randomBytes(10, (err, buf) => {
        expect(err).toBeNull()
        expect(buf).toHaveLength(10)
        expect(buf).toBeInstanceOf(Uint8Array)
        expect(buf).not.toEqual(new Uint8Array(10))
      })
    })
    
    afterAll(() => {
      globalThis.crypto = _crypto
    })
  })
})