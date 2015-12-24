const Helper = require('./helper');
const Board = require('./board');
const Game = require('./game');

const Reversi = class {

    constructor() {

        this.Helper = new Helper(this);
        this.Board = new Board(this);
        this.Game = new Game(this);

    }

};

module.exports = new Reversi();
