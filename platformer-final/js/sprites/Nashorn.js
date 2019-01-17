(function (global) {
    var Nashorn = function (game, x, y) {
        Phaser.Sprite.call(this, game, x, y, 'nashorn');
        this.scale.x = -1; //flipped
        this.anchor.setTo(0.5, 1); //so it flips around its middle
        this.animations.add('walk', [0, 1], 10, true);
        //this.animations.add('idle', [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4], 10, true);
        //this.animations.add('respawn', [2, 8], 10, true);
        this.game = game;
    };
    Nashorn.prototype = Object.create(Phaser.Sprite.prototype);
    Nashorn.prototype.constructor = Nashorn;
    Nashorn.prototype.create = function () {
        console.log('nashorn create');
    };
    Nashorn.prototype.update = function () {
                this.animations.play('walk');

    };
    window.Nashorn = Nashorn;

})(this);
