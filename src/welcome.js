import {clearHTML, setStyle} from "./utils";
import memory from "./memory";

/**
 * This function renders a form where there is a choice for the number of cards in the game
 */
let welcome = function () {

    console.log('Hello from welcome.js');

    let root = document.getElementById('root');

    let context = document.createElement('div');
    context.setAttribute('id','context');

    let h1 = document.createElement('h1');
    h1.appendChild(document.createTextNode('Welcome to the Memory game!'));
    context.appendChild(h1);

    let p = document.createElement('p');
    p.appendChild(document.createTextNode('Insert the number of cards'));
    context.appendChild(p);

    let form = document.createElement('form');
    form.setAttribute('method','post');
    form.setAttribute('id','tableForm');

    let inputDiv = document.createElement('div');

    for(let tableDim of [6,12,24]){
        let radioTableDiv = document.createElement('div');
        let radioTable = document.createElement('input');
        let labelTable = document.createElement('label');
        radioTable.setAttribute('id','radioTable' + tableDim);
        radioTable.setAttribute('type','radio');
        radioTable.setAttribute('name','radioTable');
        radioTable.setAttribute('value','radio' + tableDim);

        if(tableDim === 6){
            radioTable.setAttribute('checked','checked');
        }

        labelTable.appendChild(document.createTextNode(tableDim + ' cards'));
        radioTableDiv.appendChild(radioTable);
        radioTableDiv.appendChild(labelTable);
        inputDiv.appendChild(radioTableDiv);
    }

    form.appendChild(inputDiv);

    let buttonDiv = document.createElement('div');
    let button = document.createElement('button');
    button.setAttribute('type','submit');
    let buttonText = document.createTextNode('Play!');
    button.appendChild(buttonText);
    buttonDiv.appendChild(button);
    form.appendChild(buttonDiv);

    setStyle(inputDiv, {
        'margin-bottom': '15px',
    });


    let submitListenerFunction = function (e) {
        let formData = new FormData(e.target);
        let data = formData.get('radioTable');

        if(data === 'radio6' ||
            data === 'radio12' ||
            data === 'radio24'){

            form.removeEventListener('submit',submitListenerFunction);
            // TODO: Forse esiste un metodo migliore
            clearHTML(context);

            memory(data);

        }

        e.preventDefault();

    };

    form.addEventListener('submit',submitListenerFunction,false);

    context.appendChild(form);
    root.appendChild(context);
};

export default welcome;