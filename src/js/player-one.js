const $ = require('jquery');

const PlayerOne = class {

    constructor(Reversi, Game) {

        this.Reversi = Reversi;
        this.Board = Reversi.Board;
        this.Game = Game;
        this.relevant = true; // set via this.Reversi.Game.Placement.utilisePossibilities();

    }

    startTurn(possibilities) {

        // Show the possible tile options for the human player and add event
        // listeners to these applicable options.

        this.Reversi.Animation.illustratePossibilities(possibilities);
        this.activateListeners(possibilities);

    }

    endTurn() {

        // Reset the gray option tiles back to white and remove any unused tile
        // event listeners.

        this.Reversi.Animation.resetPossibilities();
        this.deactivateListeners();

    }

    activateListeners(possibilities) {

        this.Board.$wrapper.one('click.playerOne', 'button[data-color-to="gray"]', (e) => this.tileClick(e, possibilities));

    }

    tileClick(e, possibilities) {

        // Get the properties for the selected tile in this turn so that the
        // appropriate placements can be made to the board.

        const key = $(e.currentTarget).attr('id');
        const selection = {[key]: possibilities[key]};

        this.Game.Placement.performPlacement(selection);
        this.endTurn();

    }

    deactivateListeners() {

        this.Board.$wrapper.off('.playerOne');

    }

};

module.exports = PlayerOne;
