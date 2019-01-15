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
        //this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.add.tileSprite(0, 0, 1000, 600, 'background');  

       self.player = new Player(self.game, 100,100);
       self.game.add.existing(self.player);
       self.game.camera.follow(self.player);

       var enemy1 = new Enemy1(self.game, 200, 100);
       self.game.add.existing(enemy1);

       /*
       this.playerhealth= 100;
       this.enemy1health= 250;
       */

       window.PLAYER = self.player;
       window.ENEMY = enemy1;

       this.fight = window.createFight({
            game: this.game,
            enemy: enemy1, 
            player: self.player, 
            playerhealth: 100, 
            enemyhealth: 250});

       document.querySelector('#dodgeButton').addEventListener('click', ()=>{
           this.fight.onDodgeButton();
       })

       document.querySelector('#attackButton').addEventListener('click', ()=>{
        this.fight.onAttackButton();
    })


    };

    PlayState.prototype.update = function() {
        this.renderhealth()       
    };

    PlayState.prototype.renderhealth = function() {
        document.querySelector("#playerhealth").innerHTML=this.fight.getPlayerHealth();
        document.querySelector("#enemy1health").innerHTML=this.fight.getEnemyHealth();
    };

    PlayState.prototype.debugInfo = function() {
      
    };

    global.PlayState = PlayState;
})(this);











//========================================
//========================================

//=== Event Zone Handler
//=======
