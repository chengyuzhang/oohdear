import '../css/public.css';
import '../css/login.css';
import $ from 'n-zepto';
//接口地址
import apiUrl from '../js/config';
var ID=localStorage.getItem("deciveID");

var reg = /^((1[0-9]{1})+\d{9})$/; 
//验证手机号获取验证码
(function(){
	var oBtn=$('.login>li>button');
	var num=10;
	var timer=null;
	var iBtn=true;

	oBtn.on('click',function(){
		if(!iBtn){return}
		var val=$('.tel').val();
		if(!reg.test(val)){ 
		    alert('请输入有效的手机号码'); 
		    return false; 
		}
		timer=setInterval(function(){
			num--;
			oBtn.html(num+'s');
			oBtn.css({
				'color':'#999',
				'border':'1px solid #999'
			});
			if(num<0){
				clearInterval(timer);
				oBtn.html('重新获取');
				iBtn=true;
				num=10;
				oBtn.css({
					'color':'#666',
					'border':'1px solid #666'
				});
			}
		},1000);
		iBtn=false;
	});
})();

//登录
(function(){
	var oLogin=$('.login-btn');

	oLogin.on('click',function(){
		var iSign=$('.sign').val();
		var iTel=$('.tel').val();
		var iCode=$('.code').val();
		if(iTel==''||iCode==''){
			alert('手机号或验证码不能为空！');
		}else{
			$.ajax({
				type:'post',
				url:apiUrl+'/login',
				data:{
					mobile:iTel,
					captcha:iCode,
					captchaNo:iSign,
					random:ID
				},
				success:function(data){
					console.log(data);
					var vipNo=data.body.memberNo;
					sessionStorage.setItem("vipNo",vipNo);
					alert('注册成功！');
				},
				error:function(err){
					console.log(err);
				}
			});
		}
	});
})();
