const array = require('./array.js');

const mockCallback = jest.fn(x => x !== 5);

// chunk tests
test('check that a function returns something ', () => {
    expect(array.chunk).toBeDefined()
})

test('parameter should be an array ', function () {
    expect(array.chunk({},2)).toEqual('not an array')
});

describe('Returns the new array of chunks', () => {
    it.each([
        [['a','b','c','d'], 2, [['a','b'],['c','d']]],
        [['a','b','c','d', 'e'], 3, [['a','b','c'], ['d','e']]],
        [['a','b','c','d', 'e'], 0, ['a','b','c','d', 'e']],
        [['a','b','c','d','e','f','g','h'], 2, [['a','b'],['c','d'],['e','f'],['g','h']]]
    ])(`takes : %O with chunk size: %i and returns : %O `,
        (x,y, result) => {
        expect(array.chunk(x,y)).toEqual(result)
        })
})

// compact tests
describe('Creates an array with all falsey values removed', () => {
    it.each([
        [[false,1,2,NaN,0],[1,2]],
        [[1,2,3,4,5],[1,2,3,4,5]],
        [['this', NaN, "won't", false, 'affect'], ['this', "won't", 'affect']]
    ])(`%O => %O`,
        (x,result) => {
            expect(array.compact(x)).toEqual(result)
        })
})

test('parameter should be an array ', function () {
    expect(array.compact({})).toEqual('not an array')
});


// drop tests
describe('Creates a slice of array with n elements dropped from the beginning.', () => {
    it.each([
        [[1,2,3],0,[1,2,3]],
        [[1,2,3,4,5],1,[2,3,4,5]],
        [[1,2,3,4,5],2,[3,4,5]],
        [[1,2,3,4,5],3,[4,5]],
        [[1,2,3,4,5],6,[]]
    ])(`input %O drops: %i element(s) become %O`,
        (x,y,result) => {
            expect(array.drop(x,y)).toEqual(result)
        })
})

test(`input [1,2,3] default value drops 1 element(s) become [2,3]`, function () {
    expect(array.drop([1,2,3])).toEqual([2,3])
});

test('parameter should be an array ', function () {
    expect(array.drop({})).toEqual('not an array')
});

// dropWhile tests
test('Check for working callback function', () =>{

    array.dropWhile([1,2,3,5,5,6], mockCallback);

    expect(mockCallback.mock.calls).toHaveLength(4);
    // unuseful
    expect(mockCallback.mock.results[0].value).toBe(true);
})

describe('Creates a slice of array excluding elements dropped from the beginning. ' +
    'Elements are dropped until predicate returns falsey. ', () => {
    it.each([
        [[1,2,3,3,5,5,6],[5,5,6],(x) =>x !== 5],
        [[1,2,3,4,5],[4,5],(x) =>x !== 4],
    ])(` %O => %O`,
        (x,result,y) => {
            expect(array.dropWhile(x,y)).toEqual(result)
        })
})

// take tests

describe("Creates a slice of array with n elements taken from the beginning.", () => {
    it.each([
        [[1,2,3],1,[1]],
        [[1,2,3],2,[1,2]],
        [[1,2,3],5,[1,2,3]],
        [[1,2,3],0,[]],
    ])(` (%O , %O) =>  %O`,
        (x,y,result) => {
            expect(array.take(x,y)).toEqual(result)
        })
})

describe('"take" function should pass these tests', () =>{
    it('"take" function should be defined', () => {
        expect(array.take).toBeDefined()
    })
    it('should return an error if array is undefined', ()=> {
        const testing = array.take(undefined);
        expect(testing).toBeInstanceOf(Error);
        expect(testing.message).toBe('array not defined')
    });
    it('should return an array with default n elements taken from the beginning', ()=>{
        const testing = array.take([1,2,3]);
        expect(testing).toEqual([1])
    })
})