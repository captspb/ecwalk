$(function(){
  
  // 订单步骤
  b2c_header.stepctl(2);
  // 右侧浮动
  $(".order-right-cont").scrollFloat({
    left: 850,
    isFill: false
  });
  // 预定须知
  $(".bk-notice").on("click",function(){
    var dt = $(".ticket-info-dt");
    var icon =$(this).find(".arrow-down");
    if(dt.is(":hidden")){
      dt.slideDown(150);
      icon.addClass("arrow-right");
    }else{
      dt.slideUp(150);
      icon.removeClass("arrow-right");
    }
  });
  //
  $(".order-top-stepper").stepper()

  $(".toggle-btn-cont").on('click', function(){
    var text = $(this).text()
    var liToggleEles = $(this).prev().find('li:gt(2)')
    // var liEles = $(this).prev().find('li:eq()')
    // console.log(liToggleEles.length)
    if (text === '展开') {
      liToggleEles.show()
      $(this).text('收起')
    }else{
      liToggleEles.hide()
      $(this).text('展开')
    }
  })
  // 添加游客判断
  $(".member-check .checkbox-btn-item").addClass('popover').addClass('order-member').attr("pre-check", "membernum");

  $(".contact-info-con li .tick-logo").on('click',function(){
    $(this).addClass('ticked-logo').parent().siblings().find('.tick-logo').removeClass('ticked-logo')
  })

  $(".contact-info-con li .set_default").on('click',function(){
    $(this).text('默认').addClass('grey').parents('li').siblings().find('.set_default').removeClass('grey').text('设为默认')
  })

  $(".contact-info-con li .edit_btn").on('click',function(){
    var li = $(this).parent().parent()
    gzui.editContactInfo({
      refLi: li
    }) 
  })

  $(".order-info-cont .add-contact").on('click',function(){
    gzui.editContactInfo({
      title: '添加联系人',
      deleteBtn: false
    }) 
  })

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
    callbackFn: function(form){
      console.log(form)
    }
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
    }else{
      window.location.href = '../checkstand/checkStandUnpay.html'
    }
  })
});