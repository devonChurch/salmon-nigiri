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

            this.Reversi.$wrapper.attr('data-winner', winner);

        }, 2000);

    }

};

module.exports = Winner;
