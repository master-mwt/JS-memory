import CardManager from './domain/CardManager';
import {
    clearHTML,
    setStyle,
    shuffle,
    TimeCounter,
} from './utils/helpers';
import victory from './victory';
import ImageUtils from './utils/ImageUtils';

let memory = function (tableDimension) {

    //
    // Game variables definitions
    //
    let card1;
    let card2;

    //
    // Game functions definitions
    //
    let run = function () {
        //
        // Fill table with cards
        //
        fillGameTable(Number.parseInt(tableDimension));

        //
        // Starting game
        //
        remainingP.innerText = 'Remaining cards: ' + cardManager.remaining;
        context.addEventListener('click', clickOnCardListener, false);
        timer.start();
    };

    let fillGameTable = function (numCards) {
        let i = 0;
        let imageUtils = new ImageUtils();

        let backCard = imageUtils.getBackCard();
        while (i < numCards) {
            let frontCard = imageUtils.getFrontCard();

            cardManager.createCard('card' + i, frontCard, backCard);
            cardManager.createCard('card' + (i + 1), frontCard, backCard);
            i += 2;
        }

        let cards = shuffle(cardManager.cardList);
        for (let card of cards) {
            cardManager.append(card);
        }
    };

    // click listener function
    let clickOnCardListener = (event) => {
        // get the card div (not the face card div)
        let cardTarget = event.target.parentElement;
        let idTarget = cardTarget.getAttribute('id');

        if (idTarget && idTarget.includes('card') &&
            !(cardTarget.getAttribute('removed'))) {
            // click on not removed card
            gameMove(cardTarget);
        }
    };
    // end click listener function

    let gameMove = function (card) {

        if (!card1) {
            card1 = card;
            card1.dispatchEvent(new Event('chosen'));

        } else if (!card2) {

            if (card1 === card) {
                // click on the same chosen card
                return;
            }
            card2 = card;
            card2.dispatchEvent(new Event('chosen'));

            if (card1.getAttribute('cardimage') === card2.getAttribute('cardimage')) {
                // handling good choice
                setTimeout(goodChoice, 2000);

            } else {
                // handling bad choice
                setTimeout(badChoice, 2000);
            }
        }
    };

    let goodChoice = function () {
        card1.dispatchEvent(new Event('removeCard'));
        card2.dispatchEvent(new Event('removeCard'));

        card1 = undefined;
        card2 = undefined;

        remainingP.innerText = 'Remaining cards: ' + cardManager.remaining;

        if (cardManager.remaining === 0) {
            // victory condition satisfied
            gameVictory();
        }
    };

    let badChoice = function () {
        card1.dispatchEvent(new Event('reject'));
        card2.dispatchEvent(new Event('reject'));

        card1 = undefined;
        card2 = undefined;
    };

    let gameVictory = function () {
        let lastTime = timer.stop();
        context.removeEventListener('click', clickOnCardListener);
        back.removeEventListener('click', backButtonListener);
        clearHTML(context);

        victory(lastTime);
    };

    let backButtonListener = function () {
        location.reload();
    };
    //
    // End functions definitions
    //

    /**********************
     ** Running the game **
     **********************/

    //
    // table div creation
    //
    let context = document.getElementById('context');

    let tableDiv = document.createElement('div');
    tableDiv.setAttribute('id', 'table');

    setStyle(tableDiv, {
        'perspective': '1000px',
        '-webkit-perspective': '1000px',
        '-moz-perspective': '1000px',
        '-o-perspective': '1000px',
        '-ms-perspective': '1000px',
    });

    let scoreDiv = document.createElement('div');
    scoreDiv.setAttribute('id', 'score');

    let remainingP = document.createElement('p');
    let timeP = document.createElement('p');
    let back = document.createElement('button');
    let backText = document.createTextNode('Back');
    scoreDiv.appendChild(remainingP);
    scoreDiv.appendChild(back);
    scoreDiv.appendChild(timeP);
    back.appendChild(backText);
    back.addEventListener('click', backButtonListener, false);


    setStyle(scoreDiv, {
        'position': 'absolute',
        'bottom': 0,
        'text-align': 'left',
        'padding-left': '10px',
        'width': '95%',
    });

    setStyle(back, {
        'border-radius': '15px',
        'float': 'right',
        'margin-left': '50px',
        'width': '60px',
        'height': '30px',
    });
    context.appendChild(tableDiv);
    context.appendChild(scoreDiv);

    //
    // CardManager and Timer objects definition
    //
    let cardManager = new CardManager(tableDiv);
    let timer = new TimeCounter(timeP);

    // start the game
    run();
};

export default memory;