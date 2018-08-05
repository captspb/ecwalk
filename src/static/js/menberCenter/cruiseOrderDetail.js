$(document).ready(function() {
  // $(".left-nav").scrollFloat({
  //   isFill: false
  // });

 
  // add account
  $('.add-note').on('click',function () {
    gzui.editText({
      title: '添加新备注',
      placeholder: '请输入备注信息',
      callbackFn: function (vals) {
        console.log(vals);
        // var tpl = '<li style="display: list-item;"><span class="check">'+vals[0].val+'<span class="default-logo"></span><span class="tick-logo"></span></span><span class="name">'+vals[0].val+'</span><span class="tel">'+vals[1].val+'</span><span class="email">'+vals[2].val+'</span><span class="corp"><a class="edit_btn">编辑</a><a class="set_default">设为默认</a></span></li>'
        // $('.add-contact').parent().before(tpl);
        // contactEvent();
      }
    });
  });

  $('.cancel-travel').on('click', function (){
    gzui.editText({
      title: '取消行程',
      placeholder: '请输入取消行程的原因',
      callbackFn: function (vals) {
        console.log(vals);
        // var tpl = '<li style="display: list-item;"><span class="check">'+vals[0].val+'<span class="default-logo"></span><span class="tick-logo"></span></span><span class="name">'+vals[0].val+'</span><span class="tel">'+vals[1].val+'</span><span class="email">'+vals[2].val+'</span><span class="corp"><a class="edit_btn">编辑</a><a class="set_default">设为默认</a></span></li>'
        // $('.add-contact').parent().before(tpl);
        // contactEvent();
      }
    });
  });

  $('.update-travel').on('click', function (){
    gzui.updateTravel({
      callbackFn: function (vals) {
        console.log(vals);
        // var tpl = '<li style="display: list-item;"><span class="check">'+vals[0].val+'<span class="default-logo"></span><span class="tick-logo"></span></span><span class="name">'+vals[0].val+'</span><span class="tel">'+vals[1].val+'</span><span class="email">'+vals[2].val+'</span><span class="corp"><a class="edit_btn">编辑</a><a class="set_default">设为默认</a></span></li>'
        // $('.add-contact').parent().before(tpl);
        // contactEvent();
      }
    });
  });

  $('.add-tourist').on('click', function(){
    var $tblEle = $(this).parent().next()
    var text = $(this).text()
    if (text === '补录信息'){
      $tblEle.find('tr:eq(1)').addClass('showInp').siblings().removeClass('showInp')
      $tblEle.addClass('editableTbl')
      $(this).text('完成').addClass('finish-btn')
    }else{
      // 填充span
      var $inputEd = $('.showInp input')
      $inputEd.each(function(){
        var val = $(this).val()
        if (val === ''){
          $(this).prev().find('span').text('--').addClass('dis')
        }else{
          $(this).prev().find('span').text(val).removeClass('dis')
        }
      })
      // select
      var $selectEle = $('.showInp select')
      var selectText = $selectEle.find("option:selected").text()
      if (selectText === ''){
        $selectEle.prev().find('span').text('--').addClass('dis')
      }else{
        $selectEle.prev().find('span').text(selectText).removeClass('dis')
      }

      $tblEle.removeClass('editableTbl')
      $(this).text('补录信息').removeClass('finish-btn')
      $tblEle.find('tr').removeClass('showInp')
    }
  })

  $('.touristTbl tr').on('click', function(){
    var $tblEle = $(this).parents('table')
    var $inputs = $(this).find('input')
    // 保存上一个编辑状态的tr的值
    if ($(this).hasClass('showInp'))
      return
    var $inputEd = $('.showInp input')
    $inputEd.each(function(){
      var val = $(this).val()
      if (val === ''){
        $(this).prev().find('span').text('--').addClass('dis')
      }else{
        $(this).prev().find('span').text(val).removeClass('dis')
      }
    })
    // select
    var $selectEle = $('.showInp select')
    var selectText = $selectEle.find("option:selected").text()
    if (selectText === ''){
      $selectEle.prev().find('span').text('--').addClass('dis')
    }else{
      $selectEle.prev().find('span').text(selectText).removeClass('dis')
    }
    
    if ($tblEle.hasClass('editableTbl')) {
      $(this).addClass('showInp').siblings().removeClass('showInp')
    }
    $inputs.each(function(){
      var val = $(this).prev().find('span').text()
      if (val.trim() === '--')
        $(this).val('')
      else
        $(this).val(val)
    });
  })

  
});