const array = require('./array.js');
const utilityFilter = require('./array.Filter.js');
const utilityFind = require('./array.Find.js');

const mockCallback = jest.fn(x => x !== 5);
const filterMockCallback = jest.fn(x => !x.active);

// chunk tests
describe('Returns the new array of chunks', () => {
    it('.chunk method should be defined', () => {
        expect(array.chunk).toBeDefined();
    })
    it.each([
        [['a','b','c','d'], 2, [['a','b'],['c','d']]],
        [['a','b','c','d', 'e'], 3, [['a','b','c'], ['d','e']]],
        [['a','b','c','d', 'e'], 0, ['a','b','c','d', 'e']],
        [['a','b','c','d','e','f','g','h'], 2, [['a','b'],['c','d'],['e','f'],['g','h']]]
    ])(`takes : %O with chunk size: %i and returns : %O `,
        (x,y, result) => {
        expect(array.chunk(x,y)).toEqual(result);
        });
    it('Check that a function returns something ', () => {
        expect(array.chunk).toBeDefined();
    });
    it('Case when call a function without args returns [] ',  () => {
        expect(array.chunk()).toStrictEqual([])
    });
    it('Case when call a function with 1 arg returns [ [ \'a\' ], [ \'b\' ], [ \'c\' ], [ \'d\' ] ] ',  () =>  {
        expect(array.chunk(['a', 'b', 'c', 'd'])).toStrictEqual([ [ 'a' ], [ 'b' ], [ 'c' ], [ 'd' ] ])
    });
});

// compact tests
describe('Creates an array with all falsy values removed', () => {
    it('.compact should be defined', () => {
        expect(array.compact).toBeDefined();
    });
    it.each([
        [[false,1,2,NaN,0],[1,2]],
        [[1,2,3,4,5],[1,2,3,4,5]],
        [['this', NaN, "won't", false, 'affect'], ['this', "won't", 'affect']]
    ])(`%O => %O`,
        (x,result) => {
            expect(array.compact(x)).toEqual(result);
        });
    it('For {} should return [] ', function () {
        expect(array.compact({})).toStrictEqual([])
    });
});

// drop tests
describe('Creates a slice of array with n elements dropped from the beginning.', () => {
    it('.drop method should be defined', () => {
        expect(array.drop).toBeDefined();
    });
    it.each([
        [[1,2,3],0,[1,2,3]],
        [[1,2,3,4,5],1,[2,3,4,5]],
        [[1,2,3,4,5],2,[3,4,5]],
        [[1,2,3,4,5],3,[4,5]],
        [[1,2,3,4,5],6,[]]
    ])(`input %O drops: %i element(s) become %O`,
        (x,y,result) => {
            expect(array.drop(x,y)).toEqual(result)
        });

    it(`input [1,2,3] default value drops 1 element(s) become [2,3]`,  () => {
        expect(array.drop([1,2,3])).toEqual([2,3])
    });
    it(`input 'string' default value drops 1 element(s) become [ 't', 'r', 'i', 'n', 'g' ]`,  () => {
        expect(array.drop('string')).toEqual([ 't', 'r', 'i', 'n', 'g' ])
    });
    it.each([
        [NaN],
        [false],
        [1],
        [10000],
        [{}]
    ])('Should return [] for : %O ',  (x) => {
        expect(array.drop(x)).toEqual([])
    });
});

// dropWhile tests
describe('Creates a slice of array excluding elements dropped from the beginning. ' +
    'Elements are dropped until predicate returns falsey. ', () => {
    it('.dropWhile method should be defined', () => {
        expect(array.dropWhile).toBeDefined();
    });
    it.each([
        [[1,2,3,3,5,5,6],[5,5,6],(x) =>x !== 5],
        [[1,2,3,4,5],[4,5],(x) =>x !== 4],
    ])(` %O => %O`,
        (x,result,y) => {
            expect(array.dropWhile(x,y)).toEqual(result)
        });
    it('Check for working callback function', () =>{

        array.dropWhile([1,2,3,5,5,6], mockCallback);

        expect(mockCallback.mock.calls).toHaveLength(4);
        // unuseful
        expect(mockCallback.mock.results[0].value).toBe(true);
    })
});

// take
describe("Creates a slice of array with n elements taken from the beginning.", () => {
    it('.take method should be defined', () => {
        expect(array.take).toBeDefined();
    });
    it.each([
        [[1,2,3],1,[1]],
        [[1,2,3],2,[1,2]],
        [[1,2,3],5,[1,2,3]],
        [[1,2,3],0,[]],
    ])(` (%O , %O) =>  %O`,
        (x,y,result) => {
            expect(array.take(x,y)).toEqual(result)
        });
    it('"take" function should be defined', () => {
        expect(array.take).toBeDefined();
    })
    it('should return [] if array is undefined', ()=> {
        const testing = array.take(undefined);
        expect(testing).toStrictEqual([]);
    });
    it('should return an array with default n elements taken from the beginning', ()=>{
        const testing = array.take([1,2,3]);
        expect(testing).toEqual([1]);
    })
});

