/*
https://p5js.org/examples/drawing-patterns.html
Like the previous source, I started off with this example and hacked away at it until it bloomed into the “Gloop” extension.

https://p5js.org/reference/#/p5.FFT
To draw the waveform behind the “fountain of gloop” in the “Gloop” extension (found at lines 37 to 45), I copied the following portion of this source’s code nearly word for word:
let waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(20);
  for (let i = 0; i < waveform.length; i++){
    let x = map(i, 0, waveform.length, 0, width);
    let y = map( waveform[i], -1, 1, 0, height);
    vertex(x,y);
  }
  endShape();

*/

function Gloop() {
    // name of the visualisation
    this.name = "Gloop";

    // starting spawn position
    let xPos = width/2;
    let yPos = height/2;

    // array to hold droplets of gloop
    let droplets = [];
    
    //////////////// Droplet Constructor ////////////////
    
    function Droplet (x, y){
        this.xPos = x;
        this.yPos = y;
        this.width = random(1,50);
        this.height = random(1,50);
        this.color = [255, random(0,255), random(0,255), random(0,255)];
        this.speed = random(0.5, 5);
    }
    
    // variable for current amplitude
    let amp;
    
    // variable to randomly determine direction to move spawn position
    let coinFlip;
    
    this.draw = function() {
        push();
        
        amp = map(amplitude.getLevel(), 0, 1, 0, 200); 

        background(0);

        // background waveform
        let waveform = fourier.waveform();
        beginShape();
        fill(amp * 10);
        for (let i = 0; i < waveform.length; i++){
            let x = map(i, 0, waveform.length, 0, width);
            let y = map(waveform[i], -1, 1, 0, height);
            vertex(x,y);
        }
        endShape();

        // change spawn x position
        coinFlip = floor(random(0, 2));
        if(coinFlip <= 0){
            xPos += amp;
        }else{
            xPos -= amp;
        }

        // change spawn y position
        coinFlip = floor(random(0, 2));
        if(coinFlip <= 0){
            yPos += amp;
        }else{
            yPos -= amp;
        }

        // constrain spawn position to canvas
        xPos = constrain(xPos, 200, width - 200);
        yPos = constrain(yPos, 100, height - 500);
        
        // create new droplet of gloop
        droplets.push(new Droplet(xPos, yPos));

        for(let i = 0; i < droplets.length; i++){
            
            // change droplet's yPos, width, height, & color
            droplets[i].yPos += droplets[i].speed * max(1, amp/10);
            droplets[i].width -= droplets[i].speed * max(1, amp/10);
            droplets[i].height -= droplets[i].speed * max(1, amp/10);
            droplets[i].color = 
                [droplets[i].color[0] -= 1,
                droplets[i].color[1] -= 1, 
                droplets[i].color[2] -= 1];

            // draw droplet
            noStroke();
            fill(droplets[i].color);
            ellipse(droplets[i].xPos, droplets[i].yPos, 
                    droplets[i].width, droplets[i].height);

            // remove 1st element from array
            if(i >= 250){
                droplets.splice(0, 1);
            } 
        }

        pop();
    }
}