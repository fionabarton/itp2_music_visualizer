//////////////// Bullet Constructor ////////////////
//    
//function Bullet(x, y, r, g, isPlayerBullet){
//    this.xPos = x;
//    this.yPos = y;
//    this.width = 5;
//    this.height = 30;
//    this.speed = 5;
//    this.color = [r, g, 0];
//    this.isPlayerBullet = isPlayerBullet;
//    this.active = true;
//
//    // collision w/ both player and intruders
//    this.onCollision = function(b, initializeGame){
//        if(this.isPlayerBullet){
//            for(let i = 0; i < intruders.length; i++){
//                if(intruders[i].active){
//                    if(this.xPos + b * 2 > intruders[i].xPos * width/10 && 
//                       this.xPos + this.width - b * 2 < intruders[i].xPos * width/10 + intruders[i].width && 
//                       this.yPos + b * 2 > intruders[i].yPos * height/15 && 
//                       this.yPos + this.height - b * 2 < intruders[i].yPos * height/15 + intruders[i].height 
//                      ){  
//                        // deactivate intruder
//                        intruders[i].active = false;
//                        // deactivate bullet 
//                        this.active = false;
//
//                        intruderAmount -= 1;
//
//                        // increment score
//                        score += intruders[i].points;
//                        //set high score
//                        if(score > highScore){
//                            highScore = score;
//                        }
//                    }
//                }
//            }
//        }else{ 
//            if(this.xPos + b * 2 > playerXPos - b && 
//               this.xPos + this.width - b * 2 < playerXPos - b + PLAYER_W + b * 2 && 
//               this.yPos + b * 2 > playerYPos - b && 
//               this.yPos + this.height - b * 2 < playerYPos - b + PLAYER_H + b * 2){  
//                // deactivate bullet 
//                this.active = false;
//                // decrement lives
//                lives -= 1;
//
//                // game over
//                if(lives <= 0){
//                    initializeGame(true);
//                }
//            }
//        }
//    } 
//
//    this.update = function(b, initializeGame){
//        // change Y position (by speed * bass)
//        if(this.isPlayerBullet){
//            this.yPos -= this.speed * min(1, b);
//        }else{
//            this.yPos += this.speed * min(1, b);
//        }
//
//        if(this.active){
//            // detect collison w/ player & intruders
//            this.onCollision(b, initializeGame);
//        }
//
//        // remove bullet from array if offscreen
//        if(this.yPos <= 0 || this.yPos >= height){
//            bullets.splice(this, 1);
//        }
//    }
//
//    this.draw = function(b){
//        if(this.active){
//            // draw bullet, size affected by bass  
//            fill(this.color);
//            rect(this.xPos - min(7.5, b * 2), 
//                 this.yPos - b * 3, 
//                 this.width + min(7.5, b * 2), 
//                 this.height + b * 3);
//            noFill();
//        }
//    }
//}