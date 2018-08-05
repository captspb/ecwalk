$(document).ready(function () {
    $(".pagination").pagination({
        pageCount: 50,
        jump: true,
        coping: true,
        jumpBtn: '确定',
        prevContent: '上一页',
        nextContent: '下一页'
    });
});
