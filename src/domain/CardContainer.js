import Card from './Card';

let CardContainer = function (context) {
    this.cardList = [];
    this.remaining = 0;
    let _this = this;

    //
    // Functions
    //
    this.createCard = function (id, frontCard, backCard) {
        let card = new Card(id, frontCard, backCard);
        this.cardList.push(card);
        this.remaining++;

        card.handleEvent('removeCard', cardRemoveHandler);

        return card;
    };

    // removeCard handler
    let cardRemoveHandler = function (card) {
        card.removeHandledEvent();
        _this.removeCard(card);
    };

    this.removeCard = function (card) {
        let i;
        for (let index in this.cardList) {
            if (this.cardList[index] === card) {
                i = index;
                break;
            }
        }
        this.cardList.splice(i, 1);
        card.detach();
        this.remaining--;
    };

    this.append = function (card) {
        card.attach(context);
    };
};

export default CardContainer;
