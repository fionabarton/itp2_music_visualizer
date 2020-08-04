/*


*/

function Test() {
    // name of the visualisation
    this.name = "Test";
    
    // variables to draw canvas of rects
    let rectSize = 20;
    const AMOUNT_OF_RECTS = 50;
    
    // moving rect position
    let xPos = 25;
    let yPos = 0;
    
    this.draw = function() {
        push();
        background(255,0,0);
        
        // scale w/ canvas size
        let cooX = width/AMOUNT_OF_RECTS;
        let cooY = height/AMOUNT_OF_RECTS;

        // randomly change x position
        if(floor(random(0, 2)) <= 0){
            xPos += 1
        }else{
            xPos -= 1
        }

        // increase y position
        yPos += 1;

        // constrain position
        xPos = constrain(xPos, 0, AMOUNT_OF_RECTS);
        yPos = constrain(yPos, 0, AMOUNT_OF_RECTS);

        // reset y position
        if(yPos >= AMOUNT_OF_RECTS){
            yPos = 0;
        }
        
        // draw rects
        for(let i = 0; i < AMOUNT_OF_RECTS; i++){
            for(let j = 0; j < AMOUNT_OF_RECTS; j++){

                // set rect color
                if(i == xPos && j == yPos){
                    fill(0);
                }else{
                    fill(255);
                    //fill(random(0,255), random(0,255), random(0,255));
                }
                
                // draw canvas of rects
                rect(i * cooX, j * cooY, rectSize, rectSize);    
            }
        }

        pop();
    }
}