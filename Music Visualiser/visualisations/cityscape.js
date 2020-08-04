function Cityscape() {
    // name of the visualisation
    this.name = "Cityscape";

    // arrays to hold amplitude for each frame
    let midgroundRects = new Array(200);
    let backgroundRects = new Array(150);
    
    // variables used to position rects
    const W = 10;
    const PADDING = 10;
    
    // variable for current amplitude
    let amp;
    
    this.draw = function() {
        push();

        // set background & stroke color
        background(225);
        stroke(255);

        // map amplitude
        amp = map(amplitude.getLevel(), 
               0, 1, 
               1, height);

        //////////////////////// Background rects ////////////////////////
        // moves FASTER than midground rects for parallax scrolling

        // add amplitude to beginning of the array
        backgroundRects.unshift(amp);
        // remove last element of the array
        backgroundRects.splice(backgroundRects.length - 1, 1);

        for(let i = 0; i < backgroundRects.length; i++){
            // get x position
            let x = map(i * PADDING, 
                     0, PADDING * backgroundRects.length, 
                     0, width);

            // draw background rects
            fill(255, i * 1.5, i * 1.5);
            rect(x, height/2, -W - (PADDING * 2), -backgroundRects[i] * 2);
        }

        //////////////////////// Midground rects ////////////////////////
        // moves SLOWER than midground rects for parallax scrolling

        // add amplitude to beginning of the array
        midgroundRects.unshift(amp);
        // remove last element of the array
        midgroundRects.splice(midgroundRects.length - 1, 1);

        for(let i = 0; i < midgroundRects.length; i++){
            // get x position
            let x = map(i * PADDING, 
                     0, PADDING * midgroundRects.length, 
                     0, width);

            // draw midground rects 
            fill(i * 1.5);
            rect(x, height/2, W, midgroundRects[i]);
            rect(x, height/2, -W, -midgroundRects[i]);

            // draw hazy effect on bottom half of canvas
            fill(i * 2.5, i * 2.5, i * 2.5, midgroundRects[i]/2);
            rect(x, height/2, width, height/2);
            noFill();
            noStroke();
        }

        pop();
    }   
}