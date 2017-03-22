import '../css/public.css';
import '../css/search.css';
import $ from 'n-zepto';
//接口地址
import apiUrl from '../js/config';

//热门标签
(function(){
	var oWrap=$('.hot>ul');
	var str='';
	$.ajax({
		url:apiUrl+'/article/label',
		success:function(data){
			var arr=data.body.labels;
			arr.forEach(function(item,index){
				str+='<li id='+item.id+'>'+item.labelContent+'</li>'
			});
			oWrap.html(str);
		},
		error:function(err){
			console.log(err);
		}
	});
})();

//推荐文章
(function(){
	var oWrap=$('.recomand-article>ul');
	var str='';
	$.ajax({
		url:apiUrl+'/article/recommended',
		success:function(data){
			console.log(data);
			var arr=data.body.articles;

			arr.forEach(function(item,index){
				str+='<li id='+item.id+' class="item"><section class="block">';
                str+='<img class="show-pic" src="'+item.cover+'" alt=""><h2 class="title">'+item.title+'</h2>';
                str+='<div class="item-foot"><span class="time">'+item.publishTime+'</span><em class="kind">'+item.labels+'</em>';
                str+='</div></section></li>';
			});

			oWrap.html(str);
		},
		error:function(err){
			console.log(err);
		}
	});
})();

//搜索//////////////////////////////////////////////////////////////////////////////////
(function(){
	var iLogin=true;//判断登录条件
	var oInput=$('.search-input');
	var oUl=$('.history ul');
	var vipNo=sessionStorage.getItem("vipNo");
	
	if(parseInt(vipNo)){//登录
		//添加搜索记录

		$(document).on('keydown',function(ev){
			var code=ev.keyCode;
			if(code==13){//回车时取值
				var val=oInput.val();
				if(val!=''){
					$.ajax({
						url:apiUrl+'/user/search/add?searchContent='+val+'&memberNo='+vipNo,
						success:function(data){
							console.log(data);
						},
						error:function(err){
							console.log(err);
						}
					});
				}
			}
		});

		//显示搜索记录
		var str='';
		$.ajax({
			url:apiUrl+'/user/search/get?memberNo='+vipNo,
			success:function(data){
				var arr=data.body.searchs;
				
				arr.forEach(function(item,index){
					str+='<li>';
					str+='<i></i><span>'+item.searchContent+'</span><a id='+item.id+' href="javascript:;"></a>';
			        str+='</li>';
				});
				oUl.html(str);

				//如果搜索记录为小于2条时不显示“展开全部”和“清除历史记录”
				if($('.history ul>li').length<=2){
					$('.show-all').css('display','none');
				}

				//如果搜索记录为0时不显示“展开全部”和“清除历史记录”
				if($('.history ul>li').length==0){
					$('.clear-record').css('display','none');
				}

				//如果搜索记录条数大于0，显示“清除历史记录”
				if($('.history ul>li').length>0){
					$('.clear-record').css('display','block');
				}

				//如果搜索记录条数大于2，显示“全部展示”
				if($('.history ul>li').length>2){
					oUl.height('.72rem');
					$('.show-all').css('display','block');
				}

				//展开全部
				$('.show-all').on('click',function(){
					var h=$('.history ul>li').length*$('.history ul>li').eq(0).height();
					$(this).css('display','none');
					oUl.css('height',h);
					setTimeout(function(){
						oUl.css('height','auto');
					},300);
				});
				
				//清除历史记录
				$('.clear-record').on('click',function(){
					$.ajax({
						url:apiUrl+'/user/search/delete?searchId=0'+'&memberNo='+vipNo,
						success:function(data){
							
							if(data.body.status){
								$('.history ul>li').remove();//删除全部列表项
								$('.show-all').css('display','none');
								$('.clear-record').css('display','none');
								oUl.height('auto');
							}
						},
						error:function(err){
							console.log(err);
						}
					});
					
				});

				//删除项
				var aDel=$('.history ul>li>a');
				aDel.forEach(function(item,index){
					$(item).on('click',function(){
						$.ajax({
							url:apiUrl+'/user/search/delete?searchId='+item.id+'&memberNo='+vipNo,
							success:function(data){
								
								if(data.body.status){
									$(item).parent().remove();//删除元素节点
									if($('.history>ul>li').length<=2){
										$('.show-all').css('display','none');
										oUl.css('height','auto');
									}
									if($('.history>ul>li').length==0){
										$('.clear-record').css('display','none');
									}
								}
							},
							error:function(err){
								console.log(err);
							}
						});
					});
				});
			},
			error:function(err){
				console.log(err);
				$('.clear-record').css('display','none');
				$('.show-all').css('display','none');
			}
		});


	}else{//未登录
		var aSearchRecord;
		oInput.focus();
		showRecord();

		oInput.on('focus',function(){
			$(this).val('');
			aSearchRecord=JSON.parse(localStorage.getItem('searchRecord'));//获取搜索记录
			showRecord();
		});

		$(document).on('keydown',function(ev){
			var code=ev.keyCode;
			if(code==13){//回车时取值
				var val=oInput.val();
				if(classof(aSearchRecord)=='Null'){
					aSearchRecord=[];
				}
				if(val!=''){
					aSearchRecord.push(val);
				}
				aSearchRecord=[...new Set(aSearchRecord)];//去重
				localStorage.setItem('searchRecord',JSON.stringify(aSearchRecord));//存储搜索记录
			}
		});

		//展示搜索记录列表
		function showRecord(){
			aSearchRecord=JSON.parse(localStorage.getItem('searchRecord'));//获取搜索记录
			if(aSearchRecord){
				createRecordList(aSearchRecord);
			}
		}

		//生成搜索记录列表
		function createRecordList(arr){
			var str='';
			arr.forEach(function(item,index){
				str+='<li>';
				str+='<i></i><span>'+item+'</span><a href="javascript:;"></a>';
		        str+='</li>';
			});
			oUl.html(str);
			//如果搜索记录条数大于0，显示“清除历史记录”
			if($('.history ul>li').length>0){
				$('.clear-record').css('display','block');
			}
			//如果搜索记录条数大于2，显示“全部展示”
			if($('.history ul>li').length>2){
				oUl.height('.72rem');
				$('.show-all').css('display','block');
			}
			del();
		}

		//删除搜索记录
		function del(){
			var aDel=$('.history ul>li>a');
			aDel.forEach(function(item,index){
				$(item).on('click',function(){
					$(this).parent().remove();//删除元素节点
					var val=$(this).parent().text();
					aSearchRecord.splice($.inArray(val,aSearchRecord),1);//从数组中删除搜索记录
					if(aSearchRecord.length<=2){
						$('.show-all').css('display','none');
						oUl.css('height','auto');
					}
					if(aSearchRecord.length==0){
						$('.clear-record').css('display','none');
					}
					localStorage.removeItem('searchRecord');//删除localStorage的全部搜索记录
					localStorage.setItem('searchRecord',JSON.stringify(aSearchRecord));//重新添加删除后剩余的搜索记录到localStorage
				});
			});
		}

		//如果搜索记录为小于2条时不显示“展开全部”和“清除历史记录”
		if($('.history ul>li').length<=2){
			$('.show-all').css('display','none');
		}

		//如果搜索记录为0时不显示“展开全部”和“清除历史记录”
		if($('.history ul>li').length==0){
			$('.clear-record').css('display','none');
		}

		//展开全部
		$('.show-all').on('click',function(){
			var h=$('.history ul>li').length*$('.history ul>li').eq(0).height();
			$(this).css('display','none');
			oUl.css('height',h);
			setTimeout(function(){
				oUl.css('height','auto');
			},300);
		});
		
		//清除历史记录
		$('.clear-record').on('click',function(){
			aSearchRecord=[];//搜索数组清空
			$('.history ul>li').remove();//删除全部列表项
			localStorage.removeItem('searchRecord');//删除localStorage的全部搜索记录
			$('.show-all').css('display','none');
			$(this).css('display','none');
			oUl.height('auto');
		});
	}
})();

