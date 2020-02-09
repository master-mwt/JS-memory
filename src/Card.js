import {setStyle} from './utils';

let Card = function(id, imageUrl, imageName) {

  Card.prototype.setStyle = setStyle;
  let div;

  // init function
  let init = function() {

    div = document.createElement('div');

    // set id, imageUrl, imageName
    if(id && imageUrl && imageName){
      this.setId(id);
      this.setBackgroundImage(imageUrl, imageName);
    } else {
      // TODO: exists a better method ?
      throw "Missing required parameters";
    }

    // set card style
    this.setStyle(div,{
      // style here
      // TODO: set card style
    });


    // functions
    this.attach = function(parentElem) {
      parentElem.appendChild(div);
    };

    this.detach = function() {
      div.parentElement.removeChild(div);
    };

    this.setBackgroundImage = function(imageUrl, imageName){
      div.style.backgroundImage = `url('${imageUrl}')`;
      div.setAttribute('cardimage', imageName);
    };

    this.setId = function(id) {
      this.id = id;
      div.setAttribute('id',id);
    };


    // listeners
    // TODO: listeners definition
    div.addEventListener('click', (e) => {
      // click effect

    });

    div.addEventListener('mouseover', (e) => {
      // mouseover effect
    });

    div.addEventListener('mouseout', (e) => {
      // mouseout effect
    });

  };

  // call init
  init();

};

export default Card;