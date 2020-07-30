//global for the controls and input 
var controls = null;
//store visualisations in a container
var vis = null;

// array of p5 sound objects
var sound = [];
// index of current song
var songNdx = 0;
// array of song names
var songName = [];

//variable for p5 fast fourier transform
var fourier;
// variable for p5 amplitude
var amplitude;

// index of current visualisation
var visNdx = 0;

function preload(){
	sound = [loadSound('assets/Catch Me Off Guard.mp3'),
             loadSound('assets/View From Saturday.mp3'),
             loadSound('assets/Shop.mp3'),
             loadSound('assets/Overworld.mp3'),
             loadSound('assets/Estudio.mp3'),
             loadSound('assets/Z1.mp3')];
    
    songName = ["Catch Me Off Guard", 
                "View From Saturday", 
                "Shop", 
                "Overworld", 
                "Estudio", 
                "Z1"];
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    background(0);
    controls = new ControlsAndInput();

    //instantiate the fft object
    fourier = new p5.FFT();
    
    //instantiate the amplitude object
    amplitude = new p5.Amplitude();

    //create a new visualisation container and add visualisations
    vis = new Visualisations();
    
    vis.add(new AlienIntruders());
    vis.add(new Scribbles());
    vis.add(new PieFrequencies());
    vis.add(new HypnoticSquares());
    vis.add(new Gloop());
    vis.add(new Cityscape());
    vis.add(new Pinwheel());
    vis.add(new Test());
}

function draw(){
	//draw the selected visualisation
	vis.selectedVisual.draw();

	//draw the controls on top.
	controls.draw();

    //////////////// TEST AREA ////////////////
    push();

    
    pop();
}

function mouseClicked(){
	controls.mousePressed();
    
    // input for "Alien Intruders"
    if(vis.selectedVisual.mouseClicked){
        vis.selectedVisual.mouseClicked();
    }
}

function keyPressed(){
	controls.keyPressed(keyCode);
}

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	if(vis.selectedVisual.hasOwnProperty('onResize')){
		vis.selectedVisual.onResize();
	}
}
