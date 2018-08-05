$(document).ready(function () {
  $(".order-top-stepper").stepper()
  // 游客后补
  $(".supplement-btn").on("click",function(){
    if(!$(this).hasClass("active")){
      $(this).addClass("active");
      $(this).parent().find(".tourist-info").slideUp(100);
    }else{
      $(this).removeClass("active");
      $(this).parent().find(".tourist-info").slideDown(100);
    }
  });
  // 选择保险
  $(".insurance-sel").on("click",function(){
    var list = $(this).parents(".tourist-add-item").find(".add-item-list");
    if(list.is(":hidden")){
      list.slideDown(100);
    }else{
      list.slideUp(100);
    }
  });
  $(".insurance-item .add-item-stepper").stepper({
    classname: 'no-border',
    refunc: function(val,self){
      var sel = self.parents(".insurance-sel-list");
      var show = sel.parents(".add-item-con").find(".insurance-con");
      var data = sel.data("insurance");
      var info = sel.find(".add-item-info").text();
      var prc = sel.find(".add-item-prc em").text();
      var num = $("li[data-insurance="+data+"]",show);
      var tpl = '<li data-insurance="'+data+'">' +
        '<span class="add-item-info">'+info+'</span>' +
        '<span class="add-item-prc">¥<em>'+prc+'</em></span>' +
        '<span class="add-item-num"><em>'+val+'</em>份</span>' +
        '</li>';
      if(val == 0){
        num.remove();
      }
      if(num.length != 0){
        num.find(".add-item-num em").text(val)
      }else{
        show.append(tpl);
      };
      self.parents(".tourist-add-item").find(".add-item-tit em").text($("li",show).length);
    }
  });
  // 选择服务
  $(".service-item .add-item-stepper").stepper({
    classname: 'no-border',
    refunc: function(val,self){}
  });
  // 订单步骤
  b2c_header.stepctl(3);
  // 可选服务hover事件
  $(".option-service").hover(function(){
    var parent = $(this).parents(".add-item-con");
    var popover = parent.find(".service-popover");
    var top = $(this).parents("li").outerHeight()*($(".option-service",parent).index($(this))+1)-10;
    popover.show().css("top",top);
  },function(){
    var parent = $(this).parents(".add-item-con");
    var popover = parent.find(".service-popover");
    popover.hide();
  });
  // 右侧浮动
  $(".order-right-cont").scrollFloat({
    left: 850,
    isFill: false
  });

});