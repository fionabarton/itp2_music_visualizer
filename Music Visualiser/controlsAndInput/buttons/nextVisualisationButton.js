// displays and handles clicks on the visualisation forward button.
function NextVisualsationButton(){
	// variables for button position/size
    let x = width/2 + 30; // scale w/ canvas size
	let y = 30;
	let w = 20;
	let h = 20;

	this.draw = function(){
        // draw next visualisation icon
        fill('#0085ff');
        triangle(x, y, 
                 x + w, y + h/2, 
                 x, y+h);
        noFill();
	}

	// checks for clicks on the button, starts next visualisation.
	this.hitCheck = function(){
		if(mouseX > x && mouseX < x + w && 
           mouseY > y && mouseY < y + h){
            
            // change visualisation index
            if(visNdx < vis.visuals.length - 1){
                visNdx += 1;
            }else{
                visNdx = 0;
            }
            
            vis.selectVisual(vis.visuals[visNdx].name);  
        }
	}
    
    this.onResize = function(){
        x = width/2 + 30;
    }
}