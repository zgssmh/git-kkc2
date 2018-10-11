$(function(){
	$.ajax({
		url: "data/jx_goods.json",
		success: function(arr){
			for(var i = 0; i < arr.length; i++){
				$(`<a class="home_pul_box_shadow" href="">
					<img src="${arr[i].img}" alt="">
					<h3 class="pro_title">${arr[i].decro}</h3>
					<del>${arr[i].order}</del>
					<p class="pro_price">${arr[i].present}</p>
					</a>`).appendTo($('.index_card_container'));
			}					
		}
	})
	$.ajax({
		url: "data/xp_goods.json",
		success: function(arr){
			for(var i = 0; i < arr.length; i++){
				$(`<li>
						<a class="home_pul_box_shadow" href="">
						<img src="${arr[i].img}" alt="">
						<h3 class="pro_title">${arr[i].decro}</h3>
						<del>${arr[i].order}</del>
						<p class="pro_price">${arr[i].present}</p>
						</a>
					</li>`).appendTo($('#home_rec ul'));
			}					
		}
	})
	$.ajax({
		url: "data/gh_goods.json",
		success: function(arr){
			for(var i = 0; i < arr.length; i++){
				$(`<li>
						<a class="home_pul_box_shadow" href="">
						<img src="${arr[i].img}" alt="" class="floor_goods_img">
						<h3 class="pro_title">${arr[i].decro}</h3>
						<del>${arr[i].order}</del>
						<p class="pro_price">${arr[i].present}</p>
						</a>
					</li>`).appendTo($('.floor_goods ul'));
			}					
		}
	})

})					
