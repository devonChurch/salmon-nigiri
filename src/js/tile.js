const $ = require('jquery');
const sprite = require('./sprite');

const Tile = class {

    constructor(Reversi, Board) {

        this.Reversi = Reversi;
        this.Board = Board;
        this.tileSize = 100;
        this.spriteHeight = 140;
        this.frames = 13;

    }

    generateTile(i, j) {

        // Build out all 64 individual tiles and place them onto the board. The
        // board has a certain color arrangement when a new game starts so we
        // accomodate that during the looping process.

        // const color = this.tileColor(i, j);
        const svg = this.generateSvg(i, j);
        const $tile = this.injectTile(svg);
        // this.activateTile(i, j, color, $tile);

    }

    generateSvg(i, j) {

        // Creating the SVG scaffold and adding in any unique properties.

        return `
            <button id="${j}-${i}" class="tile">

                <svg class="tile__hole" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" viewBox="0 0 ${this.tileSize} ${this.spriteHeight}" xml:space="preserve">
                    <path class="tile__hole__side" d="M90,140H10V35c0-2.8,2.2-5,5-5h70c2.8,0,5,2.2,5,5V140z"/>
                    <path class="tile__hole__drop" d="M90,140H10V46.2c0-3.4,2.2-6.2,5-6.2h70c2.8,0,5,2.8,5,6.2V140z"/>
                </svg>

                <div class="tile__mask">

                    <svg class="tile__sprite" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${this.frames * this.tileSize} ${this.spriteHeight}" xml:space="preserve">
                        ${this.generateFrames()}
                    </svg>

                </div>

                <svg class="tile__base" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${this.tileSize} ${this.spriteHeight}" xml:space="preserve">
                    <path d="M90,105c0,2.8-2.2,5-5,5H15c-2.8,0-5-2.2-5-5V70H0v70h100V70H90V105z"/>
                </svg>

            </button>
        `;

    }

    generateFrames() {

        // Builds out the frames for the tile “flip” animation by taking the SVG
        // data from the sprite module’s array.

        let frames = '';

        for (let i = 0; i < this.frames; i += 1) {

            frames += sprite[i];

        }

        return frames;

    }

    injectTile(svg) {

        // Place the tile on the board.

        const $tile = $(svg);

        this.Board.$wrapper.append($tile);

        return $tile;

    }

    activateTile(i, color, $tile) {

        // Flip each tile independently once  it has been added to the DOM. We
        // use a delay to create a sweeping motion going diagonally from the
        // Left, Top corner to the Bottom, Right corner of the board.

        const delay = 1000 / this.Board.tally * 2 * (i + 1);

        setTimeout(() => {

            this.Reversi.Animation.flipTile($tile, 'white', color);
            this.activationCallback(i);

        }, delay);

    }

    activationCallback(i) {

        // To make sure we do not start the game before the “flip” intro
        // animations are finished we run  quick check upon each animation call
        // to see if we are targeting the last tile on the board.

        const total = Math.pow(this.Board.tally, 2);

        if (i + 1 === total) {

            setTimeout(() => {

                this.Reversi.Game.startTurn();

            }, 1000);

        }

    }


    tileColor(i) {

        // Checks what tile is currently being referenced and decides what color
        // it needs to be in order to create the starting tile configuration.

        // return i === 27 || i === 36 ? 'green' : i === 28 || i === 35 ? 'blue' : 'white';

        return i === 0 ? 'green' : i === 1 || i === 2 ? 'blue' : 'white';

    }

};

module.exports = Tile;
