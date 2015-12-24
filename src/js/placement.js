const $ = require('jquery');

const Placement = class {

    constructor(Reversi, Game) {

        this.Reversi = Reversi;
        this.Board = Reversi.Board;
        this.Game = Game;
        this.directions = this.generateDirections();

    }

    generateDirections() {

        return [
            {x: ' ', y: '+'},  // Up
            {x: '+', y: '+'},  // Left, Up
            {x: '+', y: ' '},  // Left
            {x: '+', y: '-'},  // Left, Down
            {x: ' ', y: '-'},  // Down
            {x: '-', y: '-'},  // Right, Down
            {x: '-', y: ' '},  // Right
            {x: '-', y: '+'}   // Right, Up
        ];

    }

    findPossibilities() {

        console.log('Finding placement possibilities');

        // Needs to be a blank tile
        // Then in any direction we need at least one oppersite color followed by a same color tile

        const possibilities = {};
        const keys = Object.keys(this.Board.tiles);

        for (let key of keys) {

            console.log('');
            console.log('* * * * * * * * * * * * * * * * * * * * * * * * * *');
            console.log(`Looking up ${key}`);
            const tile = this.tileProperties(key);
            const matches = tile.color === 'white' ? this.placementRelevance(tile) : false;
            console.log(tile);

            if (matches) {

                possibilities[key] = matches;
                // add to possibilities array
            }

        }

        console.log(possibilities);

        // chooseCpuTile(possibilities);

    }

    tileProperties(key) {

        const coordinates = key.split('|');
        const x = coordinates[0];
        const y = coordinates[1];

        return {
            color: this.Board.tiles[key],
            x: parseInt(x, 10),
            y: parseInt(y, 10)
        };

    }

    placementRelevance(tile) {

        console.log('  -> Checking directions...');

        let flip = [];

        for (let direction of this.directions) {

            console.log(`    -> direction = ${direction.x} | ${direction.y}`);
            const matches = this.siblingRelevance(tile, direction);
            console.log(`       ${matches}`);

            if (matches) { flip = flip.concat(matches); }



        }

        // console.log(flip);

        return flip.length > 0 ? flip : false;

    }

    siblingRelevance(properties, direction) {

        // Green = Player 1
        // Blue  = CPU

        // a while loop
        //   -> while next dot is blue

        const match = 'green'; // playerTurn ? cpuColor : playerColor;
        const flip = [];

        let x = properties.x;
        let y = properties.y;
        let color = match;

        do {

            x = direction.x === '-' ? x -= 1 : direction.x === '+' ? x += 1 : x;
            y = direction.y === '-' ? y -= 1 : direction.y === '+' ? y += 1 : y;
            let key = `${x}|${y}`;
            color = this.Board.tiles.hasOwnProperty(key) ? this.Board.tiles[key] : 'white';
            // if (tiles.hasOwnProperty(key) && color === match) { console.log(`       ${key} / ${color}`); }
            console.log(`       ${key} / ${color}`);
            if (color === match) { flip.push(key); }

        } while (color === match);

        return flip.length > 0 && color === 'blue' ? flip : false;

    }

};

module.exports = Placement;
