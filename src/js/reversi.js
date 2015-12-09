const Board = require('./board');

const Reversi = class {

    constructor() {

        this.board = new Board(this);

    }

};

module.exports = new Reversi();
