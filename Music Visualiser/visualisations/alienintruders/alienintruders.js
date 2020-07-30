/*
7/29 
COMPLETED:
-Basic game mode implementation.
-Created separate .js files for constructor functions, EXCEPT Bullets
-Player Explosion

BUG: When music isn't playing, collision detection doesn't work
SOLUTION: Added pad variable to the bullet collision function

BUG: Uncaught TypeError Cannot read property 'draw' of undefined
SOLUTION: Used try and catch 

//////////////////////////////////////////////////////////////////////

TO BE COMPLETED:
Next Wave: Increase rate at which fleet moves & shoots
Game Over if fleet reaches bottom of screen
Enemy Explosion
Provide user w/ instructions: Move mouse to move player left or right, click to fire a bullet
*/

function AlienIntruders(){
    // name of the visualisation
	this.name = "Alien Intruders";

    // player ship variables
    let playerXPos = width/2;       
    let playerYPos = height/1.125; // scale w/ canvas size
    let playerActive = true;
    const PLAYER_W = 75;
    const PLAYER_H = 25;

    // variable for score amount
    let score = 0;
    // variable for high score amount
    let highScore = 0;
    // variable for lives amount
    let lives = 2;
    
    // variables for frequency energy
    let b;
    let l;
    let h;
    let t;
    
    // intruder moving left or right
    let intruderFleetMovingLeft = true;
    // decrement this value to increase the interval at which the fleet moves horizontally
    let intruderFleetSpeed = 50; 
    let intruderAmount;
    
    // play button
    const PLAY_BUTTON_W = 100;
    const PLAY_BUTTON_H = 100;
    let playButtonX = width/2 - 50; 
    let playButtonY = height/2 - 50;
    
    
    // game state: 0 = start, 1 = gameplay, 2 = respawn, 3 = gameOver, 4 = nextWave
    let gameState = 0;
    
    let timer = 3;
    
    let explosionFlicker;
    
    
    // initialize array of stars & randomly set their position on the canvas
    let stars = [];
    for(let i = 0; i < 300; i++){
        stars.push(new Star(random(0, width), random(0, height)));
    }

    // initialize array of invaders and position them on the canvas
    let intruders = [];
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 5; j++){
            intruders.push(new Intruder(i, j));
        }
    }
    // track amount of intruders still active
    intruderAmount = intruders.length;

    // array to hold player & enemy bullets 
    let bullets = [];
    
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
	this.draw = function(){
        push();
        
        background(0);
        noStroke();
        
        textSize(15);
        textAlign(CENTER, CENTER);
        
        // get energy of specific frequencies
        fourier.analyze();
        b = map(fourier.getEnergy("bass"), 0, 255, 1, 10);
        l = map(fourier.getEnergy("lowMid"), 0, 255, 1, 10);
        h = map(fourier.getEnergy("highMid"), 0, 255, 1, 10);
        t = map(fourier.getEnergy("treble"), 0, 255, 1, 10);
        
        //////////////// Draw Stars ////////////////
        
        for(let i = 0; i < stars.length; i++){
            stars[i].update(t);
            stars[i].draw(t);
        }
        
        switch(gameState){
            case 0: //////////////// Start ////////////////
                fill(100);
                rect(playButtonX, playButtonY, PLAY_BUTTON_W, PLAY_BUTTON_H);

                fill(0,255,0);
                text("Click to play", playButtonX + PLAY_BUTTON_W/2, playButtonY + PLAY_BUTTON_H/2);
                break;
            case 1: //////////////// Gameplay ////////////////
                // scale w/ canvas size
                playerYPos = height/1.125;

                // move the fleet
                this.moveIntruders();
                
                //////////////// Instantiate Enemy Bullets ////////////////

                if(frameCount % 50 == 0){
                    let randomNdx = Math.floor(random(0, intruders.length - 1));

                    if(intruders[randomNdx].active){ 
                        bullets.push(new Bullet(
                            intruders[randomNdx].xPos * width/10 + (intruders[randomNdx].width/2), 
                            intruders[randomNdx].yPos * height/15 + (intruders[randomNdx].height/2), 
                                                255, 0, false, bullets.length));
                    }
                }
                
                //////////////// Draw Bullets ////////////////

                for(let i = 0; i < bullets.length; i++){

                    bullets[i].update(h, this.initializeGame);
                    
//                    if(typeof(bullets[i].draw(b)) != 'undefined'){
//                        bullets[i].draw(b);
//                    }else{
//                        console.log("bullets[i].draw(b) is UNDEFINED!");
//                    }
                    
                    try{
                        bullets[i].draw(b);
                    }catch(error){
                        console.log("bullets[i].draw(b) is UNDEFINED! " + error);
                    }
                }

                break;
            case 2: //////////////// Respawn ////////////////
                fill(100);
                rect(playButtonX, playButtonY, PLAY_BUTTON_W, PLAY_BUTTON_H);

                fill(0,255,0);
                text("Get Ready\n" + timer, playButtonX + PLAY_BUTTON_W/2, playButtonY + PLAY_BUTTON_H/2);
                
                // timer
                if (frameCount % 60 == 0 && timer > 0) { 
                    timer --;
                  }
                if (timer == 0) {
                    gameState = 1;
                    timer = 3;
                }
                
                // clear array of bullets
                bullets = [];
                console.log("bullets length: " + bullets.length);
                
                break;
            case 3: //////////////// Game Over ////////////////
                fill(100);
                rect(playButtonX, playButtonY, PLAY_BUTTON_W, PLAY_BUTTON_H);

                fill(0,255,0);
                text("Game Over\n" + timer, playButtonX + PLAY_BUTTON_W/2, playButtonY + PLAY_BUTTON_H/2);
                //text("Game Over\nTry again in\n" + timer, playButtonX + PLAY_BUTTON_W/2, playButtonY + PLAY_BUTTON_H/2);
                
                // timer
                if (frameCount % 60 == 0 && timer > 0) { 
                    timer --;
                  }
                if (timer == 0) {
                    this.initializeGame(true);
                    
                    gameState = 0;
                    timer = 3;
                }
                
                // clear array of bullets
                bullets = [];
                console.log("bullets length: " + bullets.length);
                
                break;
            case 4: //////////////// Next Wave ////////////////
                fill(100);
                rect(playButtonX, playButtonY, PLAY_BUTTON_W, PLAY_BUTTON_H);
                
                fill(0,255,0);
                text("Good Work\nNext Wave\n" + timer, playButtonX + PLAY_BUTTON_W/2, playButtonY + PLAY_BUTTON_H/2);
                
                // timer
                if (frameCount % 60 == 0 && timer > 0) { 
                    timer --;
                  }
                if (timer == 0) {
                    this.initializeGame(false);
                    
                    gameState = 1;
                    timer = 3;
                }
                
                // clear array of bullets
                bullets = [];
                console.log("bullets length: " + bullets.length);
                break;
            case 5:
                
                break;
        }
        
        //////////////// Draw Intruders ////////////////

        for(let i = 0; i < intruders.length; i++){
            intruders[i].draw(b);
        }

        //////////////// Draw Player Ship ////////////////

        switch(gameState){
            case 0:
            case 1:
            case 4:
                // draw player ship, size affected by bass 
                fill(0,255,0);
                rect(playerXPos - b, playerYPos - b, 
                     PLAYER_W + b*2, PLAYER_H + b*2);
                noFill();

                // player ship follows mouseX
                playerXPos = mouseX - PLAYER_W / 2;
                break;
            case 2:
            case 3:
            default:
                // player ship explosion
                if(frameCount % 5== 0){
                    if(explosionFlicker){
                        explosionFlicker = false; 
                    } else{
                        explosionFlicker = true

                    }
                }

                if(explosionFlicker){
                    if(frameCount % 3 == 0){
                        fill(255,0,0);
                    }else{
                        fill(175,175,0);
                    }
                triangle(playerXPos + (PLAYER_W/2), playerYPos - (PLAY_BUTTON_H/3),
                         playerXPos, playerYPos + (PLAY_BUTTON_H/3.5),
                         playerXPos + PLAYER_W, playerYPos + (PLAY_BUTTON_H/3.5));
                    } else{  
                        if(frameCount % 3 == 0){
                        fill(175,175,0);
                    }else{
                        fill(255,0,0);
                    }
                triangle(playerXPos + (PLAYER_W/2), playerYPos + (PLAY_BUTTON_H/2),
                         playerXPos, playerYPos - (PLAY_BUTTON_H/6),
                         playerXPos + PLAYER_W, playerYPos - (PLAY_BUTTON_H/6));
                    }
                break; 
        }

        //////////////// Draw Score & Lives Text ////////////////
        
        fill(0,255,0);
        textSize(15);
        text("Score: " + score, width/10, height - 30);
        text("Hi-Score: " + highScore, width/10 * 5, height - 30);
        text("Lives: " + lives, width/10 * 8, height - 30);
        
        pop();
	}
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    
//    this.delayGameStateTransition(){
//
//    }
    
    this.mouseClicked = function(){
        switch(gameState){
            case 0: 
                 //start gameplay button
                if(mouseX > playButtonX && 
                   mouseX < playButtonX + PLAY_BUTTON_W && 
                   mouseY > playButtonY && 
                   mouseY < playButtonY + PLAY_BUTTON_H){ 
                    gameState = 1;
                }
                
                break;
            case 1:
                    bullets.push(new Bullet(mouseX, playerYPos, 0, 255, true));
                break;
        }
	}
    
    // move the fleet!
    this.moveIntruders = function(){
        if(frameCount % intruderFleetSpeed == 0){
            if(intruderFleetMovingLeft){
                for(let i = 0; i < intruders.length; i++){
                    // move left
                    intruders[i].xPos -= 0.1;
                    
                    // move down
                    if(intruders[i].xPos <= 0){
                        for(let j = 0; j < intruders.length; j++){
                            intruders[j].yPos += 0.1;
                        }
                        intruderFleetMovingLeft = false;
                    }
                }
            } else{
                for(let i = 0; i < intruders.length; i++){
                    // move right
                    intruders[i].xPos += 0.1;
                    
                    // move down
                    if(intruders[i].xPos >= 9.5){
                        for(let j = 0; j < intruders.length; j++){
                            intruders[j].yPos += 0.1;
                        }
                        intruderFleetMovingLeft = true;
                    }
                }
            }  
        }
	}
    
    // initialize setting for (re)starting the game
    this.initializeGame = function(resetScoresAndLives){
        if(resetScoresAndLives){
            score = 0;
            lives = 2;
        }
        
        // clear and then create array of invaders
        intruders = [];
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 5; j++){
                intruders.push(new Intruder(i, j));
            }
        }
        
        // track amount of intruders still active
        intruderAmount = intruders.length;
    }
    
    
    //////////////// Bullet Constructor ////////////////
    
    function Bullet(x, y, r, g, isPlayerBullet){
        this.xPos = x;
        this.yPos = y;
        this.width = 5;
        this.height = 30;
        this.speed = 5;
        this.color = [r, g, 0];
        this.isPlayerBullet = isPlayerBullet;
        this.active = true;
        this.padding = 9; // for collisions
        
        // detect collision w/ both player and intruders
        this.onCollision = function(initializeGame){
            
            // cached to make the following code more readable 
            let pad = max(this.padding, b * 2)
            
            if(this.isPlayerBullet){
                for(let i = 0; i < intruders.length; i++){
                    if(intruders[i].active){
//                        if(this.xPos + b * 2 > intruders[i].xPos * width/10 && 
//                           this.xPos + this.width - b * 2 < intruders[i].xPos * width/10 + intruders[i].width && 
//                           this.yPos + b * 2 > intruders[i].yPos * height/15 && 
//                           this.yPos + this.height - b * 2 < intruders[i].yPos * height/15 + intruders[i].height 
//                          ){  
                        if(this.xPos + pad > intruders[i].xPos * width/10 && 
                           this.xPos + this.width - pad < intruders[i].xPos * width/10 + intruders[i].width && 
                           this.yPos + pad > intruders[i].yPos * height/15 && 
                           this.yPos + this.height - pad < intruders[i].yPos * height/15 + intruders[i].height 
                          ){ 
                            // deactivate intruder
                            intruders[i].active = false;
                            // deactivate bullet 
                            this.active = false;
                            
                            // increment score
                            score += intruders[i].points;
                            //set high score
                            if(score > highScore){
                                highScore = score;
                            }
                            
                            intruderAmount -= 1;
                            if(intruderAmount <=0){
                                gameState = 4;
                            }
                        }
                    }
                }
            }else{ 
//                if(this.xPos + b * 2 > playerXPos - b && 
//                   this.xPos + this.width - b * 2 < playerXPos - b + PLAYER_W + b * 2 && 
//                   this.yPos + b * 2 > playerYPos - b && 
//                   this.yPos + this.height - b * 2 < playerYPos - b + PLAYER_H + b * 2){  
                if(this.xPos + pad > playerXPos - max(this.padding, b) && 
                   this.xPos + this.width - pad < playerXPos - pad + PLAYER_W + pad && 
                   this.yPos + pad > playerYPos - max(this.padding, b) &&
                   this.yPos + this.height - pad < playerYPos - pad + PLAYER_H + pad){  
                    
                    // deactivate bullet 
                    this.active = false;

                    // decrement lives
                    lives -= 1;
                    
                    // game over
                    if(lives <= 0){
                        gameState = 3;
                    // respawn
                    }else{
                        gameState = 2
                    }
                    
                    
                }
            }
        } 
        
        this.update = function(h, initializeGame){
            // change Y position (by speed * high mid)
            if(this.isPlayerBullet){
                this.yPos -= this.speed * min(1, h);
            }else{
                this.yPos += this.speed * min(1, h);
            }

            if(this.active){
                // detect collison w/ player & intruders
                this.onCollision(this.initializeGame);
            }

            // remove bullet from array if offscreen
            if(this.yPos <= 0 || this.yPos >= height){
                bullets.splice(this, 1);
            }
        }
        
        this.draw = function(b){
            if(this.active){
                // draw bullet, size affected by bass  
                fill(this.color);
                rect(this.xPos - min(7.5, b * 2), 
                     this.yPos - b * 3, 
                     this.width + min(7.5, b * 2), 
                     this.height + b * 3);
//                rect(this.xPos, 
//                     this.yPos, 
//                     this.width, 
//                     this.height);
                noFill();
            }
        }
    }
}