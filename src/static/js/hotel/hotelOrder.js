$(function(){
  'use strict';
  // 订单步骤
  b2c_header.stepctl(2);
  // 右侧浮动
  $(".order-right-cont").scrollFloat({
    left: 850,
    isFill: false
  });
  // 预定信息房间数量
  $(".screen-room-num").stepper({
    classname: 'no-border'
  });
  // 可选服务
  // $(".option-service-stepper").stepper({
  //   classname: 'no-border'
  // });
  // 附加服务 section-top 的stepper
  $(".external-items .selection-top .add-item-stepper").stepper({
      classname: 'no-border',
      templateNewType:true,
      plusIcon: "icon-stepper-plus",
      subIcon:"icon-stepper-minus",
      refunc: function(val,self){
          // console.log($(self).parents('.add-item-stepper'))
          if (val) {
              $(self).parents('.add-item-stepper').prev().prev().html('已选：×' + val);
              $(self).parents('.add-item-stepper').prev().show();
          } else {
              $(self).parents('.add-item-stepper').prev().prev().html('')
              $(self).parents('.add-item-stepper').prev().hide();
          }
      }
  });
  // reivsion 
  // 隐藏/显示
    $(".external-item .external-icon-wrp .icon").on("click",function(){
        var externalItem = $(this).parents('.external-item');
        var contentEle = externalItem.find('.tourist-list-wrp');
        if(contentEle.is(":hidden")){
          $(this).parents('.external-item .selection-top').find("i").toggleClass("icon-drop-down").addClass("icon-reclaim-up");
          contentEle.show();
        }else{
          $(this).parents('.external-item .selection-top').find("i").toggleClass("icon-reclaim-up").addClass("icon-drop-down");
          contentEle.hide();
        }
    })
    // 必选服务切换
    $(".addition-list").find("li").on("click",function(e){
      // 有两种情况  第一种 有stepper  第二种 没有stepper情况
      if($(this).find(".stepper").length){
        // 判定非当前项则移出(已选);
          $(this).parents('.external-item').find(".selection-top .num").html('')
          var inputOfClik = $(this).find("input").val();
          // 第一次点击是0
          if(parseInt(inputOfClik) === 0){
            $(this).find("input").val(1);
            $(this).parents('.external-item').find(".selection-top .external-icon-wrp").prev().prev().html('已选：×1');
            // 价格显形
            $(this).parents('.external-item').find(".selection-top .external-icon-wrp").prev().show();
            $(this).parents('.external-item').find(".selection-top .external-icon-wrp").prev().show()
          }
          if(parseInt($(this).find("input").val())>0){
            $(this).parents('.external-item').find(".selection-top .external-icon-wrp").prev().prev().html('已选：×' + $(this).find("input").val());
            // 价格显形
            $(this).parents('.external-item').find(".selection-top .external-icon-wrp").prev().show();
          }
        // 切换 stepper 显示
        $(this).parents(".addition-list").find(".addition-add-item-stepper").hide();
        $(this).find(".addition-add-item-stepper").show();
        // 添加active 样式
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        $(this).parent().find(".icon-select-t").hide();
        $(this).find(".icon-select-t").show();
        // 删除其他input的value
        $(this).siblings().find("input").val(0);
      }else{
        // 没有stepper情况
        $(this).siblings().removeClass("active");;
        $(this).toggleClass("active");
        if($(this).hasClass("active")){
          $(this).parents('.external-item').find(".selection-top .external-icon-wrp").prev().prev().html('已选：×1');
          $(this).parents('.external-item').find(".selection-top .external-icon-wrp").prev().show();
        }else{
          $(this).parents('.external-item').find(".selection-top .external-icon-wrp").prev().prev().html('');
          $(this).parents('.external-item').find(".selection-top .external-icon-wrp").prev().hide();
        }
      }
    })
    // 卡片内部stepper 调用
    $(".external-items .addition-add-item-stepper").stepper({
      classname: 'no-border',
      templateNewType:true,
      plusIcon: "icon-stepper-add",
      subIcon:"icon-stepper-sub",
      val: 1,
      refunc: function(val,self){
          // console.log($(self).parents('.add-item-stepper'))
          if (val) {
              $(self).parents('.external-item').find(".selection-top .external-icon-wrp").prev().prev().html('已选：×' + val);
              $(self).parents('.external-item').find(".selection-top .external-icon-wrp").prev().show();
          } else {
              $(self).parents('.external-item').find(".selection-top .external-icon-wrp").prev().prev().html('')
              $(self).parents('.external-item').find(".selection-top .external-icon-wrp").prev().hide();
          }
      }
    });  
    // 快速选择的调用stepper
    $(".section-count-form").find(".tourist-item-wrp").eq(0).find(".add-item-stepper").stepper({
        classname: 'no-border',
        max: 4,
        templateNewType:true,
        plusIcon: "icon-stepper-plus",
        subIcon: "icon-stepper-minus",
        refunc: function(val,self){
            if (val>=0) {
              var quickSelVal =$(self).parents(".add-item-stepper").find("input").val();
              var allInput =$(self).parents(".section-count-form").find(".tourist-item-wrp").eq(1).find(".add-item-stepper input");
              allInput.val(quickSelVal);  
              // 统计个数
              var total = 0;
              function countToal(){
                for (var i = 0; i < allInput.length; i++) {
                  total += parseInt(allInput.eq(i).val());
                }
              }
              countToal();
              // 写入头部
              if(total>0){
                $(self).parents(".section-count-form").find(".selection-top").find(".num").html("已选x"+total);
                $(self).parents(".section-count-form").find(".selection-top").find(".money-red").show();
              }else{
                $(self).parents(".section-count-form").find(".selection-top").find(".num").html("");
                $(self).parents(".section-count-form").find(".selection-top").find(".money-red").hide();
              }
            }
        }

    })
    // 表内调用
    $(".section-count-form").find(".tourist-item-wrp").eq(1).find(".add-item-stepper").stepper({
      classname: 'no-border',
      max: 4,
        templateNewType:true,
        plusIcon: "icon-stepper-add",
        subIcon: "icon-stepper-sub",
      refunc: function(val,self){
          if (val>=0) {
            var quickSelVal =$(self).parents(".add-item-stepper").find("input").val();
            var allInput =$(self).parents(".section-count-form").find(".tourist-item-wrp").eq(1).find(".add-item-stepper input");
            // 统计个数
            var total = 0;
            function countToal(){
              for (var i = 0; i < allInput.length; i++) {
                total += parseInt(allInput.eq(i).val());
              }
            }
            countToal();
            // 写入头部
            if(total>0){
              $(self).parents(".section-count-form").find(".selection-top").find(".num").html("已选x"+total);
              $(self).parents(".section-count-form").find(".selection-top").find(".money-red").show();
            }else{
              $(self).parents(".section-count-form").find(".selection-top").find(".num").html("");
              $(self).parents(".section-count-form").find(".selection-top").find(".money-red").hide();
            }
          }
      }

    })

    // 人员显示总价
    $(".tourist-list-wrp").find(".checkbox-btns-row").find("li").on("click",function () {
      $(this).parents(".tourist-list-wrp").find(".checkbox-btns-row").find("li").each(function(i,e){
        if($(e).hasClass("active")){
          $(e).parents(".external-item").find(".selection-top").find(".money-red").show();
          return
        }
      })
    })
    // 删除当前游客信息
    $(".form-group").find(".delthis").on("click",function(){
      $(this).parents(".form-group").remove();
    })


  $(".tourist-external-form-item").change(function () {
      $(this).removeClass('active').addClass('changed').find(".money-red").show();
  })
  // ? tips 显示
  $(".icon-doubt").hover(function(){
      $(this).parent().next('.external-popover').show()
  },function(){
      $(this).parent().next('.external-popover').hide()
  });
  // hover show();
  $(".external-popover").hover(function(){
    $(".external-popover").show();
  })
  
  
  $(".form-selection").find(".tourist-item-wrp").eq(1).find(".stepper .plus-icon")
  // 日期选择
  $('#start-date').daterangepicker({
    "singleDatePicker": true,
    "showDropdowns": true,
    "autoApply": true,
    "locale": {
      "format": "YYYY/MM/DD",
      "daysOfWeek": ["日","一","二","三","四","五","六"],
      "monthNames": ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
      "firstDay": 1
    }
  }, function(start, end, label) {
    console.log("New date range selected: " + start.format('YYYY-MM-DD') + " to " + end.format('YYYY-MM-DD') + " (predefined range: " + label + ")");
  });
  $('#end-date').daterangepicker({
    "singleDatePicker": true,
    "showDropdowns": true,
    "autoApply": true,
    "locale": {
      "format": "YYYY/MM/DD",
      "daysOfWeek": ["日","一","二","三","四","五","六"],
      "monthNames": ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
      "firstDay": 1
    }
  }, function(start, end, label) {
    console.log("New date range selected: " + start.format('YYYY-MM-DD') + " to " + end.format('YYYY-MM-DD') + " (predefined range: " + label + ")");
  });
  // 预定信息
  if($(".hotel-bk-info tr").length>4){
    var tableH = 0;
    $(".hotel-bk-info tr").each(function(i){
      if(i<4){
        return tableH  += parseInt($(this).outerHeight())
      }
    });
    $(".hotel-bk-info").append('<div class="show-more"><span><em>展开</em><i class="down-double-arrow"></i></span></div>');
    $(".hotel-bk-info .hotel-bk-table").css("height",tableH);
    $(".hotel-bk-info .show-more span").on("click",function(){
      var arrow = $(this).find(".down-double-arrow");
      if(!arrow.hasClass("up")){
        arrow.addClass("up");
        $(this).find("em").text("收起");
        $(".hotel-bk-info .hotel-bk-table").css("height","auto");
      }else{
        arrow.removeClass("up");
        $(this).find("em").text("展开");
        $(".hotel-bk-info .hotel-bk-table").css("height",tableH);
      }
    })
  }
  //
  $(".order-detail-list .show-more span").on("click", function () {
    var list = $(this).parents(".order-detail-list").find(".order-detail-tab");
    if (!$(this).hasClass("show")) {
      $(this).addClass("show").html("收起<i class='icon-packup'></i>");
      $("tr:gt(3)", list).show();
    }else{
      $(this).removeClass("show").html("展开<i class='icon-expand'></i>");
      $("tr:gt(3)", list).hide();
    }
  })

      // 多选 multi-choice
    $(".sg-multi-choice .choice").on("click",function(){
      var dropdown = $(this).parent().find(".choice-dropdown");
      if(dropdown.is(":hidden")){
        $(".choice-dropdown").hide();
        dropdown.show();
        return false;
      }else{
        dropdown.hide();
      }
    });
    // $(".choice-dropdown li .choice-wrap .choice-tit").on("click",function(){
    //   
    // });
    $(".choice-dropdown ul li i").on("click",function(){
      // 获取最大限制长度
      var limitNum = parseInt($(this).parents(".sg-multi-choice").attr("data-max"))
      // 获取当前check 长度
      var checknum = $(this).parents(".choice-dropdown").find(".icon-check").length;
      if($(this).hasClass("icon-uncheck") && parseInt(checknum)<parseInt(limitNum)){
        $(this).removeClass("icon-uncheck");
        $(this).addClass("icon-check");
        if(parseInt(checknum) == parseInt(limitNum)-1){
          $(this).parents(".choice-dropdown").find(".icon-uncheck").css("opacity", 0.3)
        }
      }else if($(this).hasClass("icon-check")){
        $(this).parents(".choice-dropdown").find(".icon-uncheck").css("opacity", 1)
        $(this).removeClass("icon-check");
        $(this).addClass("icon-uncheck");
      }
    })
    $(".choice-dropdown .choice-btn-warp .cancel").on("click",function(){
      $(".choice-dropdown").hide()
    })
    $(".choice-dropdown .choice-btn-warp .sure").on("click",function(){
      // 默认值
      var defaultText = $(this).parents(".sg-multi-choice").find(".choice-val").text();
      // 填充的dom
      var val = $(this).parents(".sg-multi-choice").find(".choice-val");
      // 选择后第一个text
      var totalText = $(this).parents(".choice-dropdown").find(".icon-check").eq(0).parent("li").find(".choice-wrap").find(".choice-tit").text();
      // 已选的check长度
      var limitNum = parseInt($(this).parents(".sg-multi-choice").find(".icon-check").length)
      // 合并text
      var mostStr
      if(limitNum>1){
        mostStr = totalText.substring(0, 16) + "...共"+limitNum+"项服务"; 
      }else{
        mostStr=totalText;
      }

      if(limitNum>0){
        val.text(mostStr);
      }else{
        val.text(defaultText);
      }
      $(this).parents(".choice-dropdown").hide();
      $(".choice-dropdown").hide()
    })

    // 点击其他地方隐藏当前
    $(".choice-dropdown").autoHide();
});