const $ = require('jquery');

const Tally = class {

    constructor(Reversi) {

        this.Reversi = Reversi;
        this.$playerOne = Reversi.$wrapper.find('> .tally--one');
        this.$playerTwo = Reversi.$wrapper.find('> .tally--two');

    }

    update() {

        // Update the players counter in the DOM to relate the current tile
        // tally for each player.

        const tally = this.examineBoard();
        console.log('tally');
        console.log(tally);
        this.setTally(tally);

    }

    examineBoard() {

        // Loop through the JS object version of the board tallying up only the
        // Green (player one) and Blue (player two) tiles.

        const tiles = this.Reversi.Board.tiles;
        const keys = Object.keys(tiles);
        const tally = {green: 0, blue: 0};

        for (let key of keys) {

            const color = tiles[key];

            if (color !== 'white') tally[color] += 1;

        }

        return tally;

    }

    setTally(tally) {

        // Set each players counter to color tally value.

        const keys = Object.keys(tally);

        for (let key of keys) {

            const $tally = key === 'green' ? this.$playerOne : this.$playerTwo;
            const color = tally[key];
            const digits = this.splitDigits(color);

            this.setDigits($tally, digits);

        }

    }

    splitDigits(color) {

        // The counter animation controls each of the two digit in number
        // independently. In that regard we split the current tile tally into
        // two numbers - if the number is only one digit then we append a zero
        // at the front.

        color = `${color}`.length < 2 ? `0${color}` : `${color}`;

        const digits = [];

        for (let i = 0; i < color.length; i += 1) {

            digits[i] = color.substr(i, i + 1);
        }

        return digits;

    }

    setDigits($tally, digits) {

        // Replicate the two split digits into the DOM by altering the data
        // attribute to animate them into place.

        for (let i = 0; i < digits.length; i += 1) {

            $tally.attr(`data-digit-${i}`, digits[i]);

        }

    }

};

module.exports = Tally;
