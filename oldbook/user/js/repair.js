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
		// mobile : '13070552899',
		// password : '123456',
		// factoryId : 1,
		pageSize : 100,
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
	// 成功返回函数
	.success(function(data){
		if(data.code == '0000'){
			console.log(data.data || data.success)
			self.data = data.data;
			// console.log(data,self.data)
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
	$('.repairTime').jeDate({
	    format:"YYYY-MM-DD hh:mm",
	    isTime:true, 
	    minDate:"2016-09-19 00:00:00",
	    okfun:function(){return false}
	})
	var self = this;
	function RepairMoney (type,money,num) {
		this.type = type;
		this.money = money;
		this.number = num;
	}
	// 获取修理类型复选框数组
	self.repairTypeArr = function (){
		// 跨域angular
		$http({
			method	: 'POST',
			url     : 'http://139.129.222.154:8080/car/app/car/factory/queryRepareTypeList.do',
			data    : postData(self.sendData),
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
		.success(function(data){
			if(data.code == '0000'){
				// console.log(data.data || data);
				self.repairTypes = data.data;
			}else{
				console.log(data.errorMessage)
			}
		})
	}

	// 初始化函数
	self.init = function(){
		self.sendData = {};
		self.sendData.factoryId = $rootScope.factoryId;
		self.repairTypes = ['修轮胎','修底盘'];
		self.repairMoneys = [new RepairMoney('换前胎')];
		console.log(self.repairMoneys)
		// 添加订单发送数据对象
		self.addRepair = {};
		self.addRepair.repareTypeIds = [];
		self.repairTypeArr();
		self.checkcustomer();
		self.checkstaff();
		self.checkCost();
	}

	// 原生
	// function fun(){
	//     obj = document.getElementsByName("test");
	//     check_val = [];
	//     for(k in obj){
	//         if(obj[k].checked)
	//             check_val.push(obj[k].value);
	//     }
	//     alert(check_val);
	// }

	// 删除修理类型
	self.delrepairMoney = function(index, e){
		self.repairMoneys.splice(index, 1);
	}
	// 添加费用
	self.addrepairMoney = function(){
		if(self.newMoney){
			self.repairMoneys.push(new RepairMoney(self.newMoney));
			self.newMoney = '';
			console.log(self.repairMoneys)
		}
	};
	// 
	self.addrepair = function(){
		self.addRepair.repareTypeIds = [];
		for(var i = 0; i < self.repairTypes.length; i++){
			if(self.repairTypes[i].checked){
				self.addRepair.repareTypeIds.push(self.repairTypes[i].id)
			}
		}
		self.addRepair.repareTypeIds += ""
		console.log(self.addRepair);
		console.log(self.repairCost);
		return;
		self.addrepairHttp();
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
				console.log(data.data || data.successMessage)
				
			}else{
				console.log(data.errorMessage);
			}
		})
	};
	// 顾客列表
	self.checkcustomer = function(){
		// console.log(self.sendData);
		self.sendData.pageSize = 100;
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
				// console.log(data.data || data);
				// location.href = '#check-customer'
				self.customerArr = data.data;
			}else{
				alert(data.errorMessage)
				// console.log(data,data.data);
			}
		})
	};
	// 修理人列表
	self.checkstaff = function(){
		self.check_staffData = {
			'factoryId' : 18,
			'pageSize' : 100,
			'pageNo' : 1
		};
		self.check_staffData.factoryId = $rootScope.factoryId;
		
		
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
				// console.log(data.data || data.successMessage);
	
				self.workerArr = data.data;
			}else{
				console.log(data.errorMessage)
				// console.log(data,data.data);
			}
		})
	};
	// 费用条目列表
	self.checkCost = function(){
		self.sendData.pageSize = 100;

		// 跨域angular
		$http({
			method	: 'POST',
			url     : 'http://139.129.222.154:8080/car/app/car/factory/queryRepareFeeItemList.do',
			data    : postData(self.sendData),
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
		.success(function(data){
			if(data.code == '0000'){
				console.log(data.data || data);
				self.repairCostArr = data.data
				// self.datas = data.data;
			}else{
				console.log(data.errorMessage)
				// console.log(data,data.data);
			}
		})
	}
	self.init();
}]);


