import {setStyle} from "./utils";
import welcome from "./welcome";

/**
 * Listener that creates the root div and calls the game function welcome()
 */
window.addEventListener('load',function(){

    console.log('Hello from index.js');

    let body = document.getElementsByTagName('body')[0];

    // creation of the root div
    let root = document.createElement('div');
    root.setAttribute('id','root');

    setStyle(root, {
        'margin': 'auto',
        'width': '50%',
        'border': '3px solid red',
        'padding': '150px 0',
        'text-align': 'center',
        'position':'relative',
    });

    // append it to the <body>
    body.appendChild(root);

    // start the memory game welcome screen
    welcome();

},false);
