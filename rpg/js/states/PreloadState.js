(function(global){
    var PreloadState = function(game){
        Phaser.State.call(this);
    };

    PreloadState.prototype = Object.create(Phaser.State.prototype);

    PreloadState.prototype.preload = function(){
        //Settings
        this.game.stage.smoothed = false;
        this.game.config.enableDebug = false;
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.USER_SCALE;
        this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        this.game.scale.setUserScale(2, 2);
        this.game.time.advancedTiming = true;
        this.game.sound.mute = true;

        //Helper
        this.game.load.spritesheet('none', 'assets/1px.png', 1, 1);

        //Sprites
        this.game.load.spritesheet('player',        'assets/characters/player/player.png', 32, 32);
        this.game.load.spritesheet('enemy1',        'assets/characters/enemy1/gorillacomplete.png', 32, 32);

        // Background 
        this.game.load.image('background', 'assets/background/background.png');
        this.game.load.image('tot', 'assets/background/tot.png');
       
        //Sounds & Music
        this.game.load.audio('jump',        'assets/sounds/jump.wav');
        this.game.load.audio('hit',         'assets/sounds/hit.wav');
        this.game.load.audio('checkpoint',  'assets/sounds/checkpoint.wav');

        //Fonts
        //font load hack!!
        this.game.add.text(0, 0, "fix", {font:"1px PressStart2P", fill:"#FFFFFF"});
    
        this.game.load.onLoadComplete.add(function(){
            //Post processing
            this.game.state.start("play");
        }, this);
    
    };

    PreloadState.prototype.create = function(){
        //this.game.state.start("play");
        this.game.state.start("play");
    };

    global.PreloadState = PreloadState;
})(this);
