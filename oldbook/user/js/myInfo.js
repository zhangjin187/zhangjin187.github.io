app.config(["$routeProvider", function($routProvider){
	$routProvider
	// 库存
	.when("/check-self",{
		templateUrl:"module/myInfo.html"
	})
}]);

app.controller('myInfo', ['$http', '$rootScope', function($http, $rootScope){
	var self = this;
	var formData = new FormData();
	var aaa = {};
	self.sendData = {
		factoryId : $rootScope.factoryId,
		id : $rootScope.factoryId
	};
	// console.log(postData(self.sendData));
	self.checkInfo = function(){
		$http({
			method	: 'POST',
			url     : 'http://139.129.222.154:8080/car/app/car/factory/queryFactory.do',
			data    : postData(self.sendData),
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
		.success(function(data){
			if(data.code == '0000'){
				self.factoryInfo = data.data;
				// console.log(data.data);
				document.getElementById('img1').src = data.data.headImg;
				document.getElementById('img1').style.display= "block";
				
				// console.log(self)
			}else{
				alert(data.errorMessage)
			}
		})
	};

	self.changePwd = function(){
		// console.log(this)
		if(self.factoryInfo.changePassword != self.factoryInfo.repeatPassword){
			self.factoryInfo.samePwd = '两次密码不同';
		}else{
			self.factoryInfo.samePwd = '';
		}
	}

	// 更改信息
	self.submit = function(){
		// console.log(self.sendData.factoryId);
		// console.log(self.factoryInfo);
		
		if(self.factoryInfo.changePassword > 6 && self.factoryInfo.changePassword == self.factoryInfo.repeatPassword){
			self.factoryInfo.password = self.factoryInfo.changePassword;
		}else{
			self.factoryInfo.passwordNotChange = '6-16位数字和字母'
		}
		
		// self.factoryInfo.factoryId = self.factoryInfo.id;
		$http({
			method	: 'POST',
			url     : 'http://139.129.222.154:8080/car/app/car/factory/updateFactory.do',
			data    : self.factoryInfo,
			transformRequest: function(data) {
				
				var formData = new FormData();
				// formData.append('file', data.file);
				formData.append('factoryId', data.id);
				formData.append('id', data.id);
				formData.append('password', data.password);
				formData.append('name', data.name);
				formData.append('address', data.address);
				// console.log(data.id,data.factoryId)
				return formData;
			},
			// data    : self.sendData,
			headers : {
				'Content-Type': undefined
			}
		})
		.success(function(data){
			if(data.code == '0000'){
				// console.log(data.data || data.successMessage);
				window.location.href = '#check-self'
			}else{
				alert(data.errorMessage)
			}
		});
	}
	self.upDataImg = function(){
		
		// console.log(aaa)
		aaa.factoryId = 18;
		$http({
			method	: 'POST',
			url     : 'http://139.129.222.154:8080/car/app/car/factory/uploadHeadImg.do',
			// data    : aaa,
			transformRequest: function(data) {
				var formData = new FormData();
				formData.append('file', data.file);
				formData.append('factoryId', data.factoryId);
				return formData;
			},
			data    : aaa,
			headers : {'Content-Type': undefined}
		})
		.success(function(data){
			if(data.code == '0000'){
				// console.log(data.data);
				window.location.reload();
			}else{
				alert(data.errorMessage)
			}
		})
	}


	fileChang = function(a){
		// console.log(a);
		// console.log(e.target.files,e.dataTransfer.files);
		self.style = {'display':'block'}
		if(a.value){
			document.getElementById('upImg').style.display = 'block';
			// console.log(a.files,a.target)
			aaa.file = a.files[0];
			document.getElementById('img1').src = window.URL.createObjectURL(a.files[0]);
			document.getElementById('img1').style.display= "block";
			
		}
	}



	self.init = function(){
		document.getElementById('img1').style.display= "none";
		self.checkInfo();
	}
	self.init();


}]);

