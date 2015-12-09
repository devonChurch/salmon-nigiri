const $ = require('jquery');
const Tile = require('./tile');

const Board = class {

    constructor(Reversi) {

        this.Reversi = Reversi;
        this.$wrapper = $('#board');
        this.tally = 8;

        this.tiles = this.generateTiles();

    }

    generateTiles() {

        const instances = {};

        for (let i = 0; i < this.tally; i += 1) {

            instances[i] = {};

            for (let j = 0; j < this.tally; j += 1) {


                instances[i][j] = new Tile(this, i, j);

            }

        }

        console.log(instances);

        return instances;
    }

};

module.exports = Board;
