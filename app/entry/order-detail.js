import '../css/public.css';
import '../css/order-detail.css';
import $ from 'n-zepto';

//接口地址
import apiUrl from '../js/config';
(function(){
	var avatar=$('.order-detail>.goods-detail>img');
	var style=$('.style');
	var material=$('.material');
	var size=$('.size');
	var price=$('.price');
	var orderNum=$('.order-num');
	var dealTime=$('.deal-time');
	var geter=$('.geter');
	var tel=$('.tel');
	var address=$('.address');
	var expressName=$('.express-name');
	var expressNum=$('.express-num');
	var expressCon=$('.express-step ul');
	var str='';

	var vipNo=sessionStorage.getItem("vipNo");

	$.ajax({
		url:apiUrl+'/customization/order/detail?memberNo='+vipNo+'&orderNo=345333',
		success:function(data){console.log(data);
			var order=data.body.order;
			var address1=data.body.address;
			var express=data.body.express;

			$(avatar).attr('src',order.cover);
			$(style).text(order.goodsStyle);
			$(material).text(order.goodsMaterial);
			$(size).text(order.goodsSize);
			$(price).text(order.orderPrice);
			$(orderNum).text(order.orderNo);
			$(dealTime).text(order.created);

			$(geter).text(address1.consignee);
			$(tel).text(address1.mobile);
			$(address).text(address1.detail);

			$(expressName).text(express.company);
			$(expressNum).text(express.no);

			express.infos.forEach(function(item,index){
				if(index==0){
					str+='<li class="active"><div class="line-dot"><i></i><span></span></div>';
				}else{
					str+='<li><div class="line-dot"><i></i><span></span></div>';
				}
                str+='<div class="status-detail"><p>'+item.content+'</p><p>'+item.createTime+'</p></div>';
                str+='</li>';
			});

			expressCon.html(str);
		},
		error:function(err){
			console.log(err);
		}
	});
})();