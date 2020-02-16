import {clearHTML, setStyle} from "./utils/helpers";
import memory from "./memory";

/**
 * This function renders a form where there is a choice for the number of cards
 * in the game
 */
let welcome = function () {
    // Listener function definition
    let submitListenerFunction = function (event) {
        let formData = new FormData(event.target);
        let data = Number(formData.get('radioTable'));

        if(data === 6 || data === 12 || data === 20){

            if(data === 20){
                // adjust root dimension div
                let root = document.querySelector('#root');
                setStyle(root,{
                    'width': '80%',
                });
            }

            // cleaning
            form.removeEventListener('submit', submitListenerFunction);
            clearHTML(context);

            // start game
            memory(data);
        }

        event.preventDefault();
    };
    // End listener function definition


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

    for(let tableDim of [6,12,20]){
        let radioTableDiv = document.createElement('div');
        let radioTable = document.createElement('input');
        let labelTable = document.createElement('label');
        radioTable.setAttribute('id','radioTable' + tableDim);
        radioTable.setAttribute('type','radio');
        radioTable.setAttribute('name','radioTable');
        radioTable.setAttribute('value', tableDim.toString());

        if(tableDim === 6){
            radioTable.setAttribute('checked','checked');
        }

        labelTable.appendChild(document.createTextNode(tableDim + ' cards'));
        radioTableDiv.appendChild(radioTable);
        radioTableDiv.appendChild(labelTable);
        inputDiv.appendChild(radioTableDiv);
    }

    setStyle(inputDiv, {
        'margin-bottom': '15px',
    });

    form.appendChild(inputDiv);

    let buttonDiv = document.createElement('div');
    let button = document.createElement('button');
    button.setAttribute('type','submit');
    let buttonText = document.createTextNode('Play!');
    button.appendChild(buttonText);
    setStyle(button, {
        'border-radius': '15px',
        'width': '80px',
        'height': '30px',
        'margin-top': '15px',
    });
    buttonDiv.appendChild(button);
    form.appendChild(buttonDiv);

    // binding listener and event
    form.addEventListener('submit', submitListenerFunction,false);

    context.appendChild(form);
    root.appendChild(context);
};

export default welcome;