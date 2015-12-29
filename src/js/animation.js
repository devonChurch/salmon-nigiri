const $ = require('jquery');

const Animation = class {

    constructor(Reversi) {

        this.Reversi = Reversi;

    }

    flipTile($tile, from, to) {

        $tile
            .removeClass('tile--flip')
            .attr({
                'data-color-from': from,
                'data-color-to': to
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

            this.flipTile($tile, 'white', 'gray');

        }

    }

    resetPossibilities() {

        const $tiles = this.Reversi.Board.$wrapper.find('> .tile[data-color-to="gray"]');

        for (let i = 0; i < $tiles.length; i += 1) {

            const $tile = $tiles.eq(i);

            this.flipTile($tile, 'gray', 'white');

        }

    }

};

module.exports = Animation;
