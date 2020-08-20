//////////////// Star Constructor ////////////////
    
function Star (x, y){
    this.xPos = x;
    this.yPos = y;
    this.width = random(1, 4);
    this.height = random(1, 4);
    this.speed = random(2, 5);
    this.color = [255, 255, 255, random(150, 255)]; 

    this.update = function(t = 1){
        // reset position if offscreen
        if(this.yPos >= height){
            this.xPos = random(0, width)
            this.yPos = 0;
        }

        // increase Y position (by speed * treble) towards bottom of the screen
        this.yPos += this.speed * min(2, t);
    }

    this.draw = function(t = 1){
        // draw star, size affected by treble 
        fill(this.color);
        rect(this.xPos - t, 
             this.yPos - t, 
             this.width + t, 
             this.height + t);
        noFill();
    }
} 