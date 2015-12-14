var Con = function() {
	var run = true;
  	var downing = false;
	var wait = false;
	var content = [];
	var speed = 500;
			
	
	var showContent = function(){
		$("#content td").html("");
		
		for(var i=0;i<content.length;i++){
			var lin = content[i];
			if(lin==0)continue;
			for(var j=0;j<lin.length;j++){
				if(lin[j]==1){
					$("#content tr:eq("+i+")").children("td:eq("+j+")").html("唐");	
				}
					
			}
		}
		
		var xin = downing.shape[downing.face];
		var deep = downing.deep;
		var height = xin.length;//积木高度
		var xinx = downing.x;
		for(var i=0;i<height;i++){
			var lin = xin[i];
			if(lin==0)continue;
			for(var j=0;j<lin.length;j++){
				if(lin[j]==1){
					var x = j+xinx;
					var y = i+deep-height;
					if(y<0)continue;
					$("#content tr:eq("+y+")").children("td:eq("+x+")").html("吕");
					
				}
					
			}
			
		}		
		
	}
	
	var down = function(){
		downing.deep++;	
		var xin = downing.shape[downing.face];
		var deep = downing.deep;
		var height = xin.length;//积木高度
		var xinx = downing.x;
		look:
		for(var i=0;i<height;i++){
			var lin = xin[i];
			if(lin==0)continue;
			for(var j=0;j<lin.length;j++){
				if(lin[j]==1){
					var x = j+xinx;
					var y = i+deep-height;
					try{
						if(y>9||content[y][x]==1){
							downing.deep--;
							merge();
							break look;
						};
					}catch(e){
					}
				}
					
			}
			
		}	
		showContent();
	}
	
	var merge = function(){
		var xin = downing.shape[downing.face];
		var deep = downing.deep;
		var height = xin.length;//积木高度
		var xinx = downing.x;
		for(var i=0;i<height;i++){
			var lin = xin[i];
			if(lin==0)continue;
			for(var j=0;j<lin.length;j++){
				if(lin[j]==1){
					var x = j+xinx;
					var y = i+deep-height;
					if(y<0){
						alert("游戏结束");
						pause();
						init();
					}
					content[y][x]=1;
					
				}
					
			}
			
		}
		
		//对满行进行删除
		var line = 0;
		for(var i=0;i<10;i++){
			for(var j=0;j<8;j++){
				var yes = content[i][j];
				if(yes==1){
					if(j==7){
						line++;
						for(var l=i;l>-1;l--){
							if(l>0){
								content[l] =  content[l-1];
							}else{
								content[l] =  [0,0,0,0,0,0,0,0];
							}
						}
					}
					continue;
				}else break;
			}	
		}
		var old = parseInt($("#score").html());
		$("#score").html(old+line*line*10);
		downing = wait;
		wait = new Jimu();
		showWait();
	}
	
	var showWait = function(){
		$("#wait td").html("");
		var xin = wait.shape[wait.face];
		for(var i=0;i<xin.length;i++){
			var lin = xin[i];
			if(lin==0)continue;
			for(var j=0;j<lin.length;j++){
				if(lin[j]==1){
					$("#wait tr:eq("+i+")").children("td:eq("+j+")").html("吕");	
				}
					
			}
			
		}		
	}
	
	var init = function(){
		content = [];
		for(var i=0;i<10;i++){
			var a=[]
			for(var j=0;j<8;j++){
				a.push(0);
					
			}
			content.push(a);	
		}
		downing = new Jimu();
		wait = new Jimu();
		showWait();
		showContent();
	}
	
	init();
	
	var turn = function(num){
		downing.x += num;
		var xin = downing.shape[downing.face];
		var deep = downing.deep;
		var height = xin.length;//积木高度
		var xinx = downing.x;
		var ok = true;//是否正常移动
		look:
		for(var i=0;i<height;i++){
			var lin = xin[i];
			if(lin==0)continue;
			for(var j=0;j<lin.length;j++){
				if(lin[j]==1){
					var x = j+xinx;
					var y = i+deep-height;
					if(x<0||x>7){
						ok = false;
						break look;
					}
					try{
						if(content[y][x]==1){
							ok = false;
							break look;
						};
					}catch(e){
					}
				}
					
			}
			
		}
		
		if(!ok){
			downing.x -= num;	
		}else showContent();
		
	}
	
	var change = function(){
		downing.changeFace();	
		var xin = downing.shape[downing.face];
		var deep = downing.deep;
		var height = xin.length;//积木高度
		var xinx = downing.x;
		var ok = true;//是否正常变换
		look:
		for(var i=0;i<height;i++){
			var lin = xin[i];
			if(lin==0)continue;
			for(var j=0;j<lin.length;j++){
				if(lin[j]==1){
					var x = j+xinx;
					var y = i+deep-height;
					if(x<0||x>7){
						ok = false;
						break look;
					}
					try{
						if(y>9||content[y][x]==1){
							ok = false;
							break look;
						};
					}catch(e){
					}
				}
					
			}
			
		}
		if(!ok){
			downing.cancleFace();
		}else showContent();
		
	}
	var begin = function(){
		run = setInterval(down, speed);
			
	}
	
	var pause = function(){
		clearInterval(run);
	}
	
	return {
		begin:begin,	
		pause:pause,
		turn:turn,
		change:change,
		down:down
	}
	
};
