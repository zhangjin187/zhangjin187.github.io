app.config(["$routeProvider", function($routProvider){
	$routProvider
	// 修理信息
	.when("/add-repair",{
		templateUrl:"module/add-repair.html"
	})
	.when("/check-repair",{
		templateUrl:"module/check-repair.html"
	})
}]);


// 查看维修控制器
app.controller( 'checkrepair',['$http', '$rootScope', function($http, $rootScope){
	var self = this;
	// console.log($http)
	var rootData = {
		mobile : '13070552899',
		password : '123456',
		factoryId : 1,
		pageSize : 5,
		pageNo : 1
	};
	rootData.factoryId = $rootScope.factoryId;
	// console.log(postData(rootData))
	$http({
		method	: 'POST',
		url     : 'http://139.129.222.154:8080/car/app/car/orders/queryOrdersList.do',
		data    : postData(rootData),
		headers : {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})

	.success(function(data){
		if(data.code == '0000'){
			self.data = data.data;
			console.log(data,self.data)
		}else{
			console.log(data.errorMessage)
		}
	})

	.error(function(data, status, headers, config) {

		// deferred.reject('Then was an error');
	});
}]);




app.controller( 'add-repair',['$http', '$rootScope', function($http, $rootScope){
	// $('.add-info').click(function(){
	// 	console.log(this);
	// })
	var self = this;

	// 初始化函数
	self.init = function(){
		self.sendData = {};
		self.repairTypes = ['修轮胎'];
		self.sendData.factoryId = $rootScope.factoryId;
	}
	// 删除修理类型
	self.delrepairType = function(index, e){
		// var e = e || window.event;
		// console.log(index)
		// e.target
		self.repairTypes.splice(index, 1)
	}
	// 添加修理类型
	self.addrepairType = function(){
		if(self.newType){
			self.repairTypes.push(self.newType);
		}
		self.newType = '';
	};
	// 
	self.addrepair = function(){
		
	}
	self.addrepairHttp = function(){
		$http({
			method	: 'POST',
			url     : 'http://139.129.222.154:8080/car/app/car/orders/saveOrders.do',
			data    : postData(self.sendData),
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
		.success(function(data){
			if(data.code == '0000'){
				// self.data = data.data;
				console.log(data.data,self.data)
				self.checkcustomer();
			}else{
				console.log(data.errorMessage)
			}
		})
	};
	// 顾客列表
	self.checkcustomer = function(pagenum){
		console.log(self.sendData);
		$http({
			method	: 'POST',
			url     : 'http://139.129.222.154:8080/car/app/car/factory/queryFrontUserList.do',
			data    : postData(self.sendData),
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
		.success(function(data){
			if(data.code == '0000'){
				console.log(data.data || data);
				// location.href = '#check-customer'
				self.datas = data.data;
			}else{
				alert(data.errorMessage)
				// console.log(data,data.data);
			}
		})
	};
	self.init();
}]);


