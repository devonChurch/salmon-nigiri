const $ = require('jquery');

const Tally = class {

    constructor(Reversi) {

        this.Reversi = Reversi;
        this.$playerOne = Reversi.$wrapper.find('> .tally--one');
        this.$playerTwo = Reversi.$wrapper.find('> .tally--two');

    }

    update() {

        // get colors
        // set up each player
        // split digit
        // set digits

        const colors = this.examineBoard();
        console.log(`colors`);
        console.log(colors);

        this.setTally(colors);

    }

    examineBoard() {

        const tiles = this.Reversi.Board.tiles;
        const keys = Object.keys(tiles);
        const colors = {};

        for (let key of keys) {

            const color = tiles[key];

            if (color !== 'white') colors[color] = colors.hasOwnProperty(color) ? colors[color] += 1 : colors[color] = 1;

        }

        return colors;

    }

    setTally(colors) {

        const keys = Object.keys(colors);

        for (let key of keys) {

            const $tally = key === 'green' ? this.$playerOne : this.$playerTwo;
            const color = colors[key];
            const digits = this.splitDigits(color);

            this.setDigits($tally, digits);

        }

    }

    splitDigits(color) {

        color = `${color}`.length < 2 ? `0${color}` : `${color}`;

        const digits = [];

        for (let i = 0; i < color.length; i += 1) {

            digits[i] = color.substr(i, i + 1);
        }

        return digits;

    }

    setDigits($tally, digits) {

        console.log('convert these numbers...');
        console.log(digits);

        for (let i = 0; i < digits.length; i += 1) {

            $tally.attr(`data-digit-${i}`, digits[i]);

        }

    }

};

module.exports = Tally;
