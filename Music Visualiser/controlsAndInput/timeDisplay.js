// Constructor function to handle displaying the currentTime &
// duration of the sound being played. Also handles the progress bar.
function TimeDisplay(){
    // variables progress bar position & size
    let progressBarX = 20;
    let progressBarY = 100;
    let progressBarW = 200;
    let progressBarH = 20;
    
    // current time, duration, progress bar
    let currentTime;    
    let duration;
    this.currentTimeCache = 0;
    let timeRelativeToProgressBar = 0;
    
    this.draw = function(){
        // initialize text & stroke settings
        textSize(15);
        textFont("Arial");
        stroke(255);
        strokeWeight(2);
        
        //////////////// Current Time Cache ////////////////
        // Cache current time because currentTime() is not defined when !isPlaying()
        if(sound[songNdx].isPlaying()){
            this.currentTimeCache = sound[songNdx].currentTime();
        }

        //////////////// Draw Progress Bar ////////////////
        // Draw duration rect
        fill(125, 125, 125);
        rect(progressBarX, progressBarY, progressBarW, progressBarH);

        // Map sound's currentTime to length of the progress bar
        let playTimeLength = 
        map(abs(this.currentTimeCache - sound[songNdx].duration()), 
            sound[songNdx].duration(), 0, 
            0, progressBarW);

        // Draw current time rect
        fill(255, 0, 0);
        rect(progressBarX, progressBarY, playTimeLength, progressBarH);

        //////////////// Get & Display Current Time / Duration Text ////////////////
        // Get current time as an int
        let minutes = parseInt(this.currentTimeCache / 60);
        let seconds = parseInt(this.currentTimeCache % 60);    

        // convert to 0:00 format
        if(seconds > 9){
            currentTime = minutes + ":" + seconds;  
        }else{
            currentTime = minutes + ":0" + seconds;  
        }

        // Get song duration as an int
        minutes = parseInt(sound[songNdx].duration() / 60);
        seconds = parseInt(sound[songNdx].duration() % 60);    

        // convert to 0:00 format
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
    }
    
    // click progress bar to change currentTime
    this.mouseClicked = function(){
        if(mouseX > progressBarX && mouseX < progressBarX + progressBarW && 
            mouseY > progressBarY && mouseY < progressBarY + progressBarH){

            // get time relative to the length of the progress bar
            timeRelativeToProgressBar = map(mouseX, 
                progressBarX, progressBarX + progressBarW, 
                0, sound[songNdx].duration());

            // jump to time relative to progress bar
            if(sound[songNdx].isPlaying()){
                sound[songNdx].jump(timeRelativeToProgressBar);
            }else{
                controls.playbackButton.playPause();
                sound[songNdx].jump(timeRelativeToProgressBar);
                //this.currentTimeCache = timeRelativeToProgressBar;
                //sound[songNdx].pause();
            }
        }  
	}
}