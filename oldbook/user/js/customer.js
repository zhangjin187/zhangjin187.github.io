
app.config(["$routeProvider", function($routProvider){
	$routProvider
	// 客户
	.when("/check-customer",{
		templateUrl:"module/check-customer.html"
	})
	.when("/add-customer",{
		templateUrl:"module/add-customer.html"
	})
}]);





app.controller('addcustomerCtrl',['$rootScope', '$http', function($rootScope,$http){
	// console.log($rootScope);
	var self = this;
	self.sendData = {
		factoryId : '',
		vin : '',
		drivingLicence : '',
		carNo : ''
		// factoryId : ''
	};
	
	self.sureAdd = function(){
		// console.log(this)
		self.sendData.factoryId = $rootScope.factoryId;
		self.sendData.name = self.name;
		self.sendData.mobile = self.tel;
		self.sendData.vin = self.vin;
		self.sendData.drivingLicence = self.drivingLicense;
		self.sendData.carNo = self.carNo;
		var telReg = /^1[3,5,4,7,8]{1}\d{9}/
		if(!telReg.test(self.tel)) {
			alert("请输入正确的电话号码")
			return;
		}
		
	};
	self.addcustomer = function(){
		
		
		$http({
			method	: 'POST',
			url     : 'http://139.129.222.154:8080/car/app/car/factory/saveFrontUser.do',
			data    : postData(self.sendData),
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
		.success(function(data){
			if(data.code == '0000'){
				// console.log(data,data.data);
				location.href = '#check-customer'
				// self.datas = data.data;
			}else{
				alert(data.errorMessage)
				// console.log(data,data.data);
			}
		})
	}
	self.noAdd = function(){
		// console.log(this)
		// location.href = '#check-customer';
	}
}]);
// 查看
app.controller('checkcustomerCtrl',['$rootScope', '$http', function($rootScope,$http){
	// console.log($rootScope);
	var self = this;
	self.sendData={};
	self.sendData.factoryId = $rootScope.factoryId;
	self.sendData.pageSize = 10;
	self.checkcustomer = function(pagenum){
		if(pagenum){
			self.sendData.pageNo = pagenum;
		}
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
				self.datas = data.data;
			}else{
				alert(data.errorMessage)
				// console.log(data,data.data);
			}
		})
	};
	self.checkcustomer();
	$rootScope.changepage = self.checkcustomer;
}]);

app.controller('delcustomerCtrl',['$rootScope', function($rootScope){
	console.log($rootScope);
}]);