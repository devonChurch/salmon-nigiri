const $ = require('jquery');
const Placement = require('./placement');
const PlayerOne = require('./player-one');
const PlayerTwo = require('./player-two');

const Game = class {

    constructor(Reversi) {

        this.Reversi = Reversi;
        this.Placement = new Placement(Reversi,  this);
        this.PlayerOne = new PlayerOne(Reversi,  this);
        this.PlayerTwo = new PlayerTwo(Reversi,  this);
        this.i = this.randomiseTurn();
        this.startGame();

    }

    randomiseTurn() {

        return this.Reversi.Helper.randomise({max: 1});

    }

    get player() {

        return this.i % 2 === 0 ? 'PlayerOne' : 'PlayerTwo';

    }

    startGame() {

        console.log('Starting game');
        console.log(`It's ${this.player}'s turn'`);

        this.startTurn();

    }

    startTurn() {

        const placements = this.Placement.findPossibilities();

    }

    endTurn() {

        // Stuff...

        this.i += 1;

    }

    endGame() {


    }

};

module.exports = Game;
