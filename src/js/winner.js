const $ = require('jquery');

const Winner = class {

    constructor(Reversi, Game) {

        this.Reversi = Reversi;
        this.Game = Game;
        this.$replay = this.Reversi.$wrapper.find('> #replay');

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

        setTimeout(() => {

            this.toggleReplayCta('add');

            this.$replay.one('click', () => {

                this.toggleReplayCta('remove');
                this.removeWinnerAttribute();
                this.Game.startGame();

            });

        }, 1000);

    }

    addWinnerAttribute(winner) {

        this.Reversi.$wrapper.attr('data-winner', winner);

    }

    removeWinnerAttribute() {

        this.Reversi.$wrapper.removeAttr('data-winner');

    }

    toggleReplayCta(action) {

        this.$replay[`${action}Class`]('replay--active');

    }

};

module.exports = Winner;
