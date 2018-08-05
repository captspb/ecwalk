$(function(){
  'use strict';
  // 订单步骤
  b2c_header.stepctl(4);
  // 支付选择
  $(".payment-method span.payment-method-span").on("click",function(){
    var accountPay = $('.accountMoney .check-icon').parent().siblings('.account-pay')
    var accountPass = $('.accountMoney .check-icon').parent().siblings('.account-passw')
    var inputEle = accountPay.find('input')
    var inputEle2 = accountPass.find('input')
    $(this).addClass("active").siblings().removeClass("active");
    if ($(this).hasClass('bank-method-span')) {
      $('.bank-pay').show()
      // $('.accountMoney .check-icon').removeClass('checked-icon')
      // accountPay.addClass('dis');
      // accountPass.addClass('dis')
      // inputEle.val('')
      // inputEle2.val('')
      // inputEle.attr('readonly',true)
      // inputEle2.attr('readonly',true)
      // inputEle2.parents('ul').removeClass('correct').next().hide()
      // $('.account-more').hide()
    }else {
      $('.bank-pay').hide()
    }
  })

  $(".accountMoney .check-icon").on('click',function(){
    // if ($('.payment-method span.payment-method-span.active').hasClass('bank-method-span'))
    //   return
    var accountPay = $(this).parent().siblings('.account-pay')
  	var accountPass = $(this).parent().siblings('.account-passw')
    var inputEle = accountPay.find('input')
  	var inputEle2 = accountPass.find('input')
  	$(this).toggleClass('checked-icon')
		accountPay.toggleClass('dis');
    accountPass.toggleClass('dis')
    if ( inputEle.attr('readonly')){
      inputEle.attr('readonly',false)
  		inputEle2.attr('readonly',false)
  	}else{
      inputEle.val('')
  		inputEle2.val('')
      inputEle.attr('readonly',true)
  		inputEle2.attr('readonly',true)
      inputEle2.parents('ul').removeClass('correct').next().hide()
  		$('.account-more').hide()
  	}
  })

  $(".account-pay input").on('blur',function(){
  	var accountPay = $(this).parent()
  	if (accountPay.hasClass('dis')) return
  	var accountLeft = parseFloat($('.account-left span').text().replace('￥',''))
  	if(isNaN(parseFloat($(this).val()))) {
  		$(this).val('')
  	}
  	if($(this).val() > accountLeft) {
  		$(this).val(accountLeft)
  	}
  	if (parseFloat($(this).val()) > 0 ) 
  		$('.account-more').show()
  	else 
  		$('.account-more').hide()
  })

  // 密码输入框自动跳下一个
  $(".account-passw input").on("input propertychange", function(){
    var nextInp = $(this).parent().next().find('input')
    var prevInp = $(this).parent().prev().find('input')
    // console.log(nextInp)
    if ($(this).val() === ''){
      prevInp.focus()
      $(this).parent().parent().removeClass('correct').next().hide()
    } else {
      // 检测数字
      var reg = $(this).val().match(/\d+\.?\d{0,2}/);
      var txt = '';  
        if (reg != null) {  
            txt = reg[0];  
        }  
        $(this).val(txt);
        if ($(this).val() !== ''){
          // console.log($(this).val())
          if (nextInp.length>0){
            nextInp.focus()
            $(this).parent().parent().removeClass('correct').next().hide()
          }else{
            $(this).blur()
            $(this).parent().parent().addClass('correct').next().css('display', 'inline-block')
          }
        }
    }

  })

  bindKeyEvent($(".account-pay input"));
  bindKeyEvent($(".bank-pay input.money"));

  // 预定信息查看
  $(".checkstand-top-con .booking-info span").on("click", function () {
    var info = $(".checkstand-top-info");
    if (info.is(":hidden")) {
      info.show();
      $(this).find("i").attr("class","icon-packup");
    }else{
      info.hide();
      $(this).find("i").attr("class","icon-expand");
    }
  });
  // 设置支付密码
  $(".set-account-passw").on("click", function () {
    gzui.formPopup({
      title: '支付密码设置',
      saveBtn: '确认',
      cancelBtn: '取消',
      formItem: [
        {type: 'input', name: "图形验证码", is_null: false, checkway: "validCode"},
        {type: 'input', name: "短信验证码", is_null: false, checkway: "telValid"},
        {type: 'input', name: "支付密码", is_null: false, checkway: "newPassw"},
        {type: 'input', name: "确认密码", is_null: false, checkway: "passwSame"}
      ],
      isAgreed: false,
      popupType: 'setPsw',
      callbackFn: function(form){
        console.log(form)
        gzui.toload({tip: "正在提交…"})
        setTimeout(function () {
          gzui.toloadHide();
          gzui.toast({text: "恭喜！设置成功"})
        },2500)
      }
    });
    $(".com-input-wrp").before('<div class="account-tel"><label>手机号码</label><span>13712341234</span></div>')
  });
});

function bindKeyEvent(obj){  
    obj.keyup(function () {  
        var reg = $(this).val().match(/\d+\.?\d{0,2}/);  
        var txt = '';
        if (reg != null) {  
            txt = reg[0];  
        }  
        $(this).val(txt);
    }).change(function () {  
        $(this).keypress();  
        var v = $(this).val();  
        if (/\.$/.test(v))  
        {  
            $(this).val(v.substr(0, v.length - 1));  
        }  
    });  
}  