const $ = require('jquery');
const Tile = require('./tile');

const Board = class {

    constructor(Reversi) {

        this.Reversi = Reversi;
        this.Tile = new Tile(Reversi, this);

        this.$wrapper = $('#board');
        this.tally = 8;
        this.tiles = null;
        this.generateTiles();
        this.$tiles = this.$wrapper.find('> .tile');

    }

    generateTiles() {

        for (let i = 0; i < this.tally; i += 1) {

            for (let j = 0; j < this.tally; j += 1) {


                this.Tile.generateTile(i, j);

            }

        }

    }

    replicateBoard() {

        const tiles = {};
        const $tiles = this.$tiles;
        const length = Math.pow(this.tally - 1, 2);

        // console.log('');
        // console.log('Replicating board:');

        for (let i = 0; i < length; i += 1) {

            const $tile = $tiles.eq(i);
            const key = $tile.attr('id');
            const color = $tile.attr('data-color-to');

            // console.log(`${key} = ${color}`);

            tiles[key] = color;

        }
        // console.log('');

        this.tiles = tiles;

    }

};

module.exports = Board;
