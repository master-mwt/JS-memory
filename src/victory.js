import {printTime} from './utils';

let reloadGame = () => {
  location.reload();
};

function victory(victoryTime) {

  let context = document.querySelector('#context');

  let h1 = document.createElement('h1');
  h1.appendChild(document.createTextNode('Congratulations!'));
  context.appendChild(h1);

  let p = document.createElement('p');
  p.appendChild(document.createTextNode('You won in ' +
      printTime(victoryTime.getMinutes()) + ':' +
      printTime(victoryTime.getSeconds())));
  context.appendChild(p);

  let button = document.createElement('button');
  button.appendChild(document.createTextNode('Play again'));
  button.addEventListener('click', reloadGame, false);
  context.appendChild(button);
}

export default victory;