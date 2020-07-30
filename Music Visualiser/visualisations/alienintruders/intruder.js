//////////////// Intruder Constructor ////////////////

function Intruder (x, y){
    this.xPos = x + 1;
    this.yPos = y + 1;
    this.width = 20;
    this.height = 20;
    this.padding = 10;
    this.speed = random(2, 10);
    this.color = [255,0,0];
    this.active = true;
    this.points = 10;

    this.draw = function(b = 1){
        if(this.active){
            // draw intruder, size affected by bass 
            fill(this.color);
            rect(this.xPos * width/10 - b * 2,
                 this.yPos * height/15 - b * 2,   
                 this.width + b * 2, 
                 this.height + b * 2); 

//            rect(this.xPos * width/10,
//                 this.yPos * height/15,   
//                 this.width, 
//                 this.height); 
            
            noFill();
        }
    }
}