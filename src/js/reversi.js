const Helper = require('./helper');
const Board = require('./board');
const Game = require('./game');
const Animation = require('./animation');

const Reversi = class {

    constructor() {

        this.Helper = new Helper(this);
        this.Board = new Board(this);
        this.Game = new Game(this);
        this.Animation = new Animation(this);

    }

};

module.exports = new Reversi();
