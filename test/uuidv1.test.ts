import { describe, it, expect } from "vitest";
import { uuidv1 } from '../src/v1'
import { unverifiedStringifyUUID } from "../src/utils";

const v1regex = /^[0-9A-F]{8}-[0-9A-F]{4}-1[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

describe('v1 generation', () => {
  it('random generation', () => {
    const uuid = uuidv1()
    expect(typeof uuid).toBe('string')
    expect(uuid).toMatch(v1regex)
  })

  it('with seed', () => {
    const uuid = uuidv1({ seed: new Uint8Array(16) })
    expect(typeof uuid).toBe('string')
    expect(uuid).toMatch(v1regex)
  })

  it('with node_id', () => {
    const uuid = uuidv1({ node_id: new Uint8Array(6) })
    expect(typeof uuid).toBe('string')
    expect(uuid).toMatch(v1regex)
  })

  it('with clock_sequence', () => {
    const uuid = uuidv1({ clock_sequence: 0x3fff })
    expect(typeof uuid).toBe('string')
    expect(uuid).toMatch(v1regex)
  })

  it('with millsecs', () => {
    const uuid = uuidv1({ millsecs: 0 })
    expect(typeof uuid).toBe('string')
    expect(uuid).toMatch(v1regex)
  })

  it('with nanosecs', () => {
    const uuid = uuidv1({ nanosecs: 0 })
    expect(typeof uuid).toBe('string')
    expect(uuid).toMatch(v1regex)
  })

  it('with buffer', () => {
    const buf = new Array(16)
    uuidv1(undefined, buf, 0)
    expect(buf).toHaveLength(16)
    expect(unverifiedStringifyUUID(buf)).toMatch(v1regex)
  })

  it('with fixed options', () => {
    const node_id = Uint8Array.from([194, 218, 177, 170, 33, 225])
    const seed = Uint8Array.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])

    const uuid = uuidv1({
      seed,
      node_id,
      clock_sequence: 0x3fff,
      millsecs: 1000,
      nanosecs: 1000
    })
    const regex = /^[0-9A-F]{8}-[0-9A-F]{4}-11[0-9A-F]{2}-bfff-c2dab1aa21e1$/i

    expect(typeof uuid).toBe('string')
    expect(uuid).toMatch(v1regex)
    expect(uuid).toMatch(regex)
  })
})
