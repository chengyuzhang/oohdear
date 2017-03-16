import '../css/public.css';
import '../css/topic.css';
import $ from 'n-zepto';

//接口地址
import apiUrl from '../js/config';
//展示专题列表
(function(){
	var pageNum=1;//第几页
	var pageSize=4;//每页几条
	var str='';

	$.ajax({
		url:apiUrl+'/subject/get?pageNum='+pageNum+'&pageSize='+pageSize+'',
		success:function(data){
			init(data.body.subjects);
		}
	});

	load();
	
	//页面初始化
	function init(arrSpec){
		var oUl=$('.list');
		//专题项
		arrSpec.forEach(function(item,index){
			str+='<li class="spec">';
			str+='<img src="'+item.cover+'" alt=""><span>'+item.title+'</span>';
			str+='</li>';
		});

		oUl.html(str);
	}

	//上拉加载
	function load(arr){
		var oUl=$('.list');
		var oWrap=$('.wrap');//获取滚动元素
		var oRe=$('.refresh');

		var iHScreen=window.screen.availHeight;//获取屏幕高度
		
		var iNum=0;//记录第一次到最后一条数据时的页数
		var timer=null;
		var timer1=null;
		var timer2=null;
		var startY=0;
		var moveY=0;

		//判断上滑
		oWrap.on('touchstart',function(ev){
			startY=ev.changedTouches[0].pageY;
		});
		oWrap.on('touchmove',function(ev){
			moveY=ev.changedTouches[0].pageY;
			document.title=startY-moveY;
		});

		oWrap.on('scroll',function(){
			var oLi=$('.list li:nth-last-of-type(1)');//获取最后一个内容块
			var t=oLi.offset().top;//最后一个内容块距离页面最顶部的距离

			if((startY-moveY)>=0&&t<iHScreen+100){
				clearTimeout(timer);
				timer=setTimeout(function(){
					pageNum++;
					clearTimeout(timer2);
					$(oRe).html('正在加载中...');
					$(oRe).css('bottom',0);
					$.ajax({
						url:apiUrl+'/subject/get?pageNum='+pageNum+'&pageSize='+pageSize+'',
						success:function(data){
							if(!data.body.end){
								init(data.body.subjects);
								$(oRe).html('本次加载完成！');
								timer2=setTimeout(function(){
									$(oRe).css('bottom','-1rem');
								},2000);

							}else{
								iNum=pageNum-1;
								pageNum=iNum;
								$(oRe).html('已经到末尾咯~');
								$(oRe).css('bottom',0);
								clearTimeout(timer1);
								timer1=setTimeout(function(){
									$(oRe).css('bottom','-1rem');
								},2000);
							}
						}
					});
				},1000);
			}
		});
	}
})();