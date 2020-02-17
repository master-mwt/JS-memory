import {setStyle} from "./utils/helpers";
import welcome from "./welcome";
// TODO: remove global debug console.log() and do testing (check if all listeners are removed if object is detached)
/**
 * Listener that creates the root div and calls the game function welcome()
 */
window.addEventListener('load', function () {

    let body = document.getElementsByTagName('body')[0];

    // creation of the root div
    let root = document.createElement('div');
    root.setAttribute('id', 'root');

    setStyle(root, {
        'margin': 'auto',
        'width': '50%',
        'border': '1px solid grey',
        'padding': '150px 0',
        'text-align': 'center',
        'position': 'relative',
        'border-radius': '25px',
    });

    // append it to the <body>
    body.appendChild(root);

    // start the welcome screen
    welcome();

}, false);