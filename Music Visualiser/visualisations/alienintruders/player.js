//////////////// Player Constructor ////////////////
function Player (){
    // variables for position and collision detection
    this.xPos = width/2;       
    this.yPos = height/1.2; // scale w/ canvas size
    this.width = 50;
    this.height = 15;
    
    // variables to control which sprites to display for player & explosion
    let playerFlicker;
    let explosionFlicker;
    
    // draw intruder, size affected by bass 
    this.draw = function(spriteNdx){
        image(images[spriteNdx], 
             this.xPos + this.width/2,
             this.yPos + this.height/2,
             images[spriteNdx].width + aliens.b * 2, 
             images[spriteNdx].height + aliens.b * 2);
        noFill();
    }
    
    this.update = function(){
        switch(aliens.gameState){
            case 0:
            case 1:
            case 4:
                // change sprite
                if(frameCount % 10== 0){
                    if(playerFlicker){
                        playerFlicker = false;
                    }else{
                        playerFlicker = true;
                    }
                }
                
                // draw player ship 
                if(playerFlicker){
                    this.draw(7);
                }else{
                    this.draw(8);
                }

                noFill();

                // player ship follows mouseX
                this.xPos = mouseX - this.width / 2;
                break;
            case 2:
            case 3:
            default:
                // change sprite
                if(frameCount % 10== 0){
                    if(explosionFlicker){
                        explosionFlicker = false; 
                    } else{
                        explosionFlicker = true
                    }
                }

                // draw explosion
                if(explosionFlicker){
                    this.draw(5);
                } else{  
                    this.draw(6);
                }
                break; 
        }
    }
    
    this.onResize = function(){
        this.yPos = height/1.2;
    }
}