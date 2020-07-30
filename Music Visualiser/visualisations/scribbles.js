/*
Brownian Motion: https://p5js.org/examples/simulate-brownian-motion.html
*/

function Scribbles() {
    // name of the visualisation
    this.name = "Scribbles";

    // variable for current amplitude
    let amp;
    
    // variables for frequency energy
    let b;
    let l;
    let h;
    let t;
    
    let backgroundColor = 0;
    let upOrDown = true;
    
    // array to hold scribble points
    let scribbles = [];
    
    //////////////// Scribble Constructor ////////////////
    
    function Scribble (x, y, color){
        this.spawnX = x;
        this.spawnY = y;
        this.color = color; 
        this.pointX = [];
        this.pointY = [];
    } 

    scribbles.push(new Scribble(width/5 * 1, height/2, [255, 0, 0, 100]));
    scribbles.push(new Scribble(width/5 * 2, height/2, [255, 255, 0, 100]));
    scribbles.push(new Scribble(width/5 * 3, height/2, [0, 0, 255, 100]));
    scribbles.push(new Scribble(width/5 * 4, height/2, [0, 255, 0, 100]));
    
    this.draw = function() {
        push();

        // map amplitude
        amp = map(amplitude.getLevel(), 0, 1, 0, 10); 
        
        // get frequencies
        fourier.analyze();
        b = fourier.getEnergy("bass");
        l = fourier.getEnergy("lowMid");
        h = fourier.getEnergy("highMid");
        t = fourier.getEnergy("treble");
        
        
        if(upOrDown){
            backgroundColor += amp;
        }else{
            backgroundColor -= amp;      
        }
        
        background(backgroundColor);

        if(backgroundColor <= 0){
            upOrDown = true;
        }else if(backgroundColor >= 255){        
            upOrDown = false;
        }
        
        // assign a unique frequency (bass, lowMid, highMid, treble)
        // to each of the four scribbles
        let freq;
        for(let i = 0; i < 4; i++){
            switch(i){
            case 0:
                freq = b;
                break;
            case 1:
                freq = l;
                break;
            case 2:
                freq = h;
                break;
            case 3:
                freq = t;
                break;  
            } 
            
            // change spawn position
            if(frameCount % 10 == 0){
                scribbles[i].spawnX += random(-freq/2, freq/2);
                scribbles[i].spawnY += random(-freq/2, freq/2);
            }

            // constrain spawn position to canvas
            scribbles[i].spawnX = constrain(scribbles[i].spawnX, 0, width);
            scribbles[i].spawnY = constrain(scribbles[i].spawnY, 0, height);

            // add new points to scribble
            scribbles[i].pointX.push(scribbles[i].spawnX);
            scribbles[i].pointY.push(scribbles[i].spawnY);

            for ( let j = 0; j < scribbles[i].pointX.length; j++ ) {
                // jiggle scribble points
                scribbles[i].pointX[j] += random(-freq/100, freq/100);
                scribbles[i].pointY[j] += random(-freq/100, freq/100);

                // draw lines
                stroke(scribbles[i].color);
                strokeWeight(max(2, freq/100));
                line(scribbles[i].pointX[j - 1], scribbles[i].pointY[j - 1], 
                     scribbles[i].pointX[j], scribbles[i].pointY[j]);  

                // remove 1st element from arrays
                if(j >= 500){
                    scribbles[i].pointX.splice(0, 1);
                    scribbles[i].pointY.splice(0, 1);
                } 
            } 
        }
        pop();
    }  
}