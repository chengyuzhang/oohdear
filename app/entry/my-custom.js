import '../css/public.css';
import '../css/my-custom.css';
import $ from 'n-zepto';

//接口地址
import apiUrl from '../js/config';

//定制列表展示
(function(){
	var oUl=$('.list');
	var str='';
	var vipNo=sessionStorage.getItem("vipNo");

	$.ajax({
		url:apiUrl+'/customization/orders?memberNo='+vipNo,
		success:function(data){
			if(data.head.code){
				console.log('数据返回错误！');
				return;
			}
			if(!data.body.orders.length){
	    		$('.wrap').addClass('no');
	    		$('.wrap').append('<p style="margin-top:3.5rem; color:#999; text-align:center;">您还没有订单，快去订制吧~</p><a style="display:block; width:.89rem; margin-left:1.43rem; margin-top:.4rem; border: 1px solid #CB68A4; color:#CB68A4; text-align:center; line-height:.3rem; border-radius:5px; font-size:.14rem;" href=custom.html>我要定制</a>');
			}

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
