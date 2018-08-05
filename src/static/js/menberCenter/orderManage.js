$(document).ready(function() {
  $(".left-nav").scrollFloat({
    isFill: false
  });
  // $(".headRow").scrollFloat({
  // });
  $(".pagination").pagination({
    pageCount: 50,
    jump: true,
    coping: true,
    jumpBtn: '确定',
    prevContent: '上一页',
    nextContent: '下一页',
    count: 2
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
      title: '取消订单申请',
      placeholder: '请输入申请取消订单的原因',
      callbackFn: function (vals) {
        console.log(vals);
      }
    });
  });
  $('.alert-cancel').on('click', function (){
      gzui.comfirm({
          title: "确认取消订单",
          saveBtn: "确定",
          cancelBtn: "取消",
          content: "是否取消订单？",
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

  $('.appeal').on('click', function (){
      gzui.editText({
          title: '申诉',
          placeholder1: '填写申诉内容（必填）',
          callbackFn: function (vals) {
              console.log(vals);
          }
      });
  })
  $('.toDetail').on('click', function () {
    window.location.href = '/page/menberCenter/statementDetail.html'
  })
  $("#statement-date-range").daterangepicker({
      showDropdowns: !0,
      autoApply: !0,
      startDate:new Date(),
      hasSame:false,
      locale: {
          format: "YYYY/MM/DD",
          daysOfWeek: ["日", "一", "二", "三", "四", "五", "六"],
          monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
          firstDay: 1
      }
    }, function(t, e, a) {
        $("#statement-date-range").val(t.format("YYYY-MM-DD") + '-' + e.format("YYYY-MM-DD"))
    })

});