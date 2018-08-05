$(function () {
  'use strict';
  // 出生日期
  $(".birth-date-item input, .passport-group input").each(function (){
    $("#"+$(this).attr("id")).daterangepicker({
      "autoUpdateInput": false,
      "minDate": new Date(),
      "singleDatePicker": true,
      "showDropdowns": true,
      "autoApply": true,
      "locale": {
        "format": "YYYY-MM-DD",
        "daysOfWeek": ["日","一","二","三","四","五","六"],
        "monthNames": ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
        "firstDay": 1
      }
    });
  });
  // 游客勾选
  $(".airTicket-visitor-check .check-item i").on("click", function (){
    if($(this).hasClass("icon-check")){
      $(this).attr("class", "icon-uncheck");
    }else if($(this).hasClass("icon-uncheck")){
      $(this).attr("class", "icon-check");
    }
  });
  // 性别选择
  $(".airTicket-visitor-info .gender-item span").on("click", function () {
    $(this).parent().removeClass("error");
    $(this).addClass("active").siblings().removeClass("active");
  });
  // 弹窗高度
  $(".bk-popup-con").css("max-height",$(window).height()*.8);
  // 常用游客
  var infoPopup = $(".airTicket-bk-popup");
  var infoPopupTit = $(".bk-popup-tit span", infoPopup);
  $(".airTicket-visitor-top .common-visitor").on("click", function () {
    $(".bk-popup-con>div").hide();
    infoPopup.show();
    infoPopupTit.text("选择常用游客");
    $(".common-tourists", infoPopup).show();
  });
  $(".common-tourists-list li", infoPopup).on("click", function () {
    $(this).addClass("active").siblings().removeClass("active");
  });
  // pagination
  $(".pagination", infoPopup).pagination({
    pageCount: 50,
    jump: true,
    coping: true,
    jumpBtn: '确定',
    prevContent: '上一页',
    nextContent: '下一页'
  });
  // 填写帮助
  $(".airTicket-visitor-top .order-help").on("click", function () {
    $(".bk-popup-con>div").hide();
    infoPopup.show();
    infoPopupTit.text("资料填写帮助");
    $(".fill-in-help", infoPopup).show();
    $(".help-tab-con").eq($(".help-tab-item li.active").index()).show();
  });
  $(".help-tab-item li").on("click", function(){
    $(this).addClass("active").siblings().removeClass("active");
    $(".help-tab-con").hide().eq($(this).index()).show();
  });
  // 航班详情
  $(".airTicket-bk-sidebar .show-flight-detail").on("click", function () {
    $(".bk-popup-con>div").hide();
    infoPopup.show();
    infoPopupTit.text("航程详情");
    $(".flight-details", infoPopup).show();
  });
  // 退改签、行李额、报销凭证、预订须知
  $(".airTicket-bk-sidebar .order-assist li").on("click", function () {
    $(".endorse-type-tab-con").hide().eq($(".endorse-type-tab-item li.active").index()).show();
    $(".bk-popup-con>div").hide();
    infoPopup.show();
    infoPopupTit.text($(this).find("p").text());
    $(".instructions-con", infoPopup).hide().eq($(this).index()).show();
    $(".instructions", infoPopup).show();
  });
  // 关闭弹窗
  $(".icon-close", infoPopup).on("click", function () {
    infoPopup.hide();
  });
  // 超时更新
  /*gzui.dialog({
    title: "航班信息需要更新",
    con: "当前页面长时间未操作，航班价格可能发生变动，请重新选择航班。",
    width: 400,
    btn: [
      {name: '重新搜索',className: 'active',click:function(){
          // gzui.toload({tip: "正在为您更新航班信息…"})
        }}
    ]
  });*/
  // 航班内容变更弹窗
  var flightChange = '<div class="flight-change-con">' +
    '<h2>非常抱歉，航班价格信息变动频繁，您订单中的价格发生变化。</h2>' +
    '<p>变动前含税价：10058元</p><p>变动后含税价：<span class="main-red">20154</span>元</p></div>';
  gzui.dialog({
    title: "航班信息需要更新",
    con: flightChange,
    width: 400,
    btn: [
      {name: '重新搜索',click:function(){console.log("123")}},
      {name: '继续预定',className: 'active',click:function(){}}
    ]
  });
  // 订单确认
  $(".footer-agree-item .checkbox-item").on("click", function () {
    if($(this).hasClass("icon-check")){
      $(this).addClass("icon-uncheck").removeClass("icon-check");
    }else{
      $(this).addClass("icon-check").removeClass("icon-uncheck");
      $(this).find(".m-popover-con").hide();
    }
  });
  // 提交按钮
  $(".order-footer .submit-btn").on("click", function () {
    var checkbox = $(this).parents(".order-footer").find(".checkbox-item");
    if(!checkbox.hasClass("icon-check")){
      checkbox.find(".m-popover-con").show();
    }
  });
  //
  $(".endorse-type-tab-item li").on("click",function () {
    $(this).addClass("active").siblings().removeClass("active");
    $(this).parents(".endorse-type-bd").find(".endorse-type-tab-con").hide().eq($(this).index()).show();
    if ($(this).data("show")) {
      $(this).parents(".endorse-type-tab").find(".language-sel").show();
    }else{
      $(this).parents(".endorse-type-tab").find(".language-sel").hide();
    }
  });
  //
  $(".endorse-type-tab .language-sel li").on("click", function () {
    $(this).addClass("active").siblings().removeClass("active");
    $(".endorse-type-tab-con .language").hide();
    if ($(this).index() === 0) {
      $(".endorse-type-tab-con .ch").show();
    }else{
      $(".endorse-type-tab-con .en").show();
    }
  });
});