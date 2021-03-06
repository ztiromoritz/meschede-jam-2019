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
        this.game.add.tileSprite(0,0,2000,600,"background");
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        const spider = window.location.search=='?spider';
        
        if (spider) {
            this.map = this.game.add.tilemap('map-spider');
            this.map.addTilesetImage('background_tiles2', "background_tiles-spinne");
         } else {
            this.map = this.game.add.tilemap('map');
            this.map.addTilesetImage('background_tiles2');
    }
        // By conventions the name of tileset in json/tiled this.map
        // and the cacheKey for the tileset image hast to be the same
        

        //Tiles - rastered Tiles with collision
        this.tileLayer = this.map.createLayer('Tiles');
        this.tileLayer.resizeWorld();
        this.map.setCollision(getGIDs('Boden', this.map), true, this.tileLayer);

        //Objects - free moveable objects
        // Platforms -- immovable = true, move = false
        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;
        _.forEach(this.map.getTileinfoByProperty('platform'), function (tileinfo) {
            self.map.createFromObjects('Objects', tileinfo.gid, tileinfo.tileset, tileinfo.frame, true, false, self.platforms);
        });
        this.platforms.setAllChildren('body.moves', false);
        this.platforms.setAllChildren('body.immovable', true);
        this.platforms.forEach(function (item) {
            item.body.setSize(16, 13, 0, 1);
        });

        
        this.enemies = this.game.add.group();
        this.map.objects.Chars.forEach(function (char) {
            var properties = getTileProperties(char.gid, self.map);
            if (properties.type === 'player') {
                
                //self.game.camera.follow(self.player);
            }
        });
        
                
        if (spider) {
            this.enemy1 = new Enemy1(self.game, -100 ,297, spider);
                self.enemies.add(this.enemy1);
        } 
        else {
            this.enemy1 = new Enemy1(self.game, -100 ,240, spider);
                self.enemies.add(this.enemy1);
        }
        
        
        
        //this.enemy1 = new Enemy1(self.game, 32,297, spider);
           //     self.enemies.add(this.enemy1);
                self.player = new Player(self.game, 200, 250);
                self.game.add.existing(self.player);
    };

    PlayState.prototype.update = function() {
        //this.debugInfo();

        this.physics.arcade.collide(this.player, this.tileLayer);
        this.physics.arcade.collide(this.player, this.platforms);
        
        //this.physics.arcade.collide(this.enemies, this.tileLayer);
        
        this.player.modeClear();
        
        this.physics.arcade.collide(this.player,this.enemies,null ,function( player, enemy){
            if (!player.win) 
                player.killMe();
            return false; // TO avoid physical reaction
        });


    };

    PlayState.prototype.debugInfo = function() {
        var self = this;
        if (this.game.config.enableDebug) {
            this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");
            this.game.debug.body(this.player);
            this.game.debug.body(this.enemy1);
            this.platforms.forEach(function (item) {
                self.game.debug.body(item);
            });
        }
    };

    global.PlayState = PlayState;
})(this);











//========================================
//========================================

//=== Event Zone Handler
//=======
