//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput(){
	
	this.menuDisplayed = true;
    // display menu at start even if mouse not hovering over it
    this.displayMenuAtStart = true;

	// buttons
	var playbackButton = new PlaybackButton();
    var nextTrackButton = new NextTrackButton();
    var previousTrackButton = new PreviousTrackButton();
    var nextVisualisationButton = new NextVisualsationButton();
    var previousVisualisationButton = new PreviousVisualsationButton();
    
    // variables for sliders
    var rateSlider;
    var volumeSlider;
    var panSlider;
    
    var rateSliderX =  width - 140; // scale w/ canvas size
    var rateSliderY =  30;
    
    var panSliderX =  width - 140; // scale w/ canvas size
    var panSliderY =  75;
    
    // progress bar
    var progressBarX = 20;
    var progressBarY = 100;
    var progressBarW = 200;
    var progressBarH = 20;
    
    // menu border
    var menuWidth = width;      // scale w/ canvas size
    var menuHeight = height/6;  // scale w/ canvas size
    
    // visualisations text
    var visNameTextY = 20;
    var visTextY = 45;
    
    // song title text
    var songTitleTextX = 20;
    var songTitleTextY = 20;
    
    // slider text
    var rateTextY = 20
    var panTextY = 70
    
    // volume icon
    // ...to be implemented!
    
    // current time, duration, progress bar
    var currentTime;    
    var duration;
    var currentTimeCache = 0;
    var timeRelativeToSlider = 0;
    
    // create volume slider
    volumeSlider = createSlider(0, 1, 0.5, 0.1);
    volumeSlider.position(200, 30);
    volumeSlider.style('width', '80px');
    volumeSlider.style('-webkit-appearance', 'none');
    volumeSlider.style('background', '#ff6600');
    volumeSlider.style('border-radius', '5px');
    
    // create playback rate slider
    rateSlider = createSlider(0, 2, 1, 0.1);
    rateSlider.position(width - 140, 85);
    rateSlider.style('-webkit-appearance', 'none');
    rateSlider.style('width', '80px');
    rateSlider.style('background', '#ff6600');
    rateSlider.style('border-radius', '5px');
    
    // create pan slider
    panSlider = createSlider(-1, 1, 0, 0.1);
    panSlider.position(width - 140, 130);
    panSlider.style('width', '80px');
    panSlider.style('-webkit-appearance', 'none');
    panSlider.style('background', '#ff6600');
    panSlider.style('border-radius', '5px');
 
	//make the window fullscreen or revert to windowed
	this.mousePressed = function(){
        playbackButton.hitCheck();
        nextTrackButton.hitCheck();
        previousTrackButton.hitCheck();
        nextVisualisationButton.hitCheck();
        previousVisualisationButton.hitCheck();
        
        this.mouseClicked();
	};

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

            textSize(15);
            textFont("Arial");
            stroke(255);
            strokeWeight(2);
            
            //////////////// Draw Menu Border ////////////////
            
            // scale w/ canvas size
            menuWidth = width;
            menuHeight = max(150, height/6);
            
            noFill();
            fill(0,0,0,150);
            rect(0, 0, menuWidth, menuHeight);

            //////////////// Draw buttons ////////////////
            
            playbackButton.draw();
            nextTrackButton.draw();
            previousTrackButton.draw();
            nextVisualisationButton.draw();
            previousVisualisationButton.draw();

            //////////////// Sliders ////////////////
            
            // Set slider positions
            
            // scale w/ canvas size
            rateSliderX =  width - 140; 
            panSliderX =  width - 140;
            rateSlider.position(rateSliderX, rateSliderY);
            panSlider.position(panSliderX, panSliderY);
            
            // Show sliders
            rateSlider.show();
            volumeSlider.show();
            panSlider.show();
            
            // Get slider values
            sound[songNdx].rate (rateSlider.value()); 
            masterVolume(volumeSlider.value());
            sound[songNdx].pan(panSlider.value());

            // line to indicate middle of sliders 
            line(width - 98.5, 25,
                 width - 98.5, 100);

            // Slider text
            fill(0);
            text("RATE (0 - x2)", width - 140, rateTextY);
            text("PAN (L - R)", width - 140, panTextY);
            
            //////////////// Song Title Text ////////////////
            
            text(songNdx + 1 + ": " + songName[songNdx], songTitleTextX, songTitleTextY);
            noFill(); 
            
            //////////////// Current Time Cache ////////////////
            
            // Cache current time because currentTime() is not defined when !isPlaying()
            if(sound[songNdx].isPlaying()){
                currentTimeCache = sound[songNdx].currentTime();
            }

            //////////////// Progress Bar Rect ////////////////
            
            // Duration rect
            fill(125, 125, 125);
            rect(progressBarX, progressBarY, progressBarW, progressBarH);

            var playTimeLength = 
            map(abs(currentTimeCache - sound[songNdx].duration()), 
                sound[songNdx].duration(), 0, 
                0, progressBarW);

            // Current time rect
            fill(255, 0, 0);
            rect(progressBarX, progressBarY, playTimeLength, progressBarH);

            //////////////// Current Time / Duration Text ////////////////
            
            // Get current time
            var minutes = parseInt(currentTimeCache / 60);
            var seconds = parseInt(currentTimeCache % 60);    

            // 0:00 format
            if(seconds > 9){
                currentTime = minutes + ":" + seconds;  
            }else{
                currentTime = minutes + ":0" + seconds;  
            }

            // Get song duration
            var minutes = parseInt(sound[songNdx].duration() / 60);
            var seconds = parseInt(sound[songNdx].duration() % 60);    
            
            // 0:00 format
            if(seconds > 9){
                duration = minutes + ":" + seconds;  
            }else{
                duration = minutes + ":0" + seconds;  
            }

            // Display current time / song duration
            fill(0);
            text(currentTime + " / " + duration, 
                 (progressBarX + progressBarW) * 1.05, 
                 progressBarY + progressBarH);
            
            //////////////// Visualisation Name Text ////////////////
            
            textAlign(CENTER);
            text("VIS", width/2, visTextY );
            text(visNdx + 1 + ": " +vis.visuals[visNdx].name, width/2, visNameTextY);
            
            //////////////// Volume Icon ////////////////
            
            fill('#0085ff');
            triangle(170, 30, 
                     152, 40, 
                     170, 50);
            rect(150, 35, 10 , 10);

            noFill();
            
            arc(180, 40, 10, 10, -HALF_PI, HALF_PI);
            arc(180, 40, 20, 20, -HALF_PI, HALF_PI);

            pop();
            
        }else{
            // Hide sliders
            rateSlider.hide();
            volumeSlider.hide();
            panSlider.hide();
        }
	};

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
	};
    
    // click time rect to change currentTime
    this.mouseClicked = function(){
        if(mouseX > progressBarX && mouseX < progressBarX + progressBarW && 
            mouseY > progressBarY && mouseY < progressBarY + progressBarH){

            
            timeRelativeToSlider = map(mouseX, 
                progressBarX, progressBarX + progressBarW, 
                0, sound[songNdx].duration());

            if(sound[songNdx].isPlaying()){
                sound[songNdx].jump(timeRelativeToSlider);
            }else{
                //currentTimeCache = timeRelativeToSlider;
            }
        }  
	};


	//responds to keyboard presses
	//@param keycode the ascii code of the keypressed
	this.keyPressed = function(keycode){
		// play/pause sound
		if(keyCode == 32){
           playbackButton.playPause();

		}
        
        // mute/unmute sound
//        if(keyCode == 77){
//            console.log("Mute/Unmute: to be implemented");
//		}

        // select visualisation
		if(keyCode > 48 && keyCode < 58){
			var visNumber = keycode - 49;
            if(vis.visuals[visNumber]){
                visNdx = visNumber;
			     vis.selectVisual(vis.visuals[visNumber].name); 
            }  
		}
	};
}