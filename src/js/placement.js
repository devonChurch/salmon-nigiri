const $ = require('jquery');

const Placement = class {

    constructor(Reversi, Game) {

        this.Reversi = Reversi;
        this.Board = Reversi.Board;
        this.Game = Game;
        this.directions = this.generateDirections();

    }

    generateDirections() {

        // Depicts the eight directions that each tile can be effected by.
        //
        // -> ‘+’ = Up / Right
        // -> ‘-’ = Down / Left
        // -> ‘ ‘ = No offfset

        return [
            {x: ' ', y: '+'},  // Up
            {x: '+', y: '+'},  // Right, Up
            {x: '+', y: ' '},  // Right
            {x: '+', y: '-'},  // Right, Down
            {x: ' ', y: '-'},  // Down
            {x: '-', y: '-'},  // Left, Down
            {x: '-', y: ' '},  // Left
            {x: '-', y: '+'}   // Left, Up
        ];

    }

    findPossibilities() {

        // Finding all possible placement possibilities for the current turn and
        // use them for either player one or two's functionality.

        const possibilities = {};
        const keys = Object.keys(this.Board.tiles);

        for (let key of keys) {

            const tile = this.tileProperties(key);
            const matches = tile.color === 'white' ? this.placementRelevance(tile) : false;

            if (matches) possibilities[key] = matches;

        }

        this.utilisePossibilities(possibilities);

    }

    utilisePossibilities(possibilities) {

        // Ping either player one or two with the possible tile references to be
        // utilised in their player specific scenarios.

        const player = this.Reversi.Helper.player;

        this.Game[player].startTurn(possibilities);

    }

    tileProperties(key) {

        // Get the properties for the current tile being cross-referenced to
        // find it’s relevance.

        const coordinates = key.split('-');
        const x = coordinates[0];
        const y = coordinates[1];

        return {
            color: this.Board.tiles[key],
            x: parseInt(x, 10),
            y: parseInt(y, 10)
        };

    }

    placementRelevance(tile) {

        // Loop through each of the eight possible directions that can influence
        // this tile via its siblings. If there are any matches then re return
        // them back to be added into the possibilities.

        let flip = [];

        for (let direction of this.directions) {

            const matches = this.siblingRelevance(tile, direction);
            if (matches) flip = flip.concat(matches);

        }

        return flip.length > 0 ? flip : false;

    }

    siblingRelevance(properties, direction) {

        // Cross reference the tiles in the current direction making sure that
        // as the tiles coordinates move away from the original white tile their
        // colors are always the opponents hue. Once this is not the case we
        // check the current tile that did not meet the criteria of the wile
        // loop - if it is the players color then we have a successful match
        //
        // i.e. [original white tile selection] —> [x * tiles with opponents
        // color] —> [bookend tiles with the players color].

        const match = this.Reversi.Helper.opponentColor;
        const flip = [];

        let x = properties.x;
        let y = properties.y;
        let color = this.Reversi.Helper.opponentColor;

        do {

            x = direction.x === '-' ? x -= 1 : direction.x === '+' ? x += 1 : x;
            y = direction.y === '-' ? y -= 1 : direction.y === '+' ? y += 1 : y;

            let key = `${x}-${y}`;
            color = this.Board.tiles.hasOwnProperty(key) ? this.Board.tiles[key] : 'white';

            if (color === match) { flip.push(key); }

        } while (color === match);

        return flip.length > 0 && color === this.Reversi.Helper.playerColor ? flip : false;

    }

    performPlacement(selection) {

        // Xxxxxxx.

        console.log('');
        console.log('selection sent through for placement');
        console.log(selection);

        const tiles = this.consolidateSelection(selection);

        console.log('');
        console.log('tiles to change');
        console.log(tiles);

        console.log('');
        console.log(`TILE UPDATES: (player color = ${this.Reversi.Helper.playerColor})`);
        for (let tile of tiles) {

            const $tile = $(`#${tile}`);
            const from = $tile.attr('data-color-to');
            const to = this.Reversi.Helper.playerColor;
            this.Reversi.Animation.flipTile($tile, from, to);
            // this.Board.tiles[tile] = to;
            // console.log('');
            console.log(`Changing ${tile} to ${to}`);
            // console.log(this.Board.tiles);

        }
        console.log('');

        this.Game.endTurn();

    }

    consolidateSelection(selection) {

        // Xxxxxxx.

        const key = Object.keys(selection);
        const tiles = [`${key}`];

        for (let i = 0; i < selection[key].length; i += 1) {

            tiles.push(selection[key][i]);

        }

        return tiles;

    }

};

module.exports = Placement;
