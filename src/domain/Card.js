import {clearImageInHTMLElement, setImageInHTMLElement, setStyle} from '../utils/helpers';

let Card = function (id, frontCard, backCard) {
    let div;
    let front, back;

    let _this = this;

    // init function
    let init = (function () {

        //
        // init variables and bind listeners
        //
        div = document.createElement('div');
        front = document.createElement('div');
        back = document.createElement('div');
        div.appendChild(front);
        div.appendChild(back);

        // set id, frontCard, backCard
        if (id && frontCard && backCard) {
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
        this.setStyle(div, {
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
            'height': '100%',
            'width': '100%',

            'backface-visibility': 'hidden',
            '-webkit-backface-visibility': 'hidden',
            '-moz-backface-visibility': 'hidden',
            '-o-backface-visibility': 'hidden',
            '-ms-backface-visibility': 'hidden',
        });

        this.setStyle(front, {
            'position': 'absolute',
            'height': '100%',
            'width': '100%',

            'backface-visibility': 'hidden',
            '-webkit-backface-visibility': 'hidden',
            '-moz-backface-visibility': 'hidden',
            '-o-backface-visibility': 'hidden',
            '-ms-backface-visibility': 'hidden',

            'transform': 'rotateY(180deg)',
            '-webkit-transform': 'rotateY(180deg)',
            '-moz-transform': 'rotateY(180deg)',
            '-o-transform': 'rotateY(180deg)',
            '-ms-transform': 'rotateY(180deg)',
        });

    }).bind(this);


    //
    // card functions creation
    //
    this.attach = function (parentElem) {
        parentElem.appendChild(div);
    };

    this.detach = function () {
        // clear card images
        this.clearImageInHTMLElement(front);
        this.clearImageInHTMLElement(back);

        this.setStyle(div, {
            'border': 'none',
        });

        removeHoverEffect();
        div.removeEventListener('chosen', listenerFunctionOver);
        div.removeEventListener('reject', listenerFunctionOut);
        removeClickEffect();

        div.setAttribute('removed', 'removed');
        console.log('detach');
    };

    this.setImages = function (frontCard, backCard) {
        div.setAttribute('cardimage', frontCard.name);

        this.setImageInHTMLElement(back, backCard);
        this.setImageInHTMLElement(front, frontCard);
    };

    this.setId = function (id) {
        this.id = id;
        div.setAttribute('id', this.id);
    };

    this.handleEvent = function (eventType, callBack) {
        div.addEventListener(eventType, callBack.bind(null, _this));
    };


    //
    // behavioural functions
    //
    let chosen = function () {
        hoverEffect();
        div.removeEventListener('mouseover', listenerFunctionOver);
        div.removeEventListener('mouseout', listenerFunctionOut);
        clickEffect();

        console.log('chosen');
    };

    let reject = function () {
        removeHoverEffect();
        div.addEventListener('mouseover', listenerFunctionOver, false);
        div.addEventListener('mouseout', listenerFunctionOut, false);
        removeClickEffect();
        console.log('reject');
    };


    // listeners functions definition
    let listenerFunctionOver = () => {
        hoverEffect();
    };

    let listenerFunctionOut = () => {
        removeHoverEffect();
    };

    let listenerFunctionChosen = () => {
        chosen();
    };

    let listenerFunctionReject = () => {
        reject();
    };

    //
    // graphical effects functions
    //

    // click effect functions
    let clickEffect = () => {
        console.log('restore click');
        this.setStyle(div, {
            'transform': 'scale(.97)',
            '-webkit-transform': 'scale(.97)',
            '-moz-transform': 'scale(.97)',
            '-o-transform': 'scale(.97)',
            '-ms-transform': 'scale(.97)',
        });
        flip();
    };

    let removeClickEffect = () => {
        console.log('remove click');
        this.setStyle(div, {
            'transform': 'none',
            '-webkit-transform': 'none',
            '-moz-transform': 'none',
            '-o-transform': 'none',
            '-ms-transform': 'none',
        });
    };

    // flip effect
    let flip = () => {
        console.log('flip');
        this.setStyle(div, {
            'transform': 'rotateY(180deg)',
            '-webkit-transform': 'rotateY(180deg)',
            '-moz-transform': 'rotateY(180deg)',
            '-o-transform': 'rotateY(180deg)',
            '-ms-transform': 'rotateY(180deg)',
        });
    };

    // hover effect functions
    let hoverEffect = () => {
        console.log('hover effect');
        this.setStyle(div, {
            'transform': 'scale(1.1)',
            '-webkit-transform': 'scale(1.1)',
            '-moz-transform': 'scale(1.1)',
            '-o-transform': 'scale(1.1)',
            '-ms-transform': 'scale(1.1)',
        });
    };

    let removeHoverEffect = () => {
        console.log('remove hover effect');
        this.setStyle(div, {
            'transform': 'scale(1)',
            '-webkit-transform': 'scale(1)',
            '-moz-transform': 'scale(1)',
            '-o-transform': 'scale(1)',
            '-ms-transform': 'scale(1)',
        });
    };

    // call to init
    init();
};

Card.prototype = {
    setStyle: setStyle,
    setImageInHTMLElement: setImageInHTMLElement,
    clearImageInHTMLElement: clearImageInHTMLElement,
};

export default Card;