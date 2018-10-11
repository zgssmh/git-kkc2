			function startMove(node, json, complete){ //complete = show
				clearInterval(node.timer);
				node.timer = setInterval(function(){

					var isEnd = true; //假设都到达目的值了。

					for(var attr in json){
						//1、获取当前的值
						var iCur = null;
						if(attr == "opacity"){
							iCur = parseInt(parseFloat(getStyle(node, attr)) * 100);
						}else{
							iCur = parseInt(getStyle(node, attr))
						}
						//2、计算速度 
						var speed = (json[attr] - iCur) / 8;
						speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

						//3、运动和停止分开
						
						if(attr == "opacity"){
							iCur += speed;
							node.style.opacity = iCur / 100;
							node.style.filter = "alpha(opacity=" + iCur + ")";
						}else{
							node.style[attr] = iCur + speed + "px";
						}

						//如果这个if语句成立，说明至少有一个样式没到达目的值
						if(json[attr] != iCur){
							isEnd = false;
						}
						
					}
					if(isEnd){
						clearInterval(node.timer);
						if(complete){
							complete();
						}
					}
				}, 30);
			}

			function getStyle(obj, attr){
				if(obj.currentStyle){
					return obj.currentStyle[attr];
				}else{
					return getComputedStyle(obj)[attr];
				}
			}