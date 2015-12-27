const $ = require('jquery');

const PlayerOne = class {

    constructor(Reversi, Game) {

        this.Reversi = Reversi;
        this.Board = Reversi.Board;
        this.Game = Game;

    }

    activateListeners(possibilities) {

        const keys = Object.keys(possibilities);

        this.Board.$wrapper
            .on('mouseenter.playerOne', 'button', (e) => {

                if (this.tileRelevance(keys)) this.tileEnter(e);

            }).on('mouseleave.playerOne', 'button', (e) => {

                if (this.tileRelevance(keys)) this.tileLeave(e);

            }).on('click.playerOne', 'button', (e) => {

                if (this.tileRelevance(keys)) this.tileClick(e, possibilities);

            });

    }

    tileRelevance(keys) {

        // console.log(`chacking relevance!`);

        // callback.call(this);
        // callback();

        return true;

    }

    tileEnter() {

        // console.log('tile enter');


    }

    tileLeave() {

        // console.log('tile leave');


    }

    tileClick(e, possibilities) {

        const key = $(e.currentTarget).attr('id');
        const selection = {[key]: possibilities[key]};

        this.Game.Placement.performPlacement(selection);
        this.deactivateListeners();


    }

    deactivateListeners() {

        this.Board.$wrapper.off('.playerOne');

    }

};

module.exports = PlayerOne;
