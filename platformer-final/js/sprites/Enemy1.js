(function (global) {
    var LEFT = true;
    var RIGHT = false;
    var Enemy1 = function (game, x, y, spider) {
        if (spider){
            Phaser.Sprite.call(this, game, x, y, 'spider');
            this.animations.add('walk', [0, 1, 2, 3], 8, true);
        }else {
            Phaser.Sprite.call(this, game, x, y, 'enemy1');
         this.animations.add('walk', [0, 1, 2], 8, true);
        }
        this.animations.play('walk');

        game.physics.arcade.enable(this);
        this.body.bounce.y = 0.0;
        //this.body.gravity.y = 600;
        
        
        if(spider){
            this.body.setSize(38, 120, 0, 0);
        }
        else{
            this.body.setSize(22, 120, 0, 0);
        }

        this.scale.x = 3; //flipped
        this.scale.y = 3;
        this.anchor.setTo(0.5, 1);

        this.direction = LEFT;
        this.game = game;
    };

    Enemy1.prototype = Object.create(Phaser.Sprite.prototype);
    Enemy1.prototype.constructor = Enemy1;

    const spider = window.location.search=='?spider';

    Enemy1.prototype.update = function () {
        if (this.body.x>1610 && !this.stop){
            console.log ("stop");
            this.stop=true;
        }

        if(spider && !this.stop){
            this.body.velocity.x = 75;
        }
        else if (!this.stop){
            this.body.velocity.x = 100;
        }
        else
        {
            this.body.velocity.x = 0;
        }    

        this.game.camera.x = this.body.x;
    };

    global.Enemy1 = Enemy1;

})(this);
