$(function (){
  'use strict';
  // 授信额度进度条
  var B2B = $(".B2B-quota");
  var GHM = $(".GHM-quota");
  var B2Bvalue = parseInt($(".usable-item",B2B).text().replace(/,/g, ""))/parseInt($(".total-item",B2B).text().replace(/,/g, ""))*100;
  var GHMvalue = parseInt($(".usable-item",GHM).text().replace(/,/g, ""))/parseInt($(".total-item",GHM).text().replace(/,/g, ""))*100;
  $(".quota-progress", B2B).circleChart({
    size: 56,
    backgroundColor: '#f4f4f6',
    startAngle: 75,
    lineCap: 'butt',
    widthRatio: .15,
    textSize: '14px',
    text: 0,
    color: '#7C7CFC',
    value: B2Bvalue?B2Bvalue:null,
    onDraw: function(el, circle) {
      circle.text(Math.round(circle.value) + "%");
    }
  });
  $(".quota-progress", GHM).circleChart({
    size: 56,
    backgroundColor: '#f4f4f6',
    startAngle: 75,
    lineCap: 'butt',
    widthRatio: .15,
    textSize: '14px',
    text: 0,
    color: '#F30A37',
    value: GHMvalue?GHMvalue:null,
    onDraw: function(el, circle) {
      circle.text(Math.round(circle.value) + "%");
    }
  });
  // 取消
  $(".menbercenter-info-list").on("click", ".cancel-btn", function () {
    var list = $(this).parents(".menbercenter-info-item");
    $(this).parents(".menbercenter-info-list-item").remove();
    if(list.find(".menbercenter-info-list-item").length-1 === 0){
      list.remove();
    }
  })
});