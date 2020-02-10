import Card from './Card';

let CardManager = function(context) {

  let cardList = [];
  let remaining = 0;
  let _this = this;

  this.createCard = function(id, imageUrl, imageName) {
    let card = new Card(id, imageUrl, imageName);
    this.cardList.push(card);
    this.remaining++;

    card.handleEvent('removeCard', function(card) {
      _this.removeCard(card);
    });

    return card;
  };

  this.removeCard = function(card) {
    let i;
    for(let index in cardList){
      if(cardList[index] === card){
        i = index;
        break;
      }
    }
    this.cardList.splice(i,1);
    card.detach();
    this.remaining--;
  };

  this.append = function(card) {
    card.attach(context);
  };

  this.cardList = cardList;
  this.remaining = remaining;

};

export default CardManager;