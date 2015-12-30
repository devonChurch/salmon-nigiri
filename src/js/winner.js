const $ = require('jquery');

const Winner = class {

    constructor(Reversi, Game) {

        this.Reversi = Reversi;
        this.Game = Game;

    }

    congratulations() {

        this.toggleUi('add');
        const winner = this.chooseWinner();
        this.alertWinner(winner);

    }

    toggleUi(action) {

        action = action === 'add' ? 'attr' : 'removeAttr';

        this.Reversi.$wrapper[action]('data-winner', 'none');

    }

    chooseWinner() {

        //

        const tally = this.Reversi.Tally.examineBoard();
        return tally['green'] > tally['blue'] ? 'PlayerOne' : 'PlayerTwo';

    }

    alertWinner(winner) {

        setTimeout(() => {

            this.addWinnerAttribute(winner);
            this.activateReplayCta();

        }, 2000);

    }

    activateReplayCta() {

        this.Reversi.$wrapper.one('click', () => {

            this.removeWinnerAttribute();
            this.Game.startGame();

        });

    }

    addWinnerAttribute(winner) {

        this.Reversi.$wrapper.attr('data-winner', winner);

    }

    removeWinnerAttribute() {

        this.Reversi.$wrapper.removeAttr('data-winner');

    }

};

module.exports = Winner;
