//////////////// Intruder Constructor ////////////////
function Intruder (x, y, spriteIndex){
    // variables for position and collision detection
    this.xPos = x + 1;
    this.yPos = y + 1;
    this.width = 30;
    this.height = 30;
    
    this.points = 10;
    this.active = true;
    
    let spriteNdx = spriteIndex;

    // draw intruder, size affected by bass 
    this.draw = function(){
        if(this.active){
            image(images[spriteNdx], 
                 this.xPos * width / 9,
                 this.yPos * height / 12,
                 images[spriteNdx].width + aliens.b * 2, 
                 images[spriteNdx].height + aliens.b * 2);
            noFill();
        }
    }
}