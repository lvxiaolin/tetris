var Jimu = function() {
    this.shape;//形状
	this.face = Math.round(Math.random()*3);//朝向
	this.deep = 0;
	this.x = 3;//水平位置
	var shapes = [
				 	[//正方形
				   		[[1,1],[1,1]],	[[1,1],[1,1]],	[[1,1],[1,1]],	[[1,1],[1,1]]
					],
					[//条形
					 	[0,[1,1,1,1]],	[[0,1],[0,1],[0,1],[0,1]],	[0,[1,1,1,1]],	[[0,1],[0,1],[0,1],[0,1]]
					 ],
					[//七形
					 	[[0,1,1],[0,0,1],[0,0,1]],	[[0,0,1],[1,1,1]],	[[0,1],[0,1],[0,1,1]],	[0,[0,1,1,1],[0,1]]
					 ],
					[//反七形
					 	[[0,1,1],[0,1],[0,1]],	[0,[1,1,1],[0,0,1]],  [[0,0,1],[0,0,1],[0,1,1]],	[[0,1],[0,1,1,1]]
					 ],
					[//土字形
					 	[[0,1],[1,1,1]],	[[0,1],[0,1,1],[0,1]],  [0,[1,1,1],[0,1,0]],	[[0,1],[1,1],[0,1]]
					 ],
					[//Z字形
					 	[0,[1,1],[0,1,1]],	[[0,0,1],[0,1,1],[0,1]],  [0,[1,1],[0,1,1]],	[[0,0,1],[0,1,1],[0,1]]
					 ]
				];
    this.setShape = function() {
        var sh = Math.round(Math.random()*5);
		this.shape = shapes[sh];
    };


	this.changeFace = function() {
		this.face++;
		if(this.face>3){
			this.face = this.face-4;	
		}
		
	};
	
	this.cancleFace = function() {
		this.face--;
		if(this.face<0){
			this.face = this.face+4;	
		}
	}
	
	
	
	this.init = function(){
		this.setShape();
	}
	this.init();
	
};
