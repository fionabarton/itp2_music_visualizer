//////////////// Intruder Constructor ////////////////
function Intruder (x, y, spriteNdx){
    // variables for position and collision detection
    this.xPos = x + 1;
    this.yPos = y + 1;
    this.width = 30;
    this.height = 30;
    
    this.spriteNdx = spriteNdx;
    this.active = true;
    this.points = 10;

    // draw intruder, size affected by bass 
    this.draw = function(){
        if(this.active){
            image(images[this.spriteNdx], 
                 this.xPos * width/12.5 + this.width/2,
                 this.yPos * height/12.5 + this.height/2,
                 images[this.spriteNdx].width + aliens.b * 2, 
                 images[this.spriteNdx].height + aliens.b * 2);
            noFill();
        }
    }
}