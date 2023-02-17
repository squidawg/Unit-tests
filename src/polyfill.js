const polyfill = {
    join: (arr) => {
        let result = '';
        for(let i = 0; i < arr.length; i++) {
            result += arr[i];
        }
        return result;
    },
    push: (arr, ...x) => {
        const temp = [...x];
        if(!Array.isArray(arr)) {
            return new Error('not an array');
        }
        for(let item of temp){
            let len = arr.length;
            arr[len] = item;
            len++;
            arr.length = len;
        }
        return arr;
    },
    slice: (arr, start, end) => {
        const  temp =[];
        if(!Array.isArray(arr)) {
            return new Error('not an array');
        }
        if(end === undefined || end > arr.length) {
            end = arr.length;
        }
        for (let i = start; i < end; i++) {
            polyfill.push(temp, arr[i]);
        }
        return temp;

    },
    mySome: (arr, callback) => {
        for(let i = 0; i < arr.length; i++) {
            if(callback(arr[i], i, arr)) {
                return true;
            }
        }
        return false;
    },
    has: (obj, property) => {
        return !!obj[property];
    },
}

module.exports = polyfill;