$().extend({
				size:function(){
					return this.element.length;
				}
			})
			$(function(){
				//按钮
				var oBtns = $("#play").find("ol").find("li");
				var oUl = $("#play").find("ul");
				var aLi = oUl.find("li");
				var iNow = 0;
				var timer = null;
				timer = setInterval(timerInner,2000);
				function timerInner(){
					iNow++;
					tab();
				}
				function tab(){
					// document.title = iNow;
					if(iNow == oBtns.size()){
						oBtns.attr("class","");
						oBtns.eq(0).attr("class","active");
					}else{
						oBtns.attr("class","");
						oBtns.eq(iNow).attr("class","active");
					}
					/*startMove(aLi, {height: 360}, function(){

							startMove(aLi, {opacity: 100});
						});*/
					oUl.animate({top:iNow * -450},function(){
						if(iNow == oBtns.size()){
							iNow = 0;
							oUl.css("top","0px");
							// aLi.css("opacity",'0');
						}
					});
				}
				oBtns.click(function(){
					iNow = $(this).index();
					tab();
				})
				$("#play").hover(function(){
					clearInterval(timer);
				},function(){
					timer = setInterval(timerInner,2000);
				})
			})