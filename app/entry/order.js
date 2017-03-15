import '../css/public.css';
import '../css/order.css';
import $ from 'n-zepto';

//接口地址
import apiUrl from '../js/config';

//展示收货地址
(function(){
	var oGeter=$('.geter span');
	var oTel=$('.geter em');
	var oAddress=$('.detail-adress p');

	$.ajax({
		type:'get',
		url:apiUrl+'/address?memberNo='+sessionStorage.getItem('vipNo'),
		success:function(data){
			var data=data[0];
console.log(data);
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