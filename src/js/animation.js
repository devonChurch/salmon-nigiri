const $ = require('jquery');

const Animation = class {

    constructor(Reversi) {

        this.Reversi = Reversi;

    }

    flipTile($tile, color) {

        // Activates the flip animation of a tile setting its current color to
        // the bottom and replacing it with the new supplied color parameter.

        $tile
            .removeClass('tile--flip')
            .attr({
                'data-color-from': $tile.attr('data-color-to'),
                'data-color-to': color
            });

        // We add a small delay so the DOM has time to update before we add the
        // class back onto the targeted element.

        setTimeout(() => {

            $tile.addClass('tile--flip');

        }, 100);

    }

    illustratePossibilities(possibilities) {

        // Set all current possible tiles (tiles that will yield a result) for
        // the current turn from white to gray.

        const keys = Object.keys(possibilities);
        const $wrapper = this.Reversi.Board.$wrapper;

        for (let key of keys) {

            const $tile = $wrapper.find(`> #${key}`);

            this.flipTile($tile, 'gray');

        }

    }

    resetPossibilities() {

        // Turn all gray “helper” tiles back to their generic while states.

        const $tiles = this.Reversi.Board.$wrapper.find('> .tile[data-color-to="gray"]');

        for (let i = 0; i < $tiles.length; i += 1) {

            const $tile = $tiles.eq(i);

            this.flipTile($tile, 'white');

        }

    }

};

module.exports = Animation;
