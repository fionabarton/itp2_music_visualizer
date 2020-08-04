/*
Source:
https://editor.p5js.org/elinsterz/sketches/evrSX1kzZ
This short example served as the starting point of both the “Hypnotic Squares” and “Pinwheel” extensions.

*/

function Pinwheel() {
	// name of the visualisation
	this.name = "Pinwheel";
    
    // variable for rotation
    let x = 0;
    
    // variable for current amplitude
    let amp;
    
    // array to hold amplitude for each frame
    let amps = new Array(100);
    
    // variables for the background color
    let r = 0;
    let g = 0;
    let b = 0;
    
	this.draw = function() {
        push();
        
        noStroke();
        
        // periodically set background color to a random color
        if(frameCount % 100 == floor(amp))
            {
                r = random(0,255);
                g = random(0,255);
                b = random(0,255);
            }
        background(r, g, b);         

        // periodically map amplitude
        if(frameCount % 50 == 0)
            {
                 amp = map(amplitude.getLevel(), 
                       0, 1, 
                       1, height);
            }

        // add current amplitude to beginning of the array
        amps.unshift(amp);
        // remove last element of the array
        amps.splice(100, 1);

        // increment rotation value
        x+= 0.001;
        // displace objects to center of the canvas 
        translate(width/2, height/2);

        // draw three circles of rotating rects, our pinwheel
        for(let i = 1; i < amps.length; i++){
            // rotation
            rotate(x);
            
            // draw rects affected by amplitude
            fill(random(0,255), random(0,255), random(0,255), random(100,255));
            rect(18.75 * amp/10, 
                 18.75 * amp/10, 
                 37.5, 
                 amps[i]);
            
            fill(random(0,255), 255, 255, random(100,255));
            rect(12.5 * amp/20, 
                 12.5 * amp/20, 
                 25, 
                 amps[i]);
            
            fill(255, random(0,255), random(0,255), random(100,255));
            rect(6.25 * amp/40, 
                 6.25 * amp/40, 
                 12.5, 
                 amps[i]);
            
            noFill();
        }
        pop();
	};
}