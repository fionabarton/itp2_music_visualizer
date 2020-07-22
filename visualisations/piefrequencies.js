/*
Pie Chart: https://p5js.org/examples/form-pie-chart.html
*/

function PieFrequencies() {
	// name of the visualisation
	this.name = "Pie Frequencies";
    
    // array for 4 angles totaling 360 degrees
    let angles = new Array(4);
    
    // variables for frequency energy
    let b;
    let l;
    let h;
    let t;

function pieChart(factor) {
    // angle to start each of the four arcs
    let lastAngle = 0;
    
    for (let i = 0; i < angles.length; i++) {
        
        // assign a frequency (bass, lowMid, highMid, treble)
        // to each quarter of the pie chart 
        let freq;
        switch(i){
            case 0:
                freq = b;
                fill(255,0,0,25);
                break;
            case 1:
                freq = l;
                fill(0,255,0,25);
                break;
            case 2:
                freq = h;
                fill(0,0,255,25);
                break;
            case 3:
                freq = t;
                fill(255,255,0,25);
                break;  
        }  
      
        // draw arc
        arc(
          width / 2,
          height / 2,
          freq * factor,
          freq * factor,
          lastAngle,
          lastAngle + radians(angles[i]));

        // get angle to start the arc of the next arc
        lastAngle += radians(angles[i]);
    }
}
    
	this.draw = function() {
        push();

        // set background & stroke 
        background(0);
        amp = map(amplitude.getLevel(), 
                           0, 1, 
                           1, 2500);
        strokeWeight(amp/100);
        stroke(amp);

        // get frequencies
        fourier.analyze();
        b = fourier.getEnergy("bass");
        l = fourier.getEnergy("lowMid");
        h = fourier.getEnergy("highMid");
        t = fourier.getEnergy("treble");

        // set angle for each quarter of the circle, totaling 360
        let sum = 360/(b + l + h + t);
        angles[0] = b * sum;
        angles[1] = l * sum;
        angles[2] = h * sum;
        angles[3] = t * sum;

        // draw pie charts
        for (let i = 12; i > 0; i--) {
             pieChart(i);
        }
        
        pop();
	};
}