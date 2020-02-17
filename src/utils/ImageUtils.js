// import the cards images
import backcard from '../img/backcard.jpg';
import cats from '../img/cats.jpg';
import chicken from '../img/chicken.jpg';
import computer from '../img/computer.jpg';
import dory from '../img/dory.jpg';
import hero from '../img/hero.jpg';
import mwt from '../img/mwt.jpg';
import robot from '../img/robot.jpg';
import rose from '../img/rose.jpg';
import sun from '../img/sun.jpg';
import tree from '../img/tree.jpg';

/**
 * Wrapper for card images
 *
 * @param image The image path
 * @constructor
 */
let Image = function (image) {
    this.url = image;
    this.name = image.replace('.jpg', '').replace('images/', '');
};

/**
 * Object that deals with images
 *
 * @constructor
 */
let ImageUtils = function () {
    this.images = [cats, chicken, computer, dory, hero, mwt, robot, rose,
        sun, tree];
};

ImageUtils.prototype = {

    // return a random picked image
    getFrontCard: function () {
        let index = Math.floor(Math.random() * this.images.length);
        let image = this.images[index];
        this.images.splice(index, 1);

        return new Image(image);
    },

    // return the backcard image
    getBackCard: function () {
        return new Image(backcard);
    },
};

export default ImageUtils;