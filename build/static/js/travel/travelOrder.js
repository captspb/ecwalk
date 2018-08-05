$(document).ready(function () {
  
  // 订单步骤
  b2c_header.stepctl(2);
  //
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
        '<a class="add-item-info">'+info+'</a>' +
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
  $('.checkbox-btns-con .checkbox-btn-item').unbind('hover').hover(function () {
  }, function () {
    $(this).find(".popover-down").remove();
  });
  // 选择服务
  $(".service-item .add-item-stepper").stepper({
    classname: 'no-border',
    refunc: function(val,self){}
  });
  // 可选服务hover事件
  $(".option-service").hover(function(){
      $(this).parent().next().show()
  },function(){
      $(this).parent().next().hide()
  });

  // 右侧浮动
  $(".order-right-cont").scrollFloat({
    left: 850,
    isFill: false
  })

  // 添加游客判断
  $(".member-check .checkbox-btn-item").addClass('popover').addClass('order-member').attr("pre-check", "membernum");
  $(".external-item-list .checkbox-btn-item").addClass('popover').addClass('order-member').attr("pre-check", "externalMembernum");

  initMember();
  function initMember() {
    $(".order-info-tourist-list").html("");
    $(".order-info-tourist-list").append("<li class='order-info-tourist-item'>"+$("#user-concact").html()+"</li>");
    radioItem();
    saveCommonUser();
    inputChange();
    blurCheck();
  }
  function radioItem() {
  $('.radio-group-con .radio-item').unbind('click').on('click', function () {
    $(this).siblings().removeClass('active');
    $(this).toggleClass('active');
  });
}
  function inputChange(ctype) {
    "use strict";
    $('.tourist-name-input').unbind('change').change(function () {
      var parent = $(this).parents('li.order-info-tourist-item, li.lodger-item');
      var index = parent.attr('data-value');
      parent.removeAttr('data-value');
      $('.member-check ul li[data-value="' + index + '"]').removeClass('active');
      if (ctype === undefined || ctype === 'travel') {
        insurance();
      } else if (ctype === 'hotel') {
        insurance2();
      }
      checkBoxPick();
    });
  }
  // 附加服务
  $(".external-items .add-item-stepper").stepper({
      classname: 'no-border',
      refunc: function(val,self){
        // console.log($(self).parents('.add-item-stepper'))
        if (val) {
            $(self).parents('.add-item-stepper').prev().prev().html('×' + val)
        } else {
            $(self).parents('.add-item-stepper').prev().prev().html('')
        }
      }
  });
  $(".external-item .icon").on('click', function () {
    var externalItem = $(this).parents('.external-item')
    var contentEle = externalItem.find('.tourist-list-wrp')
   if ($(this).hasClass('add-icon')) {
     contentEle.show()
     $(this).removeClass('add-icon').addClass('minus-icon')
     if (externalItem.hasClass('zero-color')) {
       externalItem.removeClass('zero-color')
     }
   } else if ($(this).hasClass('minus-icon')) {
     contentEle.hide()
     $(this).removeClass('minus-icon').addClass('add-icon')
     if (externalItem.find('.num') && externalItem.find('.num').html() && externalItem.find('.num').html().indexOf('×') < 0) {
       externalItem.addClass('zero-color')
     }
   }
  })
  $(".tourist-external-form-item").change(function () {
      $(this).removeClass('active').addClass('changed')
  })
  $(".external-item-name").hover(function(){
      $(this).parent().next('.external-popover').show()
  },function(){
      $(this).parent().next('.external-popover').hide()
  });
  // 失焦验证
  function blurCheck() {
    // 订单失焦验证
    $('.order-info-tourist-item input, .lodger-item input').blur(function () {
      var emptyItem = [];
      var errorItem = [];
      var result;
      $(this).parents('.tourist-left, .tourist-right, .input-groups').each(function (m, n) {
        result = showErrorInfo(m, n);
        emptyItem = emptyItem.concat(result[0]);
        errorItem = errorItem.concat(result[1]);
      });
      errorText($(this).parents('.order-info-tourist-item, .lodger-item'), emptyItem, errorItem);
    });

  }

  function showErrorInfo(m, n, isauto) {
    'use strict';
    var emptyItem = [];
    var errorItem = [];
    var thisInput = $(n).find('input').first();
    var result;
    var flag = 0;
    if ($(n).parent().css('display') !== 'none') {
      if ($(n).hasClass('must-fill')) {
        if (thisInput.val() === '') {
          thisInput.addClass('error');
          if (isauto) {
            emptyItem.push($(n).find('.tourist-label').text().replace('*', '') + '不能为空');
          } else {
            emptyItem.push($(n).find('.tourist-label').text().replace('*', ''));
          }
          flag++;
        } else {
          result = formCheckWay(thisInput);
          if (!result[0]) {
            errorItem.push(result[1]);
            flag++;
          }
        }
      } else {
        if (thisInput.val() !== '') {
          result = formCheckWay(thisInput);
          if (!result[0]) {
            errorItem.push(result[1]);
            flag++;
          }
        }
      }
    }
    return [emptyItem, errorItem, flag];
  }

  function errorText(thisfill, emptyItem, errorItem, isauto) {
    var emptyItemText = '',
      errorItemText = '',
      dh = '';
    if (emptyItem.length !== 0) {
      if (isauto) {
        emptyItemText = emptyItem.join(', ');
      } else {
        emptyItemText = emptyItem.join(', ') + '不能为空';
      }
    }
    if (errorItem.length !== 0) {
      if (isauto) {
        errorItemText = errorItem.join(', ');
      } else {
        errorItemText = errorItem.join(', ') + '格式不正确';
      }
    }
    if (!(emptyItem.length === 0 && errorItem.length === 0)) {
      if (thisfill.hasClass('lodger-item')) {
        if (thisfill.find('.user-error-tip').length !== 0) {
          dh = emptyItemText === '' ? '' : '；';
          thisfill.find('.user-error-tip').text(emptyItemText + dh + errorItemText);
        } else {
          dh = emptyItemText === '' ? '' : '；';
          thisfill.find('.input-groups').after('<div class="user-error-tip">' + emptyItemText + dh + errorItemText + '</div>');
        }
      } else {
        if (thisfill.find('.user-error-tip').length !== 0) {
          dh = emptyItemText === '' ? '' : '；';
          thisfill.find('.user-error-tip').text(emptyItemText + dh + errorItemText);
        } else {
          dh = emptyItemText === '' ? '' : '；';
          thisfill.find('.tourist-form').before('<div class="user-error-tip">' + emptyItemText + dh + errorItemText + '</div>');
        }
      }

    } else {
      thisfill.find('.user-error-tip').remove();
    }
  }

  // 按钮组
  function saveCommonUser() {
    // 设置为常用联系人
    $(".save-common-vistor").unbind().click(function () {
      $(this).find('.radio-16').toggleClass('picked');
    });
    
    // 清空
    $(".clean-common-vistor").unbind().click(function () {
      var member = $(this).parent().parent().parent();
      var data_val = $(this).parent().parent().parent().attr('data-value');
      $('.member-check .checkbox-btns-row li[data-value="'+data_val+'"]').removeClass('active');
      clearVistorInfo(member);
    });
  }
  // 校验方法
  function formCheckWay(input) {
    'use strict';
    var inputVal = input.val();
    var cardCtx = {
      IDCard: '身份证',
      PassPort: '护照',
      MTPs: '台胞证',
      HVPs: '回乡证',
      MilitaryID: '军官证',
      AccountBook: '户口本',
      BrithCert: '出生证',
      Pass: '港澳通行证',
      InputTCard: '台湾通行证',
      qita: '其他'
    }
    if (input.hasClass('tourist-name-input')) {
      if (inputVal.length > 30 || /[\<\>\"\']/.test(inputVal)) {
        input.addClass('error');
        return [false, '游客姓名'];
      } else {
        input.removeClass('error');
        return [true, ''];
      }
    } else if (input.hasClass('tourist-enname-input') || input.hasClass('input-en-last')) {
      if (inputVal.length > 30 || /[\<\>\"\']/.test(inputVal)) {
        input.addClass('error');
        return [false, '游客英文/拼音姓名'];
      } else {
        if (input.attr('check-type') === 'hotel-en-name') {
          if ( /^[a-zA-Z \s]{2,20}$/.test(inputVal)) {
            input.removeClass('error');
            return [true, ''];
          } else {
            input.removeClass('error');
            return [false, '入住港澳酒店需填写英文/拼音姓名，需与港澳通行证或护照姓名保持一致，如ZhangXiaoming'];
          }
        } else {
          input.removeClass('error');
          return [true, ''];
        }
      }
    } else if (input.hasClass('tourist-cardnum-input')) {
      var cardType = input.parents('.tourist-form').find('.tourist-cardtype-input').val();
      if (checkCardNmByType(cardType, inputVal)) {
        input.removeClass('error');
        if (cardType==='IDCard') {
          var sex = inputVal[inputVal.length-2];
          if (parseInt(sex)%2  === 0) {
            sex = 1;
          } else {
            sex = 0;
          }
          input.parents('.tourist-form').find('.radio-item').removeClass('active').eq(sex).addClass('active');
        }
        return [true, ''];
      } else {
        input.addClass('error');
        return [false, cardCtx[cardType]];
      }
    } else if (input.hasClass('tourist-phone-input')) {
      if (gzformcheck.reg.phone.test(inputVal)) {
        input.removeClass('error');
        return [true, ''];
      } else {
        input.addClass('error');
        return [false, '手机号码'];
      }
    } else if (input.hasClass('tourist-birthday-input')) {
      if (gzformcheck.reg.date.test(inputVal)) {
        input.removeClass('error');
        return [true, ''];
      } else {
        input.addClass('error');
        return [false, '出生日期'];
      }
    } else if (input.hasClass('tourist-okdate-input')) {
      if (gzformcheck.reg.date.test(inputVal)) {
        input.removeClass('error');
        return [true, ''];
      } else {
        input.addClass('error');
        return [false, '证件有效期'];
      }
    }
    return [true, ''];
  }
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