let setStyle = function(item, style){
    for(let property in style){
        item.style[property] = style[property];
    }
};

let clearHTML = function (item) {
    item.innerHTML = "";
};

export {
    setStyle,
    clearHTML,
};