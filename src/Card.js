import {setStyle} from './utils';

// TODO: graphical effects
let Card = function(id, frontCard, backCard) {

  Card.prototype.setStyle = setStyle;
  let div;
  let _this = this;

  let listenerFunctionClick = (event) => {
    // TODO: click effect
    /*this.setStyle(div, {
      backgroundColor: 'green',
    });*/
  };

  let listenerFunctionOver = (event) => {
    this.setStyle(div, {
      /*backgroundColor: 'blue',*/
      'box-shadow': '10px 10px 5px grey',
    });
  };

  let listenerFunctionOut = (event) => {
    this.setStyle(div, {
      'box-shadow': '0px 0px 0px white',
    });
  };

  let listenerFunctionChoiced = (event) => {
   this.chosen();
  };

  let listenerFunctionChoiceClear = (event) => {
    this.clearChosen();
  };

  // init function
  let init = (function() {

    div = document.createElement('div');

    // set card style
    this.setStyle(div,{
      // style here
      height: "120px",
      width: "90px",
      /*backgroundColor: "red",*/
      display: "inline-block",
      margin: "5px",
      position: "relative",
    });


    // functions
    this.attach = function(parentElem) {
      parentElem.appendChild(div);
    };

    this.chosen = function() {
      div.style.backgroundImage = `url('${frontCard.url}')`;
      div.style.backgroundSize = 'cover';

      this.setStyle(div, {
        /*backgroundColor: 'black',*/
        'box-shadow': '10px 10px 5px grey',
      });
      div.removeEventListener('click', listenerFunctionClick);
      div.removeEventListener('mouseover', listenerFunctionOver);
      div.removeEventListener('mouseout', listenerFunctionOut);
    };

    this.clearChosen = function() {
      div.style.backgroundImage = `url('${backCard.url}')`;
      div.style.backgroundSize = '100% 100%';
      div.style.backgroundRepeat = 'no-repeat';
      div.backgroundPosition = 'center';

      this.setStyle(div, {
        /*backgroundColor: 'red',*/
        'box-shadow': '0px 0px 0px white',
      });
      div.addEventListener('click', listenerFunctionClick, false);
      div.addEventListener('mouseover', listenerFunctionOver, false);
      div.addEventListener('mouseout', listenerFunctionOut, false);
    };


    this.detach = function() {
      // div.parentElement.removeChild(div);
      div.style.backgroundImage = 'none';
      this.setStyle(div, {
        backgroundColor: 'white',
        'box-shadow': '0px 0px 0px white',
      });

      div.removeEventListener('click', listenerFunctionClick);
      div.removeEventListener('mouseover', listenerFunctionOver);
      div.removeEventListener('mouseout', listenerFunctionOut);

      div.setAttribute('removed', 'removed');
    };

    this.setImages = function(frontCard, backCard){
      div.setAttribute('cardimage', frontCard.name);
      this.frontCard = frontCard;
      this.backCard = backCard;

      div.style.backgroundImage = `url('${backCard.url}')`;
      div.style.backgroundSize = '100% 100%';
      /*div.style.backgroundRepeat = 'no-repeat';*/
      /*div.backgroundPosition = 'center';*/
    };

    this.setId = function(id) {
      this.id = id;
      div.setAttribute('id',id);
    };


    // listeners
    div.addEventListener('click', listenerFunctionClick, false);

    div.addEventListener('mouseover', listenerFunctionOver, false);

    div.addEventListener('mouseout', listenerFunctionOut, false);

    div.addEventListener('choicedCard', listenerFunctionChoiced, false);

    div.addEventListener('choiceClearedCard', listenerFunctionChoiceClear, false);


    this.handleEvent = function(eventType, callBack) {
      div.addEventListener(eventType, callBack.bind(null, _this)); // il bind con null serve ad evitare che div ritorni fuori
    };


    // set id, frontCard, backCard
    if(id && frontCard && backCard){
      this.setId(id);
      this.setImages(frontCard, backCard);
    } else {
      throw "Missing required parameters";
    }

  }).bind(this);

  // call init
  init();

};

export default Card;