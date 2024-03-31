const hexByte = (b: number): string => b.toString(16).padStart(2, '0')


const unverifiedStringifyUUID = (arr: Uint8Array, offset: number = 0): string => {
  return (
    hexByte(arr[offset++]) +
    hexByte(arr[offset++]) +
    hexByte(arr[offset++]) +
    hexByte(arr[offset++]) +
    '-' +
    hexByte(arr[offset++]) +
    hexByte(arr[offset++]) +
    '-' +
    hexByte(arr[offset++]) +
    hexByte(arr[offset++]) +
    '-' +
    hexByte(arr[offset++]) +
    hexByte(arr[offset++]) +
    '-' +
    hexByte(arr[offset++]) +
    hexByte(arr[offset++]) +
    hexByte(arr[offset++]) +
    hexByte(arr[offset++]) +
    hexByte(arr[offset++]) +
    hexByte(arr[offset++])
  ).toLowerCase()
}

export { unverifiedStringifyUUID }
