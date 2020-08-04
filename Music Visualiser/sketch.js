//global for the controls and input 
let controls = null;
//store visualisations in a container
let vis = null;

// array of p5 sound objects
let sound = [];
// index of current song
let songNdx = 0;
// array of song names
let songName = [];

//variable for p5 fast fourier transform
let fourier;
// variable for p5 amplitude
let amplitude;

// index of current visualisation
let visNdx = 0;

// array of p5 image objects
let images = [];

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

    images = [loadImage('assets/sprites/invader_5.png'),    // 0
              loadImage('assets/sprites/invader_4.png'),    // 1
              loadImage('assets/sprites/invader_3.png'),    // 2
              loadImage('assets/sprites/invader_2.png'),    // 3
              loadImage('assets/sprites/invader_1.png'),    // 4
              loadImage('assets/sprites/explosion_1.png'),  // 5
              loadImage('assets/sprites/explosion_2.png'),  // 6
              loadImage('assets/sprites/player_1.png'),     // 7
              loadImage('assets/sprites/player_2.png'),     // 8
              loadImage('assets/sprites/ship_1.png'),       // 9
              loadImage('assets/sprites/ship_2.png'),       // 10
              loadImage('assets/sprites/bullet_1.png'),     // 11
              loadImage('assets/sprites/bullet_2.png')];    // 12
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
