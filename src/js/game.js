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

        //
        //
        //
        this.startGame();

    }

    randomiseTurn() {

        return this.Reversi.Helper.randomise({max: 1});

    }

    startGame() {

        console.log('Starting game');

        this.setCurrentPlayer('none');
        this.Reversi.Board.resetBoard();
        // this.startTurn();

    }

    startTurn() {

        console.log('');
        console.log('* * * * * * * * * * * * * * * * * * * * * * * * * * * * ');
        console.log('* * * * * * * * * * * * * * * * * * * * * * * * * * * * ');
        console.log('* * * * * * * * * * * * * * * * * * * * * * * * * * * * ');
        console.log('');

        this.Reversi.Board.replicateBoard();
        this.Reversi.Tally.update();

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

        console.log('Ending game');

        this.Reversi.Board.replicateBoard();
        this.Reversi.Tally.update();
        this.setCurrentPlayer('none');
        this.Winner.congratulations();

    }

    noPossibilities() {

        console.log(`no possibile moves for ${this.Reversi.Helper.player}`);

        // no white tiles = game over
        // no moves for one player = move onto opponents turn
        // no moves for either player = game over

        console.log(`status = ${this.PlayerOne.relevant} ${this.PlayerTwo.relevant}`);

        const action = !this.PlayerOne.relevant && !this.PlayerTwo.relevant ? 'endGame' : 'endTurn';

        this[action]();

    }

    setCurrentPlayer(player) {

        this.Reversi.$wrapper.attr('data-turn', player);

    }

};

module.exports = Game;
