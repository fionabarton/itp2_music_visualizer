/*
8/8
- Added volumeButton.js to index.html

Volume Button:
- On Click: -(un)mute audio
            - set volumeSlider.value to 0 or volumeCache
- Change volume icon depending on volumeSlider.value

ControlsAndInput:
- (Un)mute on keyboard input (letter 'm' on the keyboard)

Volume Slider:
- Unmute on click volumeSlider

Next Track Button / Previous Track Button:
- Reset currentTime: when paused, On Click (nextTrackButton OR previousTrackButton)

*/

function VolumeButton(){
	
    this.x = 150;
	this.y = 30;
	this.w = 10;
	this.h = 10;
    
    this.pad = 10;
    
    this.isMuted = false;
    
    // cache volume when muted in order to restore it when unmuted
    this.volumeCache;

	this.draw = function(){
//        // declared here to change w/ width size
//        this.x = width/2 + 30;

        push();
        
        // draw next volume icon
        fill('#0085ff');
        triangle((this.x + this.pad * 2), (this.y), 
                 (this.x), (this.y + this.pad), 
                 (this.x + this.pad * 2), (this.y + this.pad * 2));
        rect(this.x, this.y + this.pad / 2, this.w, this.h);
        
        noFill();

        if(this.isMuted){
            
            if(controls.volumeSlider.value() <= 0){
                // draw diagonal lines across volume icon to indicated MUTED
                line((this.x - this.pad / 2), (this.y - this.pad / 2), 
                     (this.x + this.pad * 2.5), (this.y + this.pad * 2.5));
                line((this.x + this.pad * 2.5), (this.y - this.pad / 2),
                     (this.x - this.pad / 2), (this.y + this.pad * 2.5));
            }else{
                this.isMuted = false;
            }   
        }else{
            if(controls.volumeSlider.value() <= 0){
                this.isMuted = true;
            }
            
            // draw "sound wave" with up to three arcs
            if (controls.volumeSlider.value() > 0){
                arc(this.x + this.pad * 3, this.y + this.pad, 
                this.w, this.h, 
                -HALF_PI, HALF_PI);
            }
   
            if (controls.volumeSlider.value() >= 0.33){
                arc(this.x + this.pad * 3, this.y + this.pad, 
                this.w * 2, this.h * 2, 
                -HALF_PI, HALF_PI); 
            } 
            
            if (controls.volumeSlider.value() >= 0.66){
                arc(this.x + this.pad * 3, this.y + this.pad, 
                this.w * 3, this.h * 3, 
                -HALF_PI, HALF_PI);       
            }
        }
        
        pop();
	};
    
    // (un)mute volume
    this.muteUnmute = function(){
        if(this.isMuted){
            this.isMuted = false;
            controls.volumeSlider.value(this.volumeCache);
        }else{
            this.isMuted = true;
            this.volumeCache = controls.volumeSlider.value();
            controls.volumeSlider.value(0);
        } 
    }

	// checks for clicks on the button, mutes or unmutes the volume.
	this.hitCheck = function(){
		if(mouseX > this.x && mouseX < this.x + this.w + this.pad * 2 && 
           mouseY > this.y && mouseY < this.y + this.h + this.pad * 2){
            this.muteUnmute();
        }
	};
}