function AlienIntruders(){
    // name of the visualisation
	this.name = "Alien Intruders";

    // player ship variables
    let playerXPos = width/2;
    let playerYPos = height/1.125;
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
    
    // game state... TO BE IMPLEMENTED!
    const GAME_STATES = ["gameplay", "respawn", "win", "lose", "titleScreen"];
    let gameState = GAME_STATES[0];
    
    //////////////// Star Constructor ////////////////
    
    function Star (x, y){
        this.xPos = x;
        this.yPos = y;
        this.width = random(1, 4);
        this.height = random(1, 4);
        this.speed = random(2, 5);
        this.color = [255, 255, 255, random(150, 255)]; 
    } 
    
    // initialize array of stars & randomly set their position on the canvas
    let stars = [];
    for(let i = 0; i < 300; i++){
        stars.push(new Star(random(0, width), random(0, height)));
    }
    
    //////////////// Intruder Constructor ////////////////
    
    function Intruder (x, y){
        this.xPos = x + 1;
        this.yPos = y + 1;
        this.width = 20;
        this.height = 20;
        this.padding = 10;
        this.speed = random(2, 10);
        this.color = [255,0,0];
        this.active = true;
        this.points = 10;
    }
    
    // initialize array of invaders and position them on the canvas
    let intruders = [];
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 5; j++){
            intruders.push(new Intruder(i, j));
        }
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
        
        // collision w/ both player and intruders
        this.onCollision = function(){
            if(this.isPlayerBullet){
                for(let i = 0; i < intruders.length; i++){
                    if(intruders[i].active){
                        if(this.xPos + b * 2 > intruders[i].xPos * width/10 && 
                           this.xPos + this.width - b * 2 < intruders[i].xPos * width/10 + intruders[i].width && 
                           this.yPos + b * 2 > intruders[i].yPos * height/15 && 
                           this.yPos + this.height - b * 2 < intruders[i].yPos * height/15 + intruders[i].height 
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
                        }
                    }
                }
            }else{ 
                if(this.xPos + b * 2 > playerXPos - b && 
                   this.xPos + this.width - b * 2 < playerXPos - b + PLAYER_W + b * 2 && 
                   this.yPos + b * 2 > playerYPos - b && 
                   this.yPos + this.height - b * 2 < playerYPos - b + PLAYER_H + b * 2){  
                    // deactivate bullet 
                    this.active = false;
                    // decrement lives
                    lives -= 1;
                }
            }
        } 
    }
    
    // array to hold player & enemy bullets 
    let bullets = [];
    
    ////////////////////////////////////////////////////////////////////////////////
	this.draw = function(){
		push();
        
        background(0);
        noStroke();
        
        // scale w/ canvas size
        playerYPos = height/1.125;
        
        // get energy of specific frequencies
        fourier.analyze();
        b = map(fourier.getEnergy("bass"), 0, 255, 1, 10);
        l = map(fourier.getEnergy("lowMid"), 0, 255, 1, 10);
        h = map(fourier.getEnergy("highMid"), 0, 255, 1, 10);
        t = map(fourier.getEnergy("treble"), 0, 255, 1, 10);
        
        //////////////// Draw Stars ////////////////
        
        for(let i = 0; i < stars.length; i++){
            // reset position if offscreen
            if(stars[i].yPos >= height){
                stars[i].xPos = random(0, width)
                stars[i].yPos = 0;
            }
            
            // increase Y position (by speed * treble) towards bottom of the screen
            stars[i].yPos += stars[i].speed * min(2, t);
            
            // draw stars, size affected by treble 
            fill(stars[i].color);
            rect(stars[i].xPos - t, 
                 stars[i].yPos - t, 
                 stars[i].width + t, 
                 stars[i].height + t);
            noFill();
        }
        
        //////////////// Draw Bullets ////////////////
        for(let i = 0; i < bullets.length; i++){
            
            // change Y position (by speed * high mid)
            if(bullets[i].isPlayerBullet){
                bullets[i].yPos -= bullets[i].speed * min(1, h);
            }else{
                bullets[i].yPos += bullets[i].speed * min(1, h);
            }

            if(bullets[i].active){
                // draw bullets, size affected by bass  
                fill(bullets[i].color);
                rect(bullets[i].xPos - min(7.5, b * 2), 
                     bullets[i].yPos - b * 3, 
                     bullets[i].width + min(7.5, b * 2), 
                     bullets[i].height + b * 3);
                noFill();

                // detect collison w/ player & intruders
                bullets[i].onCollision();

                // game over
                if(lives <= 0){
                    this.initializeGame(true);
                }
            }

            // remove bullet from array if offscreen
            if(bullets[i].yPos <= 0 || bullets[i].yPos >= height){
                bullets.splice(i, 1);
            }
        }
        
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
        
        //////////////// Draw Intruders ////////////////

        let activeCount = 0;
        
        for(let i = 0; i < intruders.length; i++){
            if(intruders[i].active){
                // draw intruders, size affected by bass 
                fill(intruders[i].color);
                rect(intruders[i].xPos * width/10 - b * 2,
                     intruders[i].yPos * height/15 - b * 2,   
                     intruders[i].width + b * 2, 
                     intruders[i].height + b * 2); 

                noFill();
                
                activeCount += 1;
            }
        }
        
        if(activeCount <= 0){
            this.initializeGame(false);
        }
        
        //////////////// Draw Player Ship ////////////////
        
        // draw player ship, size affected by bass 
        fill(0,255,0);
        rect(playerXPos - b, playerYPos - b, 
             PLAYER_W + b*2, PLAYER_H + b*2);
        noFill();

        // player ship follows mouseX
        playerXPos = mouseX - PLAYER_W / 2;
        
        //////////////// Draw Score & Lives Text ////////////////
        
        fill(0,255,0);
        textSize(15);
        text("Score: " + score, width/10, height - 30);
        text("Hi-Score: " + highScore, width/10 * 5, height - 30);
        text("Lives: " + lives, width/10 * 8, height - 30);
        pop();
        
        this.moveIntruders();
	}
    
    // create new bullet and add it to the bullets array
    this.mouseClicked = function(tBool){
        if(tBool)
        {
            bullets.push(new Bullet(mouseX, playerYPos, 0, 255, true));
        }
        else{
            console.log("NO CLICK");
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
    }
}