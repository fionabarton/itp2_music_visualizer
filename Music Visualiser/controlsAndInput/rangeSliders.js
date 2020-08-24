function RangeSliders(){
    // variables for sliders
    let rateSlider;
    this.volumeSlider;
    let panSlider;
    
    // rate slider position
    let rateSliderX =  width - 140; // scale w/ canvas size
    let rateSliderY =  30;
    
    // pan slider position
    let panSliderX =  width - 140; // scale w/ canvas size
    let panSliderY =  75;
    
    // slider text positions
    let rateTextY = 20
    let panTextY = 70
    
    // initialize volume slider
    this.volumeSlider = createSlider(0, 1, 0.5, 0.1);
    this.volumeSlider.position(200, 30);
    this.volumeSlider.style('width', '80px');
    this.volumeSlider.style('-webkit-appearance', 'none');
    this.volumeSlider.style('background', '#ff6600');
    this.volumeSlider.style('border-radius', '5px');
    
    // initialize playback rate slider
    rateSlider = createSlider(0, 2, 1, 0.2);
    //rateSlider.position(width - 140, 85);
    rateSlider.position(rateSliderX, rateSliderY);
    rateSlider.style('-webkit-appearance', 'none');
    rateSlider.style('width', '80px');
    rateSlider.style('background', '#ff6600');
    rateSlider.style('border-radius', '5px');
    
    // initialize pan slider
    panSlider = createSlider(-1, 1, 0, 0.2);
    //panSlider.position(width - 140, 130);
    panSlider.position(panSliderX, panSliderY);
    panSlider.style('width', '80px');
    panSlider.style('-webkit-appearance', 'none');
    panSlider.style('background', '#ff6600');
    panSlider.style('border-radius', '5px');
    
    this.draw = function(){
        push();
        if(controls.menuDisplayed){
            //////////////// Range Sliders ////////////////
            // initialize text & stroke settings
            textSize(15);
            textFont("Arial");
            stroke(255);
            strokeWeight(2);

            // Show sliders
            rateSlider.show();
            this.volumeSlider.show();
            panSlider.show();
            
            // Set values to slider values
            sound[songNdx].rate(rateSlider.value());
            masterVolume(this.volumeSlider.value());
            sound[songNdx].pan(panSlider.value());

            // line to indicate middle of sliders 
            line(width - 98.5, 25,
                 width - 98.5, 100);

            // Slider text
            fill(0);
            text("RATE (0 - x2)", width - 140, rateTextY);
            text("PAN (L - R)", width - 140, panTextY);

        }else{
            // Hide sliders
            rateSlider.hide();
            this.volumeSlider.hide();
            panSlider.hide();
        }
        pop();
    }
    
    this.onResize = function(){
        rateSliderX = width - 140;
        panSliderX = width - 140;
        
        // Set slider positions
        rateSlider.position(rateSliderX, rateSliderY);
        panSlider.position(panSliderX, panSliderY);
    }
}