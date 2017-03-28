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
		        str+='<div class="status"><span>'+item.createTime+'</span><em data-index='+index+'>'+item.statusName+'</em></div>';
		        str+='<div class="goods-detail" data-order="'+item.orderNo+'">';
		        str+='<img src="'+item.cover+'" alt="">';
		        str+='<ol><li>款式：'+item.style+'</li><li>材质：'+item.material+'</li><li>尺寸：'+item.size+'</li></ol></div>';
		        str+='<div class="btn-list"><span>支付金额： ￥'+item.price+'</span>';
		        switch(item.statusName){
		        	case '待付款':
		        		str+='<a class="contact" href="javascript:;">联系客服</a><a class="sure" href="javascript:;" data-order='+item.orderNo+'>立即付款</a>';
		        	break;
					case '待确认':
		        		str+='<a class="contact" href="javascript:;">联系客服</a><a class="refund" href="javascript:;" data-order='+item.orderNo+' data-index='+index+'>申请退款</a>';
		        	break;
					case '待制作':
		        		str+='<a class="contact" href="javascript:;">联系客服</a>';
		        	break;
					case '待发货':
		        		str+='<a class="contact" href="javascript:;">联系客服</a>';
		        	break;
					case '已发货':
		        		str+='<a class="contact" href="javascript:;">联系客服</a><a class="ok" href="javascript:;" data-order='+item.orderNo+' data-index='+index+'>确认收货</a>';
		        	break;
					case '已完成':
		        		str+='<a class="contact" href="javascript:;">联系客服</a>';
		        	break;
					case '不可做':
		        		str+='<a class="contact" href="javascript:;">联系客服</a><a class="refund" href="javascript:;" data-order='+item.orderNo+' data-index='+index+'>申请退款</a>';
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

			//点击进入定制详情
			(function(){
				var aDetail=$('.goods-detail');

				aDetail.forEach(function(item,index){
					$(item).on('click',function(){
						window.location.href='order-detail.html?orderNo='+$(this).get(0).dataset.order;
					});
				});
			})();

			//结算
			(function(){
				var aBtn=document.querySelectorAll('.sure');

				aBtn.forEach(function(item,index){
					$(item).on('click',function(){
						order($(item).get(0).dataset.order);
					});
				});

				function order(orderNum){
					$.ajax({
						type:'post',
						url:apiUrl+'/customization/order/pay',
						data:{
							orderNo:orderNum
						},
						success:function(data){
							if(data.head.code){
								console.log('数据返回错误！');
								return;
							}
							var form=data.body.form;
							$('body').append(form);
						},
						error:function(err){
							console.log(err);
						}
					});
				}
			})();


			(function(){
				var aBtn=$('.refund');
			})();

			//申请退款
			(function(){
				var aLi=$('.list>li');
				var aBtn=$('.refund');	
				var oWrap=$('.opacity');
				var oBtn=$('.opacity .con li:last-of-type');
				var oCancel=$('.opacity .con li:first-of-type');
				var aEm=$('.list .status>em');
				aBtn.forEach(function(item,index){
					$(item).on('click',function(){
						$('.opacity .con').addClass('reason');
						alertC($(item).get(0).dataset.order,$(item).get(0).dataset.index,$(item).get(0).className);
					});
				});

				function refund(orderNum,vipNo,index){
					$.ajax({
						type:'post',
						url:apiUrl+'/customization/order/refund',
						data:{
							orderNo:orderNum,
							memberNo:vipNo
						},
						success:function(data){
							if(data.head.code){
								console.log('数据返回错误！');
								return;
							}
							if(data.body.status){
								$(aEm).eq(index).text('待退款');
								$(aLi).eq(index).find('.refund').css('display','none');
								cancel();
							}
							console.log('data:',data);
						},
						error:function(err){
							console.log(err);
						}
					});
				}

				//弹出窗口函数
				function alertC(s,index,type){
					oBtn.attr('data-order',s);
					oBtn.attr('data-index',index);
					oBtn.attr('data-type',type);
					oWrap.css('display','block');
					setTimeout(function(){
						oWrap.css('opacity',1);
					},50);
				}

				//窗口消失函数
				function cancel(){
					oWrap.css('opacity',0);
					setTimeout(function(){
						oWrap.css('display','none');
					},500);
				}

				//窗口的确认
				oBtn.on('click',function(){
					var vipNo=sessionStorage.getItem("vipNo");
					if($(this).get(0).dataset.type=='refund'){
						refund($(this).get(0).dataset.order,vipNo,$(this).get(0).dataset.index);
					}
				});

				//点击取消窗口消失
				oCancel.on('click',function(){
					cancel();
				});
			})();

			//确认收货
			(function(){
				var aLi=$('.list>li');
				var aBtn=$('.ok');
				var oWrap=$('.opacity');
				var oBtn=$('.opacity .con li:last-of-type');
				var oCancel=$('.opacity .con li:first-of-type');
				var aEm=$('.list .status>em');
				aBtn.forEach(function(item,index){
					$(item).on('click',function(){
						$('.opacity .con').removeClass('reason');
						alertC($(item).get(0).dataset.order,$(item).get(0).dataset.index,$(item).get(0).className);
					});
				});

				//点击确认请求接口
				function ok(orderNum,vipNo,index){
					$.ajax({
						type:'post',
						url:apiUrl+'/customization/order/confirm',
						data:{
							orderNo:orderNum,
							memberNo:vipNo
						},
						success:function(data){
							if(data.head.code){
								console.log('数据返回错误！');
								return;
							}
							if(data.body.status){
								$(aEm).eq(index).text('已完成');
								$(aLi).eq(index).find('.ok').css('display','none');
								cancel();
							}
						},
						error:function(err){
							console.log(err);
						}
					});
				}

				//弹出窗口函数
				function alertC(s,index,type){
					oBtn.attr('data-order',s);
					oBtn.attr('data-index',index);
					oBtn.attr('data-type',type);
					oWrap.css('display','block');
					setTimeout(function(){
						oWrap.css('opacity',1);
					},50);
				}

				//窗口消失函数
				function cancel(){
					oWrap.css('opacity',0);
					setTimeout(function(){
						oWrap.css('display','none');
					},500);
				}

				//窗口的确认
				oBtn.on('click',function(){
					var vipNo=sessionStorage.getItem("vipNo");
					if($(this).get(0).dataset.type=='ok'){
						ok($(this).get(0).dataset.order,vipNo,$(this).get(0).dataset.index);
					}
				});

				//点击取消窗口消失
				oCancel.on('click',function(){
					cancel();
				});
			})();
		},
		error:function(err){
			console.log(err);
		}
	});
})();

