$.fn.rocket = function() {
	var $this = this;
	$(document).scroll(function() {
		if($("body").scrollTop() < $(window).height() - 500) {
			$this.fadeOut();
		} else {
			$this.fadeIn();
		}
	})
	this.click(function() {
		$("body").animate({
			scrollTop: 0
		})
	})
}
$('.toTop').rocket();
$.fn.accordion = function(obj) {
	var open = obj.open;
	this.children().click(function() {
		$(this).addClass(open).siblings().removeClass(open);
		return this;
	})
}
$(".service,.user-hub").accordion({
	open: "open"
})

// 返回顶部的jq
$.fn.rocket = function() {
	var $this = this;
	$(document).scroll(function() {
		if($("body").scrollTop() < $(window).height()-500) {
			$this.fadeOut();
		} else {
			$this.fadeIn();
		}
	})
	this.click(function() {
		$("body").animate({
			scrollTop: 0
		})
	})
}
$.cookie = cookie = {
	set:function(key,val,time){//设置cookie方法
		var date=new Date(); //获取当前时间
		var expiresDays=time;  //将date设置为n天以后的时间
		date.setTime(date.getTime()+expiresDays*24*3600*1000); //格式化为cookie识别的时间
		document.cookie=key + "=" + val +";expires="+date.toGMTString();  //设置cookie
	},
	get:function(key){//获取cookie方法
		/*获取cookie参数*/
		var getCookie = document.cookie.replace(/[ ]/g,"");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
		var arrCookie = getCookie.split(";")  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
		var tips;  //声明变量tips
		for(var i=0;i<arrCookie.length;i++){   //使用for循环查找cookie中的tips变量
			var arr=arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
			if(key==arr[0]){  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
				tips=arr[1];   //将cookie的值赋给变量tips
				break;   //终止for循环遍历
			} 
		}
		return tips;
	},
	delAllCookie:function(){    
		var myDate=new Date();    
		myDate.setTime(-1000);//设置时间    
		var data=document.cookie;    
		var dataArray=data.split("; ");    
		for(var i=0;i<dataArray.length;i++){    
			var varName=dataArray[i].split("=");    
			document.cookie=varName[0]+"=''; expires="+myDate.toGMTString() + ';path=/';    
		}    
	}  
}
// cookie = $.cookie;
// 最大页数
// var maxpage = 7;
if(!maxpage){
	var maxpage = 1;
}
var pagenum = 1;
// 生成点击个数
function changeclicknum(){
	$('.pagenum a').remove()
	// console.log((i < maxpage) && (i > pagenum +3))
	for(var i = pagenum-3; ((i < maxpage) && (i < pagenum +2)); i++){
		if(i < 0) i = 0;
		// console.log(i)
		$('.pagenum').append('<a num="'+ (i+1) +'">' + (i+1) + '</a>');
	}
}


(function(){
	if(!cookie.get('factoryId')){
		alert('您没有登录')
		window.location.href = location.origin;
	}
})();


// 判断页面状态
function nowPage (){
	changeclicknum();
	// console.log(pagenum)
	$('.pagechange b').show();
	if(pagenum <= 1){
		pagenum = 1;
		$('b.first,b.prev').hide();
	}
	if(pagenum >= maxpage){
		pagenum = maxpage;
		$('b.end,b.next').hide();
	}
	$('.pagenum a[num=' + pagenum + ']').addClass('checked').siblings().removeClass('checked');
}


changeclicknum();
nowPage();
	
// 点击数值按钮
// $('.pagenum a').click(function(){
	
// })
$('.pagenum').on('click', 'a', function(){
	pagenum = parseInt(this.innerHTML);
	// $(this).addClass('checked').siblings().removeClass('checked');
	nowPage();
})

// 首页
$('b.first').click(function(){
	pagenum = 1;
	nowPage();
})
// 上一页
$('b.prev').click(function(){
	pagenum --;
	nowPage();
})

// 下一页
$('b.next').click(function(){
	pagenum ++;
	nowPage();
})

// 尾页
$('b.end').click(function(){
	pagenum = maxpage;
	nowPage();
})




if($.jeDate){
	$(".time").jeDate({
	    format:"YYYY-MM-DD",
	    isTime:true, 
	    minDate:"2016-09-19",
	    okfun:function(){return false}
	});
}


var postData = {
	
};
postData.mobile = $.cookie.get('mobile');
postData.password = $.cookie.get('password');
postData.factoryId = $.cookie.get('factoryId');
