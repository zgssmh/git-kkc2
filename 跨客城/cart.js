//鏇存柊缁熻鏁版嵁寮€鍏砨oolean
__openUpdateStatus = true;

//璐墿杞︽暟閲忔敼鍔ㄨ绠�
function cartCount(obj)
{
	if(__openUpdateStatus == false)
	{
		return false;
	}
	__openUpdateStatus = false;
	var countInput = $('#count_'+obj.goods_id+'_'+obj.product_id);
	var countInputVal = parseInt(countInput.val());

	//涔嬪墠鍟嗗搧鏁伴噺鐨勫熀鏁帮紝浠ヨ繖涓负鍙傝€冨鍑忛噺
	var oldNum = countInput.data('oldNum') ? countInput.data('oldNum') : obj.count;
	var xiangou = parseInt(obj.xiangou);
	//鍟嗗搧鏁伴噺澶т簬1浠�
	if(isNaN(countInputVal) || (countInputVal <= 0))
	{
	    __openUpdateStatus = true;
		alert('璐拱鐨勬暟閲忓繀椤诲ぇ浜�1浠�');
		countInput.val(1);
		countInput.change();
	}
	//鍟嗗搧鏁伴噺灏戜簬闄愯喘鏁伴噺
	else if(xiangou && xiangou > 0 && xiangou < parseInt(obj.store_nums) && countInputVal > xiangou){
		__openUpdateStatus = true;
		alert('姝ゅ晢鍝侀檺璐�'+xiangou+'浠�');
		countInput.val(xiangou);
		countInput.change();
	}
	//鍟嗗搧鏁伴噺灏忎簬搴撳瓨閲�
	else if(countInputVal > parseInt(obj.store_nums))
	{
	    __openUpdateStatus = true;
		alert('璐拱鐨勬暟閲忎笉鑳藉ぇ浜庢鍟嗗搧鐨勫簱瀛橀噺');
		countInput.val(parseInt(obj.store_nums));
		countInput.change();
	}
	else
	{
		var diff = parseInt(countInputVal) - parseInt(oldNum);
		if(diff == 0)
		{
			return;
		}
		var goods_id   = obj.product_id > 0 ? obj.product_id : obj.goods_id;
		var goods_type = obj.product_id > 0 ? "product"      : "goods";

		//鏇存柊璐墿杞︿腑姝ゅ晢鍝佺殑鏁伴噺
		$.getJSON(creatUrl("/simple/joinCart"),{"goods_id":goods_id,"type":goods_type,"goods_num":diff,"random":Math.random()},function(content){
			if(content.isError == true)
			{
				alert(content.message);
				countInput.val(1);
				countInput.data('oldNum',1);
				countInput.change();
			}
			else
			{
				countInput.data('oldNum',countInputVal);
				refreshCount();

				//鏇存柊灏忚鐨勪环鏍�
				$('#sum_'+obj.goods_id+'_'+obj.product_id).html(((obj.sell_price - obj.reduce) * countInputVal).toFixed(2));
			}
		});
	}
}

//澧炲姞鍟嗗搧鏁伴噺
function cart_increase(obj)
{
	//搴撳瓨瓒呴噺妫€鏌�
	var countInput = $('#count_'+obj.goods_id+'_'+obj.product_id);
	var xiangou =  parseInt(obj.xiangou);
	 if(xiangou && xiangou > 0 && xiangou < parseInt(obj.store_nums) && xiangou < parseInt(countInput.val()) + 1){
		alert('姝ゅ晢鍝侀檺璐�'+xiangou+'浠�');
	}
	else if(parseInt(countInput.val()) + 1 > parseInt(obj.store_nums))
	{
		alert('璐拱鐨勬暟閲忓ぇ浜庢鍟嗗搧鐨勫簱瀛橀噺');
	}
	else
	{
		if(__openUpdateStatus == false)
		{
			return false;
		}
		countInput.val(parseInt(countInput.val()) + 1);
		countInput.change();
	}
}

