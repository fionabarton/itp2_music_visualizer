/*
TO BE COMPLETED:

STATE:
- Next Wave: Increase rate at which fleet moves AND shoots
- Game Over if fleet reaches bottom of screen

UI:
- Provide user w/ INSTRUCTIONS: Move mouse to move player left or right, click to  fire a bullet

TUNE:
- Enemy: Movement
- Image Positions/Hit Detection

- Defense bunkers
- Enemy Explosion and/or display points
- Enemy: different points for different enemies?
- SFX

BUG: 
When paused, if next/previous track button pressed, currentTime does not display 0:00

//////////////////////////////////////////////////////////////////////
Sources:
Timer: https://editor.p5js.org/marynotari/sketches/S1T2ZTMp-

*/

/*
8/24 
COMPLETED:
-Created separate .js files for constructor functions (bullet, player, & intruders)

-Added "aliens" variable in sketch.js to cache the AlienIntruders instance. 
 Allows constructor functions associated w/ the visualisation to easily access it. 
 
-Added MysteryShip.js
 
-For all constructors w/ update & draw functions, instead of calling both functions in AlienIntruders.js,
 the draw function is now called within update function.
 
*/

function AlienIntruders(){
    // name of the visualisation
	this.name = "Alien Intruders";

    // variable for score amount
    this.score = 0;
    // variable for high score amount
    this.highScore = 0;
    // variable for lives amount
    this.lives = 2;
    
    // variables for frequency energy
    this.b;
    let l;
    this.h;
    this.t;
    
    // menu button
    const MENU_BUTTON_W = 100;
    const MENU_BUTTON_H = 100;
    let menuButtonX = width/2 - 50; 
    let menuButtonY = height/2 - 50;
    
    // game state: 0 = start, 1 = gameplay, 2 = respawn, 3 = gameOver, 4 = nextWave
    this.gameState = 0;
    
    // variable for count down timer
    let timer = 3;
    
    // initialize array of stars & randomly set their position on the canvas
    let stars = [];
    for(let i = 0; i < 300; i++){
        stars.push(new Star(random(0, width), random(0, height)));
    }

    // array to hold player & enemy bullets 
    this.bullets = [];
    
    // initialize variables for Player, Mystery Ship, and Intruders (aka the alien fleet!) 
    this.player = new Player();
    this.intruders = new Intruders();
    this.mysteryShip = new MysteryShip();
    
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
	this.draw = function(){
        push();
        
        background(0,0,25);
        noStroke();
        
        textSize(15);
        textAlign(CENTER, CENTER);
        
        imageMode(CENTER);
        
        // get energy of specific frequencies
        fourier.analyze();
        this.b = map(fourier.getEnergy("bass"), 0, 255, 1, 10);
        l = map(fourier.getEnergy("lowMid"), 0, 255, 1, 10);
        this.h = map(fourier.getEnergy("highMid"), 0, 255, 1, 10);
        this.t = map(fourier.getEnergy("treble"), 0, 255, 1, 10);

        //////////////// Draw Stars ////////////////
        for(let i = 0; i < stars.length; i++){
            stars[i].update();
            //stars[i].draw();
        }
        
        switch(this.gameState){
            case 0: //////////////// Start ////////////////
                // Draw Button
                fill(200);
                rect(menuButtonX - 10, menuButtonY - 10, MENU_BUTTON_W + 20, MENU_BUTTON_H + 20);
                fill(100);
                rect(menuButtonX, menuButtonY, MENU_BUTTON_W, MENU_BUTTON_H);
                fill(0,255,0);
                text("Click to play", menuButtonX + MENU_BUTTON_W/2, menuButtonY + MENU_BUTTON_H/2);
                break;
            case 1: //////////////// Gameplay ////////////////
 
                // move the fleet
                //this.intruders.moveIntruders();
                
                //////////////// Instantiate Enemy Bullets ////////////////
                //this.intruders.instantiateBullets();
                
                //////////////// Draw Bullets ////////////////

                for(let i = 0; i < this.bullets.length; i++){

                    this.bullets[i].update();
                    
                    try{
                        //this.bullets[i].draw();
                    }catch(error){
                        console.log("bullets[i].draw(b) is UNDEFINED! " + error);
                    }
                }

                break;
            case 2: //////////////// Respawn ////////////////
                // Draw Button
                fill(200);
                rect(menuButtonX - 10, menuButtonY - 10, MENU_BUTTON_W + 20, MENU_BUTTON_H + 20);
                fill(100);
                rect(menuButtonX, menuButtonY, MENU_BUTTON_W, MENU_BUTTON_H);
                fill(0,255,0);
                text("Get Ready\n" + timer, menuButtonX + MENU_BUTTON_W/2, menuButtonY + MENU_BUTTON_H/2);
                
                // decrement timer
                if (frameCount % 60 == 0 && timer > 0) { 
                    timer--;
                }
                
                // change state & reset timer
                if (timer == 0) {
                    this.gameState = 1;
                    timer = 3;
                }
                
                // clear array of bullets
                this.bullets = [];
                
                break;
            case 3: //////////////// Game Over ////////////////
                // Draw Button
                fill(200);
                rect(menuButtonX - 10, menuButtonY - 10, MENU_BUTTON_W + 20, MENU_BUTTON_H + 20);
                fill(100);
                rect(menuButtonX, menuButtonY, MENU_BUTTON_W, MENU_BUTTON_H);
                fill(0,255,0);
                text("Game Over\n" + timer, menuButtonX + MENU_BUTTON_W/2, menuButtonY + MENU_BUTTON_H/2);

                // decrement timer
                if (frameCount % 60 == 0 && timer > 0) { 
                    timer--;
                }
                
                // change state & reset timer
                if (timer == 0) {
                    this.initializeGame(true);
                    
                    this.gameState = 0;
                    timer = 3;
                }
                
                // clear array of bullets
                this.bullets = [];
                
                break;
            case 4: //////////////// Next Wave ////////////////
                // Draw Button
                fill(200);
                rect(menuButtonX - 10, menuButtonY - 10, MENU_BUTTON_W + 20, MENU_BUTTON_H + 20);
                fill(100);
                rect(menuButtonX, menuButtonY, MENU_BUTTON_W, MENU_BUTTON_H);
                fill(0,255,0);
                text("Good Work\nNext Wave\n" + timer, menuButtonX + MENU_BUTTON_W/2, menuButtonY + MENU_BUTTON_H/2);
                
                // decrement timer
                if (frameCount % 60 == 0 && timer > 0) { 
                    timer--;
                }
                
                // change state & reset timer
                if (timer == 0) {
                    this.initializeGame(false);
                    
                    this.gameState = 1;
                    timer = 3;
                }
                
                // clear array of bullets
                this.bullets = [];

                break;
            case 5:
                
                break;
        }

        //////////////// Draw Intruders ////////////////
        //this.intruders.draw();
        this.intruders.update();

        //////////////// Draw Player Ship ////////////////
        this.player.update();
        
        //////////////// Draw Mystery Ship ////////////////
        this.mysteryShip.update();
        
        //////////////// Draw Score & Lives Text ////////////////
        fill(0,255,0);
        textSize(15);
        text("Score: " + this.score, width/10, height - 30);
        text("Hi-Score: " + this.highScore, width/10 * 5, height - 30);
        text("Lives: " + this.lives, width/10 * 8, height - 30);
        
        pop();
	}
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////

    this.mouseClicked = function(){
        switch(this.gameState){
            case 0: 
                 //start gameplay button
                if(mouseX > menuButtonX && 
                   mouseX < menuButtonX + MENU_BUTTON_W && 
                   mouseY > menuButtonY && 
                   mouseY < menuButtonY + MENU_BUTTON_H){ 
                    this.gameState = 1;
                }  
                break;
            case 1:
                    this.bullets.push(new Bullet(mouseX, this.player.yPos, 0, 255, true));
                break;
        }
	}
    
    // initialize setting for (re)starting the game
    this.initializeGame = function(resetScoresAndLives){
        if(resetScoresAndLives){
            this.score = 0;
            this.lives = 2;
        }

        // clear and then create array of invaders
        this.intruders.fleet = [];
        this.intruders.initialize();
    }
    
    this.onResize = function(){
        this.player.onResize();
        
        menuButtonX = width/2 - 50; 
        menuButtonY = height/2 - 50;
    }
}