/**********************************************
*@param data: text ASCII 8-bit
*@param n: the number of distinct values
************************************************/
function histogram(data, n=256, type="hist"){
	this.data=data;
	this.bins=[];
	this.type=type;
	if(type=="hist"){
		for(var i=0; i<n; i++){
			this.bins[i]=0;
		}
	//	console.log(data.length,n);
		for(var i=0; i<data.length; i++){
			this.bins[data[i]]++;
			//console.log(this.bins[i]);
		}
	}
	else{
		for(var i=0; i<n; i++){
			this.bins[i]=data[i];
		}
	}
	//debugger;
	console.log("histogram created");
	this.lineWidth = 1;
	this.color = "#ff0000";
	this.fillStyle="#ffffff";
	this.min = 1;
	this.max = 0;
	for(var i=0; i<n; i++){
	//	console.log(this.bins[i], data.length);
		this.bins[i]=this.bins[i]/data.length;
		if(this.bins[i] < this.min){this.min=this.bins[i]};
		if(this.bins[i] > this.max){this.max=this.bins[i]};
		//console.log(this.bins[i]);
	}
	//console.log(this.min, this.max);
	this.params=[];
}
/**********************************************
*@param c: canvas context
* @param coord: coordinates of top left in pixels [x,y]
* @param dim: dimensions [x,y]
************************************************/
histogram.prototype.draw = function(c,coord=[0,0], dim=[256,100]){
	this.params[0]=c;
	this.params[1]=coord;
	this.params[2]=dim;
	console.log("draw");
	var n = this.bins.length;
	var w = dim[0]/n;
	c.save();
	c.fillStyle=this.fillStyle;
	c.fillRect(coord[0],coord[1],dim[0],dim[1]);
	c.lineWidth = this.lineWidth;
	c.strokeStyle = this.color;
	c.beginPath();
	c.moveTo(coord[0], coord[1]+dim[1]*(1-(this.bins[0]-this.min)/(this.max-this.min)));
	for(var i=1; i<n; i++){
		c.lineTo(i*w+coord[0],coord[1]+dim[1]*(1-(this.bins[i]-this.min)/(this.max-this.min)));	
	//	console.log(i*w+coord[0],coord[1]+dim[1]*(1-(this.bins[i]-this.min)/(this.max-this.min)));
	}
	c.stroke();
	c.beginPath();
	c.strokeStyle="black";
	//if(this.type=="plot"){
		//console.log("ticks");
		for(var i=0; i<n; i++){
			c.moveTo(coord[0]+i*w, coord[1]+dim[1]);
			c.lineTo(coord[0]+i*w, coord[1]+dim[1]*.95);
			if(i%100==0){
				c.lineTo(coord[0]+i*w, coord[1]+dim[1]*.80)
			}
			else if(i%10 == 0){
				c.lineTo(coord[0]+i*w, coord[1]+dim[1]*.85);
			}
			else if(i%5 == 0){
				c.lineTo(coord[0]+i*w, coord[1]+dim[1]*.9);
			}
			//console.log(coord[0]);
		}
	//}
	c.stroke();
	c.restore();
	
}
histogram.prototype.redraw=function(){
	this.draw(this.params[0],this.params[1],this.params[2]);
}