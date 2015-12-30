const $ = require('jquery');

const PlayerOne = class {

    constructor(Reversi, Game) {

        this.Reversi = Reversi;
        this.Board = Reversi.Board;
        this.Game = Game;
        this.relevant = true;

    }

    startTurn(possibilities) {

        this.Reversi.Animation.illustratePossibilities(possibilities);
        this.activateListeners(possibilities);

    }

    endTurn() {

        this.Reversi.Animation.resetPossibilities();
        this.deactivateListeners();

    }

    activateListeners(possibilities) {

        this.Board.$wrapper.on('click.playerOne', 'button[data-color-to="gray"]', (e) => this.tileClick(e, possibilities));

    }

    tileClick(e, possibilities) {

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
