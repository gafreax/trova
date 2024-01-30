import { ellipsys } from "./text.js"

describe('text.js', () => {
  describe("ellipsys", () => {
    test('return truncated first word if len < lenght of the first word', () => {
      const phrase = 'Next tick shim that prefers process.nextTick over queueMicrotask for compat'
      const truncated = ellipsys(phrase, 3)
      expect(truncated).toBe('Nex...')
    })
    test('ellipsys return original string if its length < len', () => {
      const phrase = 'Next'
      const notTruncated = ellipsys(phrase, 10)
      expect(notTruncated).toBe(phrase)
    })
    test('ellipsys return truncated string at last space if its lenght > len and len > fisrt space position ', () => {
      const phrase = 'Next tick shim that prefers process.nextTick over queueMicrotask for compa'
      const truncatedLastSpace = ellipsys(phrase, 17)
      expect(truncatedLastSpace).toBe('Next tick shim...')
    })
  })
})
