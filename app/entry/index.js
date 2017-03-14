import '../css/index.css';
import $ from 'n-zepto';
import apiUrl from '../js/config';

//接口地址
//var apiUrl='http://192.168.30.45:8081';

//显示
(function(){
	var pageNum=1;//第几页
	var pageSize=5;//每页几条
	var str='';

	$.ajax({
		url:apiUrl+'/article/list?pageNum='+pageNum+'&pageSize='+pageSize+'',
		success:function(data){
			init(data.body.articles,data.body.subjectList);
		}
	});
	load();
	//页面初始化
	function init(arrShow,arrSpec){
		var oUl=$('.recomand ul');
		//首页商品展示前3条
		arrShow.forEach(function(item,index){
			if(index<3){
				str+='<li class="item"><section class="block">';
				str+='<div class="item-head"><img class="avater" src="'+item.avatar+'" ><span class="name">'+item.nickName+'</span><i class="time">'+item.publishTime+'</i></div>';
				str+='<img class="show-pic" src="'+item.cover+'" >';
				str+='<h2 class="title">'+item.title+'</h2>';
				str+='<p class="text">'+item.content+'</p>';
				str+='<div class="item-foot"><span class="words">留言 '+item.messageNum+'</span><i></i><span class="good">点赞 '+item.interestedNum+'</span>';
				if(item.labels){
					item.labels.split(',').forEach(function(item1,index1){
						str+='<em class="kind">'+item1+'</em>';
					});
				}
				str+='</div></section></li>';
			}
		});
		
		//商品展示中间的专题
		str+='<li class="spec">';
		str+='<div class="spec-top"><h2>ooh Dear专题</h2></div>';
		str+='<div id="swiper-container3" class="spec-con"><div class="swiper-wrapper">';

		arrSpec.forEach(function(item,index){
			str+='<div class="swiper-slide img-con"">';
			str+='<img src="'+item.cover+'" alt=""><p>'+item.title+'</p>';
	        str+='</div>';
		});

		str+='</div></div>';
		str+='</li>';

		//拼接专题后的商品展示
		arrShow.forEach(function(item,index){
			if(index>=3){
				str+='<li class="item"><section class="block">';
				str+='<div class="item-head"><img class="avater" src="'+item.avatar+'" ><span class="name">'+item.nickName+'</span><i class="time">'+item.publishTime+'</i></div>';
				str+='<img class="show-pic" src="'+item.cover+'" >';
				str+='<h2 class="title">'+item.title+'</h2>';
				str+='<p class="text">'+item.content+'</p>';
				str+='<div class="item-foot"><span class="words">留言 '+item.messageNum+'</span><i></i><span class="good">点赞 '+item.interestedNum+'</span>';
				if(item.labels){
					item.labels.split(',').forEach(function(item1,index1){
						str+='<em class="kind">'+item1+'</em>';
					});
				}
				str+='</div></section></li>';
			}
		});

		oUl.html(str);
		move();
	}

	function refresh(arrShow){
		var oUl=$('.recomand ul');
		//首页商品展示前3条
		arrShow.forEach(function(item,index){
			str+='<li class="item"><section class="block">';
			str+='<div class="item-head"><img class="avater" src="'+item.avatar+'" ><span class="name">'+item.nickName+'</span><i class="time">'+item.publishTime+'</i></div>';
			str+='<img class="show-pic" src="'+item.cover+'" >';
			str+='<h2 class="title">'+item.title+'</h2>';
			str+='<p class="text">'+item.content+'</p>';
			str+='<div class="item-foot"><span class="words">留言 '+item.messageNum+'</span><i></i><span class="good">点赞 '+item.interestedNum+'</span>';
			
			if(item.labels){
				item.labels.split(',').forEach(function(item1,index1){
					str+='<em class="kind">'+item1+'</em>';
				});
			}
			str+='</div></section></li>';
		});
		
		oUl.html(str);
		move();
	}

	//专题的轮播
	function move(){
		var Swiper1 = new Swiper('#swiper-container1', {
            slidesPerView: 5,//框内显示几个块
            onTap: function(){
                Swiper2.slideTo(Swiper1.clickedIndex);
                if(Swiper1.clickedIndex==Swiper1.slides.length-1){
                    Swiper1.slideTo(Swiper1.slides.length-2);
                }
                if(Swiper1.clickedIndex==0){
                    Swiper1.slideTo(1);
                }
            }
        });
        var Swiper3 = new Swiper('#swiper-container3', {
            
        });

        var Swiper2 = new Swiper('#swiper-container2', {
            slidesPerView: 1,//框内显示几个块
            onSlideChangeStart: function(){
                Swiper1.slideTo(Swiper2.realIndex);

                if(Swiper2.realIndex==Swiper1.slides.length-1){
                    Swiper1.slideTo(Swiper1.slides.length-2);
                } 
                if(Swiper2.realIndex==0){
                    Swiper1.slideTo(1);
                } 
                updateNavPosition();
            }
        });
        function updateNavPosition(){
            $('#swiper-container1 .active-nav').removeClass('active-nav');
            var activeNav = $('#swiper-container1 .swiper-slide').eq(Swiper2.activeIndex).addClass('active-nav');
        }
	}

	//礼盒动画回收
	(function(){
		var obj=$('.gife-box');
		var oI1=$('.gife-box i');
		var oI2=$('.order i');
		var timer=null;
		var timer1=null;
		var timer2=null;
		var timer3=null;
		var timer4=null;

		timer=setTimeout(function(){
			obj.css({
				'top':'.89rem',
				'height':'2.2rem',
				'-webkit-animation':'none',
				'z-index':2
			});
		},9000);

		timer1=setTimeout(function(){
			oI1.css({
				'height':'1.62rem',
				'-webkit-animation':'none'
			});
		},9000);

		timer2=setTimeout(function(){
			oI1.css({
				'height':'0',
			});
			obj.css({
				'top':'.0',
				'opacity':0
			});
		},10000);

		timer3=setTimeout(function(){
			obj.css({
				'z-index':-1
			});
		},10500);

		timer4=setTimeout(function(){
			oI2.css({
				'opacity':1
			});
		},10500);
	})();

	//上拉加载
	function load(){
		var oUl=$('.recomand ul');
		var oWrap=$('.recomand');//获取滚动元素
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
			var oLi=$('.recomand li:nth-last-of-type(1)');//获取最后一个内容块
			var t=oLi.offset().top;//最后一个内容块距离页面最顶部的距离

			if((startY-moveY)>=0&&t<iHScreen+100){
				clearTimeout(timer);
				timer=setTimeout(function(){
					pageNum++;
					clearTimeout(timer2);
					$(oRe).html('正在加载中...');
					$(oRe).css('bottom',0);
					$.ajax({
						url:apiUrl+'/article/list?pageNum='+pageNum+'&pageSize='+pageSize+'',
						success:function(data){
							if(!data.body.end){
								refresh(data.body.articles);
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


// //首页商品展示数据
// var arrShow=[
// 	{
// 		id:0,
// 		avatar:require('../imgs/avater.png'),
// 		nickname:'nelson',
// 		publishTime:'2017-02-28',
// 		cover:require('../imgs/1.jpg'),
// 		title:'漂亮妈妈如何持家？',
// 		content:'自从当了妈，变化真好大，从前赚钱是给自己花，时间是留给自己用。现在，一切以宝宝为中心，什么都情不自禁的首先想到宝宝。该如何平衡生活质量和支出呢？',
// 		messageNum:12,
// 		interestedNum:123,
// 		labels:['乐活','亲子']
// 	},
// 	{
// 		id:0,
// 		avatar:require('../imgs/avater.png'),
// 		nickname:'nelson',
// 		publishTime:'2017-02-28',
// 		cover:require('../imgs/2.jpg'),
// 		title:'漂亮妈妈如何持家？',
// 		content:'自从当了妈，变化真好大，从前赚钱是给自己花，时间是留给自己用。现在，一切以宝宝为中心，什么都情不自禁的首先想到宝宝。该如何平衡生活质量和支出呢？',
// 		messageNum:12,
// 		interestedNum:123,
// 		labels:['乐活','亲子']
// 	},
// 	{
// 		id:0,
// 		avatar:require('../imgs/avater.png'),
// 		nickname:'nelson',
// 		publishTime:'2017-02-28',
// 		cover:require('../imgs/3.jpg'),
// 		title:'漂亮妈妈如何持家？',
// 		content:'自从当了妈，变化真好大，从前赚钱是给自己花，时间是留给自己用。现在，一切以宝宝为中心，什么都情不自禁的首先想到宝宝。该如何平衡生活质量和支出呢？',
// 		messageNum:12,
// 		interestedNum:123,
// 		labels:['乐活','亲子']
// 	},
// 	{
// 		id:0,
// 		avatar:require('../imgs/avater.png'),
// 		nickname:'nelson',
// 		publishTime:'2017-02-28',
// 		cover:require('../imgs/2.jpg'),
// 		title:'漂亮妈妈如何持家？',
// 		content:'自从当了妈，变化真好大，从前赚钱是给自己花，时间是留给自己用。现在，一切以宝宝为中心，什么都情不自禁的首先想到宝宝。该如何平衡生活质量和支出呢？',
// 		messageNum:12,
// 		interestedNum:123,
// 		labels:['乐活','亲子']
// 	},
// 	{
// 		id:0,
// 		avatar:require('../imgs/avater.png'),
// 		nickname:'nelson',
// 		publishTime:'2017-02-28',
// 		cover:require('../imgs/1.jpg'),
// 		title:'漂亮妈妈如何持家？',
// 		content:'自从当了妈，变化真好大，从前赚钱是给自己花，时间是留给自己用。现在，一切以宝宝为中心，什么都情不自禁的首先想到宝宝。该如何平衡生活质量和支出呢？',
// 		messageNum:12,
// 		interestedNum:123,
// 		labels:['乐活','亲子']
// 	}
// ];

// //首页专题数据
// var arrSpec=[
// 	{
// 		img:require('../imgs/3.jpg'),
// 		title:'漂亮妈妈如何持家？'
// 	},
// 	{
// 		img:require('../imgs/2.jpg'),
// 		title:'漂亮妈妈如何持家？'
// 	},
// 	{
// 		img:require('../imgs/000.jpg'),
// 		title:'漂亮妈妈如何持家？'
// 	},
// 	{
// 		img:require('../imgs/3.jpg'),
// 		title:'漂亮妈妈如何持家？'
// 	},
// ];


// //此处是卡拉加载的假数据
// var str1='';
// arrShow.forEach(function(item,index){
// 	if(index<3){
// 		str1+='<li class="item"><section class="block">';
// 		str1+='<div class="item-head"><img class="avater" src="'+item.avatar+'" ><span class="name">'+item.nickname+'</span><i class="time">'+item.publishTime+'</i></div>';
// 		str1+='<img class="show-pic" src="'+item.cover+'" >';
// 		str1+='<h2 class="title">'+item.title+'</h2>';
// 		str1+='<p class="text">'+item.content+'</p>';
// 		str1+='<div class="item-foot"><span class="words">留言 '+item.messageNum+'</span><i></i><span class="good">点赞 '+item.interestedNum+'</span>';
// 		item.labels.forEach(function(item1,index1){
// 			str1+='<em class="kind">'+item1+'</em>';
// 		});
// 		str1+='</div></section></li>';
// 	}
// });

// //初始化
// var str='';
// //init(arrShow,arrSpec);
// //load();

// function init(arrShow,arrSpec){
// 	var oUl=$('.recomand ul');
// 	//首页商品展示前3条
// 	arrShow.forEach(function(item,index){
// 		if(index<3){
// 			str+='<li class="item"><section class="block">';
// 			str+='<div class="item-head"><img class="avater" src="'+item.avatar+'" ><span class="name">'+item.nickname+'</span><i class="time">'+item.publishTime+'</i></div>';
// 			str+='<img class="show-pic" src="'+item.cover+'" >';
// 			str+='<h2 class="title">'+item.title+'</h2>';
// 			str+='<p class="text">'+item.content+'</p>';
// 			str+='<div class="item-foot"><span class="words">留言 '+item.messageNum+'</span><i></i><span class="good">点赞 '+item.interestedNum+'</span>';
// 			item.labels.forEach(function(item1,index1){
// 				str+='<em class="kind">'+item1+'</em>';
// 			});
// 			str+='</div></section></li>';
// 		}
// 	});
	
// 	//商品展示中间的专题
// 	str+='<li class="spec">';
// 	str+='<div class="spec-top"><h2>ooh Dear专题</h2></div>';
// 	str+='<div id="swiper-container3" class="spec-con"><div class="swiper-wrapper">';

// 	arrSpec.forEach(function(item,index){
// 		str+='<div class="swiper-slide img-con"">';
// 		str+='<img src="'+item.img+'" alt=""><p>'+item.title+'</p>';
//         str+='</div>';
// 	});

// 	str+='</div></div>';
// 	str+='</li>';

// 	//拼接专题后的商品展示
// 	arrShow.forEach(function(item,index){
// 		if(index>=3){
// 			str+='<li class="item"><section class="block">';
// 			str+='<div class="item-head"><img class="avater" src="'+item.avatar+'" ><span class="name">'+item.nickname+'</span><i class="time">'+item.publishTime+'</i></div>';
// 			str+='<img class="show-pic" src="'+item.cover+'" >';
// 			str+='<h2 class="title">'+item.title+'</h2>';
// 			str+='<p class="text">'+item.content+'</p>';
// 			str+='<div class="item-foot"><span class="words">留言 '+item.messageNum+'</span><i></i><span class="good">点赞 '+item.interestedNum+'</span>';
// 			item.labels.forEach(function(item1,index1){
// 				str+='<em class="kind">'+item1+'</em>';
// 			});
// 			str+='</div></section></li>';
// 		}
// 	});

// 	oUl.html(str);
// }


// //上拉加载
// function load(arr){
// 	var oUl=$('.recomand ul');
// 	var oWrap=$('.recomand');//获取滚动元素
// 	var iHScreen=window.screen.availHeight;//获取屏幕高度

// 	oWrap.on('scroll',function(){
// 		var oLi=$('.recomand li:nth-last-of-type(1)');//获取最后一个内容块
// 		var t=oLi.offset().top;//最后一个内容块距离页面最顶部的距离
		
// 		if(t<iHScreen+100){console.log(1);
// 			oUl.append(str1);
// 		}
// 	});
// }

