app.config(["$routeProvider", function($routProvider) {
	$routProvider
	// 库存
		.when("/add-manager", {
			templateUrl: "module/add-manager.html"
		})
		.when("/check-manager", {
			templateUrl: "module/check-manager.html"
		})
}]);

app.controller('addmanager', ['$http', '$rootScope', function($http, $rootScope) {

	var self = this;
	self.submit = function() {
		var nameReg = /^\D/g
		if(!nameReg.test(self.name)) {
			alert("名字不能以数字开头吖")
			return;
		}
		var telReg = /^1[3,5,4,7,8]{1}\d{9}/
		if(!telReg.test(self.tel)) {
			alert("请输入正确的电话号码")
			return;
		}
		var idReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
		if(!idReg.test(self.idNum)) {
			alert("请输入正确的身份证号码")
			return;
		}
		var obj = {};
		obj.factoryId = $rootScope.factoryId;
		obj.name = self.name;
		obj.mobile = self.tel;
		obj.idNo = self.idNum;
		$http({
			method: 'POST',
			url: 'http://139.129.222.154:8080/car/app/car/factory/saveFactoryManger.do',
			data: postData(obj),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})

		.success(function(data) {
				if(data.code == '0000') {
					//console.log(data.successMessage||data.data);

					location.href = '#check-manager';
				} else {
					alert(data.errorMessage)
						// console.log(data,data.data);
				}
			})
			location.href = '#check-manager';
	};
}]);
app.controller('checkmanager', ['$http', function($http) {
	var self = this;
	// 跨域angular
	var _data = {
		factoryId: rootData.factoryId
	}
	var updateData={
 			factoryId:rootData.factoryId
 		}
	self.update=function(e){
		$(".check-manager .update-table").show()
		self.changeData = {
			name: '',
			id : '',
			factoryId : '',
			mobile : '',
			idNo : ''
		};
		for(var prop in self.changeData){
			self.changeData[prop] = self.datas[e][prop];
		}
		console.log(self.changeData)
//		updateData.id=self.changeData.id;
	}
	self.del = function(e) {
		_data.id = angular.element(e.target).parent().parent().parent().attr("managerId")
		$http({
				method: 'POST',
				url: 'http://139.129.222.154:8080/car/app/car/factory/deleteFactoryManger.do',
				data: postData(_data),

				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}

			})
			.success(function(data) {
				if(data.code == '0000') {

					location.reload();
				} else {
					alert(data.errorMessage)
				}
			})
	}
	console.log(rootData);
	rootData.pageSize = 10;
	$http({
		method: 'POST',
		url: 'http://139.129.222.154:8080/car/app/car/factory/queryFactoryMangerList.do',
		data: postData(rootData),
		
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})

	.success(function(data) {
		if(data.code == '0000') {
			 console.log(data,data.data);
			self.datas = data.data;

		} else {
			console.log(data.errorMessage)
				// console.log(data,data.data);
		}
	})

	.error(function(data, status, headers, config) {

		// deferred.reject('Then was an error');
	});
   self.confirm=function(e){
 		updateData.name=angular.element(e.target).parents("tr").find("th:nth-child(1) input").val();
 		updateData.mobile=angular.element(e.target).parents("tr").find("th:nth-child(2) input").val();
 		updateData.idNo=angular.element(e.target).parents("tr").find("th:nth-child(3) input").val();
 		console.log('self.changeData',self.changeData);
 			$http({
				method: 'POST',
				url: 'http://139.129.222.154:8080/car/app/car/factory/updateFactoryManger.do',
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
					console.log(data.errorMessage)
				}
			})
// 		console.log(updateData)
   }
	$(".update-table  .cancel").on("click",function(e){
		$(".update-table").hide()
	
})
}]);

