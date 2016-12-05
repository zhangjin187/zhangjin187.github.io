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

// 判断页面状态
function nowPage (){
	changeclicknum();
	// console.log(pagenum)
	$('.pagechange b').show();
	if(pagenum <= 1){
		pagenum = 1;
		$('b.first,b.prev').hide();
	}else if(pagenum >= maxpage){
		pagenum = maxpage;
		$('b.end,b.next').hide();
	}
	$('.pagenum a[num=' + pagenum + ']').addClass('checked').siblings().removeClass('checked');

}
nowPage();


changeclicknum();
	
// 点击数值按钮
// $('.pagenum a').click(function(){
	
// })
$('.pagenum').on('click', 'a', function(){
	pagenum = parseInt(this.innerHTML);
	// $(this).addClass('checked').siblings().removeClass('checked');
	nowPage();
	reloadTable(e);
})

// 首页
$('b.first').click(function(){
	pagenum = 1;
	nowPage();
	reloadTable(e);
})
// 上一页
$('b.prev').click(function(){
	pagenum --;
	nowPage();
	reloadTable(e);
})

// 下一页
$('b.next').click(function(){
	pagenum ++;
	nowPage();
	reloadTable(e);
})

// 尾页
$('b.end').click(function(){
	pagenum = maxpage;
	nowPage();
	reloadTable(e);
})

