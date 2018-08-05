$(function(){
  'use strict';
  // init tab control
  tabCtl();
  // 日期选择
  $('#screen-date').daterangepicker({
    singleDatePicker: true,
    "locale": {
      "format": "YYYY/MM/DD",
      "daysOfWeek": ["日","一","二","三","四","五","六"],
      "monthNames": ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
    },
    "startDate": "2017/12/02"
  },function(start) {
    console.log(start.format('YYYY-MM-DD'))
  });
  // 门票预定详情
  $(".details-bk").on("click",'.ticket-prod',function(){
    var parents = $(this).parent().parent();
    var dt = parents.find(".ticket-info-dt");
    if(dt.is(":hidden")){
      $(".ticket-bk-list li").removeClass("active");
      $(".ticket-info-dt").slideUp(200);
      parents.addClass("active");
      dt.slideDown(200);
    }else{
      parents.removeClass("active");
      dt.slideUp(200);
    }
  });
  // 隐藏同行价
  $(".show-peer-price").on("click",function(){
    var eye = $(this).find("i");
    if(!eye.hasClass("hide")){
      eye.addClass("hide");
      $(".ticket-bk-prc-hide").show();
    }else{
      eye.removeClass("hide");
      $(".ticket-bk-prc-hide").hide();
    }
  });
  // tab
  $(".prod-dt-con .index-tab").scrollFloat({
    index: $(".tab-ctx-wrp .tab-ctx"),
    indexDiffer: 65,
    tabClass: "cur"
  })
});