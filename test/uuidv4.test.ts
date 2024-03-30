import { test, expect } from 'vitest'
import { uuidv4 } from '../src/v4'

const v4regex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

test('v4 generation', () => {
  const uuid = uuidv4()
  expect(typeof uuid).toBe('string')
  expect(uuid).toMatch(v4regex)
})
