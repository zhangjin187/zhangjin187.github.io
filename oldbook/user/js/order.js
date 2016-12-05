app.config(["$routeProvider", function($routProvider){
	$routProvider
	// 订单
	.when("/check-order",{
		templateUrl:"module/check-order.html"
	})
	.when("/add-order",{
		templateUrl:"module/add-order.html"
	})
}]);

app.controller('add-order',['$http', '$rootScope', function($http,$rootScope){

}])


app.controller('check-order',['$http', '$rootScope', function($http,$rootScope){

}])


app.controller('add-order',['$http', '$rootScope', function($http,$rootScope){

}])
