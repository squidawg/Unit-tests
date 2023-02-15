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
    }
}

module.exports = object;



