//////////////// Star Constructor ////////////////
function Star (x, y){
    // variables for position and size
    let xPos = x;
    let yPos = y;
    let w = random(1, 4);
    let h = random(1, 4);
    
    let speed = random(2, 5);
    let color = [255, 255, 255, random(150, 255)]; 

    let draw = function(){
        // draw star, size affected by treble 
        fill(color);
        rect(xPos - aliens.t, 
             yPos - aliens.t, 
             w + aliens.t, 
             h + aliens.t);
        noFill();
    }
    
    this.update = function(){
        // reset position if offscreen
        if(yPos >= height){
            xPos = random(0, width)
            yPos = 0;
        }

        // increase Y position (by speed * treble) towards bottom of the screen
        yPos += speed * min(2, aliens.t);
        
        draw();
    }
} 