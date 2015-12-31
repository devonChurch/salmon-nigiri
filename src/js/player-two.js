const $ = require('jquery');

const PlayerTwo = class {

    constructor(Reversi, Game) {

        this.Reversi = Reversi;
        this.Game = Game;
        this.relevant = true; // set via this.Reversi.Game.Placement.utilisePossibilities();

    }

    startTurn(possibilities) {

        this.choosePossibility(possibilities);

    }

    choosePossibility(possibilities) {

        // We need to decide which tile the computer controlled opponent should
        // pick. We are using a simple algorithm to find which tiles yield the
        // highest “flip” total.

        possibilities = this.sortPossibilities(possibilities);
        possibilities = this.findPrioritySet(possibilities);
        const selection = this.pickPriorityTile(possibilities);

        this.Game.Placement.performPlacement(possibilities[selection]);

    }

    sortPossibilities(possibilities) {

        // Sort each tile possibility into sets that relate to how many tiles on
        // the board they will effect.

        const keys = Object.keys(possibilities);
        const priorities = {};

        for (let key of keys) {

            let possibility = possibilities[key];
            let priority = possibility.length;
            if (!priorities.hasOwnProperty(priority)) { priorities[priority] = []; }
            priorities[priority].push({[key]: possibility});

        }

        return priorities;

    }

    findPrioritySet(possibilities) {

        // Find the tiles set in the array that yields the highest “flip” total.

        const keys = Object.keys(possibilities);
        let max = 0;

        for (let key of keys) {

            key = parseInt(key, 10);
            max = key > max ? key : max;

        }

        return possibilities[max];

    }

    pickPriorityTile(possibilities) {

        // From the chosen set randomly pick one of the tile possibilities.

        const max = possibilities.length - 1;

        return this.Reversi.Helper.randomise({max});

    }

};

module.exports = PlayerTwo;
