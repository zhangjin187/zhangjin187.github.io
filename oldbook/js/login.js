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
$.fn.cookie = cookie = {
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
		// console.log(document.cookie)
	}  
}
// $('.login').show()

$('.toTop').rocket();
// 关闭登录框
$(".top-bar .iconfont").click(function(){
	$(".login-window").hide()
});
// 弹出登录框
$(".login>a.loginAddr").click(function(e){
	e.preventDefault()
	$(".login-window").show()
	
});

(function(){
	if(cookie.get('factoryId')){
		$('.login-befor').hide();
		$('.login-after').show();
	}else{
		$('.login-befor').show();
		$('.login-after').hide();
	}
})();


// 登录
$('#submit').click(function(e){
	var loginData={
		mobile : '13070552899',
		password : '123456'
	}
	loginData.mobile = $('#user').val();
	loginData.password = $('#pwd').val()
	e.preventDefault();
	// console.log(loginData)
	if(($('#pwd').val().length > 5)&& ($('#user').val().length > 1)){
		$('.login-befor').addClass('hide');
		$('.login-after').removeClass('hide');
		$('.input-area p>span').removeClass('error');
		$.post( 'http://139.129.222.154:8080/car/app/car/factory/login.do', loginData, function(data){
			// data = JSON.parse(data)
			if(!data.code){
				data = JSON.parse(data)
			}
			if(data.code == '0000'){
				$(".login-window").hide();
				console.log(data.data);
				cookie.set('factoryId', data.data.id, 30);
				cookie.set('factoryPhone', data.data.mobile);
				cookie.set('factorypsw', data.data.password);
				window.location.reload();
			}else{
				alert(data.errorMessage);
			}
		});
	}else{
		$('.input-area p>span').addClass('error');
	}
})

// 退出
$('.login-out').click(function(){
	// console.log(this)
	if(1){
		$('.login-befor').removeClass('hide');
		$('.login-after').addClass('hide');
		// cookie.delAllCookie();
		cookie.delAllCookie();
		window.location.href = location.origin;
	}
})

