const polyfill = require('./polyfill.js');
const utilityFind = {
    matchesProperty: (collection, property) => {
        let compare;
        for(let obj of collection) {
            compare =  polyfill.myEvery(Object.entries(obj),arr =>
                JSON.stringify(arr) === JSON.stringify(property));
            if(compare) {
                return obj;
            }
        }
        return undefined;
    },
    property: (collection, property) => {
        let compare;
        for ( let obj of collection){
            compare = polyfill.mySome(Object.keys(obj),key => key === property)
            if(compare){
                return obj;
            }
        }
        return undefined;
    },
    matchesWithCallback: (collection, callback) => {
        for (let obj of collection) {
            if(callback(obj)) {
                return obj;
            }
        }
        return undefined;
    },
    matches: (collection, property) => {
        let count = 0;
        for(let obj of collection){
            for(let key in obj){
                if(key in property){
                    count += property[key] === obj[key] ? 1 : 0;
                }
            }
            if(count === Object.keys(property).length) {
                return obj;
            }
            count = 0
        }
        return undefined
    }
}

module.exports = utilityFind;


