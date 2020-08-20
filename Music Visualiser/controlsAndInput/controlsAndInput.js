/*
8/19 
COMPLETED:
Separate .js files for (controlsAndInput.js was getting crowded): 
- Time Display/Progress Bar
- Range Sliders

Added onResize functions to account for the browser window being resized:
- controlsAndInput.js
- rangeSliders.js
- nextVisualisationButton.js
- previousVisualisationButton.js
- alienintruders.js : playerYPos 



- bullet.draw()


BUG: 
When paused, if next/previous track button pressed, currentTime does not display 0:00
SOLUTION:

*/

//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput(){
	
	this.menuDisplayed = true;
    // display menu at start even if mouse not hovering over it
    this.displayMenuAtStart = true;

	// buttons
	this.playbackButton = new PlaybackButton();
    let nextTrackButton = new NextTrackButton();
    let previousTrackButton = new PreviousTrackButton();
    let nextVisualisationButton = new NextVisualsationButton();
    let previousVisualisationButton = new PreviousVisualsationButton();
    let volumeButton = new VolumeButton();
    
    // sliders
    this.rangeSliders = new RangeSliders();
    
    // time display
    this.timeDisplay = new TimeDisplay(); 
    
    // menu border
    let menuWidth = width; // scale w/ canvas size
    let menuHeight = height/6; // scale w/ canvas size
    
    // visualisations text
    let visNameTextY = 20;
    let visTextY = 45;
    
    // song title text
    let songTitleTextX = 20;
    let songTitleTextY = 20;

	// check if buttons or mouse was clicked
	this.mousePressed = function(){
        this.playbackButton.hitCheck();
        nextTrackButton.hitCheck();
        previousTrackButton.hitCheck();
        nextVisualisationButton.hitCheck();
        previousVisualisationButton.hitCheck();
        volumeButton.hitCheck();
        
        this.mouseClicked();
	}

	// draws the menu, etc.
	this.draw = function(){

        // If mouse hovering over playhead, display menu 
        this.mouseHoverCheck();

        // if song finished, skip to next track
        if(sound[songNdx].currentTime() >= sound[songNdx].duration() - 0.05){
            nextTrackButton.playNextSong();
        }
        
        if(this.menuDisplayed){
            push();

            // initialize text & stroke settings
            textSize(15);
            textFont("Arial");
            stroke(255);
            strokeWeight(2);
            
            //////////////// Draw Menu Border ////////////////
            // scale w/ canvas size
            //menuWidth = width;
            //menuHeight = max(150, height/6);
            
            noFill();
            fill(0,0,0,150);
            rect(0, 0, menuWidth, menuHeight);

            //////////////// Draw buttons ////////////////
            this.playbackButton.draw();
            nextTrackButton.draw();
            previousTrackButton.draw();
            nextVisualisationButton.draw();
            previousVisualisationButton.draw();
            volumeButton.draw();

            //////////////// Draw Time Display ////////////////
            this.timeDisplay.draw();
            
            //////////////// Song Title Text ////////////////
            text(songNdx + 1 + ": " + songName[songNdx], songTitleTextX, songTitleTextY);

            //////////////// Visualisation Name Text ////////////////
            textAlign(CENTER);
            text("VIS", width/2, visTextY );
            text(visNdx + 1 + ": " +vis.visuals[visNdx].name, width/2, visNameTextY);

            pop();
        }
        
        //////////////// Draw Range Sliders ////////////////
        this.rangeSliders.draw();
	}

    //checks if cursor is hovering over menu & enables it.
	this.mouseHoverCheck = function(){
        if(mouseX > 0 && mouseX < menuWidth && 
           mouseY > 0 && mouseY < menuHeight){
            this.displayMenuAtStart = false;
            this.menuDisplayed = true;
        }else{
            if(!this.displayMenuAtStart){
                this.menuDisplayed = false;
            }
        }   
	}
    
    // click progress bar to change currentTime
    this.mouseClicked = function(){ 
        this.timeDisplay.mouseClicked();
	}

	//responds to keyboard presses
	//@param keycode the ascii code of the keypressed
	this.keyPressed = function(keycode){
		// play/pause sound
		if(keyCode == 32){ // space bar on the keyboard
           this.playbackButton.playPause();
		}
        
        // mute/unmute sound
        if(keyCode == 77){ // letter 'm' on the keyboard
            volumeButton.muteUnmute();
		}

        // select visualisation 
		if(keyCode > 48 && keyCode < 57){ // numbers to 1 to 9
			var visNumber = keycode - 49;
            if(vis.visuals[visNumber]){
                visNdx = visNumber;
			     vis.selectVisual(vis.visuals[visNumber].name); 
            }  
		}
	}
    
    this.onResize = function(){
        menuWidth = width;
        menuHeight = max(150, height/6);
        
        this.rangeSliders.onResize();
        nextVisualisationButton.onResize();
        previousVisualisationButton.onResize();
    }
}