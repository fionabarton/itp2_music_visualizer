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

// cache instance of AlienIntruders for use of constructors 
let aliens;

function preload(){
    // all music is original, recorded or programmed on various hardware over the years
	sound = [loadSound('assets/sounds/Catch Me Off Guard.mp3'),
             loadSound('assets/sounds/View From Saturday.mp3'),
             loadSound('assets/sounds/Shop.mp3'),
             loadSound('assets/sounds/Overworld.mp3'),
             loadSound('assets/sounds/Estudio.mp3'),
             loadSound('assets/sounds/Z1.mp3')];
    
    songName = ["Catch Me Off Guard", 
                "View From Saturday", 
                "Shop", 
                "Overworld", 
                "Estudio", 
                "Z1"];

    // sprites for AlienIntruders extension
    // all images are original, drawn in GIMP
    images = [loadImage('assets/images/invader_5.png'),    // 0
              loadImage('assets/images/invader_4.png'),    // 1
              loadImage('assets/images/invader_3.png'),    // 2
              loadImage('assets/images/invader_2.png'),    // 3
              loadImage('assets/images/invader_1.png'),    // 4
              loadImage('assets/images/explosion_1.png'),  // 5
              loadImage('assets/images/explosion_2.png'),  // 6
              loadImage('assets/images/player_1.png'),     // 7
              loadImage('assets/images/player_2.png'),     // 8
              loadImage('assets/images/ship_1.png'),       // 9
              loadImage('assets/images/ship_2.png'),       // 10
              loadImage('assets/images/bullet_1.png'),     // 11
              loadImage('assets/images/bullet_2.png')];    // 12
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
    
    // cache instance of AlienIntruders for use of constructors 
    aliens = vis.visuals[0];
}

function draw(){
	//draw the selected visualisation
	vis.selectedVisual.draw();

	//draw the controls on top.
	controls.draw();
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

    // set width & height to new window width & height
    width = windowWidth;
    height = windowHeight;
    
    controls.onResize();
    
	if(vis.selectedVisual.hasOwnProperty('onResize')){
		vis.selectedVisual.onResize();
	}
}
