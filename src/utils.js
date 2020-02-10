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
let getImage = function() {
    let index = Math.floor(Math.random()*images.length);
    let image = images[index];
    images.splice(index, 1);

    return new Image(image);
};

export {
    setStyle,
    clearHTML,
    getImage,
};