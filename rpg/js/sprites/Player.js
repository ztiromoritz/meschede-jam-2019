(function (global) {

    var Vect = Garfunkel.Vect;

    var MODES = {
        PLAY: 0,
        TALKY : 1,
        TALK: 2,
        RESPAWN: 3
    };

    var Player = function (game, x, y) {
        Phaser.Sprite.call(this, game, x, y, 'enemy1');
        this.animations.add('idle', [0, 0, 0, 1, 2, 2, 2,2], 4, true);
        this.animations.add('punch', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 8, true);
        this.scale.x = -2;
        this.scale.y = 2;
        //this.animations.add('walk', [2, 3], 10, true);
        //this.animations.add('idle', [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4], 10, true);
        //this.animations.add('respawn', [2, 8], 10, true);

        //this.animations.play('walk', null, false);

    };


    Player.prototype = Object.create(Phaser.Sprite.prototype);
    Player.prototype.constructor = Player;

    Player.prototype.create = function () {
        console.log('player create');
    };

    Player.prototype.update = function () {
       // this.animations.play('walk');
       
    };

   
    global.Player = Player;

})(this);
