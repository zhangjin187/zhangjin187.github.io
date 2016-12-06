app.config(["$routeProvider", function($routProvider){
	$routProvider
	// 客户
	.when("/check-repairTypeCost",{
		templateUrl:"module/check-storeCost.html"
	})
	.when("/add-repairTypeCost",{
		templateUrl:"module/add-storeCost.html"
	})
}]);


app.controller('addstoreCost', ['$http', '$rootScope', function($http, $rootScope){
	var self = this;
	self.sendData = {};
	// console.log($rootScope)
	self.sendData.factoryId = $rootScope.factoryId;

	self.addCost = function(){
		// 跨域angular
		$http({
			method	: 'POST',
			url     : 'http://139.129.222.154:8080/car/app/car/factory/saveRepareFeeItem.do',
			data    : postData(self.sendData),
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
		.success(function(data){
			if(data.code == '0000'){
				console.log(data,data.data);
				// self.datas = data.data;
				window.location.href = "#check-repairTypeCost";
			}else{
				alert(data.errorMessage)
				// console.log(data,data.data);
			}
		})
	}
	self.sureAdd = function (){
		self.sendData.name = self.name;
		self.sendData.primaryPrice = self.primaryPrice;
		self.sendData.salePrice = self.salePrice;
		self.sendData.number = self.number;
		self.sendData.memo = self.memo;
		console.log(self.sendData);
		this.addCost();
	}
}])



app.controller('checkstoreCost', ['$http', '$rootScope', function($http, $rootScope){
	var self = this;
	self.sendData = {};
	// console.log($rootScope)
	self.sendData.factoryId = $rootScope.factoryId;

	self.checkCost = function(){
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
				// console.log(data.data || data);
				self.datas = data.data;
			}else{
				console.log(data.errorMessage)
				// console.log(data,data.data);
			}
		})
		

	}
	self.del=function(e){
		var delData={
			id:angular.element(e.target).parents("tr").attr("dataid")
		}
		$http({
			method	: 'POST',
			url     : 'http://139.129.222.154:8080/car/app/car/factory/deleteRepareFeeItem.do',
			data    : postData(delData),
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
		.success(function(data){
			if(data.code == '0000'){
				location.reload();
				self.datas = data.data;
			}else{
				console.log(data.errorMessage)
				// console.log(data,data.data);
			}
		})
	}
	self.init = function (){
	
		console.log(self.sendData);
		this.checkCost();
	}
	self.init();
	self.update=function(e){
		$(".check-store .update-table").show();
		self.changeData = {
//			factoryId:'18',
			id:null,
			name:"",
			createTime : '',
			primaryPrice: null,
			salePrice : null,
			number: null,
			memo:""
		};
		console.log(self.datas);
		for(var prop in self.changeData){
			self.changeData[prop] = self.datas[e][prop];
		}
//		self.changeData.factoryId = 18;
	}
	
	self.confirm=function(e){
			console.log(self.changeData);
			$http({
				method: 'POST',
				url: 'http://139.129.222.154:8080/car/app/car/factory/updateRepareFeeItem.do',
				data: postData(self.changeData),

				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}

			})
			.success(function(data) {
				if(data.code == '0000') {
					console.log(data.successMessage)
					location.reload();
				} else {
					console.log(data)
				}
			})
	}
		$(".update-table  .cancel").on("click",function(e){
		$(".update-table").hide()
	
})
}])
