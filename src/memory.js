import CardManager from './CardManager';
import {clearHTML, setStyle} from './utils';

// TODO: refactoring
let memory = function (tableDimension) {

    let context = document.getElementById('context');
    let tableDiv = document.createElement('div');
    tableDiv.setAttribute('id', 'table');
    let scoreDiv = document.createElement('div');
    scoreDiv.setAttribute('id', 'score');
    let remaining = document.createElement('p');
    let time = document.createElement('p');
    scoreDiv.appendChild(remaining);
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

    switch (tableDimension) {
        case "radio6":
            createTable(6, cardManager);
            break;
        case "radio12":
            createTable(12, cardManager);
            break;
        case "radio20":
            createTable(20, cardManager);
            break;
        default:
            break;
    }

    let card1;
    let card2;
    remaining.innerText = 'Remaining: ' + cardManager.remaining;

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
            card1.dispatchEvent(new Event('choicedCard'));

        } else if(!card2){

            if(card1 === card){
                // click on the same card
                return;
            }
            card2 = card;
            card2.dispatchEvent(new Event('choicedCard'));

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

        remaining.innerText = 'Remaining: ' + cardManager.remaining;

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

// TODO: possibile miglioria
let createTable = function(numCards, cardManager){
    let i = 0;
    while(i < numCards){
        cardManager.createCard('card' + i, "yo", "yo");
        i++;
        cardManager.createCard('card' + i, "yo", "yo");
        i++;
    }

    for(let card of cardManager.cardList){
        cardManager.append(card);
    }
};

export default memory;