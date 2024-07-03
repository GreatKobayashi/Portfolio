enchant();

window.onload = function () {
    const game = new Game(1000, 500);
    

    //*****************************************画像読み込み
    const imgLevels = [];
    imgLevels.push("");
    for (let i = 1; i <= 2; i++) {
        const imgLevel = `image/level${i}.png`;
        imgLevels.push(imgLevel);
    }
    game.preload(imgLevels);

    const imgRetry = `image/retry.png`;
    game.preload(imgRetry);

    const imgSelectDif = `image/selectdif.png`;
    game.preload(imgSelectDif);

    const imgStage = `image/stage.png`;
    game.preload(imgStage);

    const imgEnemyHelth = `image/enemyHelth.png`;
    game.preload(imgEnemyHelth);

    const imgMyHelth = `image/myHelth.png`;
    game.preload(imgMyHelth);

    const imgShips = [];
    imgShips.push("");
    for (let i = 1; i <= 3; i++) {
        const imgShip = `image/ship${i}.png`;
        imgShips.push(imgShip);
    }
    game.preload(imgShips);

    const imgEnemyShips = [];
    imgEnemyShips.push("");
    for (let i = 1; i <= 3; i++) {
        const imgEnemyShip = `image/enemyShip${i}.png`;
        imgEnemyShips.push(imgEnemyShip);
    }
    game.preload(imgEnemyShips);

    const imgBossShips = [];
    imgBossShips.push("");
    for (let i = 1; i <= 2; i++) {
        const imgBossShip = `image/boss${i}.png`;
        imgBossShips.push(imgBossShip);
    }
    game.preload(imgBossShips);

    const imgShipBtns = [];
    imgShipBtns.push("");
    for (let i = 1; i <= 3; i++) {
        const imgShipBtn = `image/shipBtn${i}.jpg`;
        imgShipBtns.push(imgShipBtn);
    }
    game.preload(imgShipBtns);

    const imgBullets = [];
    imgBullets.push("");
    for (let i = 1; i <= 3; i++) {
        const imgBullet = `image/bullet${i}.png`;
        imgBullets.push(imgBullet);
    }
    game.preload(imgBullets);

    const imgEnemyBullets = [];
    imgEnemyBullets.push("");
    for (let i = 1; i <= 3; i++) {
        const imgEnemyBullet = `image/enemyBullet${i}.png`;
        imgEnemyBullets.push(imgEnemyBullet);
    }
    game.preload(imgEnemyBullets);
    //************************************************画像ここまで



    //*****************************************音声読み込み
    game.preload('sound/bgm.mp3');
    game.preload('sound/ship1.mp3');
    game.preload('sound/ship2.mp3');
    game.preload('sound/ship3.mp3');
    game.preload('sound/boss.mp3');

    //*****************************************音声ここまで


    const enemyHome = 800;
    const myHome = 100;

    let enemyHelth = 0.0;
    let enemyMoney = 0;
    let myHelth = 0.0;
    let myMoney = 0;
    let displayedMoney = 0;

    let myship1id = 0;
    let ships1 = [];
    let ships2 = [];
    let ships3 = [];
    let enemyShips1 = [];
    let enemyship1id = 0;
    let enemyShips3 = [];
    let enemyship3id = 0;
    let boss = [];
    let boss1id = 0;
    let boss2id = 0;

    const array = function (a, num) {
        let b = [];
        let n = 0;
        for(n = 0; n < a.length; n++){
            if(a[n].id != num){
                b.push(a[n]);
            }
        }
        return b;
    }
    

    game.onload = function () {

        const enemyHelthBar = new Sprite(50, 50);
        enemyHelthBar.originX = 50;
        enemyHelthBar.moveTo(920, 10);
        enemyHelthBar.image = game.assets[imgEnemyHelth];

        const myHelthBar = new Sprite(50, 50);
        myHelthBar.originX = 0;
        myHelthBar.moveTo(20, 10);
        myHelthBar.image = game.assets[imgMyHelth];

        const stage = new Sprite(1000, 500);
        stage.moveTo(0, 0);
        stage.image = game.assets[imgStage];

        displayedMoney = 0;
        const mymoneyText = new Label();
        mymoneyText.font = "20px Meiryo";
        mymoneyText.color = "rgba(255,255,255,1)";
        mymoneyText.width = 200;
        mymoneyText.moveTo(0, 450);

        const homeText = new Label();
        homeText.font = "100px Meiryo";
        homeText.color = "rgba(255,255,255,1)";
        homeText.width = 1000;
        homeText.moveTo(100, 100);
        homeText.text = "Select Stage";

        let textX = 1000;
        let textY = 500;
        var textbox = new Sprite( textX, textY);
        var surface = new Surface( textX, textY);
        textbox.image = surface;
        surface.context.fillStyle = "gray";
        surface.context.fillRect (0, 0, textX, textY);
        textbox.opacity = 0.5;
        textbox.moveTo(0,0);

        const endText = new Label();
        endText.font = "150px Meiryo";
        endText.color = "rgba(255,255,255,1)";
        endText.width = textX;
        endText.moveTo(150, 150);

        const bossText = new Label();
        bossText.font = "100px Meiryo";
        bossText.color = "rgba(255,255,255,1)";
        bossText.width = textX;
        bossText.moveTo(150, 150);

        /* -----------------------------------------------------------------------------自機 */
        const ship1Btn = new Sprite(50, 50); //*********************************ship1
        ship1Btn.moveTo(50, 400);
        ship1Btn.image = game.assets[imgShipBtns[1]];


        ship1Btn.ontouchend = function () {
            if(displayedMoney >= 20){
                let sound = game.assets['sound/ship1.mp3'].clone();
                sound.play();

                displayedMoney -= 20;

                const ship1 = new Sprite(100, 100);
                ship1.moveTo(-100, 290);
                ship1.image = game.assets[imgShips[1]];
                ships1.push(ship1);
                game.currentScene.addChild(ship1);

                ship1.id = myship1id;
                myship1id++;

                ship1.hp = 3;

                const bullet1Move = function () {
                    const bullet1 = new Sprite(10, 10);
                    bullet1.moveTo(ship1.x + 50, 335);
                    bullet1.image = game.assets[imgBullets[1]];
                    game.currentScene.addChild(bullet1);

                    bullet1.onenterframe = function () {
                        bullet1.x += 1;
                        let damage = 1;

                        for(const enemyShip1 of enemyShips1){
                            if(enemyShip1.x - bullet1.x < -50){
                                enemyShip1.hp -= damage;
                                damage = 0;
                                game.currentScene.removeChild(this);
                                break;
                            }
                        }
                        for(const boss1 of boss){
                            if(boss1.x - bullet1.x < -50){
                                boss1.hp -= damage;
                                damage = 0;
                                game.currentScene.removeChild(this);
                                break;
                            }
                        }
                        if(enemyHome - bullet1.x < -80  && boss.length == 0){
                            enemyHelth -= damage;
                            damage = 0;
                            game.currentScene.removeChild(this);
                        }
                        else if(bullet1.x > 1000){
                            damage = 0;
                            game.currentScene.removeChild(this);
                        }
                    }
                }

                let score = 0;
                let moving = 1;
                ship1.onenterframe = function () {
                    for(const enemyShip1 of enemyShips1){
                        if((enemyShip1.x - (ship1.x - 1 + 1))**2 <= 10000){
                            moving = 0;
                            break;
                        }
                        else{
                            moving = 1; 
                        }
                    }
                    for(const boss1 of boss){
                        if((boss1.x - (ship1.x - 1 + 1))**2 <= 10000){
                            moving = 0;
                            break;
                        }
                        else{

                        }
                    }
                    if(enemyHome - ship1.x == 100){
                        moving = 0;
                        //break;
                    }
                    else if(enemyShips1.length + boss.length == 0){
                        moving = 1;
                    }
                    switch(moving){
                        case 0:
                            score += 1;
                            if(score % 50 == 0 || score == 1){
                                bullet1Move();
                            }
                            break;
                        case 1:
                            ship1.x += 1;
                            break;
                    }
                    if(ship1.hp <= 0){
                        ships1 = array(ships1, ship1.id);
                        game.currentScene.removeChild(this);
                    }
                }
            }
        }


        const ship2Btn = new Sprite(50, 50); //*********************************ship2 */
        ship2Btn.moveTo(110, 400);
        ship2Btn.image = game.assets[imgShipBtns[2]];

        let myship2id = 0;

        ship2Btn.ontouchend = function () {
            if(displayedMoney >= 30){
                let sound = game.assets['sound/ship2.mp3'].clone();
                sound.play();
                displayedMoney -= 30;

                const ship2 = new Sprite(100, 100);
                ship2.moveTo(-100, 290);
                ship2.image = game.assets[imgShips[2]];
                ships2.push(ship2);
                game.currentScene.addChild(ship2);

                ship2.id = myship2id;
                myship2id++;

                ship2.hp = 2;

                const bullet2Move = function () {
                    const bullet2 = new Sprite(10, 10);
                    bullet2.moveTo(ship2.x + 50, 335);
                    bullet2.image = game.assets[imgBullets[2]];
                    game.currentScene.addChild(bullet2);

                    let line = 1.0;

                    bullet2.onenterframe = function () {
                        bullet2.x += 2.0;
                        let damage = 2;

                        bullet2.y -= line;
                        line -= 0.02;

                        for(const enemyShip1 of enemyShips1){
                            if(enemyShip1.x - bullet2.x <= -30 && enemyShip1.y - bullet2.y <= -50){
                                if(enemyShip1.x - bullet2.x >= -70){
                                    enemyShip1.hp -= damage;
                                    damage = 0;
                                    game.currentScene.removeChild(this);
                                    break;
                                }
                            }
                        }
                        for(const boss1 of boss){
                            if(boss1.x - bullet2.x <= 0 && boss1.x - bullet2.x >= -100){
                                if(boss1.y - bullet2.y <= -32){
                                    boss1.hp -= damage;
                                    damage = 0;
                                    game.currentScene.removeChild(this);
                                    break;
                                }
                            }
                        }
                        if(enemyHome - bullet2.x < -80 && boss.length == 0){
                            enemyHelth -= damage;
                            damage = 0;
                            game.currentScene.removeChild(this);
                        }
                        else if(bullet2.y > 350){
                            damage = 0;
                            game.currentScene.removeChild(this);
                        }
                    }
                }

                let score = 0;
                let moving = 1;
                ship2.onenterframe = function () {
                    for(const enemyShip1 of enemyShips1){
                        if((enemyShip1.x - (ship2.x - 1 + 1))**2 <= 50000){
                            moving = 0;
                            break;
                        }
                        else{
                            moving = 1; 
                        }
                    }
                    for(const boss1 of boss){
                        if((boss1.x - (ship2.x - 1 + 1))**2 <= 50000){
                            moving = 0;
                            break;
                        }
                        else{

                        }
                    }
                    if(enemyHome - ship2.x == 200){
                        moving = 0;
                        //break;
                    }
                    else if(enemyShips1.length + boss.length == 0){
                        moving = 1;
                    }
                    switch(moving){
                        case 0:
                            score += 1;
                            if(score % 50 == 0 || score == 1){
                                bullet2Move();
                            }
                            break;
                        case 1:
                            ship2.x += 0.8;
                            break;
                    }
                    if(ship2.hp <= 0){
                        ships2 = array(ships2, ship2.id);
                        game.currentScene.removeChild(this);
                    }
                }
            }
        }

        const ship3Btn = new Sprite(1300, 1300); //*********************************ship3 */
        ship3Btn.originX = 0;
        ship3Btn.originY = 0;
        ship3Btn.scale(0.038, 0.038);
        ship3Btn.moveTo(170, 400);
        ship3Btn.image = game.assets[imgShipBtns[3]];

        let myship3id = 0;

        ship3Btn.ontouchend = function () {
            if(displayedMoney >= 30){
                displayedMoney -= 30;
                let sound = game.assets['sound/ship3.mp3'].clone();
                sound.play();

                const ship3 = new Sprite(1300, 1300);
                ship3.originX = 0;
                ship3.originY = 0;
                ship3.scale(0.05, 0.05);
                ship3.moveTo(-100, 150);
                ship3.image = game.assets[imgShips[3]];
                ships3.push(ship3);
                game.currentScene.addChild(ship3);

                ship3.id = myship3id;
                myship3id++;

                ship3.hp = 1;

                const bullet3Move = function (speedX, speedY, angle) {
                    const bullet3 = new Sprite(200, 100);
                    bullet3.originX = 0;
                    bullet3.originY = 0;
                    bullet3.scale(0.1, 0.1);
                    bullet3.moveTo(ship3.x + 25, ship3.y + 30);
                    bullet3.image = game.assets[imgBullets[3]];
                    game.currentScene.addChild(bullet3);
                    bullet3.rotation = angle;

                    bullet3.onenterframe = function () {
                        
                        let damage = 0.1;
                        bullet3.x += speedX;
                        bullet3.y += speedY;

                        for(const enemyShip1 of enemyShips1){
                            if(enemyShip1.x - bullet3.x <= 0 && enemyShip1.x - bullet3.x >= -100){
                                if(enemyShip1.y - bullet3.y <= -50){
                                    enemyShip1.hp -= damage;
                                    damage = 0;
                                    game.currentScene.removeChild(this);
                                    break;
                                }
                            }
                        }
                        for(const enemyShip3 of enemyShips3){
                            if(enemyShip3.x - bullet3.x <= 0 && enemyShip3.x - bullet3.x >= -30){
                                if(enemyShip3.y - bullet3.y >= -70){
                                    enemyShip3.hp -= damage;
                                    damage = 0;
                                    game.currentScene.removeChild(this);
                                    break;
                                }
                            }
                        }
                        for(const boss1 of boss){
                            if(boss1.x - bullet3.x <= 10 && boss1.x - bullet3.x >= -40){
                                if(boss1.y - bullet3.y <= -10){
                                    boss1.hp -= damage;
                                    damage = 0;
                                    game.currentScene.removeChild(this);
                                    break;
                                }
                            }
                        }
                        if(enemyHome - bullet3.x < -80 && bullet3.y > 250){
                            if(boss.length == 0){
                                enemyHelth -= damage;
                                damage = 0;
                                game.currentScene.removeChild(this);
                            }
                        }
                        else if(bullet3.y > 350 || bullet3.x > 1200){
                            damage = 0;
                            game.currentScene.removeChild(this);
                        }
                    }
                }

                let score = 0;
                let moving = 1;
                let speedX = 0;
                let speedY;
                let angle;
                let enemyShip1Fx = 10000;
                let bossFx = 10000;
                ship3.onenterframe = function () {
                    for(const enemyShip1 of enemyShips1){
                        if(enemyShip1.x - ship3.x < -10){
                            moving = 2;
                            break;
                        } else if((enemyShip1.x - (ship3.x - 1 + 1))**2 <= 20000){
                            moving = 0;
                            break;
                        }
                        else{
                            moving = 1; 
                        }
                    }
                    for(const boss1 of boss){
                        if((boss1.x - ship3.x)**2 <= 20000){
                            moving = 0;
                            break;
                        }
                        else{

                        }
                    }
                    for(const enemyShip3 of enemyShips3){
                        if(enemyShip3.x - ship3.x < 200){
                            moving = 3;
                            break;
                        }
                        else{

                        }
                    }
                    if(enemyHome - ship3.x <= 100){
                        moving = 0;
                        //break;
                    }
                    else if(enemyShips1.length + enemyShips3.length + boss.length == 0){
                        moving = 1;
                    }
                    switch(moving){
                        case 0:
                            score += 1;
                            if(score % 10 == 0 || score == 1){
                                for(const enemyShip1 of enemyShips1){
                                    enemyShip1Fx = enemyShip1.x
                                    break;
                                }
                                for(const boss1 of boss){
                                    bossFx = boss1.x
                                    break;
                                }
                                if((enemyShip1Fx - ship3.x)**2 < (bossFx - ship3.x)**2){
                                    speedX = (enemyShip1Fx - ship3.x )/60 +0.8;
                                } else{
                                    speedX = (bossFx - ship3.x )/60 +0.8;
                                }
                                speedY = Math.sqrt(25 - speedX**2);
                                angle = 90 - 18*speedX;
                                bullet3Move(speedX, speedY, angle);
                            }
                            break;
                        case 1:
                            ship3.x += 1.5;
                            ship3.frame = 0;
                            break;
                        case 2:
                            ship3.x -= 1.5;
                            ship3.frame = 1;
                            break;
                        case 3:
                            score += 1;
                            if(score % 10 == 0 || score == 1){
                                speedX = 5.0;
                                speedY = 0.0;
                                angle = 0.0;
                                bullet3Move(speedX, speedY, angle);
                            }
                            break;

                    }
                    if(ship3.hp <= 0){
                        ships3 = array(ships3, ship3.id);
                        game.currentScene.removeChild(this);
                    }
                }
            }
        }

        /* -----------------------------------------------------------------------------敵機 */
        const startEnemyShip1 = function () {  //*********************************enemyShip1
            const enemyShip1 = new Sprite(100, 69);
            enemyShip1.moveTo(1000, 290);
            enemyShip1.image = game.assets[imgEnemyShips[1]];
            enemyShips1.push(enemyShip1);
            game.currentScene.addChild(enemyShip1);
        
            enemyShip1.id = enemyship1id;
            enemyship1id++;
        
            enemyShip1.hp = 3;
        
            let moving = 0;
            let score = 0;
            enemyShip1.onenterframe = function () {
                for(const ship1 of ships1){
                    if((enemyShip1.x - ship1.x)**2 < 10000){
                        moving = 1;
                        break;
                    }
                    else{
                        
                    }
                }
                for(const ship2 of ships2){
                    if((enemyShip1.x - ship2.x)**2 < 10000){
                        moving = 1;
                        break;
                    }
                    else{
                        
                    }
                }
                if(enemyShip1.x - myHome == 50){
                    moving = 1;
                }
                else if(ships1.length == 0 && ships2.length == 0){
                    moving = 0;
                }
                switch(moving){
                    case 0:
                        enemyShip1.x -= 1;
                        break;
                    case 1:
                        score += 1;
                        if(score % 50 == 0 || score == 1){
                            enemyBullet1Move();
                        }
                        break;
                }
                moving = 0;
                if(enemyShip1.hp <= 0){
                    enemyShips1 = array(enemyShips1, enemyShip1.id);
                    game.currentScene.removeChild(this);
                }
            }
            
        
            const enemyBullet1Move = function () {
                const enemyBullet1 = new Sprite(10, 10);
                enemyBullet1.moveTo(enemyShip1.x + 50, 335);
                enemyBullet1.image = game.assets[imgEnemyBullets[1]];
                game.currentScene.addChild(enemyBullet1);
        
                enemyBullet1.onenterframe = function () {
                    enemyBullet1.x -= 1;
                    let damage = 1;
                    for(const ship1 of ships1){    
                        if(enemyBullet1.x - ship1.x < 50){
                            ship1.hp -= damage;
                            game.currentScene.removeChild(this);
                            damage = 0;
                        }
                    }
                    for(const ship2 of ships2){    
                        if(enemyBullet1.x - ship2.x < 50){
                            ship2.hp -= damage;
                            game.currentScene.removeChild(this);
                            damage = 0;
                        }
                    }
                    if(enemyBullet1.x - myHome < 10){
                        myHelth -= damage;
                        damage = 0;
                        game.currentScene.removeChild(this);
                    }
                }
            }
        }
        
        
        const startEnemyShip3 = function (fromX, fromY) {  //*********************************enemyShip3
            const enemyShip3 = new Sprite(1300, 1300);
            enemyShip3.originX = 0;
            enemyShip3.originY = 0;
            enemyShip3.scale(0.05, 0.05);
            enemyShip3.moveTo(fromX, fromY);
            enemyShip3.image = game.assets[imgEnemyShips[3]];
            enemyShips3.push(enemyShip3);
            game.currentScene.addChild(enemyShip3);
        
            enemyShip3.id = enemyship3id;
            enemyship3id++;
        
            enemyShip3.hp = 1;
        
            const enemyBullet3Move = function (speedX, speedY, angle) {
                const enemyBullet3 = new Sprite(200, 100);
                enemyBullet3.originX = 0;
                enemyBullet3.originY = 0;
                enemyBullet3.scale(0.1, 0.1);
                enemyBullet3.moveTo(enemyShip3.x + 35, enemyShip3.y + 30);
                enemyBullet3.image = game.assets[imgEnemyBullets[3]];
                game.currentScene.addChild(enemyBullet3);
                enemyBullet3.rotation = angle;
        
                enemyBullet3.onenterframe = function () {
                    
                    let damage = 0.1;
                    enemyBullet3.x += speedX;
                    enemyBullet3.y += speedY;
        
                    for(const ship1 of ships1){
                        if(enemyBullet3.x - ship1.x >= 0 && enemyBullet3.x - ship1.x <= 100){
                            if(ship1.y - enemyBullet3.y <= -50){
                                ship1.hp -= damage;
                                damage = 0;
                                game.currentScene.removeChild(this);
                                break;
                            }
                        }
                    }
                    for(const ship2 of ships2){    
                        if(enemyBullet3.x - ship2.x >= 0 && enemyBullet3.x - ship2.x <= 100){
                            if(ship2.y - enemyBullet3.y <= -50){
                                ship2.hp -= damage;
                                damage = 0;
                                game.currentScene.removeChild(this);
                                break;
                            }
                        }
                    }
                    for(const ship3 of ships3){    
                        if(enemyBullet3.x - ship3.x >= 0 && enemyBullet3.x - ship3.x <= 40){
                            if(ship3.y - enemyBullet3.y >= -50){
                                ship3.hp -= damage;
                                damage = 0;
                                game.currentScene.removeChild(this);
                                break;
                            }
                        }
                    }
                    if(enemyBullet3.x - myHome < 30 && enemyBullet3.y > 250){
                        myHelth -= damage;
                        damage = 0;
                        game.currentScene.removeChild(this);
                    }
                    else if(enemyBullet3.y > 350 || enemyBullet3.x < 0){
                        damage = 0;
                        game.currentScene.removeChild(this);
                    }
                }
            }
        
            let score = 0;
            let moving = 1;
            let speedX;
            let speedY;
            let angle;
            let rised = 0;
            enemyShip3.onenterframe = function () {
                moving = 1;
                for(const ship1 of ships1){
                    if(enemyShip3.x - ship1.x < -10){
                        moving = 2;
                        break;
                    } else if((enemyShip3.x - (ship1.x - 1 + 1))**2 <= 20000){
                        moving = 0;
                        break;
                    }
                    else{

                    }
                }
                for(const ship2 of ships2){
                    if(enemyShip3.x - ship2.x < -10){
                        moving = 2;
                        break;
                    } else if((enemyShip3.x - (ship2.x - 1 + 1))**2 <= 20000){
                        moving = 0;
                        break;
                    } else{
        
                    }
                }
                for(const ship3 of ships3){
                    if(enemyShip3.x - ship3.x < 200){
                        moving = 3;
                        break;
                    } else{
        
                    }
                }
                
                if(enemyShip3.y > 150){
                    moving = 4;
                }
                else if(enemyShip3.x - myHome <= 70){
                    moving = 0;
                    //break;
                }
                else if(ships1.length + ships2.length + ships3.length == 0){
                    moving = 1;
                }
                else if(rised == 0){
                    moving = 1;
                    rised = 1;
                }
                switch(moving){
                    case 0:
                        score += 1;
                        if(score % 10 == 0 || score == 1){
                            var ship1Fx = 0;
                            var ship2Fx = 0;
                            
                            for(const ship1 of ships1){
                                ship1Fx = ship1.x;
                                break;
                            }
                            for(const ship2 of ships2){
                                ship2Fx = ship2.x;
                                break;
                            }
                            if((enemyShip3.x - ship1Fx)**2 < (enemyShip3.x - ship2Fx)**2){
                                speedX = -(enemyShip3.x - ship1Fx )/60 -0.1;
                                speedY = Math.sqrt(25 - speedX**2);
                                angle = 90 - 18*speedX;
                            } else{
                                speedX = -(enemyShip3.x - ship2Fx )/60 -0.1;
                                speedY = Math.sqrt(25 - speedX**2);
                                angle = 90 - 18*speedX;
                            }
                            if(ships1.length == 0 && ships2.length == 0){
                                speedX = -2.5;
                                speedY = Math.sqrt(25 - speedX**2);
                                angle = 90 - 18*speedX;
                            }
                            enemyBullet3Move(speedX, speedY, angle);
                            
                        }
                        break;
                    case 1:
                        enemyShip3.x -= 1.5;
                        enemyShip3.frame = 1;
                        break;
                    case 2:
                        enemyShip3.x += 1.5;
                        enemyShip3.frame = 0;
                        break;
                    case 3:
                        score += 1;
                        if(score % 10 == 0 || score == 1){
                            speedX = -5.0;
                            speedY = 0.0;
                            angle = 0.0;
                            enemyBullet3Move(speedX, speedY, angle);
                        }
                        break;
                    case 4:
                        enemyShip3.y -= 2.0;
                        enemyShip3.frame = 1;
                        break;
        
                }
                if(enemyShip3.hp <= 0){
                    enemyShips3 = array(enemyShips3, enemyShip3.id);
                    game.currentScene.removeChild(this);
                }
            }
        }
        
        const startBoss1 = function () {  //*********************************boss1
            const boss1 = new Sprite(1216, 337);
            boss.push(boss1);
            boss1.originX = 0;
            boss1.originY = 0;
            boss1.scale(0.15, 0.15);
            boss1.moveTo(850, 309);
            boss1.image = game.assets[imgBossShips[1]];
            game.currentScene.addChild(boss1);
            boss.push(boss1);
        
            boss1.id = boss1id;
            boss1id++;
        
            boss1.hp = 20;
        
            const enemyBullet1Move = function () {
                const enemyBullet1 = new Sprite(10, 10);
                enemyBullet1.moveTo(boss1.x + 10, 335);
                enemyBullet1.image = game.assets[imgEnemyBullets[1]];
                game.currentScene.addChild(enemyBullet1);
        
                enemyBullet1.onenterframe = function () {
                    enemyBullet1.x -= 1;
                    let damage = 1;
                    for(const ship1 of ships1){    
                        if(enemyBullet1.x - ship1.x < 50){
                            ship1.hp -= damage;
                            game.currentScene.removeChild(this);
                            damage = 0;
                        }
                    }
                    for(const ship2 of ships2){    
                        if(enemyBullet1.x - ship2.x < 50){
                            ship2.hp -= damage;
                            game.currentScene.removeChild(this);
                            damage = 0;
                        }
                    }
                    if(enemyBullet1.x - myHome < 10){
                        myHelth -= damage;
                        damage = 0;
                        game.currentScene.removeChild(this);
                    }
                }
            }
        
            const enemyBullet3Move = function (speedX, speedY, angle) {
                const enemyBullet3 = new Sprite(200, 100);
                enemyBullet3.originX = 0;
                enemyBullet3.originY = 0;
                enemyBullet3.scale(0.1, 0.1);
                enemyBullet3.moveTo(boss1.x + 70, boss1.y + 10);
                enemyBullet3.image = game.assets[imgEnemyBullets[3]];
                game.currentScene.addChild(enemyBullet3);
                enemyBullet3.rotation = angle;
        
                enemyBullet3.onenterframe = function () {
                    
                    let damage = 0.1;
                    enemyBullet3.x += speedX;
                    enemyBullet3.y += speedY;
        
                    for(const ship1 of ships1){
                        if(enemyBullet3.x - ship1.x >= 0 && enemyBullet3.x - ship1.x <= 70){
                            if(ship1.y - enemyBullet3.y <= -50){
                                ship1.hp -= damage;
                                damage = 0;
                                game.currentScene.removeChild(this);
                                break;
                            }
                        }
                    }
                    for(const ship2 of ships2){    
                        if(enemyBullet3.x - ship2.x >= 0 && enemyBullet3.x - ship2.x <= 100){
                            if(ship2.y - enemyBullet3.y <= -50){
                                ship2.hp -= damage;
                                damage = 0;
                                game.currentScene.removeChild(this);
                                break;
                            }
                        }
                    }
                    for(const ship3 of ships3){    
                        if(enemyBullet3.x - ship3.x >= 0 && enemyBullet3.x - ship3.x <= 40){
                            if(ship3.y - enemyBullet3.y >= -50){
                                ship3.hp -= damage;
                                damage = 0;
                                game.currentScene.removeChild(this);
                                break;
                            }
                        }
                    }
                    if(enemyBullet3.x - myHome < 30 && enemyBullet3.y > 250){
                        myHelth -= damage;
                        damage = 0;
                        game.currentScene.removeChild(this);
                    }
                    else if(enemyBullet3.y > 350 || enemyBullet3.x < 0){
                        damage = 0;
                        game.currentScene.removeChild(this);
                    }
                }
            }
        
            let score = 0;
            let moving = 1;
            let speedX;
            let speedY;
            let angle;
            boss1.onenterframe = function () {
                for(const ship1 of ships1){
                    if(boss1.x - ship1.x < -10){
                        moving = 2;
                        break;
                    } else if((boss1.x - (ship1.x - 1 + 1))**2 <= 20000){
                        moving = 0;
                        break;
                    }
                    else{
                        moving = 1;
                    }
                }
                for(const ship2 of ships2){
                    if(boss1.x - ship2.x < -10){
                        moving = 2;
                        break;
                    } else if((boss1.x - (ship2.x - 1 + 1))**2 <= 20000){
                        moving = 0;
                        break;
                    } else{
        
                    }
                }
                for(const ship3 of ships3){
                    if(boss1.x - ship3.x < 200){
                        moving = 3;
                        break;
                    } else{
        
                    }
                }
                if(boss1.x - myHome <= 70){
                    moving = 0;
                    //break;
                }
                else if(ships1.length + ships2.length + ships3.length == 0){
                    moving = 1;
                }
                switch(moving){
                    case 0:
                        score += 1;
                        if(score % 7 == 0 || score == 1){
                            speedX = -4.5;
                            speedY = 1.0;
                            angle = -10;
                            enemyBullet3Move(speedX, speedY, angle);
                        }
                        if(score % 50 == 0 || score == 1){
                            enemyBullet1Move();
                        }
                        break;
                    case 1:
                        boss1.x -= 0.5;
                        boss1.frame = 1;
                        break;
                    case 2:
                        boss1.x += 1.5;
                        boss1.frame = 0;
                        break;
                    case 3:
                        score += 1;
                        if(score % 10 == 0 || score == 1){
                            speedX = -5.0;
                            speedY = 0.0;
                            angle = 0.0;
                            enemyBullet3Move(speedX, speedY, angle);
                        }
                        break;
        
                }
                if(boss1.hp <= 0){
                    boss = array(boss, boss1.id);
                    game.currentScene.removeChild(this);
                }
            }
        }

        const startBoss2 = function () {  //*********************************boss2
            const boss2 = new Sprite(1216, 337);
            boss.push(boss2);
            boss2.originX = 0;
            boss2.originY = 0;
            boss2.scale(0.15, 0.15);
            boss2.moveTo(850, 308);
            boss2.image = game.assets[imgBossShips[2]];
            game.currentScene.addChild(boss2);
            boss.push(boss2);
        
            boss2.id = boss2id;
            boss2id++;
        
            boss2.hp = 20;
        
            let ship3Fx = 0;
        
            const enemyBullet3Move = function (speedX, speedY, angle) {
                const enemyBullet3 = new Sprite(200, 100);
                enemyBullet3.originX = 0;
                enemyBullet3.originY = 0;
                enemyBullet3.scale(0.1, 0.1);
                enemyBullet3.moveTo(boss2.x + 70, boss2.y + 20);
                enemyBullet3.image = game.assets[imgEnemyBullets[3]];
                game.currentScene.addChild(enemyBullet3);
                enemyBullet3.rotation = angle;
        
                enemyBullet3.onenterframe = function () {
                    
                    let damage = 0.1;
                    enemyBullet3.x += speedX;
                    enemyBullet3.y += speedY;
        
                    for(const ship1 of ships1){
                        if(enemyBullet3.x - ship1.x >= 0 && enemyBullet3.x - ship1.x <= 70){
                            if(ship1.y - enemyBullet3.y <= -50){
                                ship1.hp -= damage;
                                damage = 0;
                                game.currentScene.removeChild(this);
                                break;
                            }
                        }
                    }
                    for(const ship2 of ships2){    
                        if(enemyBullet3.x - ship2.x >= 0 && enemyBullet3.x - ship2.x <= 100){
                            if(ship2.y - enemyBullet3.y <= -50){
                                ship2.hp -= damage;
                                damage = 0;
                                game.currentScene.removeChild(this);
                                break;
                            }
                        }
                    }
                    for(const ship3 of ships3){   
                        if(enemyBullet3.x - ship3.x >= 0 && enemyBullet3.x - ship3.x <= 40){
                            if(ship3.y - enemyBullet3.y >= -50 && ship3.y - enemyBullet3.y < 0){
                                ship3.hp -= damage;
                                damage = 0;
                                game.currentScene.removeChild(this);
                                break;
                            }
                        }
                    }
                    if(enemyBullet3.x - myHome < 30 && enemyBullet3.y > 250){
                        myHelth -= damage;
                        damage = 0;
                        game.currentScene.removeChild(this);
                    }
                    else if(enemyBullet3.y > 350 || enemyBullet3.x < 0){
                        damage = 0;
                        game.currentScene.removeChild(this);
                    }
                }
            }
        
            let scoreA = 0;
            let scoreB = 0;
            let moving = 1;
            let speedX;
            let speedY;
            let angle;
            boss2.onenterframe = function () {
                moving = 1;
                for(const ship1 of ships1){
                    if(boss2.x - ship1.x < -10){
                        moving = 2;
                        break;
                    } else if((boss2.x - (ship1.x - 1 + 1))**2 <= 20000){
                        moving = 0;
                        break;
                    }
                    else{
                        moving = 1;
                    }
                }
                for(const ship2 of ships2){
                    if(boss2.x - ship2.x < -10){
                        moving = 2;
                        break;
                    } else if((boss2.x - (ship2.x - 1 + 1))**2 <= 20000){
                        moving = 0;
                        break;
                    } else{
        
                    }
                }
                for(const ship3 of ships3){
                    if(boss2.x - ship3.x < 180){
                        moving = 3;
                        break;
                    } else{
        
                    }
                }
                if(boss2.x - myHome <= 70){
                    moving = 0;
                    //break;
                }
                else if(ships1.length + ships2.length + ships3.length == 0){
                    moving = 1;
                }
                switch(moving){
                    case 0:
                        scoreA += 1;
                        scoreB += 1;
                        if(scoreA % 10 == 0 || scoreA == 1){
                            speedX = -4.5;
                            speedY = 0.5;
                            angle = -10;
                            enemyBullet3Move(speedX, speedY, angle);
                        }
                        if(scoreB % 400 == 0 || scoreB == 1){
                            startEnemyShip3(boss2.x + 100, boss2.y);
                        }
                        break;
                    case 1:
                        scoreB += 1;
                        if(scoreB % 400 == 0 || scoreB == 1){
                            startEnemyShip3(boss2.x + 100, boss2.y);
                        }
                        boss2.x -= 0.5;
                        boss2.frame = 1;
                        break;
                    case 2:
                        scoreB += 1;
                        if(scoreB % 400 == 0 || scoreB == 1){
                            startEnemyShip3(boss2.x + 100, boss2.y);
                        }
                        boss2.x += 1.5;
                        boss2.frame = 0;
                        break;
                    case 3:
                        scoreA += 1;
                        ship3Fx = 0;
                        for(const ship3 of ships3){
                            ship3Fx = ship3.x;
                            break;
                        }
                        if(scoreA % 10 == 0 || scoreA == 1){
                            speedX = -(boss2.x - ship3Fx )/60 -1.2;
                            speedY = -Math.sqrt(25 - speedX**2);
                            angle = 90 + 18*speedX;
                            enemyBullet3Move(speedX, speedY, angle);
                        }
                        break;
        
                }
                if(boss2.hp <= 0){
                    boss = array(boss, boss2.id);
                    game.currentScene.removeChild(this);
                }
            }
        }


        const setHome = function () {
            const Home = new Scene();
            Home.backgroundColor = "grey";
            game.pushScene(Home);

            Home.addChild(homeText);

            const startlv1Btn = new Sprite(200, 100);
            startlv1Btn.moveTo(50, 300);
            startlv1Btn.image = game.assets[imgLevels[1]];
            Home.addChild(startlv1Btn);

            startlv1Btn.ontouchend = function () {
                game.popScene();
                setLevel1Scene();
            };

            const startlv2Btn = new Sprite(200, 100);
            startlv2Btn.moveTo(350, 300);
            startlv2Btn.image = game.assets[imgLevels[2]];
            Home.addChild(startlv2Btn);

            startlv2Btn.ontouchend = function () {
                game.popScene();
                setLevel2Scene();
            };
        }

        const selectdifBtn = new Sprite(300, 100);
        selectdifBtn.moveTo(600, 350);
        selectdifBtn.image = game.assets[imgSelectDif];
        selectdifBtn.ontouchend = function(){
            game.resume();
            game.popScene();
            setHome();
        };

        const setLevel1Scene = function () { //********************************************レベル1設定
            myship1id = 0;
            ships1 = [];
            myship2id = 0;
            ships2 = [];
            enemyShips1 = [];
            enemyship1id = 0;
            boss = [];
            boss1id = 0;

            game.assets['sound/bgm.mp3'].play();
            game.assets['sound/bgm.mp3'].volume = 0.1;
            game.assets['sound/bgm.mp3'].src.loop = true;

            const Level1Scene = new Scene();
            Level1Scene.backgroundColor = "grey";
            game.pushScene(Level1Scene);

            Level1Scene.addChild(stage);

            Level1Scene.addChild(myHelthBar);

            myHelth = 32.0;
            myHelthBar.scaleY = 0.5;
            let a = myHelth * 0.125
            myHelthBar.onenterframe = function () {
                myHelthBar.scaleX = myHelth/a;
            }

            Level1Scene.addChild(enemyHelthBar);

            enemyHelth = 32.0;
            enemyHelthBar.scaleY = 0.5;
            enemyHelthBar.onenterframe = function () {
                enemyHelthBar.scaleX = enemyHelth/a;
            }

            //*********************************************使える自機
            Level1Scene.addChild(ship1Btn);
            Level1Scene.addChild(ship2Btn);
    

            Level1Scene.addChild(mymoneyText);

            mymoneyText.text = "money:" + myMoney;

            const retryBtn = new Sprite(300, 100);
            retryBtn.moveTo(100, 350);
            retryBtn.image = game.assets[imgRetry];
            retryBtn.ontouchend = function(){
                game.resume();
                game.popScene();
                displayedMoney = 0;
                myMoney = 0;
                setLevel1Scene();
            };
            
            let bossflag = 0;
            
            Level1Scene.onenterframe = function () {
                enemyMoney += 1;
                myMoney += 1;
                if(myMoney == 10){
                    displayedMoney++;
                    myMoney -= 10;
                }
                mymoneyText.text = "money:" + displayedMoney;
                if(enemyMoney == 170){
                    startEnemyShip1();
                    enemyMoney -= 170;
                }
                if(enemyHelth <= 30 && bossflag == 0){
                    bossflag = 1;
                    startBoss1();
                    game.assets['sound/bgm.mp3'].stop();
                    game.assets['sound/boss.mp3'].play();
                    game.assets['sound/boss.mp3'].volume = 0.1;
                    Level1Scene.addChild(textbox);
                    bossText.text = "Boss apeared!";
                    Level1Scene.addChild(bossText);
                    game.pause();
                    window.setTimeout(function(){
                        game.resume();
                        game.assets['sound/bgm.mp3'].play();
                        game.assets['sound/bgm.mp3'].src.loop = true;
                        Level1Scene.removeChild(textbox);
                        Level1Scene.removeChild(bossText);
                    }, 2000);
                }

                if(enemyHelth <= 0){
                    endText.text = "You Win!";
                    game.assets['sound/bgm.mp3'].stop();
                    Level1Scene.addChild(textbox);
                    Level1Scene.addChild(endText);
                    Level1Scene.addChild(retryBtn);
                    Level1Scene.addChild(selectdifBtn);
                    game.pause();
                    
                }
                if(myHelth <= 0){
                    endText.text = "You Lose!";
                    game.assets['sound/bgm.mp3'].stop();
                    Level1Scene.addChild(textbox);
                    Level1Scene.addChild(endText);
                    Level1Scene.addChild(retryBtn);
                    Level1Scene.addChild(selectdifBtn);
                    game.pause();
                }
            }
        }

        const setLevel2Scene = function () {  //********************************************レベル2設定
            myship1id = 0;
            ships1 = [];
            ships2 = [];
            enemyShips1 = [];
            enemyship1id = 0;

            game.assets['sound/bgm.mp3'].play();
            game.assets['sound/bgm.mp3'].volume = 0.1;
            game.assets['sound/bgm.mp3'].src.loop = true;

            const Level2Scene = new Scene();
            Level2Scene.backgroundColor = "grey";
            game.pushScene(Level2Scene);

            Level2Scene.addChild(stage);

            Level2Scene.addChild(enemyHelthBar);

            Level2Scene.addChild(myHelthBar);

            myHelth = 32.0;
            myHelthBar.scaleY = 0.5;
            let a = myHelth * 0.125
            myHelthBar.onenterframe = function () {
                myHelthBar.scaleX = myHelth/a;
            }

            enemyHelth = 32.0;
            enemyHelthBar.scaleY = 0.5;
            enemyHelthBar.onenterframe = function () {
                enemyHelthBar.scaleX = enemyHelth/a;
            }

            //*********************************************使える自機
            Level2Scene.addChild(ship1Btn);
            Level2Scene.addChild(ship2Btn);
            Level2Scene.addChild(ship3Btn);
    

            Level2Scene.addChild(mymoneyText);

            mymoneyText.text = "money:" + myMoney;

            const retryBtn = new Sprite(300, 100);
            retryBtn.moveTo(100, 350);
            retryBtn.image = game.assets[imgRetry];
            retryBtn.ontouchend = function(){
                game.resume();
                game.popScene();
                displayedMoney = 0;
                myMoney = 0;
                setLevel2Scene();
            };
            
            let bossflag = 0;
            
            Level2Scene.onenterframe = function () {
                enemyMoney += 1;
                myMoney += 1;
                if(myMoney == 10){
                    displayedMoney++;
                    myMoney -= 10;
                }
                mymoneyText.text = "money:" + displayedMoney;
                if(enemyMoney % 200 == 0){
                    startEnemyShip1();
                }
                if(enemyMoney % 1000 == 0){
                    startEnemyShip3(1200, 150);
                }

                if(enemyHelth <= 30 && bossflag == 0){
                    bossflag = 1;
                    startBoss2();
                    game.assets['sound/bgm.mp3'].stop();
                    game.assets['sound/boss.mp3'].play();
                    game.assets['sound/boss.mp3'].volume = 0.1;
                    Level2Scene.addChild(textbox);
                    bossText.text = "Boss apeared!";
                    Level2Scene.addChild(bossText);
                    game.pause();
                    window.setTimeout(function(){
                        game.resume();
                        game.assets['sound/bgm.mp3'].play();
                        game.assets['sound/bgm.mp3'].src.loop = true;
                        Level2Scene.removeChild(textbox);
                        Level2Scene.removeChild(bossText);
                    }, 2000);
                }
                if(enemyHelth <= 0){
                    endText.text = "You Win!";
                    game.assets['sound/bgm.mp3'].stop();
                    Level2Scene.addChild(textbox);
                    Level2Scene.addChild(endText);
                    Level2Scene.addChild(retryBtn);
                    Level2Scene.addChild(selectdifBtn);
                    game.pause();
                    
                }
                if(myHelth <= 0){
                    endText.text = "You Lose!";
                    game.assets['sound/bgm.mp3'].stop();
                    Level2Scene.addChild(textbox);
                    Level2Scene.addChild(endText);
                    Level2Scene.addChild(retryBtn);
                    Level2Scene.addChild(selectdifBtn);
                    game.pause();
                }
            }
        }
        

        setHome();
    }

    game.start();
}