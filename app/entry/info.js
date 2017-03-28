import '../css/public.css';
import '../css/info.css';
import $ from 'n-zepto';

//接口地址
import apiUrl from '../js/config';
//个人信息展示
(function(){
	var oImg=$('.list .avatar');
	var oName=$('.list .nickname');
	var oSex=$('.list .sex ');
	var oTel=$('.list .tel ');
	var vipNo=sessionStorage.getItem("vipNo");

	$.ajax({
		url:apiUrl+'/member?memberNo='+vipNo,
		success:function(data){console.log(data);
			if(data.head.code){
				console.log('数据返回错误！');
				return;
			}
			$(oImg).attr('src',data.body.user.avatar);
			$(oName).val(data.body.user.nickname);
			$(oSex).html(data.body.user.gender);
			$(oTel).html(data.body.user.mobile);
		},
		error:function(err){
			console.log(err);
		}
	});
})();

//修改资料
(function(){
	var oBtn=document.querySelector('.save');
	var oMyForm = new FormData();

	oBtn.addEventListener('click',function(){
		var oName=$('.nickname').val();
		var oSex=$('.sex').html();
		var oImg=$('.list>li>input.upload').get(0).files[0];

		var vipNo=sessionStorage.getItem("vipNo");

		oMyForm.append('test',oImg);
		oMyForm.append('nickname',oName);
		oMyForm.append('gender',oSex);
		oMyForm.append('memberNo',vipNo);

		$.ajax({
			type:'post',
			url:apiUrl+'/member/edit',
			data:oMyForm,
			processData : false,
            contentType : false,  
			success:function(data){
				if(data){
					alert('保存成功！');
				}
			},
			error:function(err){
				console.log(err);
			}
		});
	},false);
})();

//弹出选择层
(function(){
	var oBtn=$('.list>li:nth-of-type(3)');
	var oI=$('.list>li:nth-of-type(3)>i');
	var aLi=$('.opacity>.wrap>ul>li');
	var oWrap=$('.opacity');

	//打开弹层
	oBtn.on('click',function(){
		oWrap.css('display','block');
		setTimeout(function(){
			oWrap.css('opacity',1);
		},50);
	});

	//选择后关闭弹层
	aLi.on('click',function(){
		oI.text($(this).text());
		oWrap.css('opacity',0);
		setTimeout(function(){
			oWrap.css('display','none');
		},500);
	});
})();

//选择照片及显示
(function(){
	var oBtn=$('.upload');

	oBtn.on('change',function(){
		var file =this.files[0];
		var reader = new FileReader();
		reader.onload = function(e){
			$('.list>li>i>img').attr('src',e.target.result);
		} 
		reader.readAsDataURL(file);
	});
})();
