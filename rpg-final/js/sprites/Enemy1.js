(function (global) {
    var LEFT = true;
    var RIGHT = false;
    var Enemy1 = function (game, x, y) {
        const spider = window.location.search == '?spider';
        if(spider){
            Phaser.Sprite.call(this, game, x, y, 'spider');
            this.animations.add('idle', [0, 1, 2,3, 4,5, 6, 7], 4, true);
            this.animations.add('punch', [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,21,22,23,24,25,26,27,28,29,30], 8, true);
            this.animations.add('hurt', [32,33,34,35,36,37], 4, true);
            this.animations.add('dead', [39,39,39,39,39,39,39,39,39,39,39, 40,41,42,43,44,45,46,47,48,49,50,51,52,53], 10, true);
            this.animations.play('idle');
        }else{
            Phaser.Sprite.call(this, game, x, y, 'enemy1');
            this.animations.add('idle', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], 4, true);
            this.animations.add('punch', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 8, true);
            this.animations.add('hurt', [29, 30, 31, 32, 33, 34, 35, 36, 37, 38], 4, true);
            this.animations.add('dead', [48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60], 10, true);
            this.animations.play('idle');
        }

        this.scale.x = 2;
        this.scale.y = 2;

        
        //this.scale.x = -1; //flipped
        this.game = game;
    };

    Enemy1.prototype = Object.create(Phaser.Sprite.prototype);
    Enemy1.prototype.constructor = Enemy1;

    Enemy1.prototype.update = function () {
        
    };

    global.Enemy1 = Enemy1;

})(this);
