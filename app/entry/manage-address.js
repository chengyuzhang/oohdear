import '../css/public.css';
import '../css/manage-address.css';
import $ from 'n-zepto';

//接口地址
import apiUrl from '../js/config';
//访问展示接口
(function(){
	var oList=$('.list');
	var vipNo=sessionStorage.getItem("vipNo");
	$.ajax({
		url:apiUrl+'/address?memberNo='+vipNo,
		success: function(data){
			
	    	var arr=data;

	    	if(!arr.length){
	    		$('.wrap').addClass('no');
	    		$('.wrap').append('<p style="margin-top:3.5rem; color:#999; text-align:center;">暂无收货地址，快去添加吧~</p>');
	    	}

	    	var str='';
	    	arr.forEach(function(item,index){
	    		str+='<li id="'+item.id+'">';
                str+='<div class="people"><span>收货人：'+item.consignee+'</span><em>'+item.mobile+'</em></div>';
                str+='<p>详细地址：'+item.zone.split('/')[0]+item.zone.split('/')[1]+item.detail+'</p>';

                //默认地址
                if(item.defaultAddr){
                	str+='<div class="btn-list"><div class="default"><i class="active"></i><span>设为默认</span></div>';
                }else{
                	str+='<div class="btn-list"><div class="default"><i class=""></i><span>设为默认</span></div>';
                }
                
                str+='<div class="delete"><i></i><span>删除</span></div>';
                str+='<div class="edit" data-zone="'+item.zone+'" data-address="'+item.detail+'"><i></i><span>编辑</span></div>';
                if(sessionStorage.getItem("step")=="true"){
                	str+='</div><a href="order.html?vipId='+item.id+'"></a></li>';
                }
                str+='</div><a href="#"></a></li>';
	    	});
	    	oList.html(str);

			//设置默认地址、编辑、删除
			(function(){
				var aItem=$('.list>li');
				var aDefault=$('.list>li .default');
				var aEdit=$('.list>li .edit');
				var aDel=$('.list>li .delete');
				var oWrap=$('.opacity');
				var oBtn=$('.opacity .con li:last-of-type');
				var oCancel=$('.opacity .con li:first-of-type');
				//设置默认地址
				aDefault.forEach(function(item,index){
					$(item).on('click',function(){
						var id=$(aItem).get(index).id;
						
						$.ajax({
							url:apiUrl+'/address/default?memberNo='+vipNo+'&id='+id,
							success:function(data){console.log(data);
								if(data){
									aDefault.forEach(function(item1,index1){
										$(item1).find('i').removeClass('active');
									});
									$(item).find('i').addClass('active');
								}
							},
							error:function(err){
								console.log(err);
								alert('设置默认地址失败！');
							}
						});

					});
				});

				//删除
				aDel.forEach(function(item,index){
					$(item).on('click',function(){

						alertC(index);

						
					});
				});


				//窗口的确认
				oBtn.on('click',function(){
					$.ajax({
						url:apiUrl+'/address/'+aItem[$(oBtn).get(0).dataset.index].id+'/delete',
						success:function(data){
							
							if(data){
								cancel();
								aItem[$(oBtn).get(0).dataset.index].remove();
							}
						},
						error:function(err){
							console.log(err);
						}
					});
				});

				//点击取消窗口消失
				oCancel.on('click',function(){
					cancel();
				});

				//弹出窗口函数
				function alertC(index){
					oBtn.attr('data-index',index);
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
			})();

			//编辑地址跳转
			(function(){
				var aBtn=$('.edit');

				aBtn.forEach(function(item,index){
					$(item).on('click',function(){
						var li=$(this).parent().parent();
						var name='';
						var tel='';
						var zone='';
						var address='';
						var id='';
						
						var moveData={
							name:$(li).find('.people span').html().split('：')[1],
							tel:$(li).find('.people em').html(),
							zone:$(this).get(0).dataset.zone,
							address:$(this).get(0).dataset.address,
							id:$(li).get(0).id
						}
						
						window.location.href=encodeURI(encodeURI('edit-address.html?'+json2url(moveData)));
					});
				});
			})();

	  	},
	  	error:function(err){
	  		console.log('err:',err);
        } 
	});
})();

function json2url(json){
	var arr=[];
	for(var name in json){
		arr.push(name+'='+json[name]);
	}
	return arr.join('&');
}


