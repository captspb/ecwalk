$(document).ready(function () {
    navCtl('gty');
    // search more btn
    $('.btn-list .down-ctl').click(function () {
        if ($(this).hasClass('up-ctl')) {
            $(this).removeClass('up-ctl');
            $(this).parent().parent().removeClass('shrink');
        } else {
            $(this).addClass('up-ctl');
            $(this).parent().parent().addClass('shrink');
        }
    });
    // more pick
    $(".more-ctl").click(function () {
        $(this).parent().hide();
        $(this).addClass('up-ctl');
        $(this).parent().parent().addClass('shrink').addClass('morepick');
        $(this).parent().parent().find('.confirm-btn-list-wrp').show();
    });
    // cancel btn
    $(".cancel-btn").click(function () {
        var parent = $(this).parent().parent().parent().parent();
        parent.removeClass('shrink').removeClass('morepick');
        parent.find('.btn-list').show();
        parent.find(".tag-check-box").removeClass('checked');
        parent.find('.confirm-btn-list-wrp').hide();
    });
    // checkbox pick
    $(".tag-wrp").click(function () {
        $(this).find('.tag-check-box').toggleClass('checked');
    });
    // commit btn
    $(".ok-btn").click(function () {
        var parent = $(this).parent().parent().parent().parent();
        var pickitem = [];
        for (var i = 0; i < parent.find('.tag-check-box.checked').length; i++) {
            pickitem.push(parent.find('.tag-check-box.checked').eq(i).attr('data-val'));
        }
        parent.removeClass('shrink').removeClass('morepick');
        parent.find('.btn-list').show();
        parent.find(".tag-check-box").removeClass('checked');
        parent.find('.confirm-btn-list-wrp').hide();
        console.log(pickitem);
    });
    // price focus
    $(".start-price input, .end-price input").focus(function () {
        $(this).parent().addClass('had-price');
    }).blur(function () {
        if ($(this).val() === '') {
            $(this).parent().removeClass('had-price');
        }
        if ($('.start-price input').val()!=='' || $('.end-price input').val() !== '') {
            $(".sr-btn").removeClass('ban');
        }
    });
    // pagination
    $(".pagination").pagination({
        pageCount: 50,
        jump: true,
        coping: true,
        jumpBtn: '确定',
        prevContent: '上一页',
        nextContent: '下一页'
    });
    // tab
    tabCtl();
    // select
    $(".list-ctl-ctx ul li.select").click(function () {
       $(this).toggleClass('cur');
    });
    // checkbox
    $(".list-cbox").click(function () {
        $(this).find('.check-box').toggleClass('checked');
    });

   // 日期选择
  $('#start-date').daterangepicker({
    "singleDatePicker": true,
    "showDropdowns": true,
    "autoApply": true,
    "locale": {
      "format": "YYYY/MM/DD",
      "daysOfWeek": ["日","一","二","三","四","五","六"],
      "monthNames": ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
      "firstDay": 1
    }
  }, function(start, end, label) {
    console.log("New date range selected: " + start.format('YYYY-MM-DD') + " to " + end.format('YYYY-MM-DD') + " (predefined range: " + label + ")");
  });
  $('#end-date').daterangepicker({
    "singleDatePicker": true,
    "showDropdowns": true,
    "autoApply": true,
    "locale": {
      "format": "YYYY/MM/DD",
      "daysOfWeek": ["日","一","二","三","四","五","六"],
      "monthNames": ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
      "firstDay": 1
    }
  }, function(start, end, label) {
    console.log("New date range selected: " + start.format('YYYY-MM-DD') + " to " + end.format('YYYY-MM-DD') + " (predefined range: " + label + ")");
  });


});