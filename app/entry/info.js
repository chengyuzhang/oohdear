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

	$.ajax({
		url:apiUrl+'/member?memberNo=12451221',
		success:function(data){console.log(data);
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

		
		oMyForm.append('test',oImg);
		oMyForm.append('nickname',oName);
		oMyForm.append('gender',oSex);
		oMyForm.append('memberNo',12451221);


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


/*



这是一个自己项目所需，用于多页面结合webpack打包（执行js\css分离打包）的例子。 ####国际惯例: ######下载本示例后 npm install ####本示例有两个主要文件夹: ######1.app 用于存放打包前的项目所有文件，就是说这里的文件都是写项目时的全部文件 ######2.build 用于存放打包后的项目所有文件，就是说这里的文件是可以提交给后台上项目的文件

####使用方法： ######1.npm start 用于项目在编写过程中的测试

######2.npm run start:prod 用于打包项目文件


*/