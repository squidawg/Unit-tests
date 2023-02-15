const object = require('./object.js')

describe('This method creates an object composed of the own and inherited enumerable property' +
    ' paths of object that are not omitted.', () => {
    const testArr = [1,2,3,4,5];
    it('.omit method should be defined', () => {
        expect(object.omit).toBeDefined();
    });
    it.each([
        [{ 'a': 1, 'b': '2', 'c': 3 }, { 'b': '2' }, ['a', 'c']],
        [{ 'a': 1, 'b': '2', 'c': 3 }, { 'a': 1,'b': '2' }, ['c']],
        [{ 'a': 1, 'b': '2', 'c': 3 }, { 'b': '2','c': 3 }, ['a']],
        [{ 'a': 1, 'b': '2', 'c': 3 }, { 'b': '2','c': 3 }, 'a']
    ])('Correct for: %O , %O => %O', (x,result,y) => {
        expect(object.omit(x,y)).toEqual(result)
    });
    it.each([
        [undefined],
        [false],
        [true],
        [NaN],
        [-0]
    ])
    ('Should return { \'a\': 1, \'b\': \'2\', \'c\': 3 } for %O',(x) => {
        expect(object.omit({ 'a': 1, 'b': '2', 'c': 3 },x)).toEqual({ 'a': 1, 'b': '2', 'c': 3 });
    })
    it.each([
        [testArr, 0, { '1': 2, '2': 3, '3': 4, '4': 5 }],
        [testArr, [0,1],{ '2': 3, '3': 4, '4': 5 }],
        [testArr,[3,'5',7,8,9], { '0': 1, '1': 2, '2': 3, '4': 5 }],
        ['string',[0,3,5],{ '1': 't', '2': 'r', '4': 'n' }],
        ['string', ['1','4',0], { '2': 'r', '3': 'i', '5': 'g' }],
    ])('Correct for %O, %O => %O', (x,y,result) => {
        expect(object.omit(x,y)).toEqual(result);
    })
});
describe('this method creates an object composed of the own and inherited enumerable string keyed properties ' +
    'of object that predicate doesn\'t return truthy for', () => {
    const isBool = (e) => typeof e === "boolean";
    const isNum = (e) => typeof e === "number";
    const isString = (e) => typeof e === "string";
    const mockIsNum = jest.fn(isNum);
    const mockIsString = jest.fn(isString)
    const testObj = { 'a': 1, 'b': '2', 'c': 3 };
    const boolObj = { 'a': true, 'b': '2', 'c': true };

    it('.omitBy should be dedfined', () => {
        expect(object.omitBy).toBeDefined();
    });

    it.each([
        [testObj,{ 'b': '2' }, isNum],
        [testObj,{ 'a': 1,  'c': 3 }, isString],
        [boolObj,{ 'b': '2' }, isBool]
    ])('Correct for: %O => %O',(x,result,y) => {
        expect(object.omitBy(x,y)).toEqual(result);
    });

    it('validates callback IsNum tests', () => {
        object.omitBy(testObj,mockIsNum);
        expect(mockIsNum.mock.calls).toHaveLength(3);
        expect(mockIsNum.mock.results[1].value).toBeFalsy();
        expect(mockIsNum.mock.lastCall.value = 3);

    });
    it('validates callback IsString tests', () => {
        object.omitBy(testObj,mockIsString);
        expect(mockIsString.mock.calls).toHaveLength(3);
        expect(mockIsString.mock.results[1].value).toBeTruthy();
        expect(mockIsString.mock.lastCall.value = 3);

    });
})