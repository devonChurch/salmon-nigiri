const $ = require('jquery');

const PlayerTwo = class {

    constructor(Reversi, Game) {

        this.Reversi = Reversi;
        this.Game = Game;
        this.color = 'blue';

    }

    choosePossibility(possibilities) {

        possibilities = this.sortPossibilities(possibilities);
        possibilities = this.findPrioritySet(possibilities);
        const selection = this.pickPriorityTile(possibilities);

        this.Game.Placement.performPlacement(possibilities[selection], this.color);

    }

    sortPossibilities(possibilities) {

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

    findPrioritySet(priorities) {

        const keys = Object.keys(priorities);
        let max = 0;

        for (let key of keys) {

            key = parseInt(key, 10);
            max = key > max ? key : max;

        }
        
        return priorities[max];

    }

    pickPriorityTile(priority) {

        const max = priority.length;

        return this.Reversi.Helper.randomise({max});

    }

};

module.exports = PlayerTwo;
