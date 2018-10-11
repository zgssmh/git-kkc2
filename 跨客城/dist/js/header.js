window.onload = function(){
	var category_list = document.getElementById("category_list");
	var cat_list = document.getElementById("cat_list");
	var cat_nav = document.getElementsByClassName("cat_nav");
	var cat_more = document.getElementById("cat_more");
	category_list.onmouseover = function(){
		cat_list.style.display = 'block';
	}
	category_list.onmouseout = function(){
		cat_list.style.display = 'none';
	}
	cat_nav[0].onmouseover = function(){
		cat_more.style.display = 'block';
	}
	cat_nav[0].onmouseout = function(){
		cat_more.style.display = 'none';
	}
	// if(){

	// }
	/*$(".cat_nav")[0].onmouseout = function(){
		$("#cat_more").style.display = 'none';
	}*/
}