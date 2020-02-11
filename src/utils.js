import Image from './Image';

let setStyle = function(item, style){
    for(let property in style){
        item.style[property] = style[property];
    }
};

let clearHTML = function (item) {
    while(item.hasChildNodes()){
        item.firstChild.remove();
    }
};

// TODO: dynamic get images name, for all images (min: 3, max: 10) ?
let images = ['cats','chicken','computer','dory','hero','mwt','robot','rose',
    'sun','tree'];

let getFrontCard = function() {
    let index = Math.floor(Math.random()*images.length);
    let image = images[index];
    images.splice(index, 1);

    return new Image(image);
};

let getBackCard = function() {
    return new Image('backcard');
};

/**
 * A possible implementation of Fisher-Yates shuffle
 *
 * Algorithm:
 * -- To shuffle an array a of n elements (indices 0..n-1):
 * for i from 0 to n−2 do
 *    j ← random integer such that i ≤ j < n
 * exchange a[i] and a[j]
 */
let shuffle = function(array) {
    let result = array;

    let length = result.length;
    let j, tmp;
    for(let i = 0; i < length - 1; i++){
        j = Math.floor((Math.random() * (length - i) ) + i);
        tmp = result[i];
        result[i] = result[j];
        result[j] = tmp;
    }
    return result;
};

export {
    setStyle,
    clearHTML,
    getFrontCard,
    getBackCard,
    shuffle,
};