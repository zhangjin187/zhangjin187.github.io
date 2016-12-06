
	
app.controller('add-order',['$rootScope',"$http",function($rootScope,$http){
	var self=this;
	self.customerName=[]
	var postCustomer={
		factoryId:$rootScope.factoryId
	}
	//客户姓名
		$http({
		method: 'POST',
		url: 'http://139.129.222.154:8080/car/app/car/factory/queryFrontUserList.do',
		data: postData(postCustomer),
		
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})

	.success(function(data) {
		if(data.code == '0000') {
			 	self.customerName=data.data
		} else {
			console.log(data.errorMessage)
				// console.log(data,data.data);
		}
	})
	//维修条目
	$http({
		method: 'POST',
		url: 'http://139.129.222.154:8080/car/app/car/factory/queryRepareTypeList.do',
		data: postData(postCustomer),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})

	.success(function(data) {
		if(data.code == '0000') {
			var arr=data.data
			 	console.log(data.data);
				for (var i = 0; i < arr.length; i++) {
					console.log(arr[i].id);
				}			 	
		} else {
			console.log(data.errorMessage)
				// console.log(data,data.data);
		}
	})
	

	$(".add-order").find("#dateinfo").jeDate({
    format:"YYYY-MM-DD hh:mm",
    isTime:true, 
    minDate:"2016-09-19 00:00:00",
    okfun:function(){return false}
})
	self.confirm=function(e){
		var $customer=$(".order-customer select option:selected");
		var $date=$(".order-date input").val();
		var orderData={
			factoryId:$rootScope.factoryId,
			userId:$customer.attr("customid"),
			userName:$customer.text(),
			userMobile:$(".order-mobile input").val(),
			carNo:$(".order-carNo input").val(),
			prepareTime:$date,
			repareId:"111"
		}
		console.log(orderData);
		var telReg = /^1[3,5,4,7,8]{1}\d{9}/
		if(!telReg.test(self.tel)) {
			alert("请输入正确的电话号码")
			return;
		}
		if(!$date){
			alert("日期不能为空");
			return;
		}
		$http({
		method: 'POST',
		url:"http://139.129.222.154:8080/car/app/car/factory/savePrepareOrders.do",
		data: postData(orderData),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})

	.success(function(data) {
		if(data.code == '0000') {
			 	console.log(data.data)
			 	location.href="#check-order"
		} else {
			alert(data.errorMessage)
				 console.log(data,data.data);
		}
	})
	}
		

}]);
