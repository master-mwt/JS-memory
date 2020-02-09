import CardManager from './CardManager';
import {getImage} from './utils';


// TODO: possible refactoring
let memory = function (tableDimension) {

    console.log('Hello from memory.js');

    console.log('Table dim: ' + tableDimension);

    let context = document.getElementById('context');
    let cardManager = new CardManager(context);

    switch (tableDimension) {
        case "radio6":
            createTable(6);
            break;
        case "radio12":
            createTable(12);
            break;
        case "radio24":
            createTable(24);
            break;
        default:
            break;
    }


};

// TODO: possibile miglioria
let createTable = function(numCards, cardManager){
    let image = getImage();
    let i = 0;
    while(i < numCards){
        cardManager.createCard('card' + i, image.url, image.name);
        i++;
        cardManager.createCard('card' + i, image.url, image.name);
        i++;
    }
};

export default memory;