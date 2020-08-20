/*
Source:
https://editor.p5js.org/elinsterz/sketches/evrSX1kzZ
This short example served as the starting point of both the “Hypnotic Squares” and “Pinwheel” extensions.

Description
Each rotating square consists of a set of four rects of decreasing size drawn on top of each other. The size of each rect is affected by the energy of a different frequency: bass, low mid, high mid, and treble. The speed at which they rotate is affected by the bass.

*/

function HypnoticSquares() {
    // name of the visualisation
    this.name = "Hypnotic Squares";

    // variables for rotation
    let x = 0;
    let y = 0;
    
    // variables for frequency energy
    let b;
    let l;
    let h;
    let t;
    
    // draw a square consisting of four rects.
    // each rect's size is affected by the level of a different frequency:
    // bass, low mid, high mid, & treble
    this.drawSquares = function(x, y, factor) {
        fill(0, 0, 0, 150);
        rect(x, y, 100 * b/factor, 100 * b/factor);
        fill(75, 75, 75,  150);
        rect(x, y, 100 * l/factor, 100 * l/factor);
        fill(125, 125, 125,  150);
        rect(x, y, 100 * h/factor, 100 * h/factor);
        fill(255, 255, 255,  150);
        rect(x, y, 100 * t/factor, 100 * t/factor);
    }
    
    this.draw = function() {
        push();
        
        // get energy of specific frequencies
        fourier.analyze();
        b = fourier.getEnergy("bass");
        l = fourier.getEnergy("lowMid");
        h = fourier.getEnergy("highMid");
        t = fourier.getEnergy("treble");

        // set background color to mapped amplitude level
        let amp = map(amplitude.getLevel(), 0, 1, 0, 2500); 
        background(amp, 0, 0);

        //////////////////////// Large Center Squares ////////////////////////
        
        // draw rect from the shape's center point
        rectMode(CENTER);
        // displace objects to center of the canvas 
        translate (width/2, height/2);
        
        // rotation
        x+= .0001 * t;
        rotate(x);
        
        // draw squares
        this.drawSquares(0, 0, 25);
        this.drawSquares(0, 0, 50);
        this.drawSquares(0, 0, 100);
        this.drawSquares(0, 0, 200);
  
        pop();

        //////////////////////// Smaller Squares ////////////////////////
        
        push();
        
        // draw rect from the shape's center point
        rectMode(CENTER);
        // displace objects to center of the canvas 
        translate (width/2, height/2);
        
        // rotation
        y-= .0001 * t;
        rotate(y);

        // draw squares
        this.drawSquares(width/4, 0, 150);
        this.drawSquares(-width/4, 0, 150);
        this.drawSquares(0, -width/4, 150);
        this.drawSquares(0, width/4, 150);
        
        pop();
    }
}