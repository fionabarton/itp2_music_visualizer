//////////////// Intruders Constructor ////////////////
function Intruders (){
    
    // fleet moving left or right
    let movingLeft = true;
    
    // decrement this value to increase the interval at which the fleet moves horizontally
    let moveSpeed = 50; 
    
    //let fireSpeed = 50;
    
    // amount of active intruders
    this.size;
    
    // initialize array of invaders and position them on the canvas
    this.fleet = [];
    
    // initialize array of invaders and position them on the canvas
    this.initialize = function(){
        //let intruders = [];
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 5; j++){
                this.fleet.push(new Intruder(i, j, j));
            }
        }
        // track amount of intruders still active
        this.size = this.fleet.length;
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
        if(frameCount % 50 == 0){
            let randomNdx = Math.floor(random(0, this.fleet.length - 1));

            if(this.fleet[randomNdx].active){ 
                aliens.bullets.push(new Bullet(
                    this.fleet[randomNdx].xPos * width/12.5 + (this.fleet[randomNdx].width/2), 
                    this.fleet[randomNdx].yPos * height/12.5 + (this.fleet[randomNdx].height/2), 
                                        255, 0, false, aliens.bullets.length));
            }
        }
    }
    
    // move the fleet!
    this.moveIntruders = function(){
        if(frameCount % moveSpeed == 0){
            if(movingLeft){
                for(let i = 0; i < this.fleet.length; i++){
                    // move left
                    this.fleet[i].xPos -= 0.1;
                    
                    // move down
                    if(this.fleet[i].xPos <= 0){
                        for(let j = 0; j < this.fleet.length; j++){
                            this.fleet[j].yPos += 0.1;
                        }
                        movingLeft = false;
                    }
                }
            } else{
                for(let i = 0; i < this.fleet.length; i++){
                    // move right
                    this.fleet[i].xPos += 0.1;
                    
                    // move down
                    if(this.fleet[i].xPos >= 12.5){
                        for(let j = 0; j < this.fleet.length; j++){
                            this.fleet[j].yPos += 0.1;
                        }
                        movingLeft = true;
                    }
                }
            }  
        }
	}
}