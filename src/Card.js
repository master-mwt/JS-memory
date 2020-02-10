import {setStyle} from './utils';

// TODO: graphical effects
let Card = function(id, imageName, imageUrl) {

  Card.prototype.setStyle = setStyle;
  let div;
  let _this = this;

  let listenerFunctionClick = (event) => {
    this.setStyle(div, {
      backgroundColor: 'green',
    });
  };

  let listenerFunctionOver = (event) => {
    this.setStyle(div, {
      backgroundColor: 'blue',
    });
  };

  let listenerFunctionOut = (event) => {
    this.setStyle(div, {
      backgroundColor: 'red',
    });
  };

  let listenerFunctionChoiced = (event) => {
   this.choiced();
  };

  let listenerFunctionChoiceClear = (event) => {
    this.clearChoiced();
  };

  // init function
  let init = (function() {

    div = document.createElement('div');

    // set card style
    this.setStyle(div,{
      // style here
      height: "100px",
      width: "80px",
      backgroundColor: "red",
      display: "inline-block",
      margin: "5px",
      position: "relative",
    });


    // functions
    this.attach = function(parentElem) {
      parentElem.appendChild(div);
    };

    this.choiced = function() {
      this.setStyle(div, {
        backgroundColor: 'black',
      });
      div.removeEventListener('click', listenerFunctionClick);
      div.removeEventListener('mouseover', listenerFunctionOver);
      div.removeEventListener('mouseout', listenerFunctionOut);
    };

    this.clearChoiced = function() {
      this.setStyle(div, {
        backgroundColor: 'red',
      });
      div.addEventListener('click', listenerFunctionClick, false);
      div.addEventListener('mouseover', listenerFunctionOver, false);
      div.addEventListener('mouseout', listenerFunctionOut, false);
    };


    this.detach = function() {
      // div.parentElement.removeChild(div);
      this.setStyle(div, {
        backgroundColor: 'white',
      });

      div.removeEventListener('click', listenerFunctionClick);
      div.removeEventListener('mouseover', listenerFunctionOver);
      div.removeEventListener('mouseout', listenerFunctionOut);

      div.setAttribute('removed', 'removed');
    };

    this.setBackgroundImage = function(imageName, imageUrl){
      div.setAttribute('cardimage', imageName);
      div.style.backgroundImage = `url('${imageUrl}')`;
      div.style.backgroundSize = 'cover';

    };

    this.setId = function(id) {
      this.id = id;
      div.setAttribute('id',id);
    };


    // listeners


    // TODO: listeners definition
    div.addEventListener('click', listenerFunctionClick, false);

    div.addEventListener('mouseover', listenerFunctionOver, false);

    div.addEventListener('mouseout', listenerFunctionOut, false);

    div.addEventListener('choicedCard', listenerFunctionChoiced, false);

    div.addEventListener('choiceClearedCard', listenerFunctionChoiceClear, false);


    this.handleEvent = function(eventType, callBack) {
      div.addEventListener(eventType, callBack.bind(null, _this)); // il bind con null serve ad evitare che div ritorni fuori
    };


    // set id, imageName, imageUrl
    if(id && imageName && imageUrl){
      this.setId(id);
      this.setBackgroundImage(imageName, imageUrl);
    } else {
      // TODO: exists a better method ?
      throw "Missing required parameters";
    }

  }).bind(this);

  // call init
  init();

};

export default Card;