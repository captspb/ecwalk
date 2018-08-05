$(document).ready(function() {
  $(".left-nav").scrollFloat({
    isFill: false
  });
  $(".pagination").pagination({
    pageCount: 50,
    jump: true,
    coping: true,
    jumpBtn: '确定',
    prevContent: '上一页',
    nextContent: '下一页'
  });

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

  $('#order-start-date').daterangepicker({
    "singleDatePicker": true,
    "showDropdowns": true,
    "autoApply": true,
    "locale": {
      "format": "YYYY/MM/DD",
      "daysOfWeek": ["日","一","二","三","四","五","六"],
      "monthNames": ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
      "firstDay": 1
    },
    "opens": "left"
  }, function(start, end, label) {
    console.log("New date range selected: " + start.format('YYYY-MM-DD') + " to " + end.format('YYYY-MM-DD') + " (predefined range: " + label + ")");
  });

  $('#order-end-date').daterangepicker({
    "singleDatePicker": true,
    "showDropdowns": true,
    "autoApply": true,
    "locale": {
      "format": "YYYY/MM/DD",
      "daysOfWeek": ["日","一","二","三","四","五","六"],
      "monthNames": ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
      "firstDay": 1
    },
    "opens": "left"
  }, function(start, end, label) {
    console.log("New date range selected: " + start.format('YYYY-MM-DD') + " to " + end.format('YYYY-MM-DD') + " (predefined range: " + label + ")");
  });

  $('.clear-date').on('click', function(){
    $(this).parent().find('input').val('')
  })

  $('.cancel-order').on('click', function (){
    gzui.editText({
      title: '取消订单',
      placeholder: '请输入取消订单的原因',
      callbackFn: function (vals) {
        console.log(vals);
        
      }
    });
  });

  $('.update').on('click', function (){
    gzui.updateTravel({
      title: '变更订单',
      placeholder1: '变更订单标题（必填）',
      callbackFn: function (vals) {
        console.log(vals);
        
      }
    });
  })

  $('.comfirm-ticket').on('click', function (){
    gzui.comfirm({
      title: "确认出票",
      saveBtn: "确定",
      cancelBtn: "取消",
      content: "是否确认出票？",
      callbackFn: function (vals) {
        console.log(vals);
        
      }
    });
  });

  // 订单数、价格计算
  orderNum();
  function orderNum () {
    var orderLen = 0;
    var orderTotal = 0;
    var orderFooter = $(".order-footer");
    $(".batch-payment .icon-uncheck.checked").each(function () {
      var list = $(this).parents(".payment-list-group").find(".payment-list-table li");
      orderLen += list.length - 1;
      list.each(function () {
        var num = $(this).find(".payment-order-amount em").text();
        if (num) {
          orderTotal += parseInt(num);
        }
      })
    });
    $(".checked-num span", orderFooter).text(orderLen);
    $(".checked-price span", orderFooter).text("￥"+orderTotal);
  }
  // 勾选
  var checkout = $(".payment-list-hd .icon-uncheck");
  checkout.on("click", function () {
    checkout.removeClass("checked");
    $(this).addClass("checked");
    orderNum();
  });
  // 查看更多
  $(".show-more-payment-order span").on("click", function () {
    $(this).parents(".payment-list-bd").toggleClass("notshow");
  });
  // 移除
  $(".payment-list-table").on("click", ".remove-btn", function () {
    var group = $(this).parents(".payment-list-group");
    var bd = $(this).parents(".payment-list-bd");
    $(this).parents(".payment-list-item").remove();
    var len = parseInt(bd.find("li").length)-1;
    group.find(".check-num").text(len)
    switch(len){
      case 0:
        group.remove();
        break;
      case 1:
        bd.find(".show-more-payment-order").hide();
        break;
      default:
        bd.find(".hide-tip em").text(len);
    }
    if ($(".payment-list-group").length === 0) {
      $(".no-order-tip").show();
    }
    orderNum();
  })
});