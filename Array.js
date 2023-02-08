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
        tempArr.push(arr.slice(i, i + size));
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
                temp.push(array[i]);
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
            temp.push(array[n]);
            n +=1 ;
        }
        return temp
    },
    dropWhile: (array, callback) => {
        let i = 0;
        while(i < array.length) {
            let result = callback(array[i]);
            if(!result) {
                break;
            }
            i += 1;
        }
        return array.slice(i);
    },
}

module.exports = array;
