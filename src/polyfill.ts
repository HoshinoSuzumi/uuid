const MAX_BYTES = 65536
const MAX_UINT32 = 4294967295

let getRandomValues: any = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || void 0

if (!getRandomValues) {
  console.warn('crypto.getRandomValues is not available. Use Math.random as fallback.')
  getRandomValues = <T extends ArrayBufferView | null>(array: T) => {
    if (array) {
      const { byteLength } = array
      for (let i = 0; i < byteLength; i++) {
        (array as any)[i] = Math.floor(Math.random() * 256);
      }
    }
  }
}

const randomBytes = (size: number, callback?: (err: Error | null, buf: Uint8Array) => void): Uint8Array => {
  if (size > MAX_UINT32) throw new RangeError('The "size" is out of range.')

  let bytes = new Uint8Array(size)
  if (size > 0) {
    if (size > MAX_BYTES) {
      for (let gen = 0; gen < size; gen += MAX_BYTES) {
        getRandomValues(bytes.subarray(gen, gen + MAX_BYTES))
      }
    } else {
      getRandomValues(bytes)
    }
  }

  if (callback) {
    callback(null, bytes)
  }

  return bytes
}

export {
  getRandomValues,
  randomBytes
}
