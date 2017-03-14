import '../css/public.css';
import '../css/center.css';
import $ from 'n-zepto';

//接口地址
import apiUrl from '../js/config';
//个人中心展示
(function(){
	var oImg=$('.detail>img');
	var oH=$('.detail>h3');
	var oP=$('.detail>p');

	$.ajax({
		url:apiUrl+'/member/center?memberNo=12451221',
		success:function(data){console.log(data);
			$(oImg).attr('src',data.body.avatar);
			$(oH).html(data.body.nickname);
			$(oP).html(data.body.mobile);
		},
		error:function(err){
			console.log(err);
		}
	});
})();