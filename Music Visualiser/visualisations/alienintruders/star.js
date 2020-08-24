//////////////// Star Constructor ////////////////
function Star (x, y){
    // variables for position and size
    this.xPos = x;
    this.yPos = y;
    this.width = random(1, 4);
    this.height = random(1, 4);
    
    this.speed = random(2, 5);
    this.color = [255, 255, 255, random(150, 255)]; 

    this.update = function(){
        // reset position if offscreen
        if(this.yPos >= height){
            this.xPos = random(0, width)
            this.yPos = 0;
        }

        // increase Y position (by speed * treble) towards bottom of the screen
        this.yPos += this.speed * min(2, aliens.t);
        
        this.draw();
    }

    this.draw = function(){
        // draw star, size affected by treble 
        fill(this.color);
        rect(this.xPos - aliens.t, 
             this.yPos - aliens.t, 
             this.width + aliens.t, 
             this.height + aliens.t);
        noFill();
    }
} 