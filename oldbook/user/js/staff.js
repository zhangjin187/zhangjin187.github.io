	var rootData = {
		'mobile' : '13070552899',
		'password' : '123456',
		'factoryId' : 18,
		'pageSize' : 2,
		'pageNo' : 1
	};
app.config(["$routeProvider", function($routProvider){
	$routProvider
	// 员工
	.when("/add-staff",{
		templateUrl:"module/add-staff.html"
	})
	.when("/check-staff",{
		templateUrl:"module/check-staff.html"
	})
}]);


// 查看维修控制器
app.controller( 'checkstaff',['$http', '$rootScope', function($http, $rootScope){
	var self = this;
	// console.log($http)

	

	
	self.checkstaff = function (pageNum){
		self.check_staffData = {
			'mobile' : '13070552899',
			// 'password' : '123456',
			'factoryId' : 18,
			'pageSize' : 10,
			'pageNo' : 1
		};
		self.check_staffData.factoryId = $rootScope.factoryId;
		if(pageNum){
			self.check_staffData.pageNo = pageNum;
		};
		
		// 跨域angular
		$http({
			method	: 'POST',
			url     : 'http://139.129.222.154:8080/car/app/car/factory/queryFactoryWorkerList.do',
			data    : postData(self.check_staffData),
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
		.success(function(data){
			if(data.code == '0000'){
				// console.log(data,data.data);
	
				self.datas = data.data;
			}else{
				console.log(data.errorMessage)
				// console.log(data,data.data);
			}
		})
	
		.error(function(data, status, headers, config) {
	
			// deferred.reject('Then was an error');
		});
	}
	// checkstaff();
	$rootScope.changepage = self.checkstaff;



}]);
	


app.controller( 'staffs',['$http', function($http){
	var self = this;
	var delData = {
		factoryId : rootData.factoryId
		// id : angular.element(e.target).parent().parent().parent()[0].getAttribute('workerid')
	}
	self.delworker= function (e){
		console.log(delData.id = angular.element(e.target).parent().parent().parent()[0].getAttribute('workerid'));
		
		// 跨域angular
		$http({
			method	: 'POST',
			url     : 'http://139.129.222.154:8080/car/app/car/factory/deleteWorker.do',
			data    : postData(delData),
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
		.success(function(data){
			if(data.code == '0000'){
				console.log(data.successMessage||data.data);
				location.reload();
			}else{
				console.log(data.errorMessage)
				// console.log(data,data.data);
			}
		})
	}
}]);

app.controller( 'addstaff',['$http', '$rootScope', function($http, $rootScope){

	var self = this;
	// console.log($rootScope);
	this.name = ''; this.time = '' ; this.tel = '';
	// console.log(this)
	self.noAdd = function(){
		// console.log(this)
		// this.name = ''; this.time = '' ; this.tel = '';
		location.href = '#check-staff';
	};
	self.sureAdd = function(){
		console.log(this)
		self.addObj = {};
		var telReg = /^1[3,5,4,7,8]{1}\d{9}/
		if(!telReg.test(self.mobile)) {
			alert("请输入正确的电话号码");
			return;
		}
		self.addObj.factoryId = rootData.factoryId;
		self.addObj.name = self.name;
		self.addObj.mobile = self.tel;
		// console.log(self.addObj)
		$http({
			method	: 'POST',
			url     : 'http://139.129.222.154:8080/car/app/car/factory/saveWorker.do',
			data    : postData(self.addObj),
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
		
	
	
		.success(function(data){
			if(data.code == '0000'){
				// console.clear;
				location.href = '#check-staff';
			}else{
				console.log(data.errorMessage)
				// console.log(data,data.data);
			}
		})
	};
}]);





// var postData = {
// 	mobile : '13070552899',
// 	password : '123456',
// 	factoryId : 18
// };
// postData.mobile = $.cookie.get('mobile');
// postData.password = $.cookie.get('password');
// postData.factoryId = $.cookie.get('factoryId');

// function fullpage(data){
// 	console.log(data);
// 	// data = [];
// 	$('.check-table table tbody tr').remove()
// 	if(data.length <= 0){
// 		// window.location.href = 'add-staff.html';
// 		$('.check-table table tbody').append('<tr> <td colspan="80"><a href="add-staff.html">您暂时没有员工，点击此处添加员工</a></td> </tr>');
// 	}
// 	// $('.check-table table tbody').append('<tr title="点击查看详情"> <td>zzzzz</td> <td>2016/11/15/18:16</td> <td> <ul> <li>修理轮胎</li> <li>修理车灯</li> <li>修理发动机</li> <li>修理轮胎</li> </ul> </td> <td>600</td> <td title=""> <p><button class="change-repair-info">更改</button></p> <p><button class="del-repair-info">删除</button></p> </td> </tr>')
// 	for(var i = 0; i < data.length; i ++){
// 		$('.check-table table tbody').append('<tr title="点击查看详情" staffId=' + data[i].id + '> <td>' + data[i].name + '</td> <td> ' + data[i].createTime + '</td>  <td>' + data[i].mobile + '</td> <td title=""> <p><button class="change-repair-info">更改</button></p> <p><button class="del-repair-info">删除</button></p> </td> </tr>')
// 	}
// }


// function checkStaff(fullpage){


// 	postData.name = $('.staff-name').val();
// 	postData.mobile = parseInt($('.staff-tel').val());
	
// 	$.post( 'http://139.129.222.154:8080/car/app/car/factory/queryFactoryWorkerList.do', postData, function(data){
// 		// data = JSON.parse(data)
// 		if(!data.code){
// 			data = JSON.parse(data)
// 		}
// 		if(data.code == '0000'){
// 			fullpage(data.data);
// 		}else{
// 			alert(data.errorMessage);
// 		}
// 	});
// }
// checkStaff(fullpage);

// // $(".del-repair-info").click(function)
// $('.check-table').on('click', '.del-repair-info',function(){
// 	// console.log($(this).parents('tr').attr('staffId'));
// 	if(confirm('确定删除')){
// 		deleteStaff($(this).parents('tr').attr('staffId'));
// 	}
// })

// function deleteStaff(a){
// 	var postData = {
// 		"mobile": "183",
// 		"password": "001",
// 		'factoryId': '16',
// 		'pageSize' : '10',
// 		'pageNo' : '1'
// 	};

// 	postData.id = parseInt(a);
// 	// postData.mobile = $('.staff-tel').val();
// 	// postData = (function(obj){ // 转成post需要的字符串.
// 	// 	var str = "";
// 	// 	// console.log(obj)
// 	// 	for(var prop in obj){
// 	// 	    // str += prop + "=" + obj[prop] + "&"
// 	// 	}
// 	// 	// console.log(str)
// 	// 	return str;
// 	// })(postData);
// 	console.log(postData);
// 	$.post( 'http://139.129.222.154:8080/car/app/car/factory/deleteWorker.do', postData, function(data){
// 		// data = JSON.parse(data)
// 		if(!data.code){
// 			data = JSON.parse(data)
// 		}
// 		if(data.code == '0000'){
// 			// console.log(data,data.data);
// 			// fullpage(data.data);
// 			window.location.reload();
// 		}else{
// 			alert(data.errorMessage);
// 		}
// 	});
// }




// $('.check-table').on('click', '.change-repair-info',function(){
// 	window.location.href = 'add-staff.html?changeId=' + $(this).parents('tr').attr('staffId');
// })
