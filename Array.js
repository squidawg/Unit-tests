const polyfill = require('./polyfill.js');
const utilityFind = require('./array.Find.js');
const utilityFilter = require('./array.Filter.js');

Array.prototype.myMap = function (callback) {
    let result = [];
    for(let i = 0; i < this.length; i += 1) {
        result.push(callback(this[i], i, this));
    }
    return result;
};

const array = {
    chunk : function (arr, size) {
    const tempArr = [];
    if(!size) {
        return arr
    }
    if(!Array.isArray(arr)){
        return 'not an array';
    }
    let i = 0;
    while (i < arr.length) {
        polyfill.push(tempArr, polyfill.slice(arr, i, i + size));
        i += size;
    }
    return tempArr;
  },
    compact: (array) => {
        const temp = [];
        let i = 0;
        if(!Array.isArray(array)) {
            return 'not an array'
        }
        while (i < array.length) {
            if(array[i]){
                polyfill.push(temp, array[i]);
            }
            i+=1;
        }
        return temp


    },
    drop: (array, n= 1) => {
        if(!Array.isArray(array)){
            return 'not an array'
        }
        const temp = []
        while(n < array.length){
            polyfill.push(temp, array[n]);
            n +=1 ;
        }
        return temp
    },
    dropWhile: (collection, callback) => {
        let i = 0;
        while(i < collection.length) {
            let result = callback(collection[i]);
            if(!result) {
                break;
            }
            i += 1;
        }
        return  polyfill.slice(collection, i);
    },
    take: (array, end= 1) => {
        if(!Array.isArray(array)){
           return new Error('array not defined');
        }
        return polyfill.slice(array, 0, end);
    },
    filter: (collection, predicate) => {
        if (typeof predicate === "undefined"){
            return collection;
        }
        if (typeof predicate === 'string') {
            return utilityFilter.property(collection, predicate);
        }
        if (typeof predicate === 'function') {
            return utilityFilter.matchesWithCallback(collection, predicate);
        }
        if (Array.isArray(predicate)) {
            return utilityFilter.matchesProperty(collection, predicate);
        }
        if (!Array.isArray(predicate) && predicate instanceof Object) {
            return utilityFilter.matches(collection, predicate);
        }
    },
    find: (collection= [], predicate) => {
        if (typeof predicate === 'string') {
            return utilityFind.property(collection, predicate);
        }
        if (typeof predicate === 'function') {
            return utilityFind.matchesWithCallback(collection, predicate);
        }
        if (Array.isArray(predicate)) {
            return utilityFind.matchesProperty(collection, predicate);
        }
        if (!Array.isArray(predicate) && predicate instanceof Object) {
            return utilityFind.matches(collection, predicate);
        }
        if (typeof predicate === "undefined") {
            return collection;
        }
        else {
            return undefined;
        }
    },
    includes: (collection, value, fromIndex= 0) => {
        if(Array.isArray(collection)) {
            for (let i = fromIndex; i < collection.length; i += 1) {
                if ( collection[i] === value) {
                    return true;
                }
            }
            return false;
        }
        if(typeof collection === "string"){
            return collection.includes(value, fromIndex);
        }
        if(!Array.isArray(collection) && collection instanceof Object) {
            return value in Object.values(collection);

        }
    },
    map: (collection , callback) => {
        const result = [];
        const len = Array.isArray(collection)? collection.length: Object.keys(collection).length;
        if(typeof callback === "undefined") {
            return collection;
        }
        if(Array.isArray(collection) && typeof callback === "function") {
            for(let item of collection) {
                result.push(callback(item));
            }
        }
        if(!Array.isArray(collection) && collection instanceof Object && typeof callback === "function") {
            for(let item of Object.values(collection)) {
                result.push(callback(item));
            }
        }
        if(Array.isArray(collection) && typeof callback === "string") {
            for (let obj of collection) {
                for ( let key in obj) {
                    if ( key === callback) {
                        result.push(obj[key]);
                    }
                }
            }
        }
        return result.length === 0 ? Array.from({length: len}) : result;
    },
    zip:  (arr, ...args) => {
        if (!arr){
            return [];
        }
        return arr.myMap((item, index) => [item, ...args.myMap(arr => arr[index])])
    },
}

module.exports = array;
