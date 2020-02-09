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

let getImage = function() {
    // TODO: getImage()[from disk or from net ?]
    return "";
};

export {
    setStyle,
    clearHTML,
    getImage,
};