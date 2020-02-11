import CardManager from './CardManager';
import {
    clearHTML,
    getBackCard,
    getFrontCard, printTime,
    setStyle, shuffle,
} from './utils';
import victory from './victory';

// TODO: refactoring
let memory = function (tableDimension) {

    let context = document.getElementById('context');
    let tableDiv = document.createElement('div');
    tableDiv.setAttribute('id', 'table');
    let scoreDiv = document.createElement('div');
    scoreDiv.setAttribute('id', 'score');
    let remainingP = document.createElement('p');
    let time = document.createElement('p');
    scoreDiv.appendChild(remainingP);
    scoreDiv.appendChild(time);

    setStyle(scoreDiv, {
        'position': 'absolute',
        'bottom': 0,
        'text-align':'left',
        'padding-left': '10px',
    });
    context.appendChild(tableDiv);
    context.appendChild(scoreDiv);

    let cardManager = new CardManager(tableDiv);

    createGameTable(Number.parseInt(tableDimension), cardManager);

    let card1;
    let card2;
    remainingP.innerText = 'Remaining: ' + cardManager.remaining;

    let clickListener = (event) => {
        let idTarget = event.target.getAttribute('id');
        if(idTarget && idTarget.includes('card') &&
            !(event.target.getAttribute('removed'))){
            // click on card
            gameMove(event.target);
        }
    };

    context.addEventListener('click', clickListener, false);

    let gameMove = function(card) {

        if(!card1){
            card1 = card;
            card1.dispatchEvent(new Event('chosen'));

        } else if(!card2){

            if(card1 === card){
                // click on the same card
                return;
            }
            card2 = card;
            card2.dispatchEvent(new Event('chosen'));

            if(card1.getAttribute('cardimage') === card2.getAttribute('cardimage')){
                // handling good choice
                setTimeout(goodChoice, 2000);

            } else {
                // handling bad choice
                setTimeout(badChoice, 2000);
            }
        }

    };

    let goodChoice = function() {
        card1.dispatchEvent(new Event('removeCard'));
        card2.dispatchEvent(new Event('removeCard'));

        card1 = undefined;
        card2 = undefined;

        remainingP.innerText = 'Remaining: ' + cardManager.remaining;

        if(cardManager.remaining === 0){
            // victory condition satisfied
            winGame();
        }
    };

    let badChoice = function() {
        card1.dispatchEvent(new Event('reject'));
        card2.dispatchEvent(new Event('reject'));

        card1 = undefined;
        card2 = undefined;
    };

    let winGame = function(){
        clearInterval(updateTime);
        context.removeEventListener('click',clickListener);
        clearHTML(context);

        victory(lastTime);
    };

    let startTime = new Date();
    let lastTime;
    let updateTime = function() {
        let now = new Date();
        let difference = new Date(now - startTime);
        lastTime = difference;
        let playTimeMinutes = difference.getMinutes();
        let playTimeSeconds = difference.getSeconds();
        time.innerText = 'Time: ' + printTime(playTimeMinutes) + ':' + printTime(playTimeSeconds);
    };
    updateTime();
    setInterval(updateTime, 1000);

};

let createGameTable = function(numCards, cardManager){
    let i = 0;
    let backCard = getBackCard();
    while(i < numCards){
        let frontCard = getFrontCard();

        cardManager.createCard('card' + i, frontCard, backCard);
        i++;
        cardManager.createCard('card' + i, frontCard, backCard);
        i++;
    }

    let cards = shuffle(cardManager.cardList);
    for(let card of cards){
        cardManager.append(card);
    }
};

export default memory;