(function (global) {

    const createFight = ({
        player,
        enemy,
        playerhealth,
        enemyhealth,
        game
    })=>{
        const spider = window.location.search == '?spider';
        let  schock=game.add.audio('schock');
        let bossfight=game.add.audio('bossfight');
        let gameover=game.add.audio('gameover');
        let punch=game.add.audio('punch');
        let wooosh=game.add.audio('wooosh');
        let gorillatod=game.add.audio('gorillatod')
        let win=false;

        

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
            wooosh.play();
            enableButton(false);
            enemyAttack(true);
        };

        // Will be called on dodge button
        const onAttackButton  = ()=>{
            
            // Called on dodge button
            if (enemyhealth=>125){
                if(spider){
                    text("Du greifst an.");
                }else{
                    text("Du greifst an. Das Biest wirkt nicht sonderlich beeindruckt.")
                }
                
            }
            if (enemyhealth==75){
                if(spider){
                    text("Die Spinne wirkt etwas angeschlagen.");
                }else{
                    text ("Dein Durchhaltevermögen zeigt Wirkung. Bald hast du es geschafft")
                }
            }
            if (enemyhealth<=75) {
                if(spider){
                 text("Die Spinne zittert.");
                }else{
                 text("Bald hast du das Biest besiegt. Halte durch.")
                }
            }
            console.log("Dodge");
            clearAnimations();
            enemy.animations.play("hurt", null, false);
            setTimeout(()=>{
                schock.play();
            },1200);
            player.animations.play("slash", null, false).onComplete
            .addOnce(()=>{
                enemyAttack(false);
                //player.animations.play("idle", null, true);
            });
            setEnemyHealth(enemyhealth-25);
            enableButton(false);
        }

        const pattern = (spider)?["attack","attack","idle"]:["attack", "idle", "attack", "attack", "idle", "idle", "attack"];
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
                        if(spider){
                            text("Das Gift verfehlt dich um Haaresbreite.")
                        }else{
                            text("Du entgehst knapp einem vernichtenden Schlag.")
                        }
                       
                        enableButton(true);
                        enemy.animations.play('idle')
                        player.animations.play('idle')
                    });
                }
                
                if(move == "idle"){
                    clearAnimations();
                    player.animations.play("dodge", null, false);
                    if(spider){
                        text("Du weichst aus. Die Spinne tut nichts. Das war nicht sehr effektiv.")
                    }else{
                         text("Du weichst aus. Das Biest tut nichts. Das war nicht sehr effektiv.")
                    }
                    enemy.animations.play("idle", null, false).onComplete.addOnce(() =>{
                        enableButton(true);
                        enemy.animations.play('idle')
                        player.animations.play('idle')
                    });
                    
                    
                }
// DODGE ==========================
            } else {
                if(move == "attack"){
                    clearAnimations();
                    enemy.animations.play("punch", null, false)
                    setTimeout(()=>{
                       if(!win){
                        punch.play();
                       }
                    },900);
                    if(spider){
                        text("Die Spinne speit ihr Gift. Dein Gesicht schmilzt.")
                    }else{
                        text("Das Biest schwingt seine riesige Faust. Du hast keine Chance mehr auszuweichen. Du siehst rot, rot, rot.")
                    }
                    player.animations.play("hurt", null, false).onComplete.addOnce(()=>{
                        enableButton(true);
                        setPlayerHealth(playerhealth-((spider)?35:50));
                        setPlayerHealthBar(playerhealth);
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
            clearAnimations();
            enableButton(false);
            gameover.play(); 
            setTimeout(()=>{
                player.animations.play("dead", null, false).onComplete.addOnce(()=>{
                    document.querySelector("#gameover").style.display="flex";
                        setTimeout(()=>{
                            document.location.reload();
                        },3000);
                    });
            },0);  
            
        
        }
        const victory = () => { 
            win=true;
            setTimeout(()=>{
                enemy.animations.play("dead", null, false).onComplete.addOnce(()=>{

                    setTimeout(()=>{
                        document.querySelector("#victory").style.display="flex";
                    },(spider)?0:0);
                    
    
                    });
            },0);  

            
        }

        const enableButton =(enable)=>{
            [... document.querySelectorAll("button")].forEach((b)=>{b.disabled=!enable;})
            

        }
        //enableButton(false)

        const shakeCamera = ()=>{
            game.camera.shake(0.05, 500);
        }

        const text = (msg)=>{
            document.querySelector('#text').innerHTML=msg;
        }

        text("Das Biest steht vor dir. Du kannst nirgendwohin. Du musst kämpfen.");

        const hit = (msg)=>{
            const e = document.querySelector('#hit')
            e.innerHTML=msg
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