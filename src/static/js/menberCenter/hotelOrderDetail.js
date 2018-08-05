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

  $('.comfirm-domestic').on('click', function (){
    gzui.comfirm({
      callbackFn: function (vals) {
        console.log(vals);
        // var tpl = '<li style="display: list-item;"><span class="check">'+vals[0].val+'<span class="default-logo"></span><span class="tick-logo"></span></span><span class="name">'+vals[0].val+'</span><span class="tel">'+vals[1].val+'</span><span class="email">'+vals[2].val+'</span><span class="corp"><a class="edit_btn">编辑</a><a class="set_default">设为默认</a></span></li>'
        // $('.add-contact').parent().before(tpl);
        // contactEvent();
      }
    });
  });

  

});