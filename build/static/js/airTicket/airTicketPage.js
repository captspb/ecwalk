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
    }
  }];
  // 首屏高度
  $(".search-airTicket").css("min-height",$(window).height()-222);
  // 行程选择
  $(".search-airTicket-trip li").on("click",function () {
    $(this).addClass("active").siblings().removeClass("active");
    var trip = $(this).data("trip");
    var list = $(".airTicket-trip-list");
    var listItem;
    var listBtn = $(".search-airTicke-btn", list);
    var moreTrip = $(".more-airTicket-trip");
    var endDate = $(".search-airTicket-date .end-date");
    if (trip === 'multipass') {// 多程
      endDate.hide();
      listBtn.hide();
      moreTrip.show();
      if ($(">li", list).length === 1){
        listItem = $(">li", list).eq(0).prop('outerHTML');
        list.append(listItem);
        $(">li:eq(1) .search-airTicket-place input", list).each(function () {
          $(this).placeSelect({
            placeCon: placeCon,
            searchCon: searchCon
          });
        });
        $(">li:eq(1) .start-date input", list).attr("id","start-date-1");
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
          $("#start-date-1").next().show();
          console.log("New date range selected: " + start.format('YYYY-MM-DD') + " to " + end.format('YYYY-MM-DD') + " (predefined range: " + label + ")");
        });
        $("#start-date-1").next().hide();
      }
    }else{
      $(">li:gt(0)", list).remove();
      listBtn.show();
      moreTrip.hide();
      if (trip === "back-forth") {// 往返
        endDate.show();
      }else{// 单程
        endDate.hide();
      }
    }
  });
  // 多程添加
  $(".more-airTicket-trip .add-more").on("click", function () {
    var list = $(".airTicket-trip-list");
    if ($(">li", list).length < 6){
      var len = $(">li", list).length;
      var id = "start-date-"+len;
      var lastId = "start-date-"+(len-1);
      list.append($(">li", list).eq(0).prop('outerHTML'));
      $(">li:eq("+len+")", list).append('<span class="airTicket-trip-delete c-minus-icon"></span>');
      $(">li:eq("+len+") .start-date input", list).attr("id",id);
      $(">li:eq("+len+") .search-airTicket-place input", list).each(function () {
        $(this).placeSelect({
          placeCon: placeCon,
          searchCon: searchCon
        });
      });
      if ($(">li", list).length === 6) {
        $(this).addClass("disable");
        $(this).find("i").hide();
        $(this).find("span").text("已达到最大航程数")
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
        curItem.next().show();
        console.log("New date range selected: " + start.format('YYYY-MM-DD') + " to " + end.format('YYYY-MM-DD') + " (predefined range: " + label + ")");
      });
      curItem.next().hide();
    }
  });
  // 删除多程
  $(document).on("click",".airTicket-trip-delete",function () {
    var list = $(".airTicket-trip-list");
    var addMore = $(".more-airTicket-trip .add-more");
    $(this).parents("li.clearfix").remove();
    if ($(">li", list).length < 6) {
      addMore.removeClass("disable");
      addMore.find("i").show();
      addMore.find("span").text("增加目的地（最多6段）")
    };
  });
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
    $(this).parents(".airTicket-select-dropdown").find(".stepper-num").each(function () {
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
    selectVal[2] = $(this).text()
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
  $(".search-airTicket-place input").each(function () {
    $(this).placeSelect({
      placeCon: placeCon,
      searchCon: searchCon
    });
  });
  // 地点切换
  $(document).on("click",".place-switch",function () {
    var origin = $(this).parent().find(".place-origin").find("input");
    var dest = $(this).parent().find(".place-dest").find("input");
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
    $("#start-date").next().show();
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
    $("#end-date").next().show();
  });
  // 搜索按钮点击
  $(".search-airTicke-btn").on("click",function () {
    var isFull;
    var isCheck;
    $(".search-airTicket-screen input").each(function () {
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
      var startDate = $(".search-airTicket-date .start-date");
      var startLen = $("input",startDate).length;
      if ($(".search-airTicket-trip li.active").data("trip") === 'back-forth') {
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
      }
    }
  });
  $(document).on("mousedown",function(e){
    var popup = $(".screen-tip");
    if(popup.is(":visible") && popup.has(e.target).length===0){
      popup.remove();
    }
  });
  gzui.loginTip({
    text: '当前您还未登录，无法搜索机票喔',
    loginEvent: function () {
      console.log(123123)
    }
  })
});