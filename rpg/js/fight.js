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
            enemy.animations.play("punch", null, false);
            setEnemyHealth(3);
            setPlayerHealthBar(33);
        };

        // Woll be called on dodge button
        const onAttackButton  = ()=>{
            // Called on dodge button
            console.log("Dodge");

            player.animations.play("punch", null, false).onComplete
            .add(()=>{
                shakeCamera();
                //player.animations.play("idle", null, false)
            });
        }

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