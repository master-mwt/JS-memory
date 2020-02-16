import {setStyle} from '../utils/helpers';

// TODO: graphical hover effects changing
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
      'transition': 'transform 1s',
    });

    this.setStyle(back, {
      'position': 'absolute',
      'height': '100%',
      'width': '100%',
      'backface-visibility': 'hidden',
    });

    this.setStyle(front, {
      'position': 'absolute',
      'height': '100%',
      'width': '100%',
      'backface-visibility': 'hidden',
      'transform': 'rotateY(180deg)',
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
      'background-color': 'white',
      'border': 'none',
      'box-shadow': '0px 0px 0px white',
    });

    div.removeEventListener('mouseover', listenerFunctionOver);
    div.removeEventListener('mouseout', listenerFunctionOut);
    removeClickEffect();

    div.setAttribute('removed', 'removed');
    console.log('detach');
  };

  this.chosen = function() {
    this.setStyle(div, {
      'box-shadow': '10px 10px 5px grey',
    });
    div.removeEventListener('mouseover', listenerFunctionOver);
    div.removeEventListener('mouseout', listenerFunctionOut);
    clickEffect();

    console.log('chosen');
  };

  this.reject = function() {
    this.setStyle(div, {
      'box-shadow': '0px 0px 0px white',
    });
    div.addEventListener('mouseover', listenerFunctionOver, false);
    div.addEventListener('mouseout', listenerFunctionOut, false);
    removeClickEffect();
    console.log('reject');
  };

  this.setImages = function(frontCard, backCard){
    div.setAttribute('cardimage', frontCard.name);

    this.frontCard = frontCard;
    this.backCard = backCard;

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
    this.setStyle(div, {
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

  // click graphical effects functions
  let clickEffect = () => {
    console.log('restore click');
    this.setStyle(div, {
      'transform': 'scale(.97)',
      'transition': 'transform .4s',
    });
    flip();
  };

  let removeClickEffect = () => {
    console.log('remove click');
    this.setStyle(div, {
      'transform': 'none',
      'transition': 'none',
    });
  };

  let flip = () => {
    console.log('flip');
    this.setStyle(div, {
      'transform': 'rotateY(180deg)',
    });
  };

  // call to init
  init();
};

Card.prototype = {
  setStyle: setStyle,
};

export default Card;