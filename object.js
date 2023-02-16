const polyfill = require('./polyfill.js');

const object = {
    merge: (obj= {},...sources) => {
        for(const source of sources){
            for (const key of Object.keys(source)) {
                if (typeof source[key] !== 'object' || !polyfill.has(obj, key)) {
                    obj[key] = source[key];
                }
                else {
                    object.merge(obj[key], source[key]);
                }
            }
        }
        return obj;
    },
    omit: (obj, paths) => {
        if(Number.isNaN(paths)) {
            paths = undefined;
        }
        let newObj = {};
        let temp = Object.keys(obj);
        const pathsCheck = typeof paths === "number"? paths.toString().split('') : paths;
        const array = pathsCheck ? polyfill.join(pathsCheck).split('') : [];
        for(let key of temp) {
            newObj[key] = obj[key];
            if(array.includes(key)) {
                delete newObj[key];
            }
        }

        return newObj;
    },
    omitBy : (collection,predicate) => {
        let newObj = {};
        if(predicate === undefined) {
            return newObj
        }
        for(let val in collection){
            newObj[val] = collection[val];
            if(typeof predicate !== "function") {
                continue;
            }
            if(predicate(collection[val])) {
                delete newObj[val];
            }
        }
        return newObj;
    },
    pick: (object, paths) => {
        if(Number.isNaN(paths)) {
            paths = undefined;
        }
        let cloneObj = {};
        let temp = Object.keys(object);
        const pathsCheck = typeof paths === "number"? paths.toString().split('') : paths;
        const array = pathsCheck ? polyfill.join(pathsCheck).split('') : [];
        for(let key of temp) {
            cloneObj[key] = object[key];
            if(!array.includes(key)) {
                delete cloneObj[key];
            }
        }

        return cloneObj;
    },
    pickBy : (collection,predicate) => {
        let newObj = {};
        const state = typeof predicate === "function"
        if(typeof predicate !== "undefined" && !state) {
            return newObj
        }
        for(let val in collection) {
            newObj[val] = collection[val];
            if(state && !predicate(collection[val])) {
                delete newObj[val];
            }
        }
        return newObj;
    },
    toPairs: (object) => {
        let arr = [];
        const defaultValue = typeof object === "undefined"? [] : Object.entries(object)
        if(object instanceof Map) {
            for (let item of object) {
                polyfill.push(arr,item);
            }
            return arr;
        }
        if(object instanceof Set) {
            for (let [key, value] of object.entries()) {
                polyfill.push(arr,[key, value]);
            }
            return arr;
        }
        return defaultValue;
    },
}


module.exports = object;
