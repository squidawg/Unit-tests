const polyfill = require('./polyfill.js');

const object = {
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
        if(!predicate) {
            return newObj
        }
        if(typeof predicate !== "function") {
            predicate = (x) => x;
        }
        for(let val in collection){
            newObj[val] = collection[val];
            if(predicate(collection[val]) !== false) {
                delete newObj[val];
            }
        }
        return newObj;
    }
}

module.exports = object;

console.log(object.omitBy({ 'a': true, 'b': '2', 'c': true }, (x) => typeof x === "boolean"))



