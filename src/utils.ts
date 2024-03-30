const unverifiedStringifyUUID = (arr: number[]): string => {
  const hex = arr.map(b => b.toString(16).padStart(2, '0')).join('')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-1${hex.slice(13, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

export { unverifiedStringifyUUID }
