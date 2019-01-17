(function (global) {

    var Vect = Garfunkel.Vect;

    var MODES = {
        PLAY: 0,
        TALKY : 1,
        TALK: 2,
        RESPAWN: 3
    };

    var Player = function (game, x, y) {
        const spider = window.location.search == '?spider';
        if(spider){
         Phaser.Sprite.call(this, game, x, y, 'playerSpinne');
            this.animations.add('dead', [28, 29, 30, 31, 32, 33, 34, 35, 36, 37,37,37,37], 4, true);
        }else{
            Phaser.Sprite.call(this, game, x, y, 'player'); 
            this.animations.add('dead', [28, 29, 30, 31, 32, 33, 34, 35, 36, 37], 4, true); 
        }
        this.animations.add('idle', [43, 44, 45], 4, true);
        this.animations.add('slash', [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], 4, true);
        this.animations.add('hurt', [43, 43, 43, 22, 23, 24, 25, 26, 27], 4, true);
        
        this.animations.add('dodge', [38, 38, 38, 38, 38, 39, 40, 41, 42, 43], 4, true);
        this.scale.x = 2;
        this.scale.y = 2;


        this.animations.play('idle', null, true);

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