//热门搜索//////////////////////////////////////////////////////////////////////////////////
(function(){
	var hotLabels=[{"id":1,"name":"推荐"},{"id":2,"name":"亲子"},{"id":2,"name":"亲子"},{"id":2,"name":"亲子"},{"id":2,"name":"亲子"}];
	var str='';
	hotLabels.forEach(function(item,index){
		str+='<li>'+item['name']+'</li>';
	});
	$('.hot>ul').html(str);
})();

//推荐文章//////////////////////////////////////////////////////////////////////////////////
(function(){
	var arr=[
		{	
			id:0,
			publishTime:'2017-02-28',
			cover:require('../imgs/000.jpg'),
			title:'漂亮妈妈如何持家？',
			labels:'乐活'
		},
		{	
			id:0,
			publishTime:'2017-02-28',
			cover:require('../imgs/1.jpg'),
			title:'漂亮妈妈如何持家？',
			labels:'乐活'
		},
		{	
			id:0,
			publishTime:'2017-02-28',
			cover:require('../imgs/2.jpg'),
			title:'漂亮妈妈如何持家？',
			labels:'乐活'
		},
		{	
			id:0,
			publishTime:'2017-02-28',
			cover:require('../imgs/3.jpg'),
			title:'漂亮妈妈如何持家？',
			labels:'乐活'
		},
		{	
			id:0,
			publishTime:'2017-02-28',
			cover:require('../imgs/000.jpg'),
			title:'漂亮妈妈如何持家？',
			labels:'乐活'
		}
	];
	var str='';
	arr.forEach(function(item,index){
		str+='<li class="item"><section class="block">';
		str+='<img class="show-pic" src="'+item.cover+'" >';
		str+='<h2 class="title">'+item.title+'</h2>';
		str+='<div class="item-foot"><span class="time">'+item.publishTime+'</span><em class="kind">'+item.labels+'</em></div>';
		str+='</section></li>';
	});
	$('.recomand-article>ul').html(str);
})();

//判断数据类型
function classof(obj){
	if(obj===null){
		return 'Null';
	}
	if(obj===undefined){
		return 'Undefined';
	}
	return Object.prototype.toString.call(obj).slice(8,-1);
}