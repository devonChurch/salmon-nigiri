const $ = require('jquery');
const Tile = require('./tile');

const Board = class {

    constructor(Reversi) {

        this.Reversi = Reversi;
        this.Tile = new Tile(Reversi, this);
        this.$wrapper = this.Reversi.$wrapper.find('#board > .board__ratio');
        this.tally = 8;
        this.generateTiles();
        this.tiles = null; // generated via this.replicateBoard();
        this.$tiles = this.$wrapper.find('> .tile');

    }

    generateTiles() {

        // Build out the DOM content for the 64 tile renditions. Each tile has a
        // zero based x and y key i.e.
        //
        // -> 0-0 = Top, Left
        // -> 0-7 = Top, Right
        // -> 0-7 = Bottom, Left
        // -> 7-7 = Bottom, Right

        for (let i = 0; i < this.tally; i += 1) {

            for (let j = 0; j < this.tally; j += 1) {


                this.Tile.generateTile(i, j);

            }

        }

    }

    resetBoard() {

        // Turns the current arrangement of the tiles on the board back into the
        // original 2x2 setup to start a game.

        const $tiles = this.$tiles;

        for (let i = 0; i < this.tally; i += 1) {

            for (let j = 0; j < this.tally; j += 1) {

                const color = this.Tile.tileColor(i, j);
                const eq = j + (this.tally * i);
                const $tile = $tiles.eq(eq);

                this.Tile.activateTile(i, j, color, $tile);

            }

        }

    }

    replicateBoard() {

        // Loop through the Dom and create an object based on the current status
        // of the board. i.e { 0-0: ‘green’ }. This lets us make informed
        // decisions for the placement of new tiles for each new turn.

        const tiles = {};
        const $tiles = this.$tiles;

        for (let i = 0; i < $tiles.length; i += 1) {

            const $tile = $tiles.eq(i);
            const key = $tile.attr('id');
            const color = $tile.attr('data-color-to');

            tiles[key] = color;

        }

        this.tiles = tiles;

    }

};

module.exports = Board;
