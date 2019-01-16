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
            
            enemy.animations.play("hurt", null, false)
            player.animations.play("slash", null, false).onComplete
            .addOnce(()=>{
                enemyAttack(false);
                player.animations.play("idle", null, true)
            });
            setEnemyHealth(enemyhealth-25);
            enableButton(false);
        }

        const onBlockButton = ()=>{
            
            //player.animations.play("block",null, false).onComplete

        }
        const pattern = ["attack", "idle", "attack", "attack", "idle", "idle","idle", "attack"];
        let current = 0;
        const enemyAttack = (dodge)=>{
            const move = pattern[current];
            current = (current+1)%pattern.length;
            console.log(dodge, move)
            if(dodge) { // DODGE ========

                if(move == "attack"){
                    player.animations.play("dodge", null, false)
                    enemy.animations.play("punch", null, false).onComplete.addOnce(() =>{
                        enableButton(true);
                        enemy.animations.play('idle')
                        player.animations.play('idle')
                    });
                }
                
                if(move == "idle"){
                   // debugger;
                    //player.animations.play("dodge", null, false);
                    enemy.animations.play("idle", null, false).onComplete.addOnce(() =>{
                        debugger;
                        enableButton(true);
                        //enemy.animations.play('idle')
                        //player.animations.play('idle')
                    });
                    
                    
                }


// DODGE ==========================
            } 
            
            else {
                if(move == "attack"){
                    player.animations.play("hurt", null, false)
                    enemy.animations.play("punch", null, false).onComplete
                    .addOnce(()=>{
                        enableButton(true);
                        setPlayerHealth(playerhealth-50);
                        player.animations.play("idle")
                        enemy.animations.play('idle')
                    });
                }
                    
                if(move == "idle"){
                    player.animations.play("idle", null, false)
                    enemy.animations.play("idle", null, false).onComplete.addOnce(() =>{
                            enableButton(true);
                            enemy.animations.play('idle')
                            player.animations.play('idle')
                    });
                }
                      

               
            }

        }

        /*const gameOver = () => {

            if(playerhealth==0) {
                player.animations.play("dead", null, false).onComplete.addOnce(()=>{

                })
            }

        }*/

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
        const setPlayerHealth = (value)=>{playerhealth = value;};
        const getEnemyHealth = ()=>enemyhealth;
        const setEnemyHealth = (value)=>{enemyhealth = value};

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