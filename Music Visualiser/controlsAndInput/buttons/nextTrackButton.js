// displays and handles clicks on the next track button.
function NextTrackButton(){
	// variables for button position/size
	let x = 100;
	let y = 30;
	let w = 20;
	let h = 20;

	this.draw = function(){
        // draw next track icon
        fill('#ff6600');
        triangle(x, y, 
                 x + w, y + h/2, 
                 x, y+h);
        rect(x + w, y, w/2 - 2, h);
        noFill();
	};

	// checks for clicks on the button, starts next track
	this.hitCheck = function(){
		if(mouseX > x && mouseX < x + w + w/2 - 2 && 
           mouseY > y && mouseY < y + h){
            this.skipToNextSong();
        }
	};

    this.skipToNextSong = function(){ 
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
        if(songNdx < sound.length - 1){
            songNdx += 1;
        }else{
            songNdx = 0;
        }
    }
}