const polyfill = require("./polyfill.js");

const utilityFilter = {
    matches: (collection, predicate) => {
        let result = [];
        let count = 0;
        for(let obj of collection) {
            for(let key in obj){
                if(key in predicate){
                    count += predicate[key] === obj[key] ? 1 : 0;
                }
            }
            if(count === Object.keys(predicate).length) {
                polyfill.push(result,obj)
            }
            count = 0
        }
        return result;
    },
    matchesProperty: (collection, predicate) => {
        let compare;
        let result = [];
        for(let obj of collection) {
            compare =  polyfill.mySome(Object.entries(obj),arr =>
                JSON.stringify(arr) === JSON.stringify(predicate));
            if(compare) {
                polyfill.push(result, obj);
            }
        }
        return result;
    },
    property: (collection, property) => {
        let compare;
        let result= [];
        for ( let obj of collection){
            compare = polyfill.mySome(Object.keys(obj),(key) => key === property && obj[property]);
            if(compare) {
                polyfill.push(result, obj);
            }
        }
        return result;
    },
    matchesWithCallback: (collection, callback) => {
        let result= [];
        for (let obj of collection) {
            if(callback(obj)) {
                polyfill.push(result, obj);
            }
        }
        return result;
    },
}
module.exports = utilityFilter;

