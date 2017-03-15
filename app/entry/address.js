import '../css/public.css';
import '../css/address.css';
import $ from 'n-zepto';
//接口地址
import apiUrl from '../js/config';

var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;

//获取验证码验证手机号
(function(){
	var oBtn=$('.get-code');
	var num=10;
	var timer=null;
	var iBtn=true;

	oBtn.on('click',function(){
		if(!iBtn){return}
		var val=$('.order-tel>input').val();console.log(val);
		if(!reg.test(val)){ 
		    alert('请输入有效的手机号码'); 
		    return false; 
		}
		timer=setInterval(function(){
			num--;
			oBtn.html(num+'s');
			oBtn.css({
				'color':'#fff',
				'background':'#CB68A4',
				'font-size':'.18rem'
			});
			if(num<0){
				clearInterval(timer);
				oBtn.html('重新获取');
				iBtn=true;
				num=10;
				oBtn.css({
					'color':'#666',
					'background':'#D8D8D8',
					'font-size':'.12rem'
				});
			}
		},1000);
		iBtn=false;
	});
})();

//保存并使用
(function(){
	var oLogin=$('.save');

	oLogin.on('click',function(){
		var sOrder=$('.order>input').val();
		var iTel1=$('.order-tel>input').val();
		var sGeter=$('.geter>input').val();
		var iTel2=$('.geter-tel>input').val();
		var iCode=$('.code>input').val();
		var sLocalAddress=$('.local-address>input').val();
		var sDetialAddress=$('.detial-address>input').val();
		
		if(sOrder==''||sGeter==''||iTel1==''||sLocalAddress==''||iTel2==''||iCode==''||sDetialAddress==''){
			alert('手机号或验证码不能为空！');
		}else{
			if(!reg.test(iTel1)||!reg.test(iTel2)){
			    alert('请输入有效的手机号码');
			    return false;
			}

			$.ajax({
				type:'post',
				url:apiUrl+'/register',
				data:{
					nickname:sOrder,
					mobile:iTel1,
					captcha:iCode,
					consignee:sGeter,
					consigneeMobile:iTel2,
					zone:sLocalAddress,
					detail:sDetialAddress
				},
				success:function(data){
					var vipNo=data.body.memberNo;
					sessionStorage.setItem("vipNo", vipNo);
					window.location.href='order.html';
				},
				error:function(err){
					console.log(err);
				}
			});
		}
	});
})();
