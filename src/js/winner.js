const $ = require('jquery');

const Winner = class {

    constructor(Reversi, Game) {

        this.Reversi = Reversi;
        this.Game = Game;
        this.$replay = this.Reversi.$wrapper.find('> #replay');

    }

    congratulations() {

        // Sets the events in motion to determine a winner of the current game.

        this.addWinnerAttribute('none');
        const winner = this.chooseWinner();
        this.alertWinner(winner);

    }

    chooseWinner() {

        // Looks the tile tally to find which player has the most of their
        // respective coloured tiles on the board.

        const tally = this.Reversi.Tally.examineBoard();
        return tally['green'] > tally['blue'] ? 'PlayerOne' : 'PlayerTwo';

    }

    alertWinner(winner) {

        // Notifies the outcome of the game and prompts the replay button to be
        // brought into view. The delay lets the CSS animations play out along
        // with a pause to maintain consistent pacing.

        setTimeout(() => {

            this.addWinnerAttribute(winner);
            this.activateReplayCta();

        }, 2000);

    }

    activateReplayCta() {

        // Adds in the one time click event that will prompt the game to restart
        // into a fresh state. The delay give the user time to absorb the winner
        // of the current game before being promoted to replay.

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
