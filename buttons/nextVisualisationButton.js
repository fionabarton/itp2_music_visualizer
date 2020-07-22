// displays and handles clicks on the visualisation forward button.
function NextVisualsationButton(){
	
    this.x;
	this.y = 30;
	this.width = 20;
	this.height = 20;

	this.draw = function(){
        // declared here to change w/ width size
        this.x = width/2 + 30;
        
        // draw next visualisation icon
        fill('#0085ff');
        triangle(this.x, this.y, 
                 this.x + this.width, this.y + this.height/2, 
                 this.x, this.y+this.height);
        noFill();
	};

	// checks for clicks on the button, starts next visualisation.
	this.hitCheck = function(){
		if(mouseX > this.x && mouseX < this.x + this.width && 
           mouseY > this.y && mouseY < this.y + this.height){
            
            // change visualisation index
            if(visNdx < vis.visuals.length - 1){
                visNdx += 1;
            }else{
                visNdx = 0;
            }
            
            vis.selectVisual(vis.visuals[visNdx].name);  
        }
	};
}