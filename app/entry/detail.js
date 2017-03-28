import '../css/public.css';
import '../css/detail.css';
import $ from 'n-zepto';

//接口地址
import apiUrl from '../js/config';

var vipNo=sessionStorage.getItem("vipNo");
var ID=localStorage.getItem("deciveID");

var temp=window.location.search;
var valObject=url2json(decodeURI(decodeURI(temp)).split('?')[1]);

//故事详情
(function(){
	var oPic=$('.detail>img');
	var oWrap=$('.detail-con');
	var oT=$('.detail-title');
	var oImg=$('.item-head>img.avater');
	var oName=$('.item-head>.name');
	var oTime=$('.item-head>i.time');
	var oSign=$('em.kind');

	$.ajax({
		url:apiUrl+'/article/'+valObject.id,
		success:function(data){console.log(data);
			var con=data.body.content;
			if(con.picture){
				$(oPic).attr('src',con.picture);
			}
			
			$(oImg).attr('src',con.avatar);
			$(oName).html(con.nickName);
			$(oT).html(con.articleName);
			$(oTime).html(con.created);
			$(oSign).html(con.articleLabel);
			$(oWrap).html(con.articleInfo);
			$(oWrap).find('img').attr({
				'width':'auto',
				'height':'auto'
			});
		},
		error:function(err){
			console.log(err);
		}
	});
})();

//留言列表
(function(){
	var oWrap=$('.list');
	var oBtn=$('.comments>button');
	var oRe=$('.refresh');
	var pageNum=1;
	var pageSize=5;
	var str='';
	var timer=null;
	var timer1=null;
	var timer2=null;
	var iNum=0;//记录第一次到最后一条数据时的页数
	var iBtnNum=0;

	$.ajax({
		url:apiUrl+'/message/query?memberNo='+vipNo+'&articleId='+valObject.id+'&pageNum='+pageNum+'&pageSize='+pageSize,
		success:function(data){
			var arr=data.body.messageList;
			if(!arr){return;}
			arr.forEach(function(item,index){
				str+='<li id='+item.id+'><div class="top">';
                str+='<img src="'+item.avatar+'" alt=""><span>'+item.nickname+'</span><i>'+item.createTime+'</i>';
                str+='</div><p>'+item.content+'</p></li>';
			});

			oWrap.html(str);
			if(data.body.end){
				$('.comments>button').css('display','none');
			}
		},
		error:function(err){
			console.log(err);
		}
	});
	oBtn.on('click',function(){
		clearTimeout(timer);
		str='';
		$(oRe).html('正在加载中...');
		$(oRe).css('bottom','.5rem');
		timer=setTimeout(function(){
			var vipNo=sessionStorage.getItem("vipNo");
			var arr=[];
			pageNum++;
			$.ajax({
				url:apiUrl+'/message/query?memberNo='+vipNo+'&articleId='+valObject.id+'&pageNum='+pageNum+'&pageSize='+pageSize,
				success:function(data){console.log('begin:',data);
					arr=data.body.messageList;
					if(arr.length==0){return;}
					if(!data.body.end){
						console.log('arr:',arr);
						arr.forEach(function(item,index){
							str+='<li id='+item.id+'><div class="top">';
			                str+='<img src="'+item.avatar+'" alt=""><span>'+item.nickname+'</span><i>'+item.createTime+'</i>';
			                str+='</div><p>'+item.content+'</p></li>';
						});
						
						oWrap.append(str);
						$(oRe).html('本次加载完成！');
						timer2=setTimeout(function(){
							$(oRe).css('bottom','.1rem');
						},2000);
						iBtnNum=0;
					}else{
						if(!iBtnNum){
							arr.forEach(function(item,index){
								str+='<li id='+item.id+'><div class="top">';
				                str+='<img src="'+item.avatar+'" alt=""><span>'+item.nickname+'</span><i>'+item.createTime+'</i>';
				                str+='</div><p>'+item.content+'</p></li>';
							});

							oWrap.append(str);
						}
						iBtnNum++;
						iNum=pageNum-1;
						pageNum=iNum;
						$(oRe).html('已经到末尾咯~');
						$(oRe).css('bottom',0);
						clearTimeout(timer1);
						timer1=setTimeout(function(){
							$(oRe).css('bottom','.1rem');
						},2000);
					}
				},
				error:function(err){
					console.log(err);
				}
			});
		},1000);
	});
})();

//收藏评论数
(function(){
	var oWordCount=$('.word-count');
	var oCollectCount=$('.collect-count');
	var oCollect=$('.bottom>.l>li:last-of-type>i');
	$.ajax({
		url:apiUrl+'/article/count?articleId='+valObject.id+'&memberNo='+vipNo,
		success:function(data){
			var body=data.body;
			oWordCount.html(body.messageCount);
			oCollectCount.html(body.collectionCount);
			if(!body.isRecord){
				$(oCollect).css('background','url('+require('../imgs/heart.png')+') 0 0/contain no-repeat');
			}else{
				$(oCollect).css('background','url('+require('../imgs/heart-copy.png')+') 0 0/contain no-repeat');
			}
		},
		error:function(err){
			console.log(err);
		}
	});
})();

