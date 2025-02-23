import { colLen } from './table.js'

describe('table.js', () => {
  describe('maxColumnLen', () => {
    test('to be the longest decription field', () => {
      const max = colLen([{ package: { version: '1.0.1', name: 'foo', links: 'npm.or' } }, { package: { version: '1.0', name: 'foo bar!', links: 'npm.org' } }])
      console.dir(max)
      expect(max).toEqual({
        linkMaxLen: 7,
        nameMaxLen: 8,
        versionMaxLen: 5
      })
    })
  })
})
