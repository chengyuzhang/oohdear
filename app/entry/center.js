import '../css/public.css';
import '../css/center.css';
import $ from 'n-zepto';

//接口地址
import apiUrl from '../js/config';
//个人中心展示
(function(){
	var iBtn=true;//控制刚登录时头像显示开关
	var vipNo=sessionStorage.getItem("vipNo");
	if(vipNo){
		show(vipNo,iBtn);
	}
})();

//点击注册
(function(){
	var oBtn=$('.detail');
	var oP=$('.opacity');
	oBtn.on('click',function(){
		var vipNo=sessionStorage.getItem("vipNo");
		if(vipNo){return;}
		oP.css('display','block');
		setTimeout(function(){
			oP.css('opacity',1);
		},50);
	});
})();


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
		var oP=$('.opacity');
		var iBtn=false;//控制刚登录时头像显示开关
		console.log(iSign,':',iCode,':',iTel);

		if(iTel==''||iCode==''){
			alert('手机号或验证码不能为空！');
		}else{
			$.ajax({
				type:'post',
				url:apiUrl+'/login',
				data:{
					mobile:iTel,
					captcha:iCode,
					captchaNo:iSign
				},
				success:function(data){
					console.log('data:',data);
					if(data.head.code){
						console.log('数据返回错误！');
						return;
					}
					var vipNo=data.body.memberNo;
					sessionStorage.setItem("vipNo",vipNo);
					show(vipNo);
					alert('注册成功！');
					
					oP.css('opacity',0);
					setTimeout(function(){
						oP.css('display','none');
					},510);

				},
				error:function(err){
					console.log(err);
				}
			});
		}
	});
})();

function show(vipNo,iBtn){
	var oImg=$('.detail>img');
	var oH=$('.detail>h3');
	var oP=$('.detail>p');
	$.ajax({
		url:apiUrl+'/member/center?memberNo='+vipNo,
		success:function(data){console.log('show:',data);
			if(data.head.code){
				console.log('数据返回错误！');
				return;
			}
			if(iBtn){
				$(oImg).attr('src',data.body.avatar);
			}
			$(oH).html(data.body.nickname);
			$(oP).html(data.body.mobile);
		},
		error:function(err){
			console.log(err);
		}
	});
}