//鍑忓皯鍟嗗搧鏁伴噺
function cart_reduce(obj)
{
	//搴撳瓨瓒呴噺妫€鏌�
	var countInput = $('#count_'+obj.goods_id+'_'+obj.product_id);
	if(parseInt(countInput.val()) - 1 <= 0)
	{
		alert('璐拱鐨勬暟閲忓繀椤诲ぇ浜�1浠�');
	}
	else
	{
		if(__openUpdateStatus == false)
		{
			return false;
		}
		countInput.val(parseInt(countInput.val()) - 1);
		countInput.change();
	}
}

//绉婚櫎璐墿杞�
function removeCartByJSON(obj)
{
	var goods_id   = obj.product_id > 0 ? obj.product_id : obj.goods_id;
	var goods_type = obj.product_id > 0 ? "product"      : "goods";
	$.getJSON(creatUrl("/simple/removeCart"),{"goods_id":goods_id,"type":goods_type,"random":Math.random()},function()
	{
		window.location.reload();
	});
}

//寮€濮嬭绠楅€変腑鐨勫晢鍝佹暟鎹�
function exceptCartGoodsAjax()
{
	var data = [];
	//鑾峰彇鏈€変腑鐨勫晢鍝�
	$('input[type="checkbox"][name^="selectCartGoods"]:not(:checked)').each(function()
	{
		data.push(this.value);
	});

	$.getJSON(creatUrl("/simple/exceptCartGoodsAjax"),{"data":data},function(content)
	{
		refreshCount();
	});
}

//鍒锋柊璐墿杞︾粺璁℃暟鎹�
function refreshCount()
{
	$.getJSON(creatUrl("/simple/promotionRuleAjax"),{"random":Math.random()},function(content){
		$('#cart_prompt_box').empty();
		if(content.promotion.length > 0)
		{
			for(var i = 0;i < content.promotion.length; i++)
			{
				$('#cart_prompt_box').append( template.render('promotionTemplate',{"item":content.promotion[i]}) );
			}
			$('#cart_prompt').show();
		}
		else
		{
			$('#cart_prompt').hide();
		}

		/*寮€濮嬫洿鏂版暟鎹�*/
		$('#weight').html(content.weight);
		$('#origin_price').html(content.sum.toFixed(2));
		$('#discount_price').html(content.reduce.toFixed(2));
		$('#promotion_price').html(content.proReduce.toFixed(2));
		$('#sum_price').html(content.final_sum.toFixed(2));

		if(content.goodsList)
		{
			//鏇存柊澶氶€夋寜閽姸鎬�
			for(var col in content.goodsList)
			{
				var goods_id   = content.goodsList[col]['goods_id'];
				var product_id = content.goodsList[col]['product_id'];
				var valueVal   = goods_id+"_"+product_id;
				$('input[type="checkbox"][name^=selectCartGoods][value="'+valueVal+'"]').prop("checked",true);
			}
		}

		//鍏ㄩ€夋寜閽姸鎬�
		checkButtonStatus();

		__openUpdateStatus = true;
	});
}

//鎸夐挳閫夋嫨鐘舵€�
function checkButtonStatus()
{
	//鎬婚€夋嫨鎸夐挳
	if($('input[type="checkbox"][name^="selectCartGoods"]:not(:checked)').length > 0)
	{
		$("input[type='checkbox'][name='_selectCartGoods']").prop("checked",false);
	}
	else
	{
		$("input[type='checkbox'][name='_selectCartGoods']").prop("checked",true);
		$("input[type='checkbox'][name^='selectCartGoods']").prop("checked",true);
	}

	//鍟嗗鍒嗙粍鎸夐挳
	$('input[type="checkbox"][name^="selectCartGoods"][name$="[]"]:not(:checked)').each(function()
	{
		var sellerName = $(this).attr('name').replace("[]","");
		$("input[type='checkbox'][name='"+sellerName+"']").prop("checked",false);
	});
}

//鍔犺浇瀹屾瘯鍚庤繍琛孞S
$(function()
{
	//鍗曚釜鎴栫粍鍟嗗搧閫夋嫨鎸夐挳
	$('input[type="checkbox"][name*="selectCartGoods"]').change(function()
	{
		//鑾峰彇璁＄畻淇℃伅
		exceptCartGoodsAjax();
	});
	//鑾峰彇璁＄畻淇℃伅
	refreshCount();
})