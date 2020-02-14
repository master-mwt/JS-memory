import {setStyle} from '../utils/helpers';

// TODO: graphical effects
let Card = function(id, frontCard, backCard) {
  let div;
  let _this = this;

  let front, back;

  // init function
  let init = (function() {

    //
    // card functions creation
    //
    this.attach = function(parentElem) {
      parentElem.appendChild(div);
    };

    this.detach = function() {
      // div.parentElement.removeChild(div);
      div.style.backgroundImage = 'none';
      this.setStyle(div, {
        backgroundColor: 'white',
        'box-shadow': '0px 0px 0px white',
      });

      div.removeEventListener('mouseover', listenerFunctionOver);
      div.removeEventListener('mouseout', listenerFunctionOut);
      div.removeEventListener('click', listenerFunctionClick);
      removeClickEffect();

      div.setAttribute('removed', 'removed');
    };

    this.chosen = function() {
      this.setBackgroundImage(this.frontCard);

      this.setStyle(div, {
        /*backgroundColor: 'black',*/
        'box-shadow': '10px 10px 5px grey',
      });
      div.removeEventListener('mouseover', listenerFunctionOver);
      div.removeEventListener('mouseout', listenerFunctionOut);
      div.removeEventListener('click', listenerFunctionClick);
    };

    this.reject = function() {
      this.setBackgroundImage(this.backCard);

      this.setStyle(div, {
        /*backgroundColor: 'red',*/
        'box-shadow': '0px 0px 0px white',
      });
      div.addEventListener('mouseover', listenerFunctionOver, false);
      div.addEventListener('mouseout', listenerFunctionOut, false);
      div.addEventListener('click', listenerFunctionClick, false);
      removeClickEffect();
    };

    this.setImages = function(frontCard, backCard){
      div.setAttribute('cardimage', frontCard.name);

      this.frontCard = frontCard;
      this.backCard = backCard;

      this.setBackgroundImage(backCard);
    };

    this.setBackgroundImage = function(image) {
      div.style.backgroundImage = `url('${image.url}')`;
      div.style.backgroundSize = '100% 100%';
      div.style.backgroundRepeat = 'no-repeat';
      div.backgroundPosition = 'center';
    };

    this.setId = function(id) {
      this.id = id;
      div.setAttribute('id',this.id);
    };

    this.handleEvent = function(eventType, callBack) {
      div.addEventListener(eventType, callBack.bind(null, _this)); // il bind con null serve ad evitare che div ritorni fuori
    };

    //
    // init variables and listeners
    //
    div = document.createElement('div');
    /*front = document.createElement('img');
    back = document.createElement('img');
    div.appendChild(front);
    div.appendChild(back);*/

    // set card style
    this.setStyle(div,{
      // style here
      height: "120px",
      width: "90px",
      /*backgroundColor: "red",*/
      display: "inline-block",
      margin: "5px",
      position: "relative",
      'transform-style': 'preserve-3d',
      transition: 'transform .5s',
    });

    // binding listeners and events
    div.addEventListener('mouseover', listenerFunctionOver, false);
    div.addEventListener('mouseout', listenerFunctionOut, false);
    div.addEventListener('chosen', listenerFunctionChosen, false);
    div.addEventListener('reject', listenerFunctionReject, false);
    div.addEventListener('click', listenerFunctionClick, false);

    // set id, frontCard, backCard
    if(id && frontCard && backCard){
      this.setId(id);
      this.setImages(frontCard, backCard);
    } else {
      throw "Missing required parameters";
    }

  }).bind(this);


  // listeners functions definition
  let listenerFunctionOver = () => {
    this.setStyle(div, {
      /*backgroundColor: 'blue',*/
      'box-shadow': '10px 10px 5px grey',
    });
  };

  let listenerFunctionOut = () => {
    this.setStyle(div, {
      'box-shadow': '0px 0px 0px white',
    });
  };

  let listenerFunctionChosen = () => {
    this.chosen();
  };

  let listenerFunctionReject = () => {
    this.reject();
  };

  let listenerFunctionClick = () => {
    restoreClickEffect();
  };


  let restoreClickEffect = () => {
    this.setStyle(div, {
      transform: 'scale(.97)',
      transition: 'transform .4s',
    });
    flip();
  };

  let removeClickEffect = () => {
    this.setStyle(div, {
      transform: 'none',
      transition: 'none',
    });
  };

  let flip = () => {

    this.setStyle(div, {
      transform: 'rotateY(180deg)',
    });
  };

  // call to init
  init();
};

Card.prototype = {
  setStyle: setStyle,
};

export default Card;