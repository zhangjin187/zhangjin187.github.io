// $('table input[type=text],table input[type=password]').blur(function(){
// 	// console.log(this.value)
// 	if(this.value.length < 6){
// 		$(this).addClass('inError');
// 		return;
// 	}
// 	$(this).parent().removeClass('inError');

// });
var username,phonenumber,verificationcode,password,password1,checkbox;
// 判断用户名
$('table input[name=username]').blur(function(){
	// console.log(this.value)
	if(this.value.length < 3 || this.value.length > 12){
		$(this).parent().addClass('inError');
		username = false;
		return;
	}
	$(this).parent().removeClass('inError');
	username = true;
});

// 判断phonenumber
$('table input[name=phonenumber]').blur(function(){
	// console.log(this.value)
	var res=/^1[3,5,8,7]{1}\d{9}/;
	if(!res.test(this.value)){
		$(this).parent().addClass('inError');
		phonenumber = false;
		return;
	}
	$(this).parent().removeClass('inError');
	phonenumber = true;
});

$('table button[name=verificationcode]').click(function(){
	// console.log(this.value)
	// 判断手机号码
	if(!phonenumber){
		$('table input[name=phonenumber]').parent().addClass('inError');
		phonenumber = false;
		return;
	}
});

// 判断verificationcode
$('table input[name=verificationcode]').blur(function(){
	// console.log(this.value)
	if(!phonenumber){
		$('table input[name=phonenumber]').parent().addClass('inError');
		phonenumber = false;
		return;
	}
	if(this.value.length < 3 || this.value.length > 12){
		$(this).parent().addClass('inError');
		verificationcode = false;
		return;
	}
	$(this).parent().removeClass('inError');
	verificationcode = true;
});

// 判断password
$('table input[name=password]').blur(function(){
	// console.log(this.value)
	var res=/^[A-z|0-9]{6,16}/;
	if(!res.test(this.value)){
		$(this).parent().addClass('inError');
		password = false;
		return;
	}
	$(this).parent().removeClass('inError');
	password = true;

});

// 判断password1
$('table input[name=password1]').blur(function(){
	// console.log(this.value == $('table input[name=password]').val())
	// $('table input[name=password]').val()
	if(this.value != $('table input[name=password]').val()){
		$(this).parent().addClass('inError');
		password1 = false;
		return;
	}
	$(this).parent().removeClass('inError');
	password1 = true;
});

$('table input[name=submit]').click(function(){
	// console.log(this);
	$('table input').blur();
	// console.log()
	checkbox = $('table input[name=checked]').prop('checked')
	// console.log(checkbox)
	password1 = ($('table input[name=password1]').val() == $('table input[name=password]').val());
	// console.log(password1)
	if(username && phonenumber && verificationcode && password && password1 && checkbox){
		console.log('success')
	}
	// testpost()
})

// 显示服务条款
$('.register-main td>p>span').click(function(){
	if($('.ctrled').css('display') == 'none'){$('.ctrled').show(); return;};
	$('.ctrled').hide();
})






// function testpost(){
// 	$.ajax({ type : 'post',
// 		dataType : 'json',
// 		url :'http://139.129.222.154:8080/car/app/car/factory/queryRepareTypeList.do', data: 'mobile=183&password=qqq',
// 		success : function(data){
// 			console.log(data);
// 		},
// 		error : function(data){
// 			console.log(data);
// 		}
// 	})
// }

/* test */
function testpost(){
	var postData = {
	    "mobile": "183",
	    "password": "001",
	    'factoryId': '1',
	    'pageSize' : '10',
	    'pageNo' : '1'
	};
	 
	postData = (function(obj){ // 转成post需要的字符串.
	    var str = "";
	 
	    for(var prop in obj){
	        str += prop + "=" + obj[prop] + "&"
	    }
	    return str;
	})(postData);
	 
	var xhr = new XMLHttpRequest();
	xhr.open("POST", 'http://139.129.222.154:8080/car/app/car/factory/queryRepareTypeList.do', true);
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.send(postData);
	xhr.onreadystatechange = function(){
	    var XMLHttpReq = xhr;

	    // console.log(XMLHttpReq.readyState,XMLHttpReq.status)
	    if (XMLHttpReq.readyState == 4) {
	    	console.log()
	        if (XMLHttpReq.status == 200) {
	            var text = JSON.parse(XMLHttpReq.responseText);
	 
	            console.log(text.data);
	        }
	    }
	};
}