!function (){
	var postData={
		"factoryId":16,
		"itemName":"发动机",
		"userId":1,
		"workerId":2,
		"status":1,
		"repareStartTime":"2016-11-12",
		"repareEndTime":"2016-11-13",
		"workingHours":12,
		"repareFee":1000,
		"realRecieveFee":500,
		"repayTime":"2016-11-12",
		"settlement":"2016-11-14",
		"memo":"没有"
	};
	
	
	$.post("http://139.129.222.154:8080/car/app/car/orders/queryOrdersList.do",postData,function (data){
		console.log(data)
		if(data.data.list.length==0){
			var newP=$("<p>您暂时没有订单信息</p>")
			newP.css({"font-size":20,"line-height":"200px","text-align":"center"})
			$(".check-order").html(newP)
		}else{
			var newTr=$('<tr><td>1</td><td>2</td><td>3</td><td>4</td><td><a href="#">修改</a></td></tr>')
		}
	})
}()
