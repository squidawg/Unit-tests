const object = require('./object.js');
const testArr = [1,2,3,4,5];
const testObj = { 'a': 1, 'b': '2', 'c': 3 };
//merge
describe('This method is like _.assign except that it recursively merges own and ' +
    'inherited enumerable string keyed properties of source objects into the destination object', () => {
    it('.merge method should be defined', () => {
        expect(object.merge).toBeDefined();
    })
    it('Correct for two objects:',() => {
        expect(object.merge({
            'a': [{ 'b': 2 }, { 'd': 4 }]
        }, {
            'a': [{ 'c': 3 }, { 'e': 5 }]
        })).toStrictEqual({ 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] })
    });
    it('Correct for: When two keys are the same', () => {
        expect(object.merge({ cpp: "12" }, { cpp: "23" },
            { java: "23" }, { python:"35" })).toStrictEqual({cpp: '23', java: '23', python: '35'})
    });
    it('Recursive call spy test', () => {
        const obj1 = {'a': [{ 'b': 2 }, { 'd': 4 }]};
        const obj2 = {'a': [{ 'c': 3 }, { 'e': 5 }]};
        const res = { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
        const mock = jest.spyOn(object, 'merge');
        const result = object.merge(obj1,obj2);
        expect(result).toStrictEqual(res);
        expect(mock).toHaveBeenCalledTimes(4);
        expect(mock).toBeCalledWith(obj1,obj2);
    });

});

// omit
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

//omitBy
describe('this method creates an object composed of the own and inherited enumerable string keyed properties ' +
    'of object that predicate doesn\'t return truthy for', () => {
    const isBool = (e) => typeof e === "boolean";
    const isNum = (e) => typeof e === "number";
    const isString = (e) => typeof e === "string";
    const mockIsNum = jest.fn(isNum);
    const mockIsString = jest.fn(isString);
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
});

//pick
describe('Creates an object composed of the picked object properties.\n' +
    '\n', () => {
    const testArr = [1,2,3,4,5];
    const testObj = { 'a': 1, 'b': '2', 'c': 3 };
    it('.pick should be defined', () => {
        expect(object.pick).toBeDefined();
    });
    it.each([
        [testArr,1,{"1":2}],
        [testArr,[2,3],{ '2': 3, '3': 4 }],
        [testArr,['2',3],{ '2': 3, '3': 4 }]
    ])('Correct for array: %O , %O => %O',(x,y,result) => {
        expect(object.pick(x,y)).toEqual(result);
    });
    it.each([
        [testObj,'a', { a: 1 }],
        [testObj,['a', 'g', 1],{ a: 1 }],
        [testObj,['a', 'g'],{ a: 1 }],
    ])('Correct for object: %O , %O => %O',(x,y,result) => {
        expect(object.pick(x,y)).toEqual(result);
    });
    it.each([
        [testObj,undefined],
        [testObj,NaN],
        [testObj,1],
        [testObj,{}],
        [testObj,[1,2,3]],
    ])('Should return for: %O , %O => {}',(x,y) => {
        expect(object.pick(x,y)).toEqual({});
    });
    it.each([
        [testArr,undefined],
        [testArr,NaN],
        [testArr,'b'],
        [testArr,{}],
        [testArr,['a','c','b']],
    ])('Should return  for: %O , %O => {}',(x,y) => {
        expect(object.pick(x,y)).toEqual({});
    })

});

//pickBy
describe('Creates an object composed of the object properties predicate returns truthy for.', () => {
    it('.pickBy method should be defined', () => {
        expect(object.pickBy).toBeDefined();
    });
    it.each([
        ['string', undefined, { '0': 's', '1': 't', '2': 'r', '3': 'i', '4': 'n', '5': 'g' }],
        ['string', (x) => x === 's', { '0': 's' }],
    ])('Correct for: %O, %O => %O', (x, y, result) => {
        expect(object.pickBy(x,y)).toEqual(result);
    });
    it.each([
        [testArr, undefined, { '0': 1, '1': 2, '2': 3, '3': 4, '4': 5 }],
        [testArr, (x) => x === 1, { '0': 1 }],
    ])('Correct for: %O, %O => %O', (x, y, result) => {
        expect(object.pickBy(x,y)).toEqual(result);
    });
    it.each([
        [testObj, undefined, { a: 1, b: '2', c: 3 }],
        [testObj, (x) => x === 1, { a: 1 }],
    ])('Correct for: %O, %O => %O', (x, y, result) => {
        expect(object.pickBy(x,y)).toEqual(result);
    });
    it.each([
        ['string',1],
        [testArr,1],
        [testObj, 'a'],
        [testObj, '1'],
    ])('Should return  for: %O , %O => {}', (x, y) => {
        expect(object.pickBy(x,y)).toEqual({});
    });
    it('Predicate tests', () => {
        const mockCallback = jest.fn((x) => x === 1);
        object.pickBy(testObj, mockCallback);
        expect(mockCallback.mock.calls).toHaveLength(3);
        expect(mockCallback.mock.results[0].value).toBeTruthy();
        expect(mockCallback.mock.results[1].value).toBeFalsy();
        expect(mockCallback.mock.results[2].value).toBeFalsy();
        expect(mockCallback.mock.lastCall).toEqual([3]);
    })
});

//toPairs
describe('Creates an array of own enumerable string keyed-value pairs for object which can be consumed by _.fromPairs.', () => {
    const setA = new Set([1, 2, 3, 4]);
    const map = new Map([
        [1, 'one'],
        [2, 'two'],
        [3, 'three'],
    ]);
    function Foo() {
        this.a = 1;
        this.b = 2;
    }
    it('.toPairs method should be defined', () => {
        expect(object.toPairs).toBeDefined();
    });
    it('Correct for: new Foo', () => {
       expect(object.toPairs(new Foo)).toStrictEqual([['a', 1], ['b', 2]]);
    });
    it('Correct for Map', () => {
       expect(object.toPairs(map)).toStrictEqual([ [ 1, 'one' ], [ 2, 'two' ], [ 3, 'three' ] ]);
    });
    it('Correct for Set', () => {
        expect(object.toPairs(setA)).toStrictEqual([ [ 1, 1 ], [ 2, 2 ], [ 3, 3 ], [ 4, 4 ] ]);
    });
    it('Correct for array', () => {
        expect(object.toPairs([1,2,3])).toStrictEqual([ [ '0', 1 ], [ '1', 2 ], [ '2', 3 ] ]);
    });
    it.each([
        [NaN],
        [1],
        [true],
        [false],
    ])('', (x) => {
        expect(object.toPairs(x)).toEqual([]);
    });
});