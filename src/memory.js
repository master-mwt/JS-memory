import CardManager from './CardManager';
import {
    clearHTML,
    getBackCard,
    getFrontCard,
    setStyle, shuffle,
} from './utils';

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

    createTable(Number.parseInt(tableDimension), cardManager);

    let card1;
    let card2;
    remainingP.innerText = 'Remaining: ' + cardManager.remaining;

    let clickListener = (event) => {
        if(event.target.getAttribute('id').includes('card') && !(event.target.getAttribute('removed'))){
            // click on card
            gameMove(event.target);
        }
    };

    context.addEventListener('click', clickListener, false);

    let gameMove = function(card) {

        if(!card1){
            card1 = card;
            card1.dispatchEvent(new Event('choiceCard'));

        } else if(!card2){

            if(card1 === card){
                // click on the same card
                return;
            }
            card2 = card;
            card2.dispatchEvent(new Event('choiceCard'));

            if(card1.getAttribute('cardimage') === card2.getAttribute('cardimage')){
                // handle win move
                setTimeout(winMove, 2000);

            } else {
                // not win move
                setTimeout(choiceClear, 2000);
            }
        }

    };

    let winMove = function() {
        card1.dispatchEvent(new Event('removeCard'));
        card2.dispatchEvent(new Event('removeCard'));

        card1 = undefined;
        card2 = undefined;

        remainingP.innerText = 'Remaining: ' + cardManager.remaining;

        if(cardManager.remaining === 0){
            // victory condition satisfied
            win();
        }
    };

    let choiceClear = function() {
        card1.dispatchEvent(new Event('choiceClearedCard'));
        card2.dispatchEvent(new Event('choiceClearedCard'));

        card1 = undefined;
        card2 = undefined;
    };


    let reloadGame = () => {
        location.reload();
    };

    let win = function(){
        clearInterval(updateTime);
        context.removeEventListener('click',clickListener);
        clearHTML(context);

        let h1 = document.createElement('h1');
        h1.appendChild(document.createTextNode('Congratulations!'));
        context.appendChild(h1);
        let p = document.createElement('p');
        p.appendChild(document.createTextNode('You won in ' + printTime(lastTime.getMinutes()) + ':' + printTime(lastTime.getSeconds())));
        context.appendChild(p);
        let button = document.createElement('button');
        button.appendChild(document.createTextNode('Play again'));
        button.setAttribute('id', 'playagain');
        button.addEventListener('click', reloadGame, false);
        context.appendChild(button);

    };

    let startTime = new Date();

    let printTime = function(time){
        if(time > 9){
            return "" + time;
        } else {
            return "0" + time;
        }
    };

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

let createTable = function(numCards, cardManager){
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