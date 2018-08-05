$(function () {
  'use strict';
  // 退改政策详情
  $(".refund-policy").on("click", function () {
    gzui.dialog({
      title: "退改政策",
      con: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam consequuntur culpa dicta dolor enim exercitationem expedita illo laborum maxime necessitatibus, non, perspiciatis recusandae sint totam. Ipsa minus possimus quia.",
      width: 944,
      hasClose: true
    });
  });
  // 变更
  $(".airTicket-order-sidebar .change-trip").on("click", function () {
    gzui.dialog({
      title: "提示",
      con: "你好，机票变更（退改/改签）将有可能产生费用，具体费用请查看您的订单详情里面的退改政策",
      width: 400,
      btn: [
        {name: '取消',click:function(){console.log("123")}},
        {name: '确定',className: 'active',click:function(){
            var tpl = '<div class="change-trip-con">' +
              '<textarea placeholder="变更行程标题（必填）" class="change-trip-tit"></textarea>' +
              '<textarea placeholder="变更前内容" class="change-trip-before"></textarea>' +
              '<textarea placeholder="变更后内容" class="change-trip-after"></textarea>' +
              '</div>';
            gzui.dialog({
              title: "发起变更行程",
              con: tpl,
              width: 535,
              hasClose: true,
              btn: [
                {name: '取消',click:function(){console.log("123")}},
                {name: '确定',className: 'active',click:function(){}}
              ]
            });
          }}
      ]
    });
  });
  // 添加备注
  $(".airTicket-order-note .add-note").on("click", function () {
    var tpl = '<div class="add-note-con"><textarea placeholder="请输入备注信息"></textarea></div>';
    gzui.dialog({
      title: "添加新备注",
      con: tpl,
      width: 535,
      hasClose: true,
      btn: [
        {name: '取消',click:function(){console.log("123")}},
        {name: '确定',className: 'active',click:function(){}}
      ]
    });
  })
});