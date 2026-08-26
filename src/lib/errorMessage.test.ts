import { expect, test } from 'bun:test'
import { readableError } from './errorMessage'

test('extracts message from a Gemini error payload', () => {
  const raw =
    '{"error":{"code":403,"message":"Method doesn\'t allow unregistered callers.","status":"PERMISSION_DENIED"}}'
  expect(readableError(raw)).toBe("Method doesn't allow unregistered callers.")
})

test('unescapes embedded quotes', () => {
  expect(readableError('{"message":"said \\"hi\\""}')).toBe('said "hi"')
})

test('passes through plain text', () => {
  expect(readableError('fetch failed')).toBe('fetch failed')
})
