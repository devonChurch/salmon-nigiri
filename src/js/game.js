const $ = require('jquery');
const Placement = require('./placement');
const PlayerOne = require('./player-one');
const PlayerTwo = require('./player-two');
const Winner = require('./winner');

const Game = class {

    constructor(Reversi) {

        this.Reversi = Reversi;
        this.i = null; // set via this.randomiseTurn();
        this.Placement = new Placement(Reversi, this);
        this.PlayerOne = new PlayerOne(Reversi, this);
        this.PlayerTwo = new PlayerTwo(Reversi, this);
        this.Winner = new Winner(Reversi, this);
        this.startGame();

    }

    randomiseTurn() {

        // Randomly picks what player will start the game.

        this.i = this.Reversi.Helper.randomise({max: 1});

    }

    startGame() {

        // Sets up the conditions for a new game (on load or on replay).

        this.randomiseTurn();
        this.setCurrentPlayer('none');
        this.Reversi.Board.resetBoard();
        this.Reversi.Tally.resetTally();

    }

    startTurn() {

        // Keeps the game conditions in sync for the start of each players turn.

        this.Reversi.Board.replicateBoard();
        this.Reversi.Tally.update();
        this.Placement.findPossibilities();

    }

    endTurn() {

        // Ends the current layers turn. The turn incremented (i) is added to so
        // that the this.Revers.Helper.player getter can determine who’s turn it
        // is next. A delay is given to this functions execution to emulate a
        // more natural game pace.

        setTimeout(() => {

            this.i += 1;
            this.startTurn();

        }, 1000);

    }

    endGame() {

        // Ends the current game and informs the user of the winner along with
        // an option to play again.

        this.Reversi.Board.replicateBoard();
        this.Reversi.Tally.update();
        this.setCurrentPlayer('none');
        this.Winner.congratulations();

    }

    noPossibilities() {

        // Decides the corse of action when a current player has no options to
        // play this turn. In this situation we move onto the next player and if
        // they also have no possible tiles moves to make then the game is
        // officially over either by stalemate or the board is full with
        // coloured tiles.

        const action = !this.PlayerOne.relevant && !this.PlayerTwo.relevant ? 'endGame' : 'endTurn';

        this[action]();

    }

    setCurrentPlayer(player) {

        // Updates the DOM with the current player status. This changes the UI’s
        // emphasis of each tally element.

        this.Reversi.$wrapper.attr('data-turn', player);

    }

};

module.exports = Game;
