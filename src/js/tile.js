const $ = require('jquery');
const sprite = require('./sprite');

const Tile = class {

    constructor(Board, i, j) {

        this.Board = Board;
        this.i = i;
        this.j = j;
        this.tileSize = 100;
        this.spriteHeight = 140;
        this.frames = 13;

        this.tile = $(this.generateTile());
        this.injectTile();
        this.activateTile();

    }

    generateTile() {

        return `
            <button class="tile tile--dormant" ${this.tileColor()}>

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

        let frames = '';

        for (let i = 0; i < this.frames; i += 1) {

            frames += sprite[i];

        }

        return frames;

    }

    injectTile() {

        this.Board.$wrapper.append(this.tile);

    }

    activateTile() {

        // const delay = Math.random() * 1000;

        setTimeout(() => {

            this.tile.removeClass('tile--dormant');

        }, this.setDelay());

    }

    setDelay() {

        return 1000 / this.Board.tally * 2 * (this.i + this.j);

    }


    tileColor() {

        const tally = (this.i * this.Board.tally) + this.j;
        const layers = tally === 27 ? 'green-to-blue' : tally === 36 ? 'blue-to-green' : null;

        return layers === null ? '' : `data-layers="${layers}"`;

    }

};

module.exports = Tile;
