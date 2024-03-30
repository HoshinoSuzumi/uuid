// @inspiredBy http://docs.python.org/library/uuid.html

import { UUID, UUIDv1Options } from ".";
import { randomBytes } from "./polyfill";
import { unverifiedStringifyUUID } from "./utils";

let _node_id: number[]
let _clock_seq: number
let _last_millisec: number = 0
let _last_nanosec: number = 0

const uuidv1 = (options?: UUIDv1Options, buf?: number[], offset?: number): UUID => {
  let i = (buf && offset) || 0
  const b = buf || new Array(16)

  const seed = options?.seed || randomBytes(16)
  let node = options?.node_id || _node_id || seed.slice(0, 6).map((b, i) => i === 0 ? b | 0x01 : b)
  let clock_seq = options?.clock_sequence || _clock_seq || (_clock_seq = ((seed[6] << 8) | seed[7]) & 0x3fff)
  let millsecs = options?.millsecs || Date.now()
  let nanosecs = options?.nanosecs || _last_nanosec + 1

  const duration = millsecs - _last_millisec + (nanosecs - _last_nanosec) / 10000

  if (duration < 0 && !options?.clock_sequence) {
    clock_seq = (clock_seq + 1) & 0x3fff
  }

  if ((duration < 0 || millsecs > _last_millisec) && !options?.nanosecs) {
    nanosecs = 0
  }

  if (nanosecs >= 10000) {
    throw new Error('creation overdrive (more than 10M uuids/sec)')
  }

  _last_millisec = millsecs
  _last_nanosec = nanosecs
  _clock_seq = clock_seq

  // UUID timestamps are 100-ns intervals since the Gregorian epoch
  millsecs += 12219292800000

  // Reference: https://en.wikipedia.org/wiki/Universally_unique_identifier#Binary_wire_format
  // Time Low: 4 bytes
  const time_low = ((millsecs & 0xffffffff) * 10000 + nanosecs) % 0x100000000
  b[i++] = time_low >>> 24 & 0xff
  b[i++] = time_low >>> 16 & 0xff
  b[i++] = time_low >>> 8 & 0xff
  b[i++] = time_low & 0xff

  // Time Mid: 2 bytes
  const time_mid = (millsecs / 0x100000000 * 10000) & 0xfffffff
  b[i++] = time_mid >>> 8 & 0xff
  b[i++] = time_mid & 0xff

  // Time High and Version: 2 bytes
  b[i++] = time_mid >>> 24 & 0xf | 0x10
  b[i++] = time_mid >>> 16 & 0xff

  // Clock Sequence High and Variant & Clock Sequence Low: 2 bytes
  b[i++] = clock_seq >>> 8 | 0x80
  b[i++] = clock_seq & 0xff

  // Node ID: 6 bytes
  for (let n = 0; n < 6; n++) {
    b[i + n] = node[n]
  }

  return (buf || unverifiedStringifyUUID(b)) as UUID
}

export { uuidv1 }
