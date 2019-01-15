(function (global) {
    var LEFT = true;
    var RIGHT = false;
    var Enemy1 = function (game, x, y) {
        Phaser.Sprite.call(this, game, x, y, 'enemy1');
        this.scale.x = 2;
        this.scale.y = 2;

        this.animations.add('idle', [0, 0, 0, 1, 2, 2, 2,2], 4, true);
        this.animations.add('punch', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 8, true);
        //this.animations.play('punch');
        
        //this.scale.x = -1; //flipped
        this.game = game;
    };

    Enemy1.prototype = Object.create(Phaser.Sprite.prototype);
    Enemy1.prototype.constructor = Enemy1;

    Enemy1.prototype.update = function () {
        
    };

    global.Enemy1 = Enemy1;

})(this);
