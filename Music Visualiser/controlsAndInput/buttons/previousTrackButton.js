// displays and handles clicks on the previous track button.
function PreviousTrackButton(){
	// variables for button position/size
	let x = 20;
	let y = 30;
	let w = 20;
	let h = 20;

	this.draw = function(){
        // draw previous track icon
        fill('#ff6600');
        triangle(x + w, y, 
                 x, y + h/2, 
                 x + w, y+h);
        rect(x - w/3, y, w/2 - 2, h);
        noFill();
	}

	// checks for clicks on the button, starts previous track.
	this.hitCheck = function(){
		if(mouseX > x - w/3 && mouseX < x + w && 
           mouseY > y && mouseY < y + h){  
            this.skipToPreviousSong();
        }
	}
    
    this.skipToPreviousSong = function(){ 
        if (sound[songNdx].isPlaying()) {
            // stop current song and change song index
            stopAndChangeNdx();
                
            // play song
            sound[songNdx].play();
        }else{
            // stop current song and change song index
            stopAndChangeNdx();
            
            // reset currentTime for controlsAndInput.js
            controls.currentTimeCache = 0;
        }
    }
    
    let stopAndChangeNdx = function(){
        // stop current song
        sound[songNdx].stop();

        // change song index
        if(songNdx > 0){
            songNdx -= 1;
        }else{
            songNdx = sound.length - 1;
        }
    }
}