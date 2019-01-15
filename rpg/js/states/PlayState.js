(function(global){


    var EVENT_TYPES = {
        dialog: "dialog",
        respawn : "respawn"
    };

    var PlayState = function(){
        Phaser.State.call(this);
        this.dialog = {
            reset: function () {
                this.name = null;
                this.npcId = null;
                this.currentNode = null;
            }
        };
        this.dialog.reset();

        this.map = null;        //The tiled Map
        this.tileLayer = null;  //TileLayer
        this.platforms = null;  //Group for Platform Objects
        this.npcs = null;       //Group for NPC Sprites
        this.enemies = null;    //Group for Enemy Sprites
        this.checkpoints = null;//Group for Checkoints
        this.player = null;     //The Player sprite
        this.eventZones = null;
    };
    PlayState.prototype = Object.create(Phaser.State.prototype);

    PlayState.prototype.create = function(){
        var self = this;
        //config/gloabl stuff
        this.game.stage.backgroundColor = '#0aafe3';
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

       self.player = new Player(self.game, 100,100);
       self.game.add.existing(self.player);
       self.game.camera.follow(self.player);

       var enemy1 = new Enemy1(self.game, 200, 100);
       self.game.add.existing(enemy1);

       window.PLAYER = self.player;
       this.playerhealth= 100;
       this.enemy1health= 250;

    };

    PlayState.prototype.update = function() {
        this.renderhealth()
        
    };

    PlayState.prototype.renderhealth = function() {
        document.querySelector("#playerhealth").innerHTML=this.playerhealth
        document.querySelector("#enemy1health").innerHTML=this.enemy1health
    };

    PlayState.prototype.debugInfo = function() {
       /* var self = this;
        if (this.game.config.enableDebug) {
            this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");
            this.game.debug.body(this.player);
            this.platforms.forEach(function (item) {
                self.game.debug.body(item);
            });

            this.npcs.forEach(function (item) {
                self.game.debug.body(item, 'rgba(0,255,0,0.2)');
            });

            this.checkpoints.forEach(function (item) {
                self.game.debug.body(item, 'rgba(255,0,0,0.2)');
            });
        }
        */
    };

    global.PlayState = PlayState;
})(this);











//========================================
//========================================

//=== Event Zone Handler
//=======
