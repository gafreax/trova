import { colLen } from "./table.js";

describe('table.js', () => {
    describe('maxColumnLen', () => {
        test('to be the longest decription field', () => {
            const max = colLen([{package: {version: '1.0.1', name: 'foo'}},{package: {version: '1.0', name: 'foo bar!'}}])
            console.dir(max)
            expect(max).toEqual({
                nameMaxLen: 8,
                versionMaxLen: 5
            });
        })
    })
})