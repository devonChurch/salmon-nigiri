const $ = require('jquery');

const Helper = class {

	// A series of more “generic” functions uses across the execution.

	constructor(Reversi) {

		this.Reversi = Reversi;

	}

	randomise({min = 0, max}) {

		return Math.floor(Math.random() * (max - min + 1)) + min;

	}

	get boolean() {

		return this.randomise({max: 1}) % 2 === 0 ? false : true;

	}

    get player() {

        return this.Reversi.Game.i % 2 === 0 ? 'PlayerOne' : 'PlayerTwo';

    }

    get playerColor() {

        return this.Reversi.Game.i % 2 === 0 ? 'green' : 'blue';

    }

    get opponentColor() {

        return this.Reversi.Game.i % 2 === 0 ? 'blue' : 'green';

    }

};

module.exports = Helper;
