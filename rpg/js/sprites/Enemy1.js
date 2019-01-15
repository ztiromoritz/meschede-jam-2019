(function (global) {
    var LEFT = true;
    var RIGHT = false;
    var Enemy1 = function (game, x, y) {
        Phaser.Sprite.call(this, game, x, y, 'enemy1');

        this.animations.add('idle', [0, 1], 4, true);
        this.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
        this.animations.play('walk');
        
        this.scale.x = -1; //flipped
        this.game = game;
    };

    Enemy1.prototype = Object.create(Phaser.Sprite.prototype);
    Enemy1.prototype.constructor = Enemy1;

    Enemy1.prototype.update = function () {
        
    };

    global.Enemy1 = Enemy1;

})(this);
