$(document).ready(function () {

  $('.table_cont> tr:gt(4)').hide();
  $('.expan_btn').click(function(){
		$(this).parent().find('.table_cont tr:gt(4)').toggle();
		$(this).text('收起');
	});
	
	$(".pagination").pagination({
       pageCount: 50,
       jump: true,
       coping: true,
       jumpBtn: '确定',
       prevContent: '上一页',
       nextContent: '下一页'
    });
});
