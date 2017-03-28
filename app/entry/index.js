import '../css/index.css';
import $ from 'n-zepto';
import apiUrl from '../js/config';
import md5 from 'md5';
// import './story';
// import './fashion';
// import './baby';

//首页标签
(function(){
	var oWrap=document.querySelector('#wrap');
	var sLabel='';
	$.ajax({
		url:apiUrl+'/article/label',
		success:function(data){
			var aLabel=data.body.labels;
			aLabel.forEach(function(item,index){
				if(index==0){
					sLabel+='<div id="'+item.id+'" class="swiper-slide other" data-kind="story">'+item.labelContent+'</div>';
				}else if(index==1){
					sLabel+='<div id="'+item.id+'" class="swiper-slide other" data-kind="fashion">'+item.labelContent+'</div>';
				}else if(index==2){
					sLabel+='<div id="'+item.id+'" class="swiper-slide other" data-kind="baby">'+item.labelContent+'</div>';
				}
				
			});
			$(oWrap).append(sLabel);

			//点击标签返回不同数据
			(function(){
				var aBtn=$('.other');
				aBtn.forEach(function(item,index){
					var pageNum=1;//第几页
					var pageSize=5;//每页几条
					var str='';
					$(item).on('click',function(){
						var ID=$(item).get(0).id;
						var kind=$(item).get(0).dataset.kind;
						$.ajax({
							url:apiUrl+'/article/list/label?pageNum='+pageNum+'&pageSize='+pageSize+'&labelId='+ID,
							success:function(data){
								var arrShow=data.body.articles;
								init(str,'.'+kind,arrShow);
							},
							error:function(err){
								console.log(err);
							}
						});
						load(str,pageNum,pageSize,'.'+kind,ID);
					});
				});
			})();

		},
		error:function(err){
			console.log(err);
		}
	});


		function init(str,obj,arrShow){
			var oUl=$(obj).find('ul');
			//首页商品展示前3条
			arrShow.forEach(function(item,index){
				str+='<li class="item"><section class="block">';
				str+='<div class="item-head"><img class="avater" src="'+item.avatar+'" ><span class="name">'+item.nickName+'</span><i class="time">'+item.publishTime+'</i></div>';
				str+='<a href="detail.html?id='+item.id+'"><img class="show-pic" src="'+item.cover+'" ></a>';
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
		}

		function refresh(str,obj,arrShow){
			var oUl=$(obj).find('ul');
			//首页商品展示前3条
			arrShow.forEach(function(item,index){
				str+='<li class="item"><section class="block">';
				str+='<div class="item-head"><img class="avater" src="'+item.avatar+'" ><span class="name">'+item.nickName+'</span><i class="time">'+item.publishTime+'</i></div>';
				str+='<a href="detail.html?id='+item.id+'"><img class="show-pic" src="'+item.cover+'" ></a>';
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
			
			oUl.append(str);
		}

		//上拉加载
		function load(str,pageNum,pageSize,obj,id){
			var oUl=$(obj).find('ul');
			var oWrap=$(obj);//获取滚动元素
			var oRe=$('.refresh');
			var iHScreen=window.screen.availHeight;//获取屏幕高度

			var iNum=0;//记录第一次到最后一条数据时的页数
			var iBtnNum=0;
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
				//document.title=startY-moveY;
			});

			oWrap.on('scroll',function(){
				var oLi=$(obj+' li:nth-last-of-type(1)');//获取最后一个内容块
				var t=oLi.offset().top;//最后一个内容块距离页面最顶部的距离

				if((startY-moveY)>=0&&t<iHScreen+100){
					clearTimeout(timer);
					timer=setTimeout(function(){
						pageNum++;
						clearTimeout(timer2);
						$(oRe).html('正在加载中...');
						$(oRe).css('bottom',0);
						$.ajax({
							url:apiUrl+'/article/list/label?pageNum='+pageNum+'&pageSize='+pageSize+'&labelId='+id,
							success:function(data){
								if(data.head.code){
									console.log('数据返回错误！');
									return;
								}
								if(!data.body.end){
									refresh(str,obj,data.body.articles);
									$(oRe).html('本次加载完成！');
									timer2=setTimeout(function(){
										$(oRe).css('bottom','-1rem');
									},2000);
									iBtnNum=0;
								}else{
									if(!iBtnNum){
										refresh(str,obj,data.body.articles);
									}
									iBtnNum++;
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


//页面首次打开的唯一标识
(function(){
	var ID=localStorage.getItem("deciveID");
	var rnd=rand(rand(1,100),rand(1,10000));

	if(!ID){
		var timestamp=Date.now()+new Date(rnd);
		var md5_timestamp=md5(timestamp);
		localStorage.setItem("deciveID",md5_timestamp);
		$.ajax({
			url:apiUrl+'/random?random='+md5_timestamp,
			success:function(data){
				console.log('标识传递状态：',data);
			},
			error:function(err){
				console.log(err);
			}
		});
	}else{
		$.ajax({
			url:apiUrl+'/random?random='+ID,
			success:function(data){
				console.log('标识传递状态：',data);
			},
			error:function(err){
				console.log(err);
			}
		});
	}

})();

//跳转到搜索页面
(function(){
	var oBtn=$('.search-page');
	oBtn.on('click',function(){
		window.location.href='search.html';
	});
})();

//显示
(function(){
	var pageNum=1;//第几页
	var pageSize=5;//每页几条
	var str='';

	$.ajax({
		url:apiUrl+'/article/list?pageNum='+pageNum+'&pageSize='+pageSize+'&labelId=0',
		success:function(data){
			if(data.head.code){
				console.log('数据返回错误！');
				return;
			}
			init(data.body.articles,data.body.subjectList);
		},
		error:function(err){
			console.log(err);
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
				str+='<a href="detail.html?id='+item.id+'"><img class="show-pic" src="'+item.cover+'" ></a>';
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
		str+='<div class="spec-top"><h2>ooh Dear专题</h2><a href="topic.html">查看全部<span></span></a></div>';
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
				str+='<a href="detail.html?id='+item.id+'"><img class="show-pic" src="'+item.cover+'" ></a>';
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
			str+='<a href="detail.html?id='+item.id+'"><img class="show-pic" src="'+item.cover+'" ></a>';
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
		var iBtnNum=0;
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
						url:apiUrl+'/article/list?pageNum='+pageNum+'&pageSize='+pageSize+'&labelId=0',
						success:function(data){
							if(data.head.code){
								console.log('数据返回错误！');
								return;
							}
							if(!data.body.end){
								refresh(data.body.articles);
								$(oRe).html('本次加载完成！');
								timer2=setTimeout(function(){
									$(oRe).css('bottom','-1rem');
								},2000);
								iBtnNum=0;
							}else{
								if(!iBtnNum){
									refresh(data.body.articles);
								}
								iBtnNum++;
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

function rand(m,n){
	return parseInt(Math.random()*(n-m)+m);
}
