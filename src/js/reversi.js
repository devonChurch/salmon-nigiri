const $ = require('jquery');
const Helper = require('./helper');
const Board = require('./board');
const Game = require('./game');
const Animation = require('./animation');
const Tally = require('./tally');

const Reversi = class {

    constructor() {

        this.$wrapper = $('#reversi');
        this.Helper = new Helper(this);
        this.Board = new Board(this);
        this.Game = new Game(this);
        this.Animation = new Animation(this);
        this.Tally = new Tally(this);

    }

};

module.exports = new Reversi();
