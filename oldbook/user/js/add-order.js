
	
app.controller('add-order',['$rootScope',"$http",function($rootScope,$http){
	var self=this;
	self.customerName=[]
	var postCustomer={
		factoryId:$rootScope.factoryId
	}
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
			 console.log(data.data);
			
			 	self.customerName=data.data
		
			console.log(self.customerName);
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
		
	}
}]);
