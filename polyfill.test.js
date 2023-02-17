const polyfill = require('./polyfill.js')
//push tests
describe(".push method tests", () => {
    it('.push method should be defined', () => {
        expect(polyfill.push).toBeDefined();
    });
    it("Should return 'Error' if first argument type is not an array", () => {
        const testing = polyfill.push(undefined);
        expect(testing).toBeInstanceOf(Error);
        expect(testing.message).toBe('not an array')
    });
    it('Should push element into an array', () => {
        expect(polyfill.push([1,2,3],4)).toStrictEqual([1,2,3,4])
    });
});

//slice tests
describe(".slice method tests", () => {
    it('.slice method should be defined', () => {
        expect(polyfill.slice()).toBeDefined();
    });
    it("Should return 'Error' if first argument type is not an array", () => {
        const testing = polyfill.slice(undefined);
        expect(testing).toBeInstanceOf(Error);
        expect(testing.message).toBe('not an array')
    });
    it('Should slice array from index: 1', () => {
        expect(polyfill.slice([1,2,3],1)).toStrictEqual([2,3]);
    });
});
