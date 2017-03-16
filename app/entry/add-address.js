import '../css/public.css';
import '../css/add-address.css';
import $ from 'n-zepto';

//接口地址
import apiUrl from '../js/config';
//选择地区
(function(){
	const provinceArray = new Array("北京市","上海市","天津市","重庆市","河北省","山西省","内蒙古自治区","辽宁省","吉林省","黑龙江省","江苏省","浙江省","安徽省","福建省","江西省","山东省","河南省","湖北省","湖南省","广东省","广西壮族自治区","海南省","四川省","贵州省","云南省","西藏自治区","陕西省","甘肃省","宁夏回族自治区","青海省","新疆维吾尔族自治区","香港特别行政区","澳门特别行政区","台湾省");  
	const cityArray = new Array();   
	cityArray[0] = new Array("北京市","东城区|西城区|崇文区|宣武区|朝阳区|丰台区|石景山区|海淀区|门头沟区|房山区|通州区|顺义区|昌平区|大兴区|平谷区|怀柔区|密云区|延庆区");   
	cityArray[1] = new Array("上海市","黄浦区|卢湾区|徐汇区|长宁区|静安区|普陀区|闸北区|虹口区|杨浦区|闵行区|宝山区|嘉定区|浦东区|金山区|松江区|青浦区|南汇区|奉贤区|崇明区");   
	cityArray[2] = new Array("天津市","和平区|东丽区|河东区|西青区|河西区|津南区|南开区|北辰区|河北区|武清区|红挢区|塘沽区|汉沽区|大港区|宁河区|静海区|宝坻区|蓟县");   
	cityArray[3] = new Array("重庆市","万州区|涪陵区|渝中区|大渡口区|江北区|沙坪坝区|九龙坡区|南岸区|北碚区|万盛区|双挢区|渝北区|巴南区|黔江区|长寿区|綦江区|潼南区|铜梁 区|大足区|荣昌区|壁山区|梁平区|城口区|丰都区|垫江区|武隆区|忠县区|开县区|云阳区|奉节区|巫山区|巫溪区|石柱区|秀山区|酉阳区|彭水区|江津区|合川区|永川区|南川区");   
	cityArray[4] = new Array("河北省","石家庄市|邯郸市|邢台市|保定市|张家口市|承德市|廊坊市|唐山市|秦皇岛市|沧州市|衡水市");   
	cityArray[5] = new Array("山西省","太原市|大同市|阳泉市|长治市|晋城市|朔州市|吕梁市|忻州市|晋中市|临汾市|运城市");   
	cityArray[6] = new Array("内蒙古自治区","呼和浩特市|包头市|乌海市|赤峰市|呼伦贝尔盟市|阿拉善盟市|哲里木盟市|兴安盟市|乌兰察布盟市|锡林郭勒盟市|巴彦淖尔盟市|伊克昭盟市");   
	cityArray[7] = new Array("辽宁省","沈阳市|大连市|鞍山市|抚顺市|本溪市|丹东市|锦州市|营口市|阜新市|辽阳市|盘锦市|铁岭市|朝阳市|葫芦岛市");   
	cityArray[8] = new Array("吉林省","长春市|吉林市|四平市|辽源市|通化市|白山市|松原市|白城市|延边市");   
	cityArray[9] = new Array("黑龙江省","哈尔滨市|齐齐哈尔市|牡丹江市|佳木斯市|大庆市|绥化市|鹤岗市|鸡西市|黑河市|双鸭山市|伊春市|七台河市|大兴安岭市");   
	cityArray[10] = new Array("江苏省","南京市|镇江市|苏州市|南通市|扬州市|盐城市|徐州市|连云港市|常州市|无锡市|宿迁市|泰州市|淮安市");   
	cityArray[11] = new Array("浙江省","杭州市|宁波市|温州市|嘉兴市|湖州市|绍兴市|金华市|衢州市|舟山市|台州市|丽水市");   
	cityArray[12] = new Array("安徽省","合肥市|芜湖市|蚌埠市|马鞍山市|淮北市|铜陵市|安庆市|黄山市|滁州市|宿州市|池州市|淮南市|巢湖市|阜阳市|六安市|宣城市|亳州市");   
	cityArray[13] = new Array("福建省","福州市|厦门市|莆田市|三明市|泉州市|漳州市|南平市|龙岩市|宁德市");   
	cityArray[14] = new Array("江西省","南昌市|景德镇市|九江市|鹰潭市|萍乡市|新馀市|赣州市|吉安市|宜春市|抚州市|上饶市");   
	cityArray[15] = new Array("山东省","济南市|青岛市|淄博市|枣庄市|东营市|烟台市|潍坊市|济宁市|泰安市|威海市|日照市|莱芜市|临沂市|德州市|聊城市|滨州市|菏泽市");   
	cityArray[16] = new Array("河南省","郑州市|开封市|洛阳市|平顶山市|安阳市|鹤壁市|新乡市|焦作市|濮阳市|许昌市|漯河市|三门峡市|南阳市|商丘市|信阳市|周口市|驻马店市|济源市");   
	cityArray[17] = new Array("湖北省","武汉市|宜昌市|荆州市|襄樊市|黄石市|荆门市|黄冈市|十堰市|恩施市|潜江市|天门市|仙桃市|随州市|咸宁市|孝感市|鄂州市");  
	cityArray[18] = new Array("湖南省","长沙市|常德市|株洲市|湘潭市|衡阳市|岳阳市|邵阳市|益阳市|娄底市|怀化市|郴州市|永州市|湘西市|张家界市");   
	cityArray[19] = new Array("广东省","广州市|深圳市|珠海市|汕头市|东莞市|中山市|佛山市|韶关市|江门市|湛江市|茂名市|肇庆市|惠州市|梅州市|汕尾市|河源市|阳江市|清远市|潮州市|揭阳市|云浮市");   
	cityArray[20] = new Array("广西壮族自治区","南宁市|柳州市|桂林市|梧州市|北海市|防城港市|钦州市|贵港市|玉林市|南宁地区市|柳州地区市|贺州市|百色市|河池市");   
	cityArray[21] = new Array("海南省","海口市|三亚市|三沙市|儋州市|五指山市|文昌市|琼海市|万宁市|东方市");   
	cityArray[22] = new Array("四川省","成都市|绵阳市|德阳市|自贡市|攀枝花市|广元市|内江市|乐山市|南充市|宜宾市|广安市|达川市|雅安市|眉山市|甘孜市|凉山市|泸州市");   
	cityArray[23] = new Array("贵州省","贵阳市|六盘水市|遵义市|安顺市|铜仁市|黔西南市|毕节市|黔东南市|黔南市");   
	cityArray[24] = new Array("云南省","昆明市|大理市|曲靖市|玉溪市|昭通市|楚雄市|红河市|文山市|思茅市|西双版纳市|保山市|德宏市|丽江市|怒江市|迪庆市|临沧市");  
	cityArray[25] = new Array("西藏自治区","拉萨市|日喀则市|山南市|林芝市|昌都市|阿里市|那曲市");   
	cityArray[26] = new Array("陕西省","西安市|宝鸡市|咸阳市|铜川市|渭南市|延安市|榆林市|汉中市|安康市|商洛市");   
	cityArray[27] = new Array("甘肃省","兰州市|嘉峪关市|金昌市|白银市|天水市|酒泉市|张掖市|武威市|定西市|陇南市|平凉市|庆阳市|临夏市|甘南市");   
	cityArray[28] = new Array("宁夏回族自治区","银川市|石嘴山市|吴忠市|固原市");   
	cityArray[29] = new Array("青海省","西宁市|海东市|海南市|海北市|黄南市|玉树市|果洛市|海西市");   
	cityArray[30] = new Array("新疆维吾尔族自治区","乌鲁木齐市|石河子市|克拉玛依市|伊犁市|巴音郭勒市|昌吉市|克孜勒苏柯尔克孜市|博尔塔拉市|吐鲁番市|哈密市|喀什市|和田市|阿克苏市");   
	cityArray[31] = new Array("香港特别行政区","香港特别行政区");   
	cityArray[32] = new Array("澳门特别行政区","澳门特别行政区");   
	cityArray[33] = new Array("台湾省","台北市|高雄市|台中市|台南市|屏东市|南投市|云林市|新竹市|彰化市|苗栗市|嘉义市|花莲市|桃园市|宜兰市|基隆市|台东市|金门市|马祖市|澎湖市");  

	var oProvWrap=$('.province ul');
	var oCityWrap=$('.city ul');
	var sProv='';
	var sCity='';
	//省份布局
	provinceArray.forEach(function(item,index){
		sProv+='<li>'+item+'</li>';
	});
	oProvWrap.html(sProv);

	//城市布局
	var aProv=$('.province ul li');
	var valProv='北京市';
	var valCity='';
	var oInput=$('.select-city input');
	//默认显示北京区的
	cityArray[0][1].split('|').forEach(function(item,index){
		sCity+='<li>'+item+'</li>'
	});
	oCityWrap.html(sCity);
	select();
	//点击省份显示对应的城市布局
	aProv.forEach(function(item,index){
		$(item).on('click',function(){
			var text=$(this).text();
			sCity='';
			cityArray.forEach(function(item1,index1){
				if(text==item1[0]){
					valProv=item1[0];
					var arrCity=item1[1].split('|');
					arrCity.forEach(function(item2,index2){
						sCity+='<li>'+item2+'</li>'
					});
					oCityWrap.html(sCity);
				}
			});
			select();
		});
	});

	//点击城市选中值
	function select(){
		var aCity=$('.city li');
		aCity.forEach(function(item,index){
			$(item).on('click',function(){console.log($(this).text());
				oInput.val(valProv+'/'+$(this).text());
			});
		});
	}
	//弹层
	var oClose=$('.close');
	var oBtn=$('.select-city');
	var oPacity=$('.opacity');
	var oSelect=$('.select');
	var timer=null;
	var timer1=null;

	//弹出层
	oBtn.on('click',function(){
		oPacity.css('display','block');
		timer=setTimeout(function(){
			oPacity.css('background','rgba(0,0,0,.5)');
		},50);
		timer1=setTimeout(function(){
			oSelect.css('transform','translate3d(0,0,0)');
		},50);
	});

	//弹层消失
	oClose.on('click',function(){
		oSelect.css('transform','translate3d(0,8rem,0)');
		timer=setTimeout(function(){
			oPacity.css('background','rgba(0,0,0,0)');
		},100);
		timer1=setTimeout(function(){
			oPacity.css('display','none');
		},600);
	});
})();

//保存地址
(function(){
	var reg = /^((1[0-9]{1})+\d{9})$/; 
	var oBtn=$('.save');
	oBtn.on('click',function(){
		var name=$('.list li input').eq(0).val();
		var tel=$('.list li input').eq(1).val();
		var zone=$('.list li input').eq(2).val();
		var address=$('.list li input').eq(3).val();
		var vipNo=sessionStorage.getItem("vipNo");
		console.log('name:',name,'tel:',tel,'zone:',zone,'address:',address);

		if((name&&tel&&zone&&address)!=''){
			//判断手机号
			if(!reg.test(tel)){ 
			    alert('请输入有效的手机号码'); 
			    return false; 
			}
			$.ajax({
				type:'post',
				url:apiUrl+'/address/save',
				data:{
					consignee:name,
					mobile:tel,
					defaultAddr:false,
					zone:zone,
					detail:address,
					memberNo:vipNo
				},
				success:function(data){
					alert('添加成功！');
				},
				error:function(err){
					alert('添加失败！');
					console.log(err);
				}
			})
		}else{
			alert('不能有留空项~');	
		}
	});
})();
