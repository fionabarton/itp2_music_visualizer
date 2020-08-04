//////////////// Player Constructor ////////////////

function Player (x, y, spriteNdx){
    this.xPos = x + 1;
    this.yPos = y + 1;
    this.width = 30;
    this.height = 30;
    //this.padding = 10;
    this.speed = random(2, 10);
    //this.color = [255,0,0];
    this.spriteNdx = spriteNdx;
    this.active = true;
    this.points = 10;

    this.draw = function(b = 1){
        if(this.active){
            // draw intruder, size affected by bass 
//            fill(this.color);
//            rect(this.xPos * width/10 - b * 2,
//                 this.yPos * height/15 - b * 2,   
//                 this.width + b * 2, 
//                 this.height + b * 2); 
            
            image(images[this.spriteNdx], 
                 this.xPos * width/12.5 + this.width/2,
                 this.yPos * height/12.5 + this.height/2,
                 images[this.spriteNdx].width + b * 2, 
                 images[this.spriteNdx].height + b * 2);
            noFill();
        }
    }
}