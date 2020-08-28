// displays and handles clicks on the volume button.
function VolumeButton(){
	// variables for button position/size
    let x = 150;
	let y = 30;
	let w = 10;
	let h = 10;
    let pad = 10;
    
    // variable to change the how the volume icon's drawn if muted
    this.isMuted = false;
    
    // cache volume when muted in order to restore it when unmuted
    this.volumeCache;

	this.draw = function(){
        push();
        
        // draw next volume icon
        fill('#0085ff');
        triangle((x + pad * 2), (y), 
                 (x), (y + pad), 
                 (x + pad * 2), (y + pad * 2));
        rect(x, y + pad / 2, w, h);
        
        noFill();

        if(this.isMuted){
            // draw diagonal lines across volume icon to indicated MUTED
            if(controls.rangeSliders.volumeSlider.value() <= 0){
                line((x - pad / 2), (y - pad / 2), 
                     (x + pad * 2.5), (y + pad * 2.5));
                line((x + pad * 2.5), (y - pad / 2),
                     (x - pad / 2), (y + pad * 2.5));
            }else{
                this.isMuted = false;
            }   
        }else{
            if(controls.rangeSliders.volumeSlider.value() <= 0){
                this.isMuted = true;
            }
            
            // draw "sound wave" with up to three arcs depending on volume level
            if (controls.rangeSliders.volumeSlider.value() > 0){
                arc(x + pad * 3, y + pad, 
                w, h, 
                -HALF_PI, HALF_PI);
            }
   
            if (controls.rangeSliders.volumeSlider.value() >= 0.33){
                arc(x + pad * 3, y + pad, 
                w * 2, h * 2, 
                -HALF_PI, HALF_PI); 
            } 
            
            if (controls.rangeSliders.volumeSlider.value() >= 0.66){
                arc(x + pad * 3, y + pad, 
                w * 3, h * 3, 
                -HALF_PI, HALF_PI);       
            }
        }
        
        pop();
	}
    
    // (un)mute volume
    this.muteUnmute = function(){
        if(this.isMuted){
            this.isMuted = false;
            controls.rangeSliders.volumeSlider.value(this.volumeCache);
        }else{
            this.isMuted = true;
            this.volumeCache = controls.rangeSliders.volumeSlider.value();
            controls.rangeSliders.volumeSlider.value(0);
        } 
    }

	// checks for clicks on the button, mutes or unmutes the volume.
	this.hitCheck = function(){
		if(mouseX > x && mouseX < x + w + pad * 2 && 
           mouseY > y && mouseY < y + h + pad * 2){
            this.muteUnmute();
        }
	}
}