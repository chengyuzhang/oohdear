import '../css/public.css';
import '../css/custom.css';
import $ from 'n-zepto';

//接口地址
import apiUrl from '../js/config';

$.ajax({
	url:apiUrl+'/customization/price?itemCode=AaB',
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	}
});


//弹出选择层
(function(){
	var oBtn=$('.order-btn');
	var oClose=$('.close');
	var oWrap=$('.order-wrap');
	oBtn.on('click',function(){
		oWrap.css('display','block');
		setTimeout(function(){
			oWrap.css('opacity',1);
		},50);
	});
	oClose.on('click',function(){
		oWrap.css('opacity',0);
		setTimeout(function(){
			oWrap.css('display','none');
		},600);
	});
})();

//选择照片及显示
(function(){
	var oBtn=$('.upload');
	oBtn.on('change',function(){
		var file =this.files[0];
		var reader = new FileReader();
		reader.onload = function(e){
			$('.upload-photo>.upload-btn>img').attr('src',e.target.result);
			$('.upload-photo>.upload-con>textarea').css('display','block');
			$('.upload-photo>.upload-btn>p').css('display','none');
		} 
		reader.readAsDataURL(file);
	});
})();

//选择详细属性弹层
(function(){
	var aData1=['链长40cm','链长50cm'];
	var aData2=['耳钉','耳环'];
	var aData3=['白色','黄色','玫瑰色'];

	var oBtn1=$('.necklace');
	var oBtn2=$('.earring');
	var oBtn3=$('.block');

	opacity(oBtn1);
	opacity(oBtn2);
	opacity(oBtn3);

	function opacity(btn){
		var oP=$('.opacity');
		var opCon=$('.opacity-con');
		var oH2=$('.opacity-con>h2');
		var oUl=$('.opacity-con>ul');

		var timer1=null;
		var timer2=null;
		var timer3=null;

		//选择出现弹层
		btn.on('click',function(){
			oP.css('display','block');
			timer1=setTimeout(function(){
				oP.css('opacity',1);
			},50);
			timer2=setTimeout(function(){
				opCon.css('-webkit-transform','translate3d(0,0,0)');
			},100);
			//生成对应的选项
			var str='';
			switch($(this).attr('data-type')){
				case 'necklace':
					aData1.forEach(function(item,index){
						str+='<li>'+item+'</li>';
					});
					oH2.html('请选择项链长度');
				break;
				case 'earring':
					aData2.forEach(function(item,index){
						str+='<li>'+item+'</li>';
					});
					oH2.html('请选择项耳饰款式');
				break;
				case 'block':
					aData3.forEach(function(item,index){
						str+='<li>'+item+'</li>';
					});
					oH2.html('请选择项18k金颜色');
				break;
			}
			oUl.html(str);
			selectItem();
		});

		//点击遮罩后弹层消失
		oP.on('click',function(ev){
			opCon.css('-webkit-transform','translate3d(0,6rem,0)');
			timer1=setTimeout(function(){
				oP.css('opacity',0);
			},100);
			timer2=setTimeout(function(){
				oP.css('display','none');
				opCon.css('-webkit-transform','translate3d(0,-6rem,0)');
			},600);
		});

		//选择样式赋值并且弹层消失
		function selectItem(){
			var aLi=$('.opacity-con>ul>li');
			var oText=$(btn).find('p');
			aLi.forEach(function(item,index){
				$(item).on('click',function(){
					var val=$(this).html();
					switch($(btn).attr('data-type')){
						case 'necklace':
							oText.html('项链('+val+')');
						break;
						case 'earring':
							oText.html(val);
						break;
						case 'block':
							oText.html('18k金('+val+')');
						break;
					}
				});
			});
		}
	}
})();
