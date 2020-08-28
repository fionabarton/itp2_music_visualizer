function Test() {
    // name of the visualisation
    this.name = "Test";
    
    // variables to draw canvas of rects
    let rectSize = 20;
    const AMOUNT_OF_RECTS = 50;

    // variable for current amplitude
    let amp;
    
    // Dot Constructor
    function Dot (x, y, color, speed){
        this.xPos = x;
        this.yPos = y;
        this.color = color;
        this.speed = speed;
    }

    // array to hold dots
    let dots = [];
    for(let i = 0; i < 20; i++){
        dots.push(new Dot(floor(random(0, AMOUNT_OF_RECTS)), 
                          floor(random(0, AMOUNT_OF_RECTS)),
                          [random(0, 255), random(0, 255), random(0, 255)],
                          i
                         ));
    }
    
    this.draw = function() {
        push();
        
        amp = map(amplitude.getLevel(), 0, 1, 0, AMOUNT_OF_RECTS);
        
        background(255,0,0);
        
        // scale w/ canvas size
        let canvasX = width/AMOUNT_OF_RECTS;
        let canvasY = height/AMOUNT_OF_RECTS;
        
        if(frameCount % 3 == 0){
            // change positions of dots
            for(let i = 0; i < dots.length; i++){
                // randomly change x position
                if(floor(random(0, 2)) <= 0){
                    dots[i].xPos += floor(max(1, amp));
                }else{
                    dots[i].xPos -= floor(max(1, amp));
                }

                // increase y position
                if(floor(random(0, 2)) <= 0){
                    dots[i].yPos += floor(amp);
                }else{
                    dots[i].yPos -= floor(amp);
                }

                // constrain position
                dots[i].xPos = constrain(dots[i].xPos, 0, AMOUNT_OF_RECTS);
                dots[i].yPos = constrain(dots[i].yPos, 0, AMOUNT_OF_RECTS);

                // reset x position
                if(dots[i].xPos <= 0){
                    dots[i].xPos = AMOUNT_OF_RECTS;
                }
                
                // reset y position
                if(dots[i].yPos >= AMOUNT_OF_RECTS){
                    dots[i].yPos = 0;
                }
            }
        }
          
        // draw dots & canvas of rects
        for(let i = 0; i < AMOUNT_OF_RECTS; i++){
            for(let j = 0; j < AMOUNT_OF_RECTS; j++){

                fill(0);
                
                // draw dots
                for(let k = 0; k < dots.length; k++){
                    if(i == dots[k].xPos && j == dots[k].yPos){
                        // moving rect
                        //fill(dots[k].color);
                        fill(255)
                    }
                }

                // draw canvas of rects
                rect(i * canvasX, j * canvasY, rectSize, rectSize);    
            }
        }
        pop();
    }
}