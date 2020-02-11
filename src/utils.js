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

// TODO: dynamic get images name, for all images (min: 3, max: 10)
let images = ['rose', 'komi', 'sun'];
let getFrontCard = function() {
    let index = Math.floor(Math.random()*images.length);
    let image = images[index];
    images.splice(index, 1);

    return new Image(image);
};

let getBackCard = function() {
    return new Image('backCard');
};

export {
    setStyle,
    clearHTML,
    getFrontCard,
    getBackCard,
};