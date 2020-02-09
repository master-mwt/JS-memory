import Card from './Card';

let CardManager = function(context) {

  let cardList = [];
  let remaining = 0;

  this.createCard = function(id, imageUrl, imageName) {
    let card = new Card(id, imageUrl, imageName);
    // TODO: handle creation and append
  };

  this.removeCard = function(card) {
    let i;
    for(let index in cardList){
      if(cardList[index] === card){
        i = index;
        break;
      }
    }
    cardList.splice(i,1);
    card.detach();
    remaining--;
  };

  this.cardList = cardList;
  this.remaining = remaining;

};

export default CardManager;