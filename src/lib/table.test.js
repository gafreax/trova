import { maxColumnLen } from "./table.js";

describe('table.js', () => {
    describe('maxColumnLen', () => {
        test('to be the longest decription field', () => {
            const max = maxColumnLen([{description: 'test'},{description: 'test2'}])
            expect(max).toBe(5);
        })
    })
})