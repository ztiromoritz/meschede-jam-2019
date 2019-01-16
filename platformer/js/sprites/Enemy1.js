(function (global) {
    var LEFT = true;
    var RIGHT = false;
    var Enemy1 = function (game, x, y) {
        Phaser.Sprite.call(this, game, x, y, 'enemy1');

        this.animations.add('idle', [0, 1], 4, true);
        this.animations.add('walk', [0, 1, 2], 8, true);
        this.animations.play('walk');

        game.physics.arcade.enable(this);
        this.body.bounce.y = 0.0;
        //this.body.gravity.y = 600;
        this.body.setSize(32, 130, 0, -100);

        this.scale.x = 3; //flipped
        this.scale.y = 3;
        this.anchor.setTo(0.5, 1);

        this.direction = LEFT;
        this.game = game;
    };

    Enemy1.prototype = Object.create(Phaser.Sprite.prototype);
    Enemy1.prototype.constructor = Enemy1;

    Enemy1.prototype.update = function () {
        this.body.velocity.x = 100;
        this.game.camera.x = this.body.x;
    };

    global.Enemy1 = Enemy1;

})(this);
