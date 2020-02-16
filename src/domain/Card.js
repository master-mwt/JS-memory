import {setStyle} from '../utils/helpers';

// TODO: cross-browser transition check
let Card = function(id, frontCard, backCard) {
  let div;
  let front, back;

  let _this = this;

  // init function
  let init = (function() {

    //
    // init variables and listeners
    //
    div = document.createElement('div');
    front = document.createElement('div');
    back = document.createElement('div');
    div.appendChild(front);
    div.appendChild(back);

    // set id, frontCard, backCard
    if(id && frontCard && backCard){
      this.setId(id);
      this.setImages(frontCard, backCard);
    } else {
      throw "Missing required parameters";
    }

    // binding listeners and events
    div.addEventListener('mouseover', listenerFunctionOver, false);
    div.addEventListener('mouseout', listenerFunctionOut, false);
    div.addEventListener('chosen', listenerFunctionChosen, false);
    div.addEventListener('reject', listenerFunctionReject, false);

    // set card style
    this.setStyle(div,{
      // style here
      'height': '120px',
      'width': '90px',
      'display': 'inline-block',
      'border': '.8px solid grey',
      'margin': '5px',
      'position': 'relative',
      'transform-style': 'preserve-3d',

      'transition': 'transform .6s',
      '-webkit-transition': 'transform .6s',
      '-moz-transition': 'transform .6s',
      '-o-transition': 'transform .6s',
      '-ms-transition': 'transform .6s',
    });

    this.setStyle(back, {
      /*'position': 'absolute',*/ // bug in Firefox if active !
      'height': '100%',
      'width': '100%',
      'backface-visibility': 'hidden',
      '-webkit-backface-visibility': 'hidden',
    });

    this.setStyle(front, {
      'position': 'absolute',
      'height': '100%',
      'width': '100%',
      'backface-visibility': 'hidden',
      '-webkit-backface-visibility': 'hidden',

      'transform': 'rotateY(180deg)',
      '-webkit-transform': 'rotateY(180deg)',
      '-ms-transform': 'rotateY(180deg)',
    });

  }).bind(this);


  //
  // card functions creation
  //
  this.attach = function(parentElem) {
    parentElem.appendChild(div);
  };

  this.detach = function() {
    front.style.backgroundImage = 'none';
    back.style.backgroundImage = 'none';

    this.setStyle(div, {
      'border': 'none',
    });

    removeHoverEffect();
    div.removeEventListener('mouseover', listenerFunctionOver);
    div.removeEventListener('mouseout', listenerFunctionOut);
    removeClickEffect();

    div.setAttribute('removed', 'removed');
    console.log('detach');
  };

  this.chosen = function() {
    hoverEffect();
    div.removeEventListener('mouseover', listenerFunctionOver);
    div.removeEventListener('mouseout', listenerFunctionOut);
    clickEffect();

    console.log('chosen');
  };

  this.reject = function() {
    removeHoverEffect();
    div.addEventListener('mouseover', listenerFunctionOver, false);
    div.addEventListener('mouseout', listenerFunctionOut, false);
    removeClickEffect();
    console.log('reject');
  };

  this.setImages = function(frontCard, backCard){
    div.setAttribute('cardimage', frontCard.name);

    /*this.frontCard = frontCard;
    this.backCard = backCard;*/

    this.setBackImage(backCard);
    this.setFrontImage(frontCard);
  };

  this.setFrontImage = function(image) {
    front.style.backgroundImage = `url('${image.url}')`;
    front.style.backgroundSize = '100% 100%';
    front.style.backgroundRepeat = 'no-repeat';
    front.backgroundPosition = 'center';
  };

  this.setBackImage = function(image) {
    back.style.backgroundImage = `url('${image.url}')`;
    back.style.backgroundSize = '100% 100%';
    back.style.backgroundRepeat = 'no-repeat';
    back.backgroundPosition = 'center';
  };

  this.setId = function(id) {
    this.id = id;
    div.setAttribute('id',this.id);
  };

  this.handleEvent = function(eventType, callBack) {
    div.addEventListener(eventType, callBack.bind(null, _this)); // il bind con null serve ad evitare che div ritorni fuori
  };


  // listeners functions definition
  let listenerFunctionOver = () => {
    hoverEffect();
  };

  let listenerFunctionOut = () => {
    removeHoverEffect();
  };

  let listenerFunctionChosen = () => {
    this.chosen();
  };

  let listenerFunctionReject = () => {
    this.reject();
  };

  // click graphical effects functions
  let clickEffect = () => {
    console.log('restore click');
    this.setStyle(div, {
      'transform': 'scale(.97)',
      '-webkit-transform': 'scale(.97)',
      '-ms-transform': 'scale(.97)',
    });
    flip();
  };

  let removeClickEffect = () => {
    console.log('remove click');
    this.setStyle(div, {
      'transform': 'none',
      '-webkit-transform': 'none',
      '-ms-transform': 'none',
    });
  };

  let flip = () => {
    console.log('flip');
    this.setStyle(div, {
      'transform': 'rotateY(180deg)',
      '-webkit-transform': 'rotateY(180deg)',
      '-ms-transform': 'rotateY(180deg)',
    });
  };

  let hoverEffect = () => {
    this.setStyle(div, {
      'transform': 'scale(1.1)',
      '-webkit-transform': 'scale(1.1)',
      '-ms-transform': 'scale(1.1)',
    });

  };

  let removeHoverEffect = () => {
    this.setStyle(div, {
      'transform': 'scale(1)',
      '-webkit-transform': 'scale(1)',
      '-ms-transform': 'scale(1)',
    });
  };

  // call to init
  init();
};

Card.prototype = {
  setStyle: setStyle,
};

export default Card;