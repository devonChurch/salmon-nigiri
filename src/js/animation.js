const $ = require('jquery');

const Animation = class {

    constructor(Reversi) {

        this.Reversi = Reversi;

    }

    flipTile($tile, color) {

        $tile
            .removeClass('tile--flip')
            .attr({
                'data-color-from': $tile.attr('data-color-to'),
                'data-color-to': color
            });

        setTimeout(() => {

            $tile.addClass('tile--flip');

        }, 100);

    }

    illustratePossibilities(possibilities) {

        const keys = Object.keys(possibilities);
        const $wrapper = this.Reversi.Board.$wrapper;

        for (let key of keys) {

            const $tile = $wrapper.find(`> #${key}`);

            this.flipTile($tile, 'gray');

        }

    }

    resetPossibilities() {

        const $tiles = this.Reversi.Board.$wrapper.find('> .tile[data-color-to="gray"]');

        for (let i = 0; i < $tiles.length; i += 1) {

            const $tile = $tiles.eq(i);

            this.flipTile($tile, 'white');

        }

    }

};

module.exports = Animation;
