// displays and handles clicks on the playback button.
function PlaybackButton(){
	
	this.x = 60;
	this.y = 30;
	this.width = 20;
	this.height = 20;

	// flag to determine whether to play or pause after button click and
	// to determine which icon to draw
	this.playing = false;

	this.draw = function(){
        fill('#ff6600');
        
		// pause 
        if(this.playing){
			rect(this.x, this.y, this.width/2 - 2, this.height);
			rect(this.x + (this.width/2 + 2), this.y, this.width/2 - 2, this.height);
		}
        // play
		else{	
			triangle(this.x, this.y, this.x + this.width, this.y + this.height/2, this.x, this.y+this.height);
		}
        
        noFill();
	};

    // plays or pauses sound
    this.playPause = function(){
        if (sound[songNdx].isPlaying()) {
    			sound[songNdx].pause();
  			} else {
                sound[songNdx].play();
  			}
  			this.playing = !this.playing;
    }
    
	// checks for clicks on the button, starts or pauses playback.
    this.hitCheck = function(){
        if(mouseX > this.x - this.width/3 && 
           mouseX < this.x + this.width + this.width/3 && 
           mouseY > this.y - this.height/3 && 
           mouseY < this.y + this.height + this.height/3){  
            this.playPause();
        }
	};
}