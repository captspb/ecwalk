$(function(){
  'use strict';
  // 邮轮预定
  var cruiseDateList = $(".cruise-date-list");
  var cruiseDateBtn = $(".cruise-date-sel-btn");
  var dateW = 0;
  $("li",cruiseDateList).each(function(i){
    dateW += $(this).outerWidth();
    $("ul",cruiseDateList).css("width",dateW);
    $(this).on("click",function(){
      var firstL = $("li",cruiseDateList).first().offset().left;
      $(this).addClass("active").siblings().removeClass("active");
      cruiseDateList.stop().animate({scrollLeft: $("li",cruiseDateList).eq(i).offset().left - firstL},500);
      if(i==0){
        $(".arrow-left",cruiseDateBtn).addClass("disabled");
      }else{
        $(".arrow-left",cruiseDateBtn).removeClass("disabled");
      }
    });
  });
  if (dateW<983) {
    cruiseDateBtn.hide();
  }
  $(".left-btn",cruiseDateBtn).on("click",function(){
    var index = $("li",cruiseDateList).index($("li.active",cruiseDateList));
    if(index>0){
      index--;
      if(index == 0){
        $(this).find(".arrow-left").addClass("disabled");
      }
      $("li",cruiseDateList).eq(index).addClass("active").siblings().removeClass("active");
      cruiseDateList.stop().animate({scrollLeft: $("li",cruiseDateList).eq(index).offset().left - $("li",cruiseDateList).first().offset().left},500);
    }
  })
  $(".right-btn",cruiseDateBtn).on("click",function(){
    var index = $("li",cruiseDateList).index($("li.active",cruiseDateList));
    if(index < $("li",cruiseDateList).length - 1){
      index++;
      $(".arrow-left",cruiseDateBtn).removeClass("disabled");
      $("li",cruiseDateList).eq(index).addClass("active").siblings().removeClass("active");
      cruiseDateList.stop().animate({scrollLeft: $("li",cruiseDateList).eq(index).offset().left - $("li",cruiseDateList).first().offset().left},500);
    }
  });
  $(".cruise-bk-stepper").each(function(){
    if(!$(this).hasClass("sellout")){
      $(this).stepper();
    }else{
      $(this).text("--");
    }
  });
  // 预定明细
  $(".cruise-bk-dt-steppr").stepper();
  // init tab control
  tabCtl();
  //
  $(".cruise-bk-room-sel li").on("click",function(){
    var e = $(this).parents(".cruise-bk-room-sel").find("em");
    e.text($(this).text());
  });
  // 行程介绍
  $(".trip-sidebar").scrollFloat({
    index: $("[data-index='prod-trip']"),
    indexDiffer: 46,
    startDiffer: 56,
    isFill: false
  });
  // tab
  $(".prod-dt-con .index-tab").scrollFloat({
    index: $(".tab-ctx-wrp .tab-ctx"),
    indexDiffer: 65,
    tabClass: "cur"
  })
});