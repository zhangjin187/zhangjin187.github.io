// 增加维修类型
$('.staff-type').click(function(){
	// console.log($('.add-staff-ul').index($('<li><span>' + $(this).siblings('input').val() + '</span><input class="del-staff-type r" type="button" value="删除" /></li>')))
	if($(this).siblings('input').val()){
			$('.add-staff-ul').append('<li><span class="staff-type">' + $(this).siblings('input').val() + '</span><input class="del-staff-type r" type="button" value="删除" /></li>');
		}
	$(this).siblings('input').val('');
})

// 删除当前
$('.add-staff-ul').on('click', 'input[type=button]', function(){
	// console.log('del-staff-type')
	$(this).parents('li').remove();
})

// 是否离开
$('.no-add').click(function(){
	// console.log(12)
	if(confirm('是否放弃')){
		// console.log(1)
		window.history.back(-1);
	}else{

	}
});

window.onbeforeunload = function(event){
	// return '您数据还未保存'; 	//	上线保留
}


// 是否保存
$('.add-info').click(function(){
	addstaff();
})

var postData = {
	mobile : '13070552899',
	password : '123456',
	factoryId : 18
};
postData.mobile = $.cookie.get('mobile');
postData.password = $.cookie.get('password');
postData.factoryId = $.cookie.get('factoryId');

function addstaff(){
	postData.name = $('.staff-name').val();
	postData.mobile = $('.staff-tel').val();
	console.log(postData)
	$.post( 'http://139.129.222.154:8080/car/app/car/factory/saveWorker.do', postData, function(data){
		// data = JSON.parse(data)
		if(!data.code){
			data = JSON.parse(data)
		}
		if(data.code == '0000'){
			console.log(data,data.data);
			// window.location.href = 'check-staff.html';
		}else{
			alert(data.errorMessage)
			console.log(data,data.data);
		}
	});
}

