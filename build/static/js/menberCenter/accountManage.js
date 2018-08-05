$(document).ready(function() {
  $(".left-nav").scrollFloat({
    isFill: false
  });

  $(".headRow").scrollFloat({
  });

  $(".pagination").pagination({
    pageCount: 50,
    jump: true,
    coping: true,
    jumpBtn: '确定',
    prevContent: '上一页',
    nextContent: '下一页'
  });
  // add account
  $('.add-account').on('click',function () {
    gzui.addAccount({
      callbackFn: function (vals) {
        console.log(vals);
        // var tpl = '<li style="display: list-item;"><span class="check">'+vals[0].val+'<span class="default-logo"></span><span class="tick-logo"></span></span><span class="name">'+vals[0].val+'</span><span class="tel">'+vals[1].val+'</span><span class="email">'+vals[2].val+'</span><span class="corp"><a class="edit_btn">编辑</a><a class="set_default">设为默认</a></span></li>'
        // $('.add-contact').parent().before(tpl);
        // contactEvent();
      }
    });
  });

  $('.active img').on('click', function(){
    var clazz = $(this).attr('class')
    var self = this
    if(clazz === 'checked'){
      gzui.addToast({
        callbackFn: function () {
          console.log();
          $(self).removeClass('checked').addClass('forbidden')
            .attr('src','../../static/images/menberCenter/forbidden.png')
          $(self).parents('tr').addClass('forbidden')
        }
      });
    }else if(clazz === 'forbidden') {
      $(this).removeClass('forbidden').addClass('checked')
        .attr('src','../../static/images/menberCenter/checked.png')
      $(this).parents('tr').removeClass('forbidden')
    }
  });
  

  $('.updatePassw').on('click', function(){
    var tr = $(this).parents("tr");
    if(!tr.hasClass("forbidden")){
      gzui.updatePassw({
        callbackFn: function (vals) {
          console.log(vals);
        }
      });
    }
  });
  $('.modifyInfo').on('click',function(){
    var tr = $(this).parents("tr");
    if(!tr.hasClass("forbidden")){
      gzui.modifyInfo({
        callbackFn: function (vals) {
          console.log(vals);
        }
      });
    }
  })

  

});