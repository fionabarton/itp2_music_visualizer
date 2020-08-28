// displays and handles clicks on the previous visualisation button.
function PreviousVisualsationButton(){
	// variables for button position/size
    let x = (width/2) - 50; // scale w/ canvas size
	let y = 30;
	let w = 20;
	let h = 20;

	this.draw = function(){
        // draw previous visualisation icon
        fill('#0085ff');
        triangle(x + w, y, 
                 x, y + h/2, 
                 x + w, y+h);
        noFill();
	}

	// checks for clicks on the button, starts previous visualisation.
	this.hitCheck = function(){
		if(mouseX > x && mouseX < x + w && 
           mouseY > y && mouseY < y + h){
            
            // change visualisation index
            if(visNdx > 0){
                visNdx -= 1;
            }else{
                visNdx = vis.visuals.length - 1;
            }

            vis.selectVisual(vis.visuals[visNdx].name);  
        }
	}
    
    // scale w/ canvas size
    this.onResize = function(){
        x = (width/2) - 50;
    }
}