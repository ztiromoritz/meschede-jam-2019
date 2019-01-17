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
        this.game.sound.mute = false;

        //Helper
        this.game.load.spritesheet('none', 'assets/1px.png', 1, 1);

        //Sprites
        this.game.load.spritesheet('player',        'assets/characters/player/player.png', 32, 32);
        this.game.load.spritesheet('playerSpinne',        'assets/characters/player/playerSpinne.png', 32, 32);
        this.game.load.spritesheet('enemy1',        'assets/characters/enemy1/gorillacomplete.png', 32, 32);
        this.game.load.spritesheet('spider',        'assets/characters/enemy1/spidercomplete.png', 64, 64);

        // Background 
        this.game.load.image('background', 'assets/background/background.png');
        this.game.load.image('spinne', 'assets/background/spinne.png');
        
        //Sounds & Music
        this.game.load.audio('jump',        'assets/sounds/jump.wav');
        this.game.load.audio('checkpoint',  'assets/sounds/checkpoint.wav');
        this.game.load.audio('schock',      'assets/sounds/schock1.wav');
        this.game.load.audio('punch',      'assets/sounds/punch.wav');
        this.game.load.audio('gameover',      'assets/sounds/gameover.wav');
        this.game.load.audio('bossfight',      'assets/sounds/bossfight.wav');
        this.game.load.audio('hit',            'assets/sounds/hit.wav');
        this.game.load.audio('hurt',      'assets/sounds/hurt');
        this.game.load.audio('wooosh',      'assets/sounds/wooosh.wav');
        this.game.load.audio('gorillatod',      'assets/sounds/gorillatod.wav');
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
