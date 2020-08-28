//////////////// Mystery Ship Constructor ////////////////
function MysteryShip (){
    // variables for position and collision detection
    this.xPos = 0;
    this.yPos = 25;
    this.width = 30;
    this.height = 30;
    
    this.points = 50;
    let active = false;
    let speed = 3;
    let movingLeft;
    
    // variable for count down timer
    let timer = 2;
    
    // variables to control which sprites to display for mystery ship
    let flicker;

    this.initialize = function(){
        active = false;
        
        // set random time until ship launches
        timer = floor(random(5,20));
        
        // randomly choose to move left or right
        // & set position 
        if(floor(random(0, 2)) <= 0){
            movingLeft = true;
            this.xPos = width + 10;
        }else{
            movingLeft = false;
            this.xPos = -10;
        }
    }

    this.update = function(){
        if(active){
            if(movingLeft){
                // move ship to the left
                this.xPos -= speed;
                
                // if offscreen, reset
                if(this.xPos <= -10){
                    this.initialize();
                }
            }else{
                // move ship to the right
                this.xPos += speed;
                
                // if offscreen, reset
                if(this.xPos >= width + 10){
                    this.initialize();
                }
            }

            // change sprite
            if(frameCount % 10== 0){
                if(flicker){
                    flicker = false;
                }else{
                    flicker = true;
                }
            }

            // draw mystery ship 
            if(flicker){
                this.draw(9);
            }else{
                this.draw(10);
            }
        }else{
            // decrement timer
            if (frameCount % 60 == 0 && timer > 0) { 
                timer--;
            }

            // if time's up, activate mystery ship
            if (timer == 0) {
                active = true;
            }
        }
    }

    // draw mystery ship, size affected by bass 
    this.draw = function(spriteNdx){
        if(active){
            image(images[spriteNdx], 
                 this.xPos,
                 this.yPos,
                 images[spriteNdx].width + aliens.b * 2, 
                 images[spriteNdx].height + aliens.b * 2);
            noFill();
        }
    }
}