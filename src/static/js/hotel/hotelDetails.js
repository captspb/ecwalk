$(function(){
  // init tab control
  // tabCtl();
  // 日期选择
  // var today =  new Date()
  // today.Format('yyyy-MM-dd')
  // $('.start-date-input').gzldatepicker({
  //   is_range: false,
  //   pick_type: "range",
  //   same_day: true,
  //   startdate: today,
  //   clickFn: function (res) {
  //     $("#start-date").val(res);
  //   }
  // });
  // $('.end-date-input').gzldatepicker({
  //   is_range: false,
  //   pick_type: "range",
  //   same_day: true,
  //   startdate: today,
  //   clickFn: function (res) {
  //     $("#start-date").val(res);
  //   }
  // });
 
  // tab
  // $(".prod-dt-con .index-tab").scrollFloat({
  //   index: $(".tab-ctx-wrp .tab-ctx"),
  //   indexDiffer: 65,
  //   tabClass: "cur"
  // });

  // $('.product-intro').on('click',function(){
  //   gzui.showProductIntro({
  //     title: '产品介绍'
  //   })
  // });
  var geo = $('#baidumap').attr('geo').split(',');
  // 初始化地图
  var map = new BMap.Map("baidumap");
  // 创建点
  var point = new BMap.Point(parseFloat(geo[0]), parseFloat(geo[1]));
  // 定位点
  map.centerAndZoom(point, 20);
  // 添加控件
  var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});
  var top_left_navigation = new BMap.NavigationControl();
  map.addControl(top_left_control);
  map.addControl(top_left_navigation);
  // 创建标注
  var marker = new BMap.Marker(point);
  // 将标注添加到地图中
  map.addOverlay(marker);
  // 添加动画
  marker.setAnimation(BMAP_ANIMATION_BOUNCE);

  // 人数
  var selectShowItem = $(".hotel-search-info-num");
  var selectDropdown = $(".airTicket-select-dropdown");
  var searchVal = [];
  selectShowItem.on("click",function (e) {
    searchVal[0] = parseInt($(".room-num", selectShowItem).text());
    searchVal[1] = parseInt($(".adult-num", selectShowItem).text());
    searchVal[2] = parseInt($(".child-num", selectShowItem).text());
    if (selectDropdown.is(":hidden")) {
      $(".stepper-num", selectDropdown).each(function (i) {
        var min = parseInt($(this).parent().data("min"));
        var max = parseInt($(this).parent().data("max"));
        $(this).parent().find("span").removeClass("disable");
        $(this).text(searchVal[i]);
        if (searchVal[i] === min) {
          $(this).parent().find(".minus-btn").addClass("disable");
        }else if (searchVal[i] === max) {
          $(this).parent().find(".add-btn").addClass("disable");
        }
      });
      if (searchVal[2] === 0) {
        $(".select-list-item", selectDropdown).hide();
      }
      selectDropdown.show();
    }else{
      selectDropdown.hide();
    }
  });
  // 点击其他隐藏
  autoHide(".airTicket-select-dropdown",".hotel-bk-search-num",function () {
    selectShowItem.removeClass("show");
  });
  // 减
  $(".stepper-select .minus-btn").on("click", function () {
    var parent = $(this).parent();
    var min = parent.data("min");
    var numItem = parent.find(".stepper-num");
    var num = parseInt(numItem.text());
    if (num-1 >= min){
      // $(this).parent().find(".add-btn").removeClass("disable");
      $(".add-btn", parent).removeClass("disable");
      numItem.text(num-1);
      if (num-1 === min) {
        $(this).addClass("disable");
      }
      if(parent.hasClass("child-item")){
        selectVal[2] = num-1
        var val = parseInt($(".child-item .stepper-num").text());
        if (val === 0) {
          $(".child-age-sel").hide();
        }else{
          $(".child-age-sel .select-list-item").hide();
          $(".child-age-sel .select-list-item:lt("+val+")").show();
        }
      }
    }
  });
  // 加
  $(".stepper-select .add-btn").on("click", function () {
    var parent = $(this).parent();
    var max = parent.data("max");
    var numItem = parent.find(".stepper-num");
    var num = parseInt(numItem.text());
    if (num+1 <= max) {
      $(".minus-btn", parent).removeClass("disable");
      numItem.text(num+1);
      if (num+1 === max) {
        $(this).addClass("disable");
      }
      if(parent.hasClass("child-item")){
        var val = parseInt($(".child-item .stepper-num").text());
        if (val>0) {
          $(".child-age-sel").show();
          $(".child-age-sel .select-list-item").hide();
          $(".child-age-sel .select-list-item:lt("+val+")").show();
        }
      }
    }
  });
  // 确定
  $(".sure-btn", selectDropdown).on("click",function () {
    var roomNum = $(".room-item .stepper-num", selectDropdown).text();
    var adultNum = $(".adult-item .stepper-num", selectDropdown).text();
    var childNum =  $(".child-item .stepper-num", selectDropdown).text();
    $(".room-num", selectShowItem).text(roomNum);
    $(".adult-num", selectShowItem).text(adultNum);
    $(".child-num", selectShowItem).text(childNum);
    selectDropdown.hide();
  });
  // 取消
  $(".cancel-btn", selectDropdown).on("click", function () {
    selectDropdown.hide();
  });
  // 儿童岁数下拉
  $(".select-item ").on("click", ".item-con", function () {
    var list = $(this).parent().find(".select-item-list");
    $(".item-con").parent().removeClass("show");
    $(this).parent().addClass("show");
    if (list.is(":hidden")){
      list.show();
    }
  });
  $(".select-item").on("click", ".select-item-list li", function () {
    var text = $(this).text();
    $(".item-con").parent().removeClass("show");
    $(this).parent().hide();
    $(this).parents(".select-list-item").find(".item-con em").text(text)
  });
  $(document).on("mousedown",function(e){
    var dropdown = $(".select-item-list");
    if(dropdown.is(":visible") && dropdown.has(e.target).length===0){
      dropdown.hide();
      $(".item-con").parent().removeClass("show");
    }
  });
  // 是否含早
  $(".isbreakfast").on("click", function (){
    var checkbox = $(this).find("i");
    if(checkbox.hasClass("checked")){
      checkbox.removeClass("checked");
    }else{
      checkbox.addClass("checked");
    }
  });
  // 局部loading
  // $(".hotel-bk-search-con").partialLoad(); // 调用gzui.partialLoadHide()删除
  // 收藏
  $(".collection-btn").on("click", function (){
    if($(this).hasClass("collected")){
      $(this).text("收藏").removeClass("collected");
    }else{
      $(this).text("已收藏").addClass("collected");
    }
  });
  // 预定锚点控制
  $(".hotel-bk-top-btn .booking-btn").on("click", function (){
    $("body,html").animate({scrollTop: $(".hotel-bk-search").offset().top},300)
  })
  // 未登录提示
  gzui.loginTip({
    loginEvent: function () {
      console.log(123123123213)
    }
  })
});