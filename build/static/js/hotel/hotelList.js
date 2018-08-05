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
    if ($('.start-price input').val() !== '' || $('.end-price input').val() !== '') {
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
    if ($(this).hasClass("cur")) {
      var icon = $(this).find(".down-screen-icon");
      if(icon.hasClass("up-screen-icon")){
        icon.removeClass("up-screen-icon");
      }else{
        icon.addClass("up-screen-icon");
      }
    }else{
      $(this).addClass("cur").siblings().removeClass("cur");
    }
  });
  // checkbox
  $(".list-cbox").click(function () {
    $(this).find('.check-box').toggleClass('checked');
  });

  // 地图事件
  /*$('.hotel-name').parent().hover(function () {
    var geo = $(this).attr("geo").split(',');
    gzl_baidu_map.addMarker(geo);
  });*/

  /*$(".search-address").scrollFloat({
    isFill: false,
    left: 840,
    index: $('.search-result-item'),
    callback: function (obj) {
      var geo = obj.find('.hotel-name').parent().attr('geo').split(',');
      gzl_baidu_map.addMarker(geo);
    }
  });*/

  // 请求获取坐标
  /*gzl_baidu_map.init();
  $('.product-intro').on('click',function(){
    gzui.showProductIntro({
      title: '产品介绍'
    })
  });*/
  //
  $(".hotel-search-city input").placeSelect();
  // 人数
  var selectShowItem = $(".hotel-search-info-num");
  var selectDropdown = $(".airTicket-select-dropdown");
  var selectVal = [1,1,0];
  selectShowItem.on("click",function (e) {
    if (selectDropdown.is(":hidden")) {
      selectDropdown.show();
    }else{
      selectDropdown.hide();
    }
  });
  // 点击其他隐藏
  autoHide(".airTicket-select-dropdown",".hotel-search-info",function () {
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
      if(parent.hasClass("room-item")){
        selectVal[0] = num-1
      }else if(parent.hasClass("adult-item")){
        selectVal[1] = num-1
      }else if(parent.hasClass("child-item")){
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
      if(parent.hasClass("adult-item")){
        selectVal[0] = num+1;
      }else if(parent.hasClass("room-item")){
        selectVal[1] = num+1;
      }else if(parent.hasClass("child-item")){
        selectVal[2] = num+1;
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
    var infoNum = $(".hotel-search-info-num");
    $(".room-num", infoNum).text(selectVal[0]);
    $(".adult-num", infoNum).text(selectVal[1]);
    $(".child-num", infoNum).text(selectVal[2]);
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
  // 查看房型如未登录，弹窗登录窗口
  $(".search-list-btn").on("click", function () {
    // 登录
    gzui.formPopup({
      title: '账号登录',
      saveBtn: '登录',
      cancelBtn: null,
      popupType: 'login',
      isAgreed: false,
      formItem: [
        {type: 'input', name: "账号", is_null: false, checkway: "empty"},
        {type: 'input', name: "密码", is_null: false, checkway: "newPassw"},
        {type: 'input', name: "验证码", is_null: false, checkway: "validCode"}
      ],
      footBtn: [
        {name: '忘记密码',click:function(){console.log("123")}},
        {name: '申请账号',click:function(){}}
      ],
      callbackFn: function(form){
        console.log(form)
      }
    });
  });
  // 未登录提示
  gzui.loginTip({
    loginEvent: function () {
      console.log(123123123213)
    }
  });
  // 查看更多
  $(".show-more-list").on("click", function () {
    if (!$(this).hasClass("loading")) {
      $(this).addClass("loading");
    }
  })
});