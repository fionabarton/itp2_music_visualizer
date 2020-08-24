//////////////// Bullet Constructor ////////////////
function Bullet(x, y, r, g, isPlayerBullet){
    // variables for position and collision detection
    this.xPos = x;
    this.yPos = y;
    this.width = 5;
    this.height = 30;
    
    this.speed = 5;
    this.isPlayerBullet = isPlayerBullet;
    this.active = true;
    this.spriteNdx;
    this.padding = max(9, aliens.b * 2);

    // assign bullet proper sprite
    if(this.isPlayerBullet){
        this.spriteNdx = 11;
    }else{
        this.spriteNdx = 12;
    }

    // detect collision w/ both player and intruders
    this.onCollision = function(){

        // cached to make the following code more readable 
        this.padding = max(9, aliens.b * 2);

        // player bullet collides w/ intruder
        if(this.isPlayerBullet){
            // player bullet collides w/ intruder
            for(let i = 0; i < aliens.intruders.fleet.length; i++){
                if(aliens.intruders.fleet[i].active){
                    if(this.xPos + this.padding > aliens.intruders.fleet[i].xPos * width/12.5 && 
                       this.xPos + this.width - this.padding < aliens.intruders.fleet[i].xPos * width/12.5 + aliens.intruders.fleet[i].width && 
                       this.yPos + this.padding > aliens.intruders.fleet[i].yPos * height/12.5 && 
                       this.yPos + this.height - this.padding < aliens.intruders.fleet[i].yPos * height/12.5 + aliens.intruders.fleet[i].height 
                      ){ 
                        // deactivate intruder
                        aliens.intruders.fleet[i].active = false;
                        // deactivate bullet 
                        this.active = false;

                        // increment score
                        aliens.score += aliens.intruders.fleet[i].points;
                        //set high score
                        if(aliens.score > aliens.highScore){
                            aliens.highScore = aliens.score;
                        }

                        aliens.intruders.size -= 1;
                        if(aliens.intruders.size <=0){
                            aliens.gameState = 4;
                        }
                    }
                }
            }
            
            // check for collision w/ mystery ship
            if(this.xPos + this.padding > aliens.mysteryShip.xPos && 
               this.xPos + this.width - this.padding < aliens.mysteryShip.xPos + aliens.mysteryShip.width && 
               this.yPos + this.padding > aliens.mysteryShip.yPos && 
               this.yPos + this.height - this.padding < aliens.mysteryShip.yPos + aliens.mysteryShip.height 
              ){ 
                // reset mystery ship
                aliens.mysteryShip.initialize();
                // deactivate bullet 
                this.active = false;

                // increment score
                aliens.score += aliens.mysteryShip.points;
                //set high score
                if(aliens.score > aliens.highScore){
                    aliens.highScore = aliens.score;
                }
            }
            

        // intruder bullet collides w/ player
        }else{ 
            if(this.xPos + this.padding > aliens.player.xPos - this.padding && 
               this.xPos + this.width - this.padding < aliens.player.xPos - this.padding + aliens.player.width + this.padding && 
               this.yPos + this.padding > aliens.player.yPos - this.padding &&
               this.yPos + this.height - this.padding < aliens.player.yPos - this.padding + aliens.player.height + this.padding){  

                // deactivate bullet 
                this.active = false;

                // decrement lives
                aliens.lives -= 1;

                // game over
                if(aliens.lives <= 0){
                    aliens.gameState = 3;
                // respawn
                }else{
                    aliens.gameState = 2
                }
            }
        }
    } 

    this.update = function(){
        // change Y position (by speed * high mid)
        if(this.isPlayerBullet){
            this.yPos -= this.speed * min(1, aliens.h);
        }else{
            this.yPos += this.speed * min(1, aliens.h);
        }

        // detect collison w/ player & intruders
        if(this.active){
            this.onCollision();
        }

        // if offscreen, remove bullet from array
        if(this.yPos <= 0 || this.yPos >= height){
           aliens.bullets.splice(this, 1);
        }
        
        this.draw();
    }

    // draw bullet, size affected by bass
    this.draw = function(){
        if(this.active){  
            image(images[this.spriteNdx], 
             this.xPos - max(1, aliens.b*2) + this.width/2,
             this.yPos - max(1, aliens.b*2) + this.height/2,
             images[this.spriteNdx].width + aliens.b * 2, 
             images[this.spriteNdx].height + aliens.b * 2);

            noFill();
        }
    }
}