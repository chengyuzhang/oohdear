import '../css/public.css';
import '../css/custom.css';
import $ from 'n-zepto';

//接口地址
import apiUrl from '../js/config';

//价格
(function(){
	var oNeck=$('.necklace');
	var oBrooch=$('.brooch');
	var oEarring=$('.earring');
	var oSilver=$('.silver');
	var oGold=$('.gold');
	var oTwo=$('.two');
	var oThree=$('.three');
	var oSix=$('.six');
	var sStyle='';
	var sMaterial='';
	var sSize='';
	var aImg1=$('.style>div>img');
	var aImg2=$('.kind>div>img');
	var aImg3=$('.size>div>img');

	var oMoney=$('.price>span');
	//选择款式
	oBrooch.on('click',function(){
		sStyle=$(this).get(0).dataset.model;
		sessionStorage.setItem("style",sStyle);
		changeStyle(aImg1);
		$(this).find('img').attr('src',require('../imgs/brooch-copy.png'));
		$.ajax({
			url:apiUrl+'/customization/price?style='+sStyle+'&material='+sessionStorage.getItem("material")+'&size='+sessionStorage.getItem("size"),
			success:function(data){
				if(data.head.code){
					console.log('数据返回错误！');
					return;
				}
				$(oMoney).html(data.body.money);
			},
			error:function(err){
				console.log(err);
			}
		});
	});
	//选择材质
	oSilver.on('click',function(){
		sMaterial=$(this).get(0).dataset.model;
		sessionStorage.setItem("material",sMaterial);
		changeMaterial(aImg2);
		$(this).find('img').attr('src',require('../imgs/block-copy.png'));
		$.ajax({
			url:apiUrl+'/customization/price?style='+sessionStorage.getItem("style")+'&material='+sMaterial+'&size='+sessionStorage.getItem("size"),

			success:function(data){
				if(data.head.code){
					console.log('数据返回错误！');
					return;
				}
				$(oMoney).html(data.body.money);
			},
			error:function(err){
				console.log(err);
			}
		});
	});
	//选择尺寸
	oTwo.on('click',function(){
		sSize=$(this).get(0).dataset.model;
		sessionStorage.setItem("size",sSize);
		changeSize(aImg3);
		$(this).find('img').attr('src',require('../imgs/s-copy.png'));
		$.ajax({
			url:apiUrl+'/customization/price?style='+sessionStorage.getItem("style")+'&material='+sessionStorage.getItem("material")+'&size='+sSize,
			success:function(data){
				if(data.head.code){
					console.log('数据返回错误！');
					return;
				}
				$(oMoney).html(data.body.money);
			},
			error:function(err){
				console.log(err);
			}
		});
	});
	oThree.on('click',function(){
		sSize=$(this).get(0).dataset.model;
		sessionStorage.setItem("size",sSize);
		changeSize(aImg3);
		$(this).find('img').attr('src',require('../imgs/m-copy.png'));
		$.ajax({
			url:apiUrl+'/customization/price?style='+sessionStorage.getItem("style")+'&material='+sessionStorage.getItem("material")+'&size='+sSize,
			success:function(data){
				if(data.head.code){
					console.log('数据返回错误！');
					return;
				}
				$(oMoney).html(data.body.money);
			},
			error:function(err){
				console.log(err);
			}
		});
	});
	oSix.on('click',function(){
		sSize=$(this).get(0).dataset.model;
		sessionStorage.setItem("size",sSize);
		changeSize(aImg3);
		$(this).find('img').attr('src',require('../imgs/l-copy.png'));
		$.ajax({
			url:apiUrl+'/customization/price?style='+sessionStorage.getItem("style")+'&material='+sessionStorage.getItem("material")+'&size='+sSize,
			success:function(data){
				if(data.head.code){
					console.log('数据返回错误！');
					return;
				}
				$(oMoney).html(data.body.money);
			},
			error:function(err){
				console.log(err);
			}
		});
	});
})();

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
	var aData1=[
		{
			l:'链长40cm',
			code:'KS-XL-01'
		},
		{
			l:'链长50cm',
			code:'KS-XL-02'
		}
	];

	var aData2=[
		{
			style:'耳钉',
			code:'KS-ES-01'
		},
		{
			style:'耳环',
			code:'KS-ES-02'
		}
	];

	var aData3=[
		{
			color:'白色',
			code:'CZ-18KJ-01'
		},
		{
			color:'黄色',
			code:'CZ-18KJ-02'
		},
		{
			color:'玫瑰色',
			code:'CZ-18KJ-03'
		}
	];

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
						str+='<li data-code="'+item.code+'">'+item.l+'</li>';
					});
					oH2.html('请选择项链长度');
				break;
				case 'earring':
					aData2.forEach(function(item,index){
						str+='<li data-code="'+item.code+'">'+item.style+'</li>';
					});
					oH2.html('请选择项耳饰款式');
				break;
				case 'block':
					aData3.forEach(function(item,index){
						str+='<li data-code="'+item.code+'">'+item.color+'</li>';
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
			var aImg1=$('.style>div>img');
			var aImg2=$('.kind>div>img');
			var aLi=$('.opacity-con>ul>li');
			var oText=$(btn).find('p');
			var oMoney=$('.price>span');
			aLi.forEach(function(item,index){
				$(item).on('click',function(){
					var val=$(this).html();
					switch($(btn).attr('data-type')){
						case 'necklace':
							oText.html('项链('+val+')');
							sessionStorage.setItem("style",$(item).get(0).dataset.code);
							changeStyle(aImg1);
							$(aImg1).eq(0).attr('src',require('../imgs/necklace-copy.png'));
							$.ajax({
								url:apiUrl+'/customization/price?style='+$(item).get(0).dataset.code+'&material='+sessionStorage.getItem("material")+'&size='+sessionStorage.getItem("size"),
								success:function(data){
									if(data.head.code){
										console.log('数据返回错误！');
										return;
									}
									$(oMoney).html(data.body.money);
								},
								error:function(err){
									console.log(err);
								}
							});
						break;
						case 'earring':
							oText.html(val);
							sessionStorage.setItem("style",$(item).get(0).dataset.code);
							changeStyle(aImg1);
							$(aImg1).eq(2).attr('src',require('../imgs/earring-copy.png'));
							$.ajax({
								url:apiUrl+'/customization/price?style='+$(item).get(0).dataset.code+'&material='+sessionStorage.getItem("material")+'&size='+sessionStorage.getItem("size"),
								success:function(data){
									if(data.head.code){
										console.log('数据返回错误！');
										return;
									}
									$(oMoney).html(data.body.money);
								},
								error:function(err){
									console.log(err);
								}
							});
						break;
						case 'block':
							oText.html('18k金('+val+')');
							sessionStorage.setItem("material",$(item).get(0).dataset.code);
							changeMaterial(aImg2);
							$(aImg2).eq(1).attr('src',require('../imgs/block-copy.png'));
							$.ajax({
								url:apiUrl+'/customization/price?style='+sessionStorage.getItem("style")+'&material='+$(item).get(0).dataset.code+'&size='+sessionStorage.getItem("size"),
								success:function(data){
									if(data.head.code){
										console.log('数据返回错误！');
										return;
									}
									$(oMoney).html(data.body.money);
								},
								error:function(err){
									console.log(err);
								}
							});
						break;
					}
				});
			});
		}
	}
})();

function changeStyle(aObj){
	aObj[0].src=require('../imgs/necklace.png');
	aObj[1].src=require('../imgs/brooch.png');
	aObj[2].src=require('../imgs/earring.png');
}
function changeMaterial(aObj){
	aObj[0].src=require('../imgs/block.png');
	aObj[1].src=require('../imgs/block.png');
}
function changeSize(aObj){
	aObj[0].src=require('../imgs/s.png');
	aObj[1].src=require('../imgs/m.png');
	aObj[2].src=require('../imgs/l.png');
}

//提交定制
(function(){
	var oBtn=$('.price>button');

	oBtn.on('click',function(){
		var vipNo=sessionStorage.getItem("vipNo");
		if(vipNo){
			window.location.href='order.html';
		}else{
			window.location.href='address.html';
		}
	});
})();
