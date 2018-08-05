$(document).ready(function () {
  // 加载
  // gzui.toload();
  // preview
  $(".prod-img").preview({
      imgurl: [
          "http://www.gzl.com.cn/b2c-image/2017/8/18/e831feed-b7f0-4b65-b282-26857196602c.jpg",
          "http://www.gzl.com.cn/b2c-image/2017/9/20/5d2c59a9-2369-4364-afa5-3926f0b76280.jpg",
          "http://www.gzl.com.cn/b2c-image/2017/8/18/b0a78df0-7b42-4106-ad3b-98a52ed2b47c.jpg",
          "http://www.gzl.com.cn/b2c-image/2017/4/10/324f7e72-aefc-4764-ae84-b2820ac19279.jpg"
          // "http://www.gzl.com.cn/b2c-image/2017/4/10/fdac5700-07a0-46ee-a420-2c553d4a6000.jpg"
      ]
  });
  $(".travel-bk-stepper").stepper({
    refunc: function (val) {
      console.log(val)
    }
  });
  // 附件项选择
  $(".travel-add-item-list li").stepper({
    classname: 'noborder travel-add-item-num'
  });
  // 更多附件项
  $(".travel-add-item-list").each(function(){
    var self = $(this);
    if(self.find("li").length>3) {
      var ulH = 0;
      self.find("li").each(function (i) {
        if (i < 3) {
          return ulH += $(this).outerHeight();
        }
      });
      self.css("max-height",ulH);
      self.after('<div class="show-more"><span>更多<i class="down-arrow-icon"></i></span></div>');
      self.parent().find(".show-more span").on("click",function(){
        var arrow = $(this).find("i");
        if(arrow.hasClass("down-arrow-icon")){
          self.css("max-height","inherit");
          arrow.attr("class","up-arrow-icon");
        }else if(arrow.hasClass("up-arrow-icon")){
          self.css("max-height",ulH);
          arrow.attr("class","down-arrow-icon");
        }
      });
    }
  });

  // 可选服务hover事件
  $(".option-service").hover(function(){
    var popover = $(this).parents(".travel-add-item-con").find(".service-popover");
    var top = $(this).parents("li").outerHeight()*($(".option-service").index($(this))+1);
    popover.show().css("top",top);
  },function(){
    var popover = $(this).parents(".travel-add-item-con").find(".service-popover");
    popover.hide();
  });
  // 费用说明
  $(".tip-icon").hover(function(){
      var popoverWrp = $(this).parent().next();
      popoverWrp.show();
  },function(){
      var popoverWrp = $(this).parent().next();
      popoverWrp.hide();
  });

  // 出发日期
  $(".travel-bk-go-date").on("click",function(){
    var screen = $(this).find("i");
    if(!screen.hasClass("up-screen-icon")){
      screen.attr("class","up-screen-icon");
    }else{
      screen.attr("class","down-screen-icon");
    }
  });
  // 同行价隐藏
  $(".travel-bk-tab-hd .travel-bk-prc").on("click",function(){
    var eye = $(this).find("i");
    if(!eye.hasClass("hide")){
      eye.addClass("hide");
      $(".travel-bk-tab .travel-bk-prc-hide").show();
      
    }else{
      eye.removeClass("hide");
      $(".travel-bk-tab .travel-bk-prc-hide").hide();
    }
  });

  // 团选择
  $(".travel-bk-sel i").on("click",function(){
    $(".travel-bk-sel i").attr("class","uncheck-icon");
    $(this).attr("class","check-icon");
  });

  // init tab control
  tabCtl();

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
  });
  // 收藏
  $('.collect-wrp').click(function () {
    if ($(this).find('.collect-star').hasClass('collected')) {
      $(this).find('.collect-star').removeClass('collected');
      $(this).find('span').text('收藏');
    } else {
      gzui.editText({
        title: "收藏产品",
        placeholder: "请输入收藏备注",
        hist: ['123','阿萨德阿萨德','阿萨德','德阿萨德','adfasdfasdfasdf'],
        maxLen: 15,
        callbackFn: function(con){
          console.log(con)
          $('.collect-wrp').find('.collect-star').addClass('collected');
          $('.collect-wrp').find('span').text('取消收藏');
        }
      });
    }
  });
  // 登录交互
  $(".login-entrance span").on("click", function () {
    console.log(123123123)
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
  // 查看更多
  $(".show-more-list").on("click", function () {
    if (!$(this).hasClass("loading")) {
      $(this).addClass("loading");
    }
  })
});