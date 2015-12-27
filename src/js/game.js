const $ = require('jquery');
const Placement = require('./placement');
const PlayerOne = require('./player-one');
const PlayerTwo = require('./player-two');

const Game = class {

    constructor(Reversi) {

        this.Reversi = Reversi;
        this.Placement = new Placement(Reversi, this);
        this.PlayerOne = new PlayerOne(Reversi, this);
        this.PlayerTwo = new PlayerTwo(Reversi, this);
        this.i = this.randomiseTurn();

    }

    randomiseTurn() {

        return 1; // this.Reversi.Helper.randomise({max: 1});

    }

    startGame() {

        // console.log('Starting game');

        this.startTurn();

    }

    startTurn() {

        console.log('');
        console.log('* * * * * * * * * * * * * * * * * * * * * * * * * * * * ');
        console.log('* * * * * * * * * * * * * * * * * * * * * * * * * * * * ');
        console.log('* * * * * * * * * * * * * * * * * * * * * * * * * * * * ');
        console.log('');

        this.Reversi.Board.replicateBoard();

        console.log(`Starting ${this.Reversi.Helper.player}'s turn`);
        console.log(this.Reversi.Board.tiles);

        this.Placement.findPossibilities();

    }

    endTurn() {

        setTimeout(() => {

            console.log('');
            console.log(`Ending ${this.Reversi.Helper.player}'s turn`);

            this.i += 1;
            this.startTurn();

        }, 1000);

    }

    endGame() {

        // console.log('Ending game');

    }

};

module.exports = Game;
