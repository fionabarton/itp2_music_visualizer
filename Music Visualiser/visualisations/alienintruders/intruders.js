//////////////// Intruders Constructor ////////////////
function Intruders (){
    
    // fleet moving left or right
    let movingLeft = true;
    
    // decrement this value to increase the interval at which the fleet moves and fires bullets
    let speed = 30; 
    
    // amount of active intruders
    this.size;
    
    // initialize array of invaders and position them on the canvas
    this.fleet = [];
    
    // initialize array of invaders and position them on the canvas
    this.initialize = function(){
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 5; j++){
                this.fleet.push(new Intruder(i, j, j));
            }
        }
        // track amount of intruders still active
        this.size = this.fleet.length;
        
        // decrement this value to increase the interval at which the fleet moves and fires bullets
        speed -= 2;
    }
    
    // Initialize first wave of intruders!
    this.initialize();

    this.update = function(){
        if(aliens.gameState == 1){
            this.moveIntruders();
            this.instantiateBullets();
        } 
        this.draw();
    }
    
    //////////////// Draw Intruders ////////////////
    this.draw = function(){
        for(let i = 0; i < this.fleet.length; i++){
            this.fleet[i].draw();
        }
    }
    
    // randomly create and position Intruder bullets
    this.instantiateBullets = function(){
        if(frameCount % speed == 0){
            this.instantiateBulletFromActiveIntruder();
        }
    }
    
    this.instantiateBulletFromActiveIntruder = function(){
        let randomNdx = Math.floor(random(0, this.fleet.length - 1));

        // if this intruder is active, launched a bullet...
        if(this.fleet[randomNdx].active){ 
            aliens.bullets.push(new Bullet(
                this.fleet[randomNdx].xPos * width/9, 
                this.fleet[randomNdx].yPos * height/12, 
                255, 0, false, aliens.bullets.length));
        // ...otherwise find a different intruder to launch a bullet
        }else{
            this.instantiateBulletFromActiveIntruder();
        }
    }
    
    // move the fleet!
    this.moveIntruders = function(){
        if(frameCount % speed == 0){
            if(movingLeft){
                for(let i = 0; i < this.fleet.length; i++){
                    if(this.fleet[i].active){
                        // move left
                        this.fleet[i].xPos -= 0.1;

                        // move down
                        if(this.fleet[i].xPos <= 0){
                            for(let j = 0; j < this.fleet.length; j++){
                                this.fleet[j].yPos += 0.1;
                            }
                            movingLeft = false;
                        }

                        // if the fleet reaches bottom of the screen, 
                        // then the invasion is successful... GAME OVER!
                        if((this.fleet[i].yPos * height / 12) + this.fleet[i].height >= aliens.player.yPos){
                            // game over
                            aliens.gameState = 3;
                        }
                    }
                }
            } else{
                for(let i = 0; i < this.fleet.length; i++){
                    if(this.fleet[i].active){
                        // move right
                        this.fleet[i].xPos += 0.1;

                        // move down
                        if(this.fleet[i].xPos >= 9){
                            for(let j = 0; j < this.fleet.length; j++){
                                this.fleet[j].yPos += 0.1;
                            }
                            movingLeft = true;
                        }

                        // if the fleet reaches bottom of the screen, 
                        // then the invasion is successful... GAME OVER!
                        if((this.fleet[i].yPos * height / 12) + this.fleet[i].height >= aliens.player.yPos){
                            // game over
                            aliens.gameState = 3;
                        }
                    }
                }
            }  
        }
	}
}