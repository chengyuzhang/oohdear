import '../css/public.css';
import '../css/my-custom.css';
import $ from 'n-zepto';

//接口地址
import apiUrl from '../js/config';

//定制列表展示
(function(){
	var oUl=$('.list');
	var str='';

	$.ajax({
		url:apiUrl+'/customization/orders?memberNo=12451221',
		success:function(data){console.log(data);
			data.body.orders.forEach(function(item,index){
				str+='<li>';
		        str+='<div class="status"><span>'+item.createTime+'</span><em>'+item.statusName+'</em></div>';
		        str+='<div class="goods-detail">';
		        str+='<img src="'+item.cover+'" alt="">';
		        str+='<ol><li>款式：'+item.style+'</li><li>材质：'+item.material+'</li><li>尺寸：'+item.size+'</li></ol></div>';
		        str+='<div class="btn-list"><span>支付金额： ￥'+item.price+'</span>';
		        switch(item.statusName){
		        	case '待付款':
		        		str+='<a class="contact" href="javascript:;">联系客服</a><a class="sure" href="javascript:;">立即付款</a>';
		        	break;
					case '待确认':
		        		str+='<a class="contact" href="javascript:;">联系客服</a><a class="sure" href="javascript:;">申请退款</a>';
		        	break;
					case '待制作':
		        		str+='<a class="contact" href="javascript:;">联系客服</a>';
		        	break;
					case '待发货':
		        		str+='<a class="contact" href="javascript:;">联系客服</a>';
		        	break;
					case '已发货':
		        		str+='<a class="contact" href="javascript:;">联系客服</a><a class="sure" href="javascript:;">确认收货</a>';
		        	break;
					case '已完成':
		        		str+='<a class="contact" href="javascript:;">联系客服</a>';
		        	break;
					case '不可做':
		        		str+='<a class="contact" href="javascript:;">联系客服</a><a class="sure" href="javascript:;">申请退款</a>';
		        	break;
					case '待退款':
		        		str+='<a class="contact" href="javascript:;">联系客服</a>';
		        	break;
		        	default:
		        		str+='<a class="contact" href="javascript:;">联系客服</a>';
		        	break;
		        }
		        str+='</div></li>';
			});

			oUl.html(str);
		},
		error:function(err){
			console.log(err);
		}
	});
})();

//定制列表
// (function(){
// 	var orderList=[
// 		{
// 			orderNo:"0",
// 			cover:require('../imgs/order-8.png'),
// 			itemCode:"xxx",
// 			style:"项链",
// 			material:"纯银",
// 			size:"3厘米",
// 			price:"600",
// 			createTime:"2017-03-12 15:20",
// 			statusName:"待付款"
// 		},
// 		{
// 			orderNo:"1",
// 			cover:require('../imgs/order-7.png'),
// 			itemCode:"xxx",
// 			style:"项链",
// 			material:"纯银",
// 			size:"3厘米",
// 			price:"600",
// 			createTime:"2017-03-12 10:14",
// 			statusName:"待确认"
// 		},
// 		{
// 			orderNo:"2",
// 			cover:require('../imgs/order-5.png'),
// 			itemCode:"xxx",
// 			style:"项链",
// 			material:"纯银",
// 			size:"3厘米",
// 			price:"600",
// 			createTime:"2017-03-12 14:24",
// 			statusName:"待制作"
// 		},
// 		{
// 			orderNo:"3",
// 			cover:require('../imgs/order-6.png'),
// 			itemCode:"xxx",
// 			style:"项链",
// 			material:"纯银",
// 			size:"3厘米",
// 			price:"600",
// 			createTime:"2017-03-12 14:24",
// 			statusName:"待发货"
// 		},
// 		{
// 			orderNo:"4",
// 			cover:require('../imgs/order-8.png'),
// 			itemCode:"xxx",
// 			style:"项链",
// 			material:"纯银",
// 			size:"3厘米",
// 			price:"600",
// 			createTime:"2017-03-12 16:24",
// 			statusName:"已发货"
// 		},
// 		{
// 			orderNo:"5",
// 			cover:require('../imgs/order-7.png'),
// 			itemCode:"xxx",
// 			style:"项链",
// 			material:"纯银",
// 			size:"3厘米",
// 			price:"600",
// 			createTime:"2017-03-12 16:24",
// 			statusName:"已完成"
// 		},
// 		{
// 			orderNo:"6",
// 			cover:require('../imgs/order-5.png'),
// 			itemCode:"xxx",
// 			style:"项链",
// 			material:"纯银",
// 			size:"3厘米",
// 			price:"600",
// 			createTime:"2017-03-12 16:24",
// 			statusName:"不可做"
// 		},
// 		{
// 			orderNo:"7",
// 			cover:require('../imgs/order-6.png'),
// 			itemCode:"xxx",
// 			style:"项链",
// 			material:"纯银",
// 			size:"3厘米",
// 			price:"600",
// 			createTime:"2017-03-12 16:24",
// 			statusName:"等退款"
// 		}
// 	];

// 	var oUl=$('.list');
// 	var str='';
// 	orderList.forEach(function(item,index){
// 		str+='<li>';
//         str+='<div class="status"><span>'+item.createTime+'</span><em>'+item.statusName+'</em></div>';
//         str+='<div class="goods-detail">';
//         str+='<img src="'+item.cover+'" alt="">';
//         str+='<ol><li>款式：'+item.style+'</li><li>材质：'+item.material+'</li><li>尺寸：'+item.size+'</li></ol></div>';
//         str+='<div class="btn-list"><span>支付金额： ￥'+item.price+'</span>';
//         switch(item.statusName){
//         	case '待付款':
//         		str+='<a class="contact" href="javascript:;">联系客服</a><a class="sure" href="javascript:;">立即付款</a>';
//         	break;
// 			case '待确认':
//         		str+='<a class="contact" href="javascript:;">联系客服</a><a class="sure" href="javascript:;">申请退款</a>';
//         	break;
// 			case '待制作':
//         		str+='<a class="contact" href="javascript:;">联系客服</a>';
//         	break;
// 			case '待发货':
//         		str+='<a class="contact" href="javascript:;">联系客服</a>';
//         	break;
// 			case '已发货':
//         		str+='<a class="contact" href="javascript:;">联系客服</a><a class="sure" href="javascript:;">确认收货</a>';
//         	break;
// 			case '已完成':
//         		str+='<a class="contact" href="javascript:;">联系客服</a>';
//         	break;
// 			case '不可做':
//         		str+='<a class="contact" href="javascript:;">联系客服</a><a class="sure" href="javascript:;">申请退款</a>';
//         	break;
// 			case '待退款':
//         		str+='<a class="contact" href="javascript:;">联系客服</a>';
//         	break;
//         	default:
//         		str+='<a class="contact" href="javascript:;">联系客服</a>';
//         	break;
//         }
//         str+='</div></li>';
// 	});

// 	oUl.html(str);
// })();