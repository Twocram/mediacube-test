import { pluralizeText } from '../../../utils/textUtils'
import { describe, it, expect } from 'vitest'
describe('pluralizeText', () => {
  it('returns the correct text for a single item', () => {
    expect(pluralizeText(1, 'cat')).toBe('cat')
  })

  it('returns the correct text for multiple items', () => {
    expect(pluralizeText(2, 'cat')).toBe('cats')
  })

  it('returns the correct text for zero items', () => {
    expect(pluralizeText(0, 'cat')).toBe('cats')
  })

  it('handles non-integer counts', () => {
    expect(pluralizeText(1.5, 'cat')).toBe('cats')
  })

  it('handles negative counts', () => {
    expect(pluralizeText(-1, 'cat')).toBe('cat')
  })

  it('handles empty text', () => {
    expect(pluralizeText(1, '')).toBe('')
  })
})
