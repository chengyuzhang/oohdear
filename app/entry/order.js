import '../css/public.css';
import '../css/order.css';
import $ from 'n-zepto';

//接口地址
import apiUrl from '../js/config';

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