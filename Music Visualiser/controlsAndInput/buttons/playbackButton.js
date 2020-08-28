// displays and handles clicks on the playback button.
function PlaybackButton(){
	// variables for button position/size
	let x = 60;
	let y = 30;
	let w = 20;
	let h = 20;

	// flag to determine whether to play or pause after button click and
	// to determine which icon to draw
	let playing = false;

	this.draw = function(){
        fill('#ff6600');
        
		// pause 
        if(playing){
			rect(x, y, w/2 - 2, h);
			rect(x + (w/2 + 2), y, w/2 - 2, h);
		}
        // play
		else{	
			triangle(x, y, x + w, y + h/2, x, y+h);
		}
        
        noFill();
	}

    // plays or pauses sound
    this.playPause = function(){
        if (sound[songNdx].isPlaying()) {
            sound[songNdx].pause();
        } else {
            sound[songNdx].play();
        }
        playing = !playing;
    }
    
	// checks for clicks on the button, starts or pauses playback.
    this.hitCheck = function(){
        if(mouseX > x - w/3 && 
           mouseX < x + w + w/3 && 
           mouseY > y - h/3 && 
           mouseY < y + h + h/3){  
            this.playPause();
        }
	}
}