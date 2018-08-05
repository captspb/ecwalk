$(function () {
  'use strict';
  var placeCon = [{
    tab: {
      name: '国内热门'
    },
    city: [{
      name: '上海(SHA)',
      nameStr: '上海',
      nameCode: 'SHA'
    },{
      name: '北京(BJS)',
      nameStr: '北京',
      nameCode: 'BJS'
    },{
      name: '香港(HKG)',
      nameStr: '香港',
      nameCode: 'HKG'
    },{
      name: '广州(CAN)',
      nameStr: '广州',
      nameCode: 'CAN'
    }]
  },{
    tab: {
      name: '国际热门'
    },
    city: [{
      name: '首尔(SEL)',
      nameStr: '首尔',
      nameCode: 'SEL'
    },{
      name: '台北(TPE)',
      nameStr: '台北',
      nameCode: 'TPE'
    },{
      name: '东京(TYO)',
      nameStr: '东京',
      nameCode: 'TYO'
    },{
      name: '新加坡(SIN)',
      nameStr: '新加坡',
      nameCode: 'SIN'
    }]
  },{
    tab: {
      name: '亚洲'
    },
    city: [{
      name: '香港(HKG)',
      nameStr: '香港',
      nameCode: 'HKG'
    }]
  },{
    tab: {
      name: '欧洲'
    },
    city: [{
      name: '巴黎(PAR)',
      nameStr: '巴黎',
      nameCode: 'PAR'
    }]
  },{
    tab: {
      name: '南美洲'
    },
    city: [{
      name: '洛杉矶(LAX)',
      nameStr: '洛杉矶',
      nameCode: 'LAX'
    }]
  },{
    tab: {
      name: '非洲'
    },
    city: [{
      name: '开罗(CAI)',
      nameStr: '开罗',
      nameCode: 'CAI'
    }]
  }]
  var searchCon = [{
    group: {
      keyCode: 'BJS',
      keyWord: '北京，所有机场，中国(BJS)',
      keyName: '北京(BJS)'
    },
    list: [{
      keyCode: 'NAY',
      keyWord: '北京，南苑机场，中国(NAY)',
      keyName: '南苑机场(NAY)'
    },{
      keyCode: 'PEK',
      keyWord: '北京，首都机场，中国(PEK)',
      keyName: '首都机场(PEK)'
    }]
  },{
    group: {
      keyCode: 'TPE',
      keyWord: '台北，所有机场，中国台湾(TPE)',
      keyName: '台北(TPE)'
    },
    list: [{
      keyCode: 'TEP',
      keyWord: '台北，桃园机场，中国台湾(TEP)',
      keyName: '桃园机场(TPE)'
    },{
      keyCode: 'TSA',
      keyWord: '台北，松山机场，中国台湾(TSA)',
      keyName: '松山机场(TSA)'
    }]
  },{
    group: {
      keyCode: 'BHY',
      keyWord: '海，中国(BHY)',
      keyName: '北海(BHY)'
    },
    list: []
  },{
    group: {
      keyCode: 'PMR',
      keyWord: '北帕默斯顿，新西兰(PMR)',
      keyName: '北帕默斯顿(PMR)'
    },
    list: []
  }];
  // 人数、舱位
  var selectShowItem = $(".airTicket-select-item");
  var selectDropdown = $(".airTicket-select-dropdown");
  var selectVal = [];
  selectShowItem.on("click",function (e) {
    if (selectDropdown.is(":hidden")) {
      $(this).addClass("show");
      selectDropdown.show();
    }else{
      $(this).removeClass("show");
      selectDropdown.hide();
    }
  });
  // 点击其他隐藏
  autoHide(".airTicket-select-dropdown",".search-airTicket-select",function () {
    selectShowItem.removeClass("show");
  });
  // 减
  $(".stepper-select .minus-btn").on("click", function () {
    var parent = $(this).parent();
    var min = parent.data("min");
    var numItem = parent.find(".stepper-num");
    var num = parseInt(numItem.text());
    if (num-1 >= min){
      if(parent.hasClass("adult-item")){
        var child = $(this).parents(".tourists-select").find(".child-item");
        var childVal = parseInt($(".stepper-num", child).text());
        $(this).parent().find(".add-btn").removeClass("disable");
        if ((num-1)*2<childVal) {
          numItem.text(num-1);
          selectVal[0] = num-1;
          $(".stepper-num", child).text(childVal-2<2?2:childVal-2);
          $(".add-btn", child).addClass("disable")
        }else{
          $(".add-btn", child).removeClass("disable")
          numItem.text(num-1);
          selectVal[0] = num-1
        }
        if((num-1)*2===childVal){
          $(".add-btn", child).addClass("disable");
        }
        if (num-1 === min) {
          $(this).addClass("disable");
        }
      }else if(parent.hasClass("child-item")){
        $(".add-btn").removeClass("disable");
        numItem.text(num-1);
        if (num-1 === min) {
          $(this).addClass("disable");
        }
        selectVal[1] = num-1
      }
    }
  });
  // 加
  $(".stepper-select .add-btn").on("click", function () {
    var parent = $(this).parent();
    var numItem = parent.find(".stepper-num");
    var num = parseInt(numItem.text());
    var max = 0;
    var adult = $(this).parents(".tourists-select").find(".adult-item");
    var child = $(this).parents(".tourists-select").find(".child-item");
    $(this).parents(".tourists-select").find(".stepper-num").each(function () {
      max += parseInt($(this).text());
    });
    if (max<9) {
      if(parent.hasClass("adult-item")){
        var childVal = parseInt($(".stepper-num", child).text());
        if(num+1>childVal/2){
          $(".add-btn", child).removeClass("disable");
        }
        $(".minus-btn", parent).removeClass("disable");
        numItem.text(num+1);
        selectVal[0] = num+1
      }else if(parent.hasClass("child-item")){
        var adultVal = parseInt($(".stepper-num", adult).text());
        if (num < adultVal*2) {
          $(".minus-btn", parent).removeClass("disable");
          numItem.text(num+1);
          selectVal[1] = num+1;
          if(num+1 === adultVal*2){
            $(this).addClass("disable")
          }
        }
      }
    }
    if (max+1 === 9) {
      $(".add-btn").addClass("disable");
    }
  });
  // 舱位
  $(".airTicket-tank-type li").on("click", function () {
    $(this).addClass("active").siblings().removeClass("active");
    if($(this).parent().data("type") !== "edit-popup"){
      selectVal[2] = $(this).text()
    }
  });
  // 确定
  $(".sure-btn", selectDropdown).on("click",function () {
    $(".adult-num em", selectShowItem).text(selectVal[0]);
    if (selectVal[1] > 0){
      $(".child-num", selectShowItem).show().find("em").text(selectVal[1]);
    }
    $(".tank-type", selectShowItem).text(selectVal[2]);
    selectDropdown.hide();
    selectShowItem.removeClass("show");
  });
  // 取消
  $(".cancel-btn", selectDropdown).on("click", function () {
    selectDropdown.hide();
    selectShowItem.removeClass("show");
  });
  // 地点选择
  $(".airTicket-place input").each(function () {
    $(this).placeSelect({
      placeCon: placeCon,
      searchCon: searchCon
    });
  });
  // 地点切换
  $(document).on("click",".airTicket-place-switch",function () {
    var origin = $(this).parent().find(".airTicket-origin").find("input");
    var dest = $(this).parent().find(".airTicket-dest").find("input");
    var originVal = origin.val();
    var originCode = origin.data("code");
    origin.val(dest.val()).data("code", dest.data("code"));
    dest.val(originVal).data("code", originCode);
  });
  // 日期
  $("#start-date").daterangepicker({
    "autoUpdateInput": false,
    "minDate": new Date(),
    "singleDatePicker": true,
    "showDropdowns": true,
    "autoApply": true,
    "locale": {
      "format": "YYYY.MM.DD",
      "daysOfWeek": ["日","一","二","三","四","五","六"],
      "monthNames": ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
      "firstDay": 1
    }
  }, function(start, end, label) {
    $("#start-date").parent().find(".input-tip").show();
  });
  $("#end-date").daterangepicker({
    "autoUpdateInput": false,
    "minDate": new Date(),
    "singleDatePicker": true,
    "showDropdowns": true,
    "autoApply": true,
    "locale": {
      "format": "YYYY.MM.DD",
      "daysOfWeek": ["日","一","二","三","四","五","六"],
      "monthNames": ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
      "firstDay": 1
    }
  }, function(start, end, label) {
    $("#end-date").parent().find(".input-tip").show();
  });
  // 编辑弹窗
  var tripPopup = $(".airTicket-trip-popup");
  // tripPopup.autoHide();
  $(".edit-airTicket-trip").on("click", function () {
    if(tripPopup.is(":hidden")){
      tripPopup.show();
    }else{
      tripPopup.hide();
    }
  });
  // 选择方式
  var endDate = $(".airTicket-date",tripPopup);
  var list = $(".airTicket-trip-list",tripPopup);
  var moreTrip = $(".choose-add",tripPopup);
  var searchTrip = $(".sure-btn",tripPopup);
  var cancelSearchTrip = $(".cancel-btn",tripPopup);
  $(".choose-way li").on("click", function () {
    var trip = $(this).data("trip");
    var listItem;
    $(this).addClass("active").siblings().removeClass("active");
    if (trip === 'multipass') {// 多程
      endDate.removeClass("back-forth");
      $(".trip-list-index", tripPopup).show();
      if ($(">li", list).length === 1){
        moreTrip.show();
        listItem = $(">li", list).eq(0).prop('outerHTML');
        list.append(listItem);
        $(">li:eq(1) .trip-list-index", list).text(2);
        $(">li:eq(1) .airTicket-place input", list).each(function () {
          $(this).placeSelect({
            placeCon: placeCon,
            searchCon: searchCon
          });
        });
        $(">li:eq(1) .airTicket-date-start input", list).attr("id","start-date-1");
        $("#start-date-1").daterangepicker({
          "autoUpdateInput": false,
          "minDate": new Date(),
          "singleDatePicker": true,
          "showDropdowns": true,
          "autoApply": true,
          "locale": {
            "format": "YYYY.MM.DD",
            "daysOfWeek": ["日","一","二","三","四","五","六"],
            "monthNames": ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
            "firstDay": 1
          }
        }, function(start, end, label) {
          $("#start-date-1").parent().find(".input-tip").show();
        });
      }
    }else{
      moreTrip.hide();
      $(">li:gt(0)", list).remove();
      $(".trip-list-index", tripPopup).hide();
      if (trip === "back-forth") {// 往返
        endDate.addClass("back-forth");
      }else{// 单程
        endDate.removeClass("back-forth");
      }
    }
  });
  // 多程添加
  $("span",moreTrip).on("click", function () {
    if ($(">li", list).length < 6){
      var len = $(">li", list).length;
      var id = "start-date-"+len;
      list.append($(">li", list).eq(0).prop('outerHTML'));
      $(">li:eq("+len+")", list).append('<span class="airTicket-trip-delete c-minus-icon"></span>');
      $(">li:eq("+len+") .trip-list-index", list).text(len+1);
      $(">li:eq("+len+") .airTicket-date-start input", list).attr("id",id);
      $(">li:eq("+len+") .airTicket-place input", list).each(function () {
        $(this).placeSelect({
          placeCon: placeCon,
          searchCon: searchCon
        });
      });
      if ($(">li", list).length === 6) {
        $(this).html("已达到最大航程数");
      };
      var curItem = $("#"+id);
      curItem.daterangepicker({
        "autoUpdateInput": false,
        "minDate": new Date(),
        "singleDatePicker": true,
        "showDropdowns": true,
        "autoApply": true,
        "locale": {
          "format": "YYYY.MM.DD",
          "daysOfWeek": ["日","一","二","三","四","五","六"],
          "monthNames": ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
          "firstDay": 1
        }
      }, function(start, end, label) {
        curItem.parent().find(".input-tip").show();
      });
    }
  });
  // 删除多程
  $(document).on("click",".airTicket-trip-delete",function () {
    $(this).parents("li.clearfix").remove();
    if ($(">li", list).length < 6) {
      $("span",moreTrip).html('增加航程<i class="more-2-icon"></i>');
    };
  });
  // 行程弹窗搜索
  searchTrip.on("click", function () {
    var isFull;
    var isCheck;
    $("input", list).each(function () {
      if ($(this).val() === '' && !$(this).parent().is(":hidden")) {
        var tip = $(this).data('tip');
        isFull = false;
        $(this).parent().append('<div class="screen-tip">请选择'+tip+'</div>');
        return false;
      }else{
        isFull = true;
      }
    });
    if (isFull) {
      var startDate = $(".airTicket-trip-list .airTicket-date-start");
      var startLen = $("input",startDate).length;
      if ($(".choose-way li.active").data("trip") === 'back-forth') {
        if ($("#start-date").val() >= $("#end-date").val()) {
          isCheck = false;
          $("#end-date").parent().append('<div class="screen-tip">请输入比上一程更晚的日期</div>')
        }else{
          isCheck = true;
        }
      }
      $("input",startDate).each(function (i) {
        if (i < (startLen-1)) {
          var curVal = $(this).val();
          var nextVal = startDate.eq(i+1).find("input").val();
          if (curVal >= nextVal) {
            isCheck = false;
            startDate.eq(i+1).append('<div class="screen-tip">请输入比上一程更晚的日期</div>');
            return false;
          }else{
            isCheck = true;
          }
        }else if(i === (startLen-1)){
          isCheck = true;
        }
      });
      if (isCheck) {
        console.log('搜索')
        tripPopup.hide();
      }
    }
  });
  $(document).on("mousedown",function(e){
    var popup = $(".screen-tip");
    var dropdown = $(".select-item-list");
    var airlinesPopup = $(".select-airlines-popup");
    var tripPopup = $(".airTicket-trip-popup,.daterangepicker");
    if(popup.is(":visible") && popup.has(e.target).length===0){
      popup.remove();
    }
    if(dropdown.is(":visible") && dropdown.has(e.target).length===0){
      dropdown.hide();
      $(".item-con").parent().removeClass("show");
    }
    if(airlinesPopup.is(":visible") && airlinesPopup.has(e.target).length===0){
      airlinesPopup.hide();
      $(".item-con").parent().removeClass("show");
    }
    if(tripPopup.is(":visible") && tripPopup.has(e.target).length===0){
      tripPopup.hide();
      $(".item-con").parent().removeClass("show");
    }
  });
  // 取消搜索
  cancelSearchTrip.on("click", function () {
    tripPopup.hide();
  });
  // 组合选择
  $(".choice-tab-item li").on("click", function () {
    var timeItem = $(".select-start-time, .select-end-time",".airTicket-trip-select");
    $(this).addClass("active").siblings().removeClass("active");
    if ($(this).text() === "自由组合") {
      timeItem.show();
    }else{
      timeItem.hide();
    }
  });
  // 展开详情
  $(".airTicket-list-box").on("click", ".show-detail", function (){
    var dt = $(this).parents("li").find(".airTicket-detail");
    if (dt.is(":hidden")) {
      dt.show();
      $(this).text("收起详情");
    }else{
      dt.hide();
      $(this).text("展开详情");
    }
  });
  // 组合下拉
  $(".select-item .item-con").on("click", function () {
    var list = $(this).parent().find(".select-item-list");
    $(".item-con").parent().removeClass("show");
    $(this).parent().addClass("show");
    if (list.is(":hidden")){
      list.show();
    }
  });
  // 直飞/中转
  $(".select-line-item .select-item-list li").on("click", function () {
    var con = $(this).parents(".select-line-item").find(".item-con");
    var text = $(this).text();
    $(".item-con").parent().removeClass("show");
    $(this).parent().hide();
    if (text !== "不限") {
      con.text(text);
    } else {
      con.text("直飞/中转");
    }
  });
  // 起飞时间
  $(".select-start-time .select-item-list li").on("click", function () {
    var con = $(this).parent().parent().find(".item-con");
    var text = $(this).text();
    $(".item-con").parent().removeClass("show");
    $(this).parent().hide();
    if (text !== "不限") {
      con.html("出发时间："+text);
    } else {
      con.html("起飞时间");
    }
  });
  // 到达时间
  $(".select-end-time .select-item-list li").on("click", function () {
    var con = $(this).parent().parent().find(".item-con");
    var text = $(this).text();
    $(".item-con").parent().removeClass("show");
    $(this).parent().hide();
    if (text !== "不限") {
      con.html("到达时间："+text);
    } else {
      con.html("到达时间");
    }
  });
  // 航司联盟/航空公司
  $(".select-airlines .item-con").on("click",function () {
    var popup = $(this).parent().find(".select-airlines-popup");
    if (popup.is(":hidden")) {
      popup.show();
    }
  });
  var airlinesPopup = $(".select-airlines-popup");
  $(".group-name .checkbox-icon", airlinesPopup).on("click", function () {
    if($(this).hasClass("checked")){
      $(this).removeClass("checked");
      $(this).parents(".select-airlines-item").find(".checkbox-icon").removeClass("checked");
    } else {
      $(this).addClass("checked");
      $(this).parents(".select-airlines-item").find(".checkbox-icon").addClass("checked");
    }
  });
  $(".group-list .checkbox-icon", airlinesPopup).on("click", function () {
    if($(this).hasClass("checked")){
      $(this).removeClass("checked");
      $(this).parents(".select-airlines-item").find(".group-name .checkbox-icon").removeClass("checked");
    } else {
      $(this).addClass("checked");
    }
  });
  $(".cancel-btn", airlinesPopup).on("click", function () {
    $(".item-con").parent().removeClass("show");
    airlinesPopup.hide();
  });
  $(".sure-btn", airlinesPopup).on("click", function () {
    var checked = $(".checkbox-icon.checked");
    $(".item-con").parent().removeClass("show");
    if (checked.length>0) {
      var num = airlinesPopup.find(".group-list .checked").length;
      $(".select-airlines .item-con").html("航司联盟/航空公司<em class='airlines-num'>"+num+"</em>");
      airlinesPopup.hide();
    }else{
      $(".select-airlines .item-con").html("航司联盟/航空公司");
      airlinesPopup.hide();
    }
  });
  // 滚动事件
  var maxPage = 3;
  var curPage = 1;
  var toTopBtn = $(".toTop-icon");
  $(window).on("scroll", function () {
    var scrollTop = $(window).scrollTop();
    var windowH = $(window).height();
    var docH = $(document).height();
    if (scrollTop>windowH) {
      toTopBtn.show().css("left", toTopBtn.parent().offset().left + 1186);
    } else {
      toTopBtn.hide();
    }
    if (scrollTop + windowH >= docH - $(".footer-wrp").outerHeight()) {
      if ($(".toload").length === 0 && curPage < maxPage){
        gzui.toload({tip: "正在为您更新航班信息…"});
        $.ajax({
          url: '../../static/data/airTicketList.json',
          type: 'GET',
          dataType: 'json',
          success: function(data) {
            var listData = data
            loadList(listData)
          }
        });
      }else{
        $(".airTicket-main .no-more").show();
      }
    }
  });
  function loadList (json) {
    for (var i=0;i<json.length;i++){
      var list = '';
      var oDList = null;
      var flightDetail = null;
      for (var j=0;j<json[i].oDList.length;j++) {
        oDList = json[i].oDList[j];
        list += '<li>' +
          '<div class="airTicket-list-item">' +
            '<ul class="airTicket-info clearfix">' +
              '<li><div class="airTicket-origin-info"><div class="airTicket-time">'+oDList.departureTimeDivision+'</div><div class="airTicket-airport">'+oDList.departureAirportName+'</div></div></li>' +
              '<li><div class="airTicket-dest-info"><div class="airTicket-time">'+oDList.arrivalTimeDivision+(oDList.flyDays?'<span class="main-red m-popover">+'+oDList.flyDays+'<div class="m-popover-con s-up">到达时间：'+oDList.arriveTime+'</div></span>':'')+'</div><div class="airTicket-airport">'+oDList.arrivalAirportName+'</div></div></li>' +
            '</ul>' +
            '<div class="airTicket-duration">' +
              '<span class="underline m-popover">'+oDList.durationHour+'h'+oDList.durationMinute+'m'+'<div class="m-popover-con s-up">'+(oDList.isDirectFlight === 1?'直飞':'中转')+' - 飞行总时长为'+oDList.durationHour+'小时'+oDList.durationMinute+'分钟</div></span><span class="'+(oDList.isDirectFlight === 1?'plane-icon':'transit-icon')+'"></span>' +
            '</div>' +
            '<div class="airTicket-airlines">' +
              '<img class="airlines-avatar" src="'+oDList.firstAirLineImg+'">' +
              '<span class="airlines-con"><div class="m-popover underline">'+oDList.airlineName+'<div class="m-popover-con s-up">'+oDList.flightNo+'</div></div></span>' +
            '</div>' +
            '<div class="airTicket-line"><div class="airTicket-line-con"><ul>' +
              (oDList.transferCity?'<li><span class="airTicket-line-tip">中转</span><span class="ellipsis">'+oDList.transferCity+'</span></li>':'') +
              (oDList.topCity?'<li><span class="airTicket-line-tip">经停</span><span class="ellipsis">'+oDList.topCity+'</span></li>':'') +
            '</ul></div></div>' +
            '<div class="show-detail">展开详情</div>' +
          '</div>'+
          '<div class="airTicket-detail"><ul class="airTicket-detail-item">';
          for (var k=0;k<oDList.flightDetail.length;k++) {
            flightDetail = oDList.flightDetail[k];
            list +=
              '<li class="airTicket-list-item">' +
                (flightDetail.transferCityName?'<div class="airTicket-transit-tip"><span>中转'+flightDetail.transferCityName+'，停留'+flightDetail.transferTime+'</span></div>':'') +
                '<div class="airTicket-phase"><div class="circle"></div><div class="circle"></div></div>' +
                '<ul class="airTicket-info clearfix">' +
                  '<li><div class="airTicket-origin-info"><p>'+flightDetail.departureTime+'</p><p>'+flightDetail.arriveTime+'</p></div></li>' +
                  '<li><div class="airTicket-dest-info"><p>'+flightDetail.departureAirportName+'</p><p>'+flightDetail.arrivalAirportName+'</p></div></li>' +
                '</ul>' +
                '<div class="airTicket-airlines">' +
                  '<div class="airTicket-airlines-con">'+
                    '<img src="'+flightDetail.airLineImg+'" class="airlines-avatar">'+
                    '<span class="airlines-con">'+
                      '<div><strong>'+flightDetail.airLineName+'</strong></div>'+
                      '<p>'+flightDetail.flightNo+'/'+flightDetail.planeModel+'/'+flightDetail.duration+'</p>'+
                      (flightDetail.codeshare?'<div class="shared-aviation"><em>共享</em><span>'+flightDetail.airCarrierAlineName+flightDetail.airCarrierFlight+'</span></div>':'')+
                    '</span>'+
                  '</div>'+
                '</div>' +
                '<div class="airTicket-line">'+
                  '<div class="airTicket-line-con">'+
                    '<ul>'+
                      '<li><span class="airTicket-line-tip">飞行时长</span><span><span class="ellipsis">'+flightDetail.duration+'</span></span></li>'+
                    '</ul>'+
                  '</div>'+
                '</div>'+
              '</li>';
          }
          list += '</ul></div></li>';
      }
      var bookList = '';
      var fareList = null;
      var farePriceItem = null;
      for (var j=0;j<json[i].fareList.length;j++) {
        fareList = json[i].fareList[j];
        bookList += '<li class="airTicket-booking-item" data-id="'+fareList.fareId+'">' +
          '<div class="airTicket-tag"><i class="'+(fareList.productType==="1"?'slyx-icon':'djtj-icon')+'"></i></div>' +
          '<div class="airTicket-other">' +
            '<span class="cabin-type">' +
              '<em class="underline m-popover">'+fareList.baseClassInfo+'<div class="m-popover-con s-up">';
                for ( var key in fareList.classInfoData) {
                  bookList += '<p><em>'+key+'</em><em>'+fareList.classInfoData[key]+'</em></p>';
                }
                bookList +='</div></em>' +
            '</span>' +
            '<span class="trip-type"><em class="underline m-popover">电子行程单<div class="m-popover-con s-up">只提供电子行程单</div></em></span>' +
            '<span class="endorse-type"><em class="underline m-popover">行李额及退改签</em></span>' +
            '<span>剩余<em class="main-red">'+ fareList.seats+'</em>张</span>' +
          '</div>' +
          '<div class="airTicket-prc"><div class="airTicket-prc-info"><ul class="m-popover">' +
            '<div class="m-popover-con s-up">';
              for(var k=0;k<fareList.farePriceItem.length;k++){
                farePriceItem = fareList.farePriceItem[k];
                bookList += '<p class="airTicket-prc-list"><span class="airTicket-prc-name">'+farePriceItem.itemName+'</span><span class="airTicket-prc-num">￥'+farePriceItem.itemPrice+'</span><span class="airTicket-people-num">x'+farePriceItem.itemNumber+'人</span></p>';
              }
            bookList += '</div>' +
            '<li class="total-prc">￥<span>'+fareList.baseTicketTaxPrice+'</span></li>' +
            '<li class="tax-prc">多程人均含税价</li>' +
          '</ul></div></div>' +
          '<div class="airTicket-booking-btn"><a>立即预订</a></div>' +
          '</li>';
      }
      var tpl = '<div class="airTicket-list-group" data-id="'+json[i].itineraryID+'">' +
        '<ul class="airTicket-list">'+list+'</ul>' +
        '<ul class="airTicket-booking">'+bookList+'</ul>' +
        '</div>';
      $(".airTicket-list-box").append(tpl);
      gzui.toloadHide();
    }
    curPage++;
  }
  toTopBtn.on("click", function () {
    $("body,html").animate({scrollTop: 0}, 500);
  });
  // 排序
  $(".airTicket-sort-item li").on("click",function () {
    var sort = $(this).find("i");
    $(this).addClass("cur").siblings().removeClass("cur");
    if($(this).find("i").hasClass("down-screen-icon")){
      sort.removeClass("down-screen-icon").addClass("up-screen-icon");
    }else{
      sort.removeClass("up-screen-icon").addClass("down-screen-icon");
    }
  });
  // 局部loading
  // $(".airTicket-trip-select").addClass("partialLoad-text").partialLoad(); // 调用$(".airTicket-trip-select").removeClass("partialLoad-text");gzui.partialLoadHide();删除
  // 浮动
  $(".airTicket-trip-select").scrollFloat({
    scrollBox: $("body")
  });
  //
  /*gzui.dialog({
    title: "航班信息需要更新",
    con: "为了保证您可以浏览最新的航班信息，现需要为您重新加载。",
    width: 400,
    btn: [
      {name: '回到首页',click:function(){console.log("123")}},
      {name: '确定',className: 'active',click:function(){
          gzui.toload({tip: "正在为您更新航班信息…"})
        }}
    ]
  });*/
  // 行李额及退改签
  $(".airTicket-list-box").on("click", ".endorse-type em", function () {
    $(".endorse-type-popup").show();
    $(".endorse-type-tab-con").hide().eq($(".endorse-type-tab-item li.active").index()).show();
  });
  $(".endorse-type-popup .c-close-icon").on("click", function () {
    $(".endorse-type-popup").hide();
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
  // 查看更多
  $(".show-more-list").on("click", function () {
    if (!$(this).hasClass("loading")) {
      $(this).addClass("loading");
    }
  })
});