import '../css/public.css';
import '../css/order.css';
import $ from 'n-zepto';

//接口地址
import apiUrl from '../js/config';
if(sessionStorage.getItem("cache")){
	sessionStorage.getItem("cache",);
	window.location.reload();
}


sessionStorage.setItem("step","true");

//展示收货地址
(function(){
	var oGeter=$('.geter span');
	var oTel=$('.geter em');
	var oAddress=$('.detail-adress p');
	var temp=window.location.search;
	var valObject={};

	if(temp){console.log('xx:',temp);
		valObject=url2json(temp.split('?')[1]);//如果才登录
		//sessionStorage.setItem("addressID",data.address.id);
	}else{console.log(1);
		valObject.vipId=0;//如果早前登录过
	}
	
	var vipNo=sessionStorage.getItem("vipNo");

	$.ajax({
		type:'get',
		url:apiUrl+'/address/detail?memberNo='+vipNo+'&addressId='+valObject.vipId,
		success:function(data){console.log(data);
			if(data.head.code){
				console.log('数据返回错误！');
				return;
			}
			var data=data.body.address;
			sessionStorage.setItem("addressID",data.id);
			oGeter.html('收货人：'+data.consignee);
			oTel.html(data.mobile);
			oAddress.html('详细地址：'+data.zone+data.detail);
			if($(oAddress).height()<20){
				$(oAddress).css('line-height','.3rem');
			}
		},
		error:function(err){
			console.log(err);
		}
	});
})();

//支付方式
(function(){
	var aLi=$('.pay-way li');
	var aEm=$('.pay-way li em');

	aLi.forEach(function(item,index){
		$(item).on('click',function(){
			aLi.forEach(function(item1,index1){
				item1.dataset.btn='false';
				$(aEm[index1]).css('background','url('+require('../imgs/space.png')+') no-repeat');
				$(aEm[index1]).css('background-size','contain');
			});
			this.dataset.btn='true';
			$(aEm[index]).css('background','url('+require('../imgs/no-space.png')+') no-repeat');
			$(aEm[index]).css('background-size','contain');
		});
	});
})();

//结算
(function(){
	var oBtn=$('.pay>button');

	oBtn.on('click',function(){

		$.ajax({
			type:'post',
			url:apiUrl+'/order',
			data:{
				memberNo:sessionStorage.getItem("vipNo"),
				addressId:sessionStorage.getItem("addressID"),
				payType:1,
				comment:$('.pay-detail>ul>li>textarea').val(),
				cover:sessionStorage.getItem("picUrl"),
				styleCode:sessionStorage.getItem("style"),
				materialCode:sessionStorage.getItem("material"),
				sizeCode:sessionStorage.getItem("size"),
				style:sessionStorage.getItem("goods-style"),
				material:sessionStorage.getItem("goods-material"),
				size:sessionStorage.getItem("goods-size"),
				lettering:sessionStorage.getItem("letter-words")
			},
			success:function(data){
				if(data.head.code){
					console.log('数据返回错误！');
					return;
				}

				console.log('data:',data);
				$.ajax({
					type:'post',
					url:apiUrl+'/customization/order/pay',
					data:{
						orderNo:data.body.orderNo
					},
					success:function(data){
						if(data.head.code){
							console.log('数据返回错误！');
							return;
						}
						var form=data.body.form;
						$('body').append(form);
						console.log('data:',data);
					},
					error:function(err){
						console.log(err);
					}
				});
			},
			error:function(err){
				console.log(err);
			}
		});

	});

})();

//展示定制商品详情
(function(){
	var oStyle=$('.pic-info>ul>li:first-of-type>em');
	var oMaterial=$('.pic-info>ul>li:nth-of-type(2)>em');
	var oSize=$('.pic-info>ul>li:nth-of-type(3)>em');
	var oLetter=$('.pic-info>ul>li:last-of-type>em');
	var oImg=$('.pic-info>img');
	var oText=$('.pay-detail>ul>li>textarea');

	oStyle.text(sessionStorage.getItem('goods-style'));
	oMaterial.text(sessionStorage.getItem('goods-material'));
	oSize.text(sessionStorage.getItem('goods-size'));
	oImg.attr('src',sessionStorage.getItem('picUrl'));
	oText.val(sessionStorage.getItem('comment'));
	oLetter.text(sessionStorage.getItem('letter-words'));

	$('.pay-detail>ul>li>em').text(sessionStorage.getItem("order-money"));
	$('.pay>span').text('合计:'+sessionStorage.getItem("order-money"));
})();
function url2json(str){
	var json={};
	var arr=str.split('&');
	for(var i=0; i<arr.length; i++){
		var arr2=arr[i].split('=');
		json[arr2[0]]=arr2[1];
	}
	return json;
};