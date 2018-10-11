/*
	事件监听器

	addEventListener()
	removeEventListener()

	IE下
	attachEvent()
	detachEvent()

 */

function addEvent(obj, eventType, func){
	if(obj.addEventListener){
		obj.addEventListener(eventType, func, false);
	}else{
		obj.attachEvent("on" + eventType, func);
	}
}

function removeEvent(obj, eventType, func){
	if(obj.removeEventListener){
		obj.removeEventListener(eventType, func);
	}else{
		obj.detachEvent("on" + eventType, func);
	}
}


function preDef(e){
	if(e.preventDefault){
		e.preventDefault();
	}else{
		e.returnValue = false;
	}
}

function drag(node){
	var offsetX = 0;
	var offsetY = 0;  //用于记录相对距离
	//1、按下
	node.onmousedown = function(ev){
		var e = ev || window.event;
		offsetX = e.clientX - this.offsetLeft;
		offsetY = e.clientY - this.offsetTop;

		//2、移动
		document.onmousemove = function(ev){
			var e = ev || window.event;
			node.style.left = e.clientX - offsetX + 'px';
			node.style.top = e.clientY - offsetY + 'px';
		}
		//3、抬起
		document.onmouseup = function(){
			document.onmousemove = null;
		}
	}
}


/*
	事件冒泡的浏览器兼容写法

	参数 e 是事件对象
 */
function stopBubble(e){
	if(e.cancelBubble){
		e.cancelBubble = true;
	}else{
		e.stopPropagation();
	}
}

function randomColor(){
	var str = "rgba(" + parseInt(Math.random() * 256) + "," + parseInt(Math.random() * 256) + "," + parseInt(Math.random() * 256) + ",1)";
	// "rgba(255,255,255,1)"  [0,1)
	
	return str;
}

//忽略空白节点
function removeSpaceNode(nodes){
	var res = []; //用于存储不空的节点
	for(var i = 0; i < nodes.length; i++){
		if(!(nodes[i].nodeType == 3 && /^\s+$/ig.test(nodes[i].nodeValue))){
			res.push(nodes[i]);
		}
	}
	return res;
}


function $(str){
	//直接判断首字母
	switch(str[0]){
		case "#":
			return document.getElementById(str.substring(1));
			break;
		case ".":
			return elementsByClassName(document, str.substring(1));
			break;
		case "[":
			return document.getElementsByName(str.substring(6, str.length - 1));
			break;
		default:
			return document.getElementsByTagName(str);
			break;
	}
}


// 浏览器兼容写法
function getStyle(node, styleType){
	return node.currentStyle ? node.currentStyle[styleType] : getComputedStyle(node)[styleType];
}

//兼容IE8以下，获取className节点的元素。
function elementsByClassName(node, className){
	var res = [];
	//1、查找node所有的子节点
	var nodes = node.getElementsByTagName("*");
	for(var i = 0; i < nodes.length; i++){
		if(nodes[i].className == className){
			res.push(nodes[i]);
		}
	}
	return res;
	
}


function BubbleSort(arr){
	//决定比较几轮
	for(var i = 0; i < arr.length - 1; i++){
		//决定每一轮比较多少次
		for(var j = 0; j < arr.length - i - 1; j++){
			if(arr[j] > arr[j + 1]){
				var tmp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = tmp;
			}
		}
	}
}

function changeSort(arr){
	for(var i = 0; i < arr.length - 1; i++){
		//次数
		for(var j = i + 1; j < arr.length; j++){
			if(arr[i] > arr[j]){
				var tmp = arr[i];
				arr[i] = arr[j];
				arr[j] = tmp;
			}
		}
	}
}

function norepeat(arr){
	for(var i = arr.length - 1; i > 0; i--){
		for(var j = i - 1; j >= 0; j--){
			if(arr[i] == arr[j]){
				arr.splice(j, 1);
			}
		}
	}
}




//自定展示当前时间
			function showTime(){
				var d = new Date();
				var year = d.getFullYear();
				var month = d.getMonth() + 1;
				var date = d.getDate();

				var week = d.getDay();
				//将数字转成中文
				week = chineseFromNum(week);
				
				var hour = d.getHours();
				var min = d.getMinutes();
				var sec = d.getSeconds();

				return year + "年" + month + "月" + date + "日 星期" + week + " " + doubleNum(hour) + ":" + doubleNum(min) + ":" + doubleNum(sec); 
			}

			//单位数变双位数
			function doubleNum(num){
				if(num < 10){
					return "0" + num;
				}else{
					return num;
				}
			}

			//将数字转成中文的函数
			function chineseFromNum(num){
				switch(num){
					case 0:
						return "日";
						break;
					case 1:
						return "一";
						break;
					case 2:
						return "二";
						break;
					case 3:
						return "三";
						break;
					case 4:
						return "四";
						break;
					case 5:
						return "五";
						break;
					case 6:
						return "六";
						break;
				}
			}