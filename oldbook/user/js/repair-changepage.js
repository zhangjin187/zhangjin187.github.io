
// 最大页数
var maxpage = 7;
var pagenum = 1;
// 生成点击个数
function changeclicknum(){
	if(!maxpage){
		maxpage = 1;
	}
	$('.pagenum a').remove()
	// console.log((i < maxpage) && (i > pagenum +3))
	for(var i = pagenum-3; ((i < maxpage) && (i < pagenum +2)); i++){
		if(i < 0) i = 0;
		// console.log(i)
		$('.pagenum').append('<a num="'+ (i+1) +'">' + (i+1) + '</a>');
	}
}




function reloadTable(data){
	$('table tbody tr').remove()
	// console.log($('table tbody tr'));
	// <tr title="点击查看详情"> <td>2016/11/15/18:16</td> <td>zzzzz</td> <td> <ul> <li>修理轮胎</li> <li>修理车灯</li> <li>修理发动机</li> <li>修理轮胎</li> </ul> </td> <td>600</td> <td>王师傅</td> <td title=""> <!-- <p><button class="detail-repair-info">详情</button></p> --> <p><button class="change-repair-info">更改</button></p> <p><button class="del-repair-info">删除</button></p> </td> <!-- <td><a href="#">详情</a></td> --> <!-- <td></td> --></tr>
	// console.log(data)
	for(var i = 0; i < data.length; i++){
		// 新的一组数据
		var newTr = '<tr title="点击查看详情"> <td>' + data[i].time + '</td> <td>' + data[i].name + '</td> <td> <ul>';
		// console.log(data[i].repairlist)
		// 添加修理类型
		for(var j = 0; j < data[i].repairlist.length; j++){
			newTr += '<li>' + data[i].repairlist[j] + '</li>';
		}

		newTr += '</ul> </td> <td>' + data[i].money + '</td> <td>' + data[i].repairName + '</td> <td title=""> <p><button class="change-repair-info">更改</button></p> <p><button class="del-repair-info">删除</button></p> </td> </tr>';
		$('table tbody').append(newTr);
	}
		// $(newTr).find('ul').append('<li>111</li>');
	// console.log($(newTr))
}

