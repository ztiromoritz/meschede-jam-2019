(function (global) {

    const createFight = ({
        player,
        enemy,
        playerhealth,
        enemyhealth,
        game
    })=>{

        // Will be called on attack button
        const onDodgeButton = ()=>{
            
            console.log("Attack");
            //enemy.animations.play("punch", null, false).onComplete
            /*.add(()=>{
                shakeCamera();
                //player.animations.play("idle", null, false)
            });
            setPlayerHealth(playerhealth-50);
            setPlayerHealthBar(playerhealth);*/
            enableButton(false);
            enemyAttack(true);
        };

        // Will be called on dodge button
        const onAttackButton  = ()=>{
            // Called on dodge button
            console.log("Dodge");
            clearAnimations();
            enemy.animations.play("hurt", null, false);
            player.animations.play("slash", null, false).onComplete
            .addOnce(()=>{
                enemyAttack(false);
                //player.animations.play("idle", null, true);
            });
            setEnemyHealth(enemyhealth-25);
            enableButton(false);
        }

        const onBlockButton = ()=>{
            
            //player.animations.play("block",null, false).onComplete

        }
        const pattern = ["attack", "idle", "attack", "attack", "idle", "idle", "attack"];
        let current = 0;
        const enemyAttack = (dodge)=>{
            const move = pattern[current];
            current = (current+1)%pattern.length;
            console.log(dodge, move)
            if(dodge) { // DODGE ========

                if(move == "attack"){
                    clearAnimations();
                    player.animations.play("dodge", null, false);
                    enemy.animations.play("punch", null, false).onComplete.addOnce(() =>{
                        enableButton(true);
                        enemy.animations.play('idle')
                        player.animations.play('idle')
                    });
                }
                
                if(move == "idle"){
                    clearAnimations();
                    player.animations.play("dodge", null, false);
                    enemy.animations.play("idle", null, false).onComplete.addOnce(() =>{
                       // debugger;
                        enableButton(true);
                        //enemy.animations.play('idle')
                        //player.animations.play('idle')
                    });
                    
                    
                }   
// DODGE ==========================
            } else {
                if(move == "attack"){
                    clearAnimations();
                    player.animations.play("hurt", null, false)
                    enemy.animations.play("punch", null, false).onComplete.addOnce(()=>{
                        enableButton(true);
                        setPlayerHealth(playerhealth-50);
                        player.animations.play("idle")
                        enemy.animations.play('idle')
                    });
                }
                    
                if(move == "idle"){
                    clearAnimations();
                    player.animations.play("idle", null, false);
                    enemy.animations.play("idle", null, false).onComplete.addOnce(() =>{
                            enableButton(true);
                            enemy.animations.play('idle')
                            player.animations.play('idle')
                    });
                }
            }

        }

        const clearAnimations = ()=>{
            enemy.animations.stop(); // 
            player.animations.stop(); // 
        }

        const gameOver = () => {
            document.querySelector("#gameover").style.display="flex";

            if(playerhealth<=0) {
                player.animations.play("dead", null, false)
            }
        }
        const victory = () => {
            document.querySelector("#victory").style.display="flex";

            if(playerhealth<=0) {
                player.animations.play("dead", null, false)
            }
        }

        const enableButton =(enable)=>{
            [... document.querySelectorAll("button")].forEach((b)=>{b.disabled=!enable;})
            

        }
        //enableButton(false)

        const shakeCamera = ()=>{
            game.camera.shake(0.05, 500);
        }


        const setPlayerHealthBar = (valueInPercent)=>{
            document.querySelector('#playerbar .value').style.width = `${valueInPercent}%`;
        }

        const getPlayerHealth = ()=>playerhealth;
        const setPlayerHealth = (value)=>{
            playerhealth = value;
            if(playerhealth <= 0){gameOver();}
        
        };
        const getEnemyHealth = ()=>enemyhealth;
        const setEnemyHealth = (value)=>{
            enemyhealth = value
            if(enemyhealth <= 0) {victory();}
        };

        const fight = {
            onDodgeButton,
            onAttackButton,
            getPlayerHealth,
            setPlayerHealth,
            getEnemyHealth,
            setEnemyHealth
        };
        return fight;

    };

    window.createFight = createFight;


})(this)