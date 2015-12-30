const $ = require('jquery');
const Placement = require('./placement');
const PlayerOne = require('./player-one');
const PlayerTwo = require('./player-two');
const Winner = require('./winner');

const Game = class {

    constructor(Reversi) {

        this.Reversi = Reversi;
        this.i = this.randomiseTurn();
        this.Placement = new Placement(Reversi, this);
        this.PlayerOne = new PlayerOne(Reversi, this);
        this.PlayerTwo = new PlayerTwo(Reversi, this);
        this.Winner = new Winner(Reversi, this);
        this.startGame();

    }

    randomiseTurn() {

        return this.Reversi.Helper.randomise({max: 1});

    }

    startGame() {

        this.setCurrentPlayer('none');
        this.Reversi.Board.resetBoard();
        this.Reversi.Tally.resetTally();

    }

    startTurn() {

        this.Reversi.Board.replicateBoard();
        this.Reversi.Tally.update();
        this.Placement.findPossibilities();

    }

    endTurn() {

        setTimeout(() => {

            this.i += 1;
            this.startTurn();

        }, 1000);

    }

    endGame() {

        this.Reversi.Board.replicateBoard();
        this.Reversi.Tally.update();
        this.setCurrentPlayer('none');
        this.Winner.congratulations();

    }

    noPossibilities() {

        const action = !this.PlayerOne.relevant && !this.PlayerTwo.relevant ? 'endGame' : 'endTurn';

        this[action]();

    }

    setCurrentPlayer(player) {

        this.Reversi.$wrapper.attr('data-turn', player);

    }

};

module.exports = Game;
