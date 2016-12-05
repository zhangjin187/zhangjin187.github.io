var app = angular.module("jgn",["ngRoute", "ngCookies"])
app.config(["$routeProvider", function($routProvider){
	$routProvider.when("/",{
		redirectTo:"/check-repair"
	})
	// 修理信息
	.when("/add-repairType",{
		templateUrl:"module/add-storeCost.html"
	})

	.when("/check-repairType",{
		templateUrl:"module/check-storeCost.html"
	})
	// 其他跳转页面
	.otherwise({
		redirectTo:"/"
	})

}]);


function postData(obj){ // 转成post需要的字符串.
	var str = "";
	// console.log(obj)
	for(var prop in obj){
		if(!obj[prop]) continue;
	    str += prop + "=" + obj[prop] + "&"
	}
	str = str.substring(0,str.length-1);
	return str;
};


app.directive('header', function(){
	return{
		restrict : 'AE',
		templateUrl : '../module/header.html'
	}
});

app.directive('menulist', function(){
	return{
		restrict : 'AEC',
		templateUrl : '../module/menu-list.html'
	}
});

// console.log(location.href.split('/')[location.href.split('/').length - 1],$('.menu a').attr('href'));

app.controller( 'urlListCtrl',function(){
	for(var i = 0; i < $('.menu a').length; i++){
		// console.log($('.menu a')[i].href.split('#')[1]);
		if($('.menu a')[i].href.split('#')[1] == location.href.split('/')[location.href.split('/').length - 1]){
			$('.menu ul li').removeClass('open');
			$('.menu a').eq(i).addClass('active').parent().addClass('open');
			break;
		}
	}
	$('.menu ul li h4').click(function(){
		var that = this.parentNode.className;
		$('.menu ul li').removeClass('open');
		if(that){
			this.parentNode.className = '';
		}else{
			this.parentNode.className = 'open';
		}
	})
	
	$('.menu a').click(function(){
		$('.menu a').removeClass('active');
		$(this).addClass('active')
	});
	var t = 0;
});





app.controller( 'headerCtrl',[ "$cookieStore", "$rootScope",function($cookieStore, $rootScope){
	// 判断登录状态
	if(!$cookieStore.get('factoryId')){
		alert('请先登录！');
		location.href = "../";
	}else {
		$rootScope.factoryId = $cookieStore.get('factoryId');
	}
	$('.login-out').click(function(e){
		// console.log(this)
		var e = e ||　window.event;
		e.preventDefault();
		// console.log($cookieStore.get('factoryId'));
	})

}]);

app.directive('sidebar', function(){
	return{
		restrict : 'AEC',
		templateUrl : '../module/sidebar.html'
	}
});

app.directive('pagechange', function(){
	return{
		restrict : 'AE',
		templateUrl : 'module/fncModule/changePageNum.html'
	}
});

app.controller('changePageCtrl', ["$rootScope",function($rootScope){
	var maxpage = 6;
	var pagenum = 1; 
	// console.log($rootScope)

	// 生成点击个数
	function changeclicknum(){
		if(!maxpage){
			maxpage = 1;
		}
		$('.pagenum a').remove()
		// console.log((i < maxpage) && (i > pagenum +3))
		for(var i = pagenum-3; ((i < maxpage) && (i < pagenum +2)); i++){
			if(i < 0) i = 0;
			// console.log(i)
			$('.pagenum').append('<a num="'+ (i+1) +'">' + (i+1) + '</a>');
		}
	}

	// 判断页面状态
	function nowPage (){
		changeclicknum();
		// console.log(pagenum)
		$('.pagechange b').show();
		if(pagenum <= 1){
			pagenum = 1;
			$('b.first,b.prev').hide();
		}else if(pagenum >= maxpage){
			pagenum = maxpage;
			$('b.end,b.next').hide();
		}
		$('.pagenum a[num=' + pagenum + ']').addClass('checked').siblings().removeClass('checked');
		if($rootScope.changepage){
			$rootScope.changepage(pagenum);
		}

	}
	changeclicknum();
	nowPage();



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


}])