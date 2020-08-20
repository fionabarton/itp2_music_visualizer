//displays and handles clicks on the next track button.
function NextTrackButton(){
	// variables for button position/size
	this.x = 100;
	this.y = 30;
	this.width = 20;
	this.height = 20;

	this.draw = function(){
        // draw next track icon
        fill('#ff6600');
        triangle(this.x, this.y, 
                 this.x + this.width, this.y + this.height/2, 
                 this.x, this.y+this.height);
        rect(this.x + this.width, this.y, this.width/2 - 2, this.height);
        noFill();
	};

	// checks for clicks on the button, starts next track.
	this.hitCheck = function(){
		if(mouseX > this.x && mouseX < this.x + this.width + this.width/2 - 2 && 
           mouseY > this.y && mouseY < this.y + this.height){
            this.playNextSong();
        }
	};

    this.playNextSong = function(){ 
        if (sound[songNdx].isPlaying()) {
            // stop current song and change song index
            this.stopAndChangeNdx();
                
            // play song
            sound[songNdx].play();
        }else{
            // stop current song and change song index
            this.stopAndChangeNdx();
            
            // reset currentTime for controlsAndInput.js
            controls.currentTimeCache = 0;
        }
    }
    
    this.stopAndChangeNdx = function(){
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