//收藏评论
(function(){
	var oWord=$('.bottom>.l>li:first-of-type>i');
	var oCollect=$('.bottom>.l>li:last-of-type>i');
	var oCollectCount=$('.bottom>.l>li:first-of-type>span');//留言数容器
	var oWordCount=$('.bottom>.l>li:last-of-type>span');//点赞数容器
	var oCancel=$('.cancel');
	var oOk=$('.ok');
	var oBg=$('.words-box-bg');

	//收藏与否
	oCollect.on('click',function(){
		var vipNo=sessionStorage.getItem("vipNo");
		if(parseInt(vipNo)){
			$.ajax({
				url:apiUrl+'/collection/add?memberNo='+vipNo+'&articleId='+valObject.id,
				success:function(data){
					var body=data.body;
					if(!body.isRecord){
						$(oCollect).css('background','url('+require('../imgs/heart.png')+') 0 0/contain no-repeat');
					}else{
						$(oCollect).css('background','url('+require('../imgs/heart-copy.png')+') 0 0/contain no-repeat');
					}
					$(oWordCount).text(body.signCount);
				},		
				error:function(err){
					console.log(err);
				}
			});
		}else{
			login();
		}
	});

	//点击留言按钮
	oWord.on('click',function(){
		var vipNo=sessionStorage.getItem("vipNo");
		if(parseInt(vipNo)){
			$(oBg).css('display','block');
			$(oBg).find('textarea').val('');
			setTimeout(function(){
				$(oBg).css('opacity',1);
				$(oBg).find('textarea').get(0).focus();
			},50);
		}else{
			login();
		}
	});

	//取消留言框
	oCancel.on('click',function(){
		$(oBg).css('opacity',0);
		setTimeout(function(){
			$(oBg).css('display','none');
			$(oBg).find('textarea').get(0).blur();
		},500);
	});

	//发送留言
	oOk.on('click',function(){
		var val=$(oBg).find('textarea').val();
		var vipNo=sessionStorage.getItem("vipNo");
		$.ajax({
			type:'post',
			url:apiUrl+'/message/add',
			data:{
				memberNo:vipNo,
				articleId:valObject.id,
				content:val
			},
			success:function(data){
				if(data.head.code){
					console.log('数据返回错误！');
					return;
				}
				if(data.body.addStatus){
					var oWrap=$('.list');
					var str='';
					$.ajax({
						url:apiUrl+'/message/query?memberNo='+vipNo+'&articleId='+valObject.id+'&pageNum='+1+'&pageSize='+5,
						success:function(data){console.log('end:',data);
							var arr=data.body.messageList;
							if(!arr){return;}
							arr.forEach(function(item,index){
								str+='<li id='+item.id+'><div class="top">';
				                str+='<img src="'+item.avatar+'" alt=""><span>'+item.nickname+'</span><i>'+item.createTime+'</i>';
				                str+='</div><p>'+item.content+'</p></li>';
							});

							oWrap.html(str);
						},
						error:function(err){
							console.log(err);
						}
					});

					$(oCollectCount).text(data.body.messageCount);
					$(oBg).css('opacity',0);
					setTimeout(function(){
						$(oBg).css('display','none');
						$(oBg).find('textarea').get(0).blur();
					},500);
				}
			},
			error:function(err){
				console.log(err);
			}
		});
	});
})();

//关闭注册层
(function(){
	var oP=$('.opacity');
	var oX=$('.opacity>header a');
	oX.on('click',function(){
		oP.css('opacity',0);
		setTimeout(function(){
			oP.css('display','none');
		},500);
		return false;
	});
})();

function login(){
	//点击注册
	var oP=$('.opacity');
	var oImg=$('.login>li>img');

	$(oImg).on('click',function(){
		$(this).get(0).src=apiUrl+'/pic?t='+Date.now()+'&random='+ID;
	});

	oP.css('display','block');
	setTimeout(function(){
		oP.css('opacity',1);
		$(oImg).get(0).src=apiUrl+'/pic?t='+Date.now()+'&random='+ID;
	},50);
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
						if(data.head.code){
							alert(data.head.message);
							$(oImg).get(0).src=apiUrl+'/pic?t='+Date.now()+'&random='+ID;
							return;
						}
						var vipNo=data.body.memberNo;
						sessionStorage.setItem("vipNo",vipNo);
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
}

function url2json(str){
	var json={};
	var arr=str.split('&');
	for(var i=0; i<arr.length; i++){
		var arr2=arr[i].split('=');
		json[arr2[0]]=arr2[1];
	}
	return json;
};