// filter
describe("Iterates over elements of collection, returning an array of all elements predicate returns truthy for", () => {
    const users = [
        { 'user': 'barney', 'age': 36, 'active': true },
        { 'user': 'fred',   'age': 40, 'active': false }
    ];
    it('.filter method should be defined', () => {
        expect(array.filter).toBeDefined();
    });
    it('.filter method should be define ', () => {
        expect(array.filter).toBeDefined();
        expect(utilityFilter.matches).toBeDefined();
        expect(utilityFilter.matchesProperty).toBeDefined();
        expect(utilityFilter.matchesWithCallback).toBeDefined();
        expect(utilityFilter.property).toBeDefined();
    });
    it.each([
        [
            { 'age': 36, 'active': true },
            users,
            [{ 'user': 'barney', 'age': 36, 'active': true }]
        ],
        [
            ['active', false],
            users,
            [{ 'user': 'fred',   'age': 40, 'active': false }]
        ],
        [
            'active',
            users,
            [{ 'user': 'barney', 'age': 36, 'active': true }]
        ],
    ])(`Correct for: %O`,
        (x,y,result) => {
            expect(array.filter(y,x)).toEqual(result);
        })
    it(`Correct for : x => !x.active`, () => {

        array.filter(users, filterMockCallback);
        expect(filterMockCallback.mock.calls).toHaveLength(2);
        expect(filterMockCallback.mock.results[0].value = false);
        expect(filterMockCallback.mock.results[0].value = true);
        expect(filterMockCallback.mock.lastCall.value = [{ user: 'fred', age: 40, active: false }]
        );
    })
    it('Should return initial collection if predicate is not provided', () => {
        expect(array.filter(users)).toEqual(users);
    })
});

describe('Iterates over elements of collection, returning the first element predicate returns truthy for.', () => {
    const mockCallback = jest.fn(o => o.age < 40);
    const users = [
        { 'user': 'barney',  'age': 36, 'active': true },
        { 'user': 'fred',    'age': 40, 'active': false },
        { 'user': 'pebbles', 'age': 1,  'active': true }
    ];
    it('.find method should be defined', () => {
        expect(array.find).toBeDefined();
        expect(utilityFind.property).toBeDefined();
        expect(utilityFind.matches).toBeDefined();
        expect(utilityFind.matchesProperty).toBeDefined();
        expect(utilityFind.matchesWithCallback).toBeDefined();
    });
    it.each(
        [
            [{ 'user': 'barney',  'age': 36, 'active': true }, 'active', users],
            [{ 'user': 'fred',    'age': 40, 'active': false }, ['active', false], users],
            [{ 'user': 'pebbles', 'age': 1,  'active': true }, { 'age': 1, 'active': true }, users]
        ]
        )(`Correct for: %O`,
        (result,y,x) => {
            expect(array.find(x,y)).toEqual(result);
        });
    it('Correct for: o => o.age < 40; ', () => {
        array.find(users, mockCallback);
        expect(mockCallback.mock.calls).toHaveLength(1);
        expect(mockCallback.mock.results[0].value = true);
        expect(mockCallback.mock.lastCall.value = { 'user': 'barney',  'age': 36, 'active': true });
    });
    it("Should return collection if no predicate was passed to a function", () => {
        expect(array.find(users)).toStrictEqual(users);
    });
})

// includes
describe('Checks if value is in collection. If collection is a string, it\'s checked for a substring of value,', () => {
    it('includes function should be defined', () => {
        expect(array.includes).toBeDefined();
    });
    it.each(
        [
            [[1,2,3],1, true],
            [[1,2,3],1, false, 2],
            [{ 'a': 1, 'b': 2 }, 1, true],
            ['abcd', 'bc', true],
            ['string','',true]
        ]
    )('Correct for [%O, %o] => %o', (x,y,result,fromIndex = 0) => {
            expect(array.includes(x,y,fromIndex)).toEqual(result);
        }
    )
    it.each(
        [
            ['string',0,false],
            [{},'string',false,2],
            ['string','Y',false]
        ]
    )('Returns False for [%O, %o] => %o', (x,y,result,fromIndex = 0) => {
        expect(array.includes(x,y,fromIndex)).toEqual(result);
    })
})

// map
describe('Creates an array of values by running each element in collection thru iteratee. ', () => {
    const callback = (x) => x * x;
    const mockCallback = jest.fn(callback);
    const  users = [
        { 'user': 'barney' },
        { 'user': 'fred' }
    ];
    it('map function should be defined', () => {
        expect(array.map).toBeDefined();
    });
    it.each(
        [
            [[4, 8],[16, 64], callback],
            [{ 'a': 4, 'b': 8 }, [16, 64], callback],
            [users, ['barney', 'fred'], 'user'],
        ]
    )('Correct for %O => %O', (x,result, y) => {
            expect(array.map(x,y)).toEqual(result);
        }
    );
    it.each(
        [
            [[4, 8],[undefined,undefined], 's'],
            [[4, 8],[undefined,undefined], 1],
            [[4, 8],[undefined,undefined], true],
        ]
    )('Expect result for %O => %O with %O', (x,result, y) => {
            expect(array.map(x,y)).toEqual(result);
        }
    );
    it('Callback testing for array', () => {
        array.map([4,8],mockCallback);
        expect(mockCallback.mock.calls).toHaveLength(2);
        expect(mockCallback.mock.results[0].value = 16);
        expect(mockCallback.mock.results[0].value = 64);
        expect(mockCallback.mock.lastCall.value = 8);
    });
})

// zip
describe('Creates an array of grouped elements.', () => {
    const result = [ [ 'a', 1, true ], [ 'b', 2, false ] ];

    it('.zip method should be defined', () => {
        expect(array.zip).toBeDefined()
    })
    it(`Correct for : [ ['a', 'b'], [1, 2], [true, false] ] => [ [ \'a\', 1, true ], [ \'b\', 2, false ] ] `, () => {
        expect(array.zip(['a', 'b'], [1, 2], [true, false])).toEqual(result);
    })
    it('Should return empty array called without arguments', () => {
        expect(array.zip()).toStrictEqual([]);
    })

})
