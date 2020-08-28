//////////////// Bullet Constructor ////////////////
function Bullet(x, y, r, g, playerOrEnemyBullet){
    // variables for position and collision detection
    let xPos = x;
    let yPos = y;
    let w = 5;
    let h = 30;
    let padding = max(9, aliens.b * 2);
    
    let speed = 5;
    let isPlayerBullet = playerOrEnemyBullet;
    let active = true;
    let spriteNdx;
    
    // assign bullet proper sprite
    if(isPlayerBullet){
        spriteNdx = 11;
    }else{
        spriteNdx = 12;
    }

    // detect collision w/ both player and intruders
    let onCollision = function(){

        // cached to make the following code more readable 
        padding = max(9, aliens.b * 2);

        // player bullet collides w/ intruder
        if(isPlayerBullet){
            // check for collisions w/ intruders ONLY within range of the fleet 
            if(yPos >= aliens.intruders.fleet[0].yPos * height / 12){
                console.log("PLAYER BULLET IN RANGE " + yPos);
                for(let i = 0; i < aliens.intruders.fleet.length; i++){
                    if(aliens.intruders.fleet[i].active){
                        if(xPos + padding > aliens.intruders.fleet[i].xPos * width/9 && 
                           xPos + w - padding < aliens.intruders.fleet[i].xPos * width/9 + aliens.intruders.fleet[i].width && 
                           yPos + padding > aliens.intruders.fleet[i].yPos * height/12 && 
                           yPos + h - padding < aliens.intruders.fleet[i].yPos * height/12 + aliens.intruders.fleet[i].height 
                          ){ 
                            // deactivate intruder
                            aliens.intruders.fleet[i].active = false;
                            // deactivate bullet 
                            active = false;

                            // increment score
                            aliens.score += aliens.intruders.fleet[i].points;
                            //set high score
                            if(aliens.score > aliens.highScore){
                                aliens.highScore = aliens.score;
                            }

                            // make note that the fleet has lost an Intruder
                            aliens.intruders.size -= 1;
                            
                            // If the fleet's been wiped out, get ready for another wave
                            if(aliens.intruders.size <=0){
                                aliens.gameState = 4;
                            }
                        }
                    }
                }
            }
            
            // check for collision w/ mystery ship ONLY at the top tenth of the canvas
            if(yPos <= height / 10){
                //console.log("PLAYER BULLET IN RANGE " + yPos);
                if(xPos + padding > aliens.mysteryShip.xPos && 
                   xPos + w - padding < aliens.mysteryShip.xPos + aliens.mysteryShip.width && 
                   yPos + padding > aliens.mysteryShip.yPos && 
                   yPos + h - padding < aliens.mysteryShip.yPos + aliens.mysteryShip.height 
                  ){ 
                    // reset mystery ship
                    aliens.mysteryShip.initialize();
                    // deactivate bullet 
                    active = false;

                    // increment score
                    aliens.score += aliens.mysteryShip.points;
                    //set high score
                    if(aliens.score > aliens.highScore){
                        aliens.highScore = aliens.score;
                    }
                }
            }
        }else{ 
            // check for collision w/ player ONLY near the bottom of the canvas where the player is located
            if(yPos >= height/1.3){
                //console.log("ENEMY BULLET IN RANGE " + yPos);
                if(xPos + padding > aliens.player.xPos - padding && 
                   xPos + w - padding < aliens.player.xPos - padding + aliens.player.width + padding && 
                   yPos + padding > aliens.player.yPos - padding &&
                   yPos + h - padding < aliens.player.yPos - padding + aliens.player.height + padding){  

                    // deactivate bullet 
                    active = false;

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
    } 

    this.update = function(){
        if(active){
            // detect collison w/ player & intruders
            onCollision();
            
            // change Y position (by speed * high mid)
            if(isPlayerBullet){
                yPos -= speed * min(1, aliens.h);
            }else{
                yPos += speed * min(1, aliens.h);
            }
            
            // if offscreen, remove bullet from array
            if(yPos <= 0 || yPos >= height){
               aliens.bullets.splice(this, 1);
            }
            
            draw();
        }
    }

    // draw bullet, size affected by bass
    let draw = function(){
        image(images[spriteNdx], 
         xPos - max(1, aliens.b*2) + w/2,
         yPos - max(1, aliens.b*2) + h/2,
         images[spriteNdx].width + aliens.b * 2, 
         images[spriteNdx].height + aliens.b * 2);

        noFill();
    }
}