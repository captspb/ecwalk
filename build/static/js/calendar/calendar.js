(function ($) {
  "use strict";
  $.fn.gzldatepicker = function (option) {
    var defaults = {
      date: {}, //{'2017-11-02': '||cu|国庆'},
      startdate: '',
      title_class: ".price-calendar-title", // 日历标题选择器
      date_class: ".date-blank", // 日历空格选择器
      arrow: [".b-left-arrow", ".b-right-arrow"], // 左右你箭头选择器
      pick_type: "price", // 类型选择，有价格日历：price和选择日历：range，默认价格日历
      is_range: false, // 是否是范围选择，true或false，默认false
      is_double: false, // 是否是双日历，true或false，默认false
      same_day: false, // 是否可以选同一天
      start_text: '', // 范围选择的情况下，第一个选择日期下的文字提示
      end_text: '', // 范围选择情况下，第二个选择日期下的文字提示
      clickFn: function (res, obj) {
        console.log(res, obj);
      },
      hoverFn: function (res, obj) {
        console.log(res, obj);
      },
      nextMonthCallBack: function (res) {
        // 点击下个月执行，返回值为操作后的日期
        console.log(res);
      },
      prevMonthCallBack: function (res) {
        // 点击上个月执行，返回值为操作后的日期
        console.log(res);
      },
      startby: 'date', // 作为选择日历的情况下，默认开始是哪个界面（年：year，月：month，日：date）
      limit_pick: true, // 是否限制当前日期前为不可选
      limit_date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
      default_able: true, // 默认是否都是可选
      limit_range: 15, // 在is_range为true情况下，允许选择的日历范围的总天数
      outRange: function (res) {
        // 超出范围提示
        gzui.toast({text: "时间范围天数不得超过" + params.limit_range + "天"});
      },
      sameDay: function () {
        // 在选择范围日历情况下，选择一天的情况
        gzui.toast({text: "请选择一个时间范围"});
      }
    };
    var params = $.extend(defaults, option);
    var self = $(this);

    // 点击其他地方隐藏
    (function ($) {
      $.fn.autoHide2 = function () {
        var ele = $(this);
        $(document).on("mousedown", function (e) {
          if (!e.target.attributes['date-input']) {
            if (ele.is(":visible") && ele.has(e.target).length === 0) {
              ele.hide();
            }
          }
        });
      };
    })(jQuery);

    function initCalendar() {
      var today, next_month, month_list;
      self.unbind('click').click(function (e) {
        e.stopPropagation();
        self.find("input").eq(0).focus();
      });
      if (params.is_double) {
        if(params.pick_type==="range"){
          self.find("input").unbind().focus(function (e) {
            e.stopPropagation();
            $(this).attr('date-input', 'true');
            today = rangeToday();
            next_month = new Date(today.getFullYear(), today.getMonth() + 1, 1);
            month_list = getMonthDay([today, next_month]);
            self.find(".range-calendar-double-wrp").remove();
            self.append($("#range-calendar-double-wrp").html());
            baseCalendar(month_list);
            $(".price-calendar-ctx").parent().autoHide2();
            initEvent();
            rangeInit();
            $(".range-calendar-double-wrp").css("left", $(this).parent().find('input').eq(0).position().left);
          });
        }else{
          today = params.startdate === undefined || params.startdate === '' ? new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) : params.startdate;
          next_month = new Date(today.getFullYear(), today.getMonth() + 1, 1);
          month_list = getMonthDay([today, next_month]);
          self.html($("#price-calendar-double-wrp").html());
          baseCalendar(month_list);
          initEvent();
        }

      } else {
        if(params.pick_type==="range"){
          self.find("input").unbind().focus(function (e) {
            e.stopPropagation();
            $(this).attr('date-input', 'true');
            today = rangeToday();
            month_list = getMonthDay([today]);
            self.find(".range-calendar-single-wrp").remove();
            self.append($("#range-calendar-single-wrp").html());
            baseCalendar(month_list);
            $(".price-calendar-ctx").parent().autoHide2();
            initEvent();
            rangeInit();
            $(".range-calendar-single-wrp").css("left", $(this).position().left);
          });
        }else{
          today = params.startdate === undefined || params.startdate === '' ? new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) : params.startdate;
          month_list = getMonthDay([today]);
          self.html($("#price-calendar-single-wrp").html());
          baseCalendar(month_list);
          initEvent();
        }
      }
    }

    function datePick(date) {
      $('.calendar-block[date-pick="'+ date +'"]').parent().addClass('picked');
    }

    function initEvent() {
      // 左边箭头事件
      $(params.arrow[0]).click(function (e) {
        e.stopPropagation();
        lastMonth($(this));
      });
      // 左边箭头事件
      $(params.arrow[1]).click(function (e) {
        e.stopPropagation();
        nextMonth($(this));
      });
      // 点击事件
      pickFn(params.clickFn);
      // 鼠标悬浮事件
      hoverFn(params.hoverFn);
      if (params.startdate !== undefined && params.startdate !== '') {
        var today = params.startdate === undefined || params.startdate === '' ? new Date() : params.startdate;
        var dateStr = today.getFullYear() + '-' + dbDate(parseInt(today.getMonth())+1) + '-' + dbDate(today.getDate());
        datePick(dateStr);
      }

    }

    // 判断是否为数组
    function isArray(o) {
      return Object.prototype.toString.call(o) === '[object Array]';
    }

    // 获取一个月份所有的天数对象
    function getMonthDay(yms) {
      // yms 是日期数组
      if (!isArray(yms)) {
        console.warn("'yms' must be a Array");
        return false;
      } else {
        var all_months = [];
        var today = new Date();
        var okdate = cleanData(params.date);
        for (var i = 0; i < yms.length; i++) {
          var month_days = [];
          var date_num = getMonthDateNumber(yms[i]);
          for (var j = 0; j < date_num; j++) {
            var tem_date = new Date(yms[i].getFullYear(), yms[i].getMonth(), j + 1);
            var able;
            if (params.limit_pick) {
              if(tem_date<params.limit_date){
                able = false;
              }else{
                able = true;
              }
            } else {
              able = true;
            }

            var fullyear = tem_date.getFullYear() + "-" + dbDate(tem_date.getMonth() + 1) + "-" + dbDate(tem_date.getDate());
            if (okdate[fullyear]!==undefined) {
              var is_tag = okdate[fullyear][2] === 0 ? false : true;
              var is_holiday = okdate[fullyear][3] === undefined ? false : true;
              var holiday_name = okdate[fullyear][3] === undefined ? '' : okdate[fullyear][3];
              var able, price, yw;
              if (parseInt(okdate[fullyear][1].replace('>'))===0||okdate[fullyear][1]===""||okdate[fullyear][0]==="") {
                able = false;
              } else {
                able = true;
              }
              if (okdate[fullyear][0]==="") {
                price = '';
              } else {
                price = "￥" + okdate[fullyear][0];
              }
              if (okdate[fullyear][1]===""){
                yw = '';
              }else if(parseInt(okdate[fullyear][1].replace('>'))===0) {
                yw = '满团';
              } else {
                if (/>/g.test(okdate[fullyear][1])) {
                  yw = '充足';
                } else {
                  yw = '余位' + okdate[fullyear][1];
                }
              }
              month_days.push({
                ymd: fullyear,
                year: tem_date.getFullYear(),
                month: tem_date.getMonth() + 1,
                date: tem_date.getDate(),
                week: tem_date.getDay(),
                is_holiday: is_holiday,
                holiday_name: holiday_name,
                is_tag: is_tag,
                tag_type: okdate[fullyear][2],
                price: price,
                leave: 1,
                leave_text: yw,
                able: able
              });
            } else {
              month_days.push({
                year: tem_date.getFullYear(),
                month: tem_date.getMonth() + 1,
                date: tem_date.getDate(),
                week: tem_date.getDay(),
                is_holiday: false,
                holiday_name: '',
                is_tag: false,
                tag_type: 0,
                price: "",
                leave: 0,
                leave_text: "",
                able: able && params.pick_type !== 'price' && params.default_able
              });
            }

          }
          all_months.push(month_days);
        }
        return all_months;
      }

      // 获取一个月的天数
      function getMonthDateNumber(date) {
        var tem_date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return tem_date.getDate();
      }
    }

    // 写入基础数据
    function baseCalendar(ml) {
      var ym, all_day;
      self.parent().addClass("calendar-parent");
      self.find(".price-calendar-ctx").each(function (k, e) {
        ym = ml[k][0].year + "年" + ml[k][0].month + "月";
        $(e).find(params.title_class).text(ym);
        all_day = ml[k];
        var first_day = ml[k][0].week;
        var date_tpl = "";
        var holiday;
        var holiday_name;
        var tag;
        var status;
        var able;
        var offset;
        for (var i = 0; i < all_day.length; i++) {
          holiday = all_day[i].is_holiday === true ? " date-holiday" : "";
          holiday_name = all_day[i].holiday_name === '' ? all_day[i].date : all_day[i].holiday_name;
          able = all_day[i].able === true ? "" : " disable";
          switch (all_day[i].tag_type) {
            case 0:
              tag = "";
              break;
            case 1:
              tag = "<span class='min'><span>减</span></span>";
              break;
            case 2:
              tag = "<span class='discount'><span>促</span></span>";
              break;
            case 3:
              tag = "<span class='hui'><span>惠</span></span>";
              break;
            case 4:
              tag = "<span class='qiang'><span>抢</span></span>";
              break;
          }
          switch (all_day[i].leave) {
            case 0:
              status = " status-ok";
              break;
            case 1:
              status = " status-leave";
              break;
            case 2:
              status = " status-ban";
              break;
          }
          if(params.pick_type==="range"){
            date_tpl = "<div class='calendar-block popover" + holiday + able + "' date-pick='" + all_day[i].year + "-" + dbDate(all_day[i].month) + "-" + dbDate(all_day[i].date) + "'>" +
            "<div class='date-num-wrp'>" +
            "<span class='picke-range'></span>" +
            "<span class='date-num" + status + holiday + "'>" + holiday_name + "</span>" +
            "</div>" +
            "</div>";
          }else{
            date_tpl = "<div class='calendar-block popover" + holiday + able + "' date-pick='" + all_day[i].year + "-" + dbDate(all_day[i].month) + "-" + dbDate(all_day[i].date) + "'>" +
            tag +
            "<div class='date-num-wrp'>" +
            "<span class='date-num" + status + "'>" + all_day[i].date + "</span>" +
            "<span class='holiday-name" + status + "'>" + all_day[i].holiday_name + "</span>" +
            "</div>" +
            "<div class='date-price" + status + "'>" + all_day[i].price + "</div>" +
            "<div class='route-status" + status + "'>" + all_day[i].leave_text + "</div>" +
            "</div>";
          }
          $(e).find(params.date_class).eq(first_day + i).html(date_tpl);
        }
      });
      if(params.is_double){
        self.find(".price-calendar-ctx").eq(0).find(".price-calendar-line").each(function (i, e) {
          $(e).find(".date-blank").eq(0).addClass("b-width");
        });
        self.find(".price-calendar-ctx").eq(1).find(".price-calendar-line").each(function (i, e) {
          $(e).find(".date-blank").eq($(e).find(".date-blank").length-1).addClass("b-width-2");
        });
      } else {
        if (params.pick_type!=='price') {
          switch (params.startby) {
            case 'date':
              break;
            case 'month':
              var month_list = '';
              var all_month_list;
              for (var i=0; i<12; i++) {
                month_list = month_list + '<li><span>'+(i+1)+'月</span></li>';
              }
              month_list = '<div class="swiper-slide"><ul>'+month_list+'</ul></div>';
              self.find(params.title_class).attr('click-type', 'year');
              self.find(params.title_class).text(self.find(params.title_class).text().split("年")[0]);
              var parent = self.find(params.title_class).parent().parent().parent();
              all_month_list = '<div class="swiper-container month-picker"><div class="swiper-wrapper">' + month_list + '</div></div>';
              if (parent.find('.swiper-container').length===0){
                parent.find('.price-calendar-route').append(all_month_list);
              }
              parent.find('.month-picker ul li').click(function (e) {
                e.stopPropagation();
                chooseMonth($(this));
              });
              break;
            case 'year':
              self.find(params.title_class).attr('click-type', 'years');
              self.find(params.title_class).text(parseInt(self.find(params.title_class).text().split("年")[0])-11 + '-' + parseInt(self.find(params.title_class).text().split("年")[0]));
              var parent = self.find(params.title_class).parent().parent().parent();
              var year_list = '';
              var all_year_list;
              for (var i=0; i<12; i++) {
                year_list = year_list + '<li><span>'+(parseInt(self.find(params.title_class).text().split("年")[0])+i)+'</span></li>';
              }
              year_list = '<div class="swiper-slide"><ul>'+year_list+'</ul></div>';
              all_year_list = '<div class="swiper-container year-picker"><div class="swiper-wrapper">' + year_list + '</div></div>';
              parent.find('.month-picker').remove();
              if (parent.find('.swiper-container').length===0){
               parent.find('.price-calendar-route').append(all_year_list);
              }
              parent.find('.year-picker ul li').click(function (e) {
                e.stopPropagation();
                chooseYear($(this));
              });
              break;
          }
          $(params.title_class).unbind('click').click(function (e) {
            e.stopPropagation();
            if ($(this).attr('click-type')===undefined) {
              var month_list = '';
              var all_month_list;
              for (var i=0; i<12; i++) {
                month_list = month_list + '<li><span>'+(i+1)+'月</span></li>';
              }
              month_list = '<div class="swiper-slide"><ul>'+month_list+'</ul></div>';
              $(this).attr('click-type', 'year');
              $(this).text($(this).text().split("年")[0]);
              var parent = $(this).parent().parent().parent();
              all_month_list = '<div class="swiper-container month-picker"><div class="swiper-wrapper">' + month_list + '</div></div>';
              if (parent.find('.swiper-container').length===0){
                parent.find('.price-calendar-route').append(all_month_list);
              }
              parent.find('.month-picker ul li').click(function (e) {
                e.stopPropagation();
                chooseMonth($(this));
              });
            } else if ($(this).attr('click-type')==='year') {
              $(this).attr('click-type', 'years');
              $(this).text(parseInt($(this).text().split("年")[0])-11 + '-' + parseInt($(this).text().split("年")[0]));
              var parent = $(this).parent().parent().parent();
              var year_list = '';
              var all_year_list;
              for (var i=0; i<12; i++) {
                year_list = year_list + '<li><span>'+(parseInt($(this).text().split("年")[0])+i)+'</span></li>';
              }
              year_list = '<div class="swiper-slide"><ul>'+year_list+'</ul></div>';
              all_year_list = '<div class="swiper-container year-picker"><div class="swiper-wrapper">' + year_list + '</div></div>';
              parent.find('.month-picker').remove();
              if (parent.find('.swiper-container').length===0){
               parent.find('.price-calendar-route').append(all_year_list);
              }
              parent.find('.year-picker ul li').click(function (e) {
                e.stopPropagation();
                chooseYear($(this));
              });
            }
          });
        }
      }
    }

    function chooseYear(yearbtn) {
      var this_ctx = yearbtn.parent().parent().parent().parent().parent().parent();
      var this_year = yearbtn.text();
      this_ctx.find('.price-calendar-title').text(this_year).attr('click-type', 'year');
      this_ctx.find('.year-picker').remove();
      var month_list = '';
      var all_month_list;
      for (var i=0; i<12; i++) {
        month_list = month_list + '<li><span>'+(i+1)+'月</span></li>';
      }
      month_list = '<div class="swiper-slide"><ul>'+month_list+'</ul></div>';
      all_month_list = '<div class="swiper-container month-picker"><div class="swiper-wrapper">' + month_list + '</div></div>';
      if (this_ctx.find('.swiper-container').length===0){
        this_ctx.find('.price-calendar-route').append(all_month_list);
      }
      this_ctx.find('.month-picker ul li').click(function (e) {
        e.stopPropagation();
        params.startby = 'month';
        chooseMonth($(this));
      });
    }

    function chooseMonth(monthbtn) {
      var this_ctx = monthbtn.parent().parent().parent().parent().parent().parent();
      var this_month = monthbtn.text().replace('月', '');
      this_ctx.find('.price-calendar-title').text(this_ctx.find('.price-calendar-title').text()+'年'+this_month+'月').removeAttr('click-type');
      this_ctx.find('.month-picker').remove();
      var month_list;
      var all_month = [];
      this_ctx.find(".date-blank").removeClass("picked").removeClass("first").removeClass("second").removeClass("date-range");
      this_ctx.find(".price-calendar-route").each(function (i, e) {
        var last_date = new Date(parseInt(this_ctx.find('.price-calendar-title').text()), parseInt(this_month) - 1, 1);
        month_list = getMonthDay([last_date]);
        all_month.push(month_list[0]);
        $(e).find(".date-blank").html("");
      });
      params.startby = 'date';
      baseCalendar(all_month);
    }

    // 左箭头（获取上一个状态）
    function lastMonth(self) {
      self = self.parent().parent().parent().parent();
      var ltype = $(params.title_class).attr('click-type');
      if (ltype===undefined){
        var month_list;
        var all_month = [];
        self.find(".date-blank").removeClass("picked").removeClass("first").removeClass("second").removeClass("date-range");
        self.find(".price-calendar-route").each(function (i, e) {
          var this_date = $(e).find(".calendar-block").eq(0).attr("date-pick").split("-");
          var last_date = new Date(parseInt(this_date[0]), parseInt(this_date[1]) - 2, parseInt(this_date[2]));
          month_list = getMonthDay([last_date]);
          all_month.push(month_list[0]);
          $(e).find(".date-blank").html("");
        });
        baseCalendar(all_month);
        if(params.is_range){
          rangeInit();
        } else {
          var this_date = self.find(".price-calendar-route").find(".calendar-block").eq(0).attr("date-pick").split("-");
          var last_date = new Date(parseInt(this_date[0]), parseInt(this_date[1]) - 1, parseInt(this_date[2]));
          params.prevMonthCallBack(last_date);
        }
      } else if (ltype==='year') {
        var this_year = parseInt(self.find('.price-calendar-title').text()) - 1;
        self.find('.price-calendar-title').text(this_year);
        self.find('.month-picker ul li').click(function (e) {
          e.stopPropagation();
          chooseMonth($(this));
        });
      } else if (ltype==='years') {
        var this_year = self.find('.price-calendar-title').text().split('-');
        this_year[0] = parseInt(this_year[0]) - 10;
        this_year[1] = parseInt(this_year[1]) - 10;
        self.find('.price-calendar-title').text(this_year[0] + '-' + this_year[1]);
        var year_list = '';
        var all_year_list;
        for (var i=0; i<12; i++) {
          year_list = year_list + '<li><span>'+(parseInt(this_year[1])+i-11)+'</span></li>';
        }
        year_list = '<div class="swiper-slide"><ul>'+year_list+'</ul></div>';
        all_year_list = '<div class="swiper-container year-picker"><div class="swiper-wrapper">' + year_list + '</div></div>';
        self.find('.year-picker').remove();
        if (self.find('.swiper-container').length===0){
          self.find('.price-calendar-route').append(all_year_list);
          self.find('.year-picker ul li').click(function (e) {
            e.stopPropagation();
            chooseYear($(this));
          });
        }
      }
    }

    // 右箭头
    function nextMonth(self) {
      self = self.parent().parent().parent().parent();
      var ltype = $(params.title_class).attr('click-type');
      if (ltype===undefined){
        var month_list;
        var all_month = [];
        self.find(".date-blank").removeClass("picked").removeClass("first").removeClass("second").removeClass("date-range");
        self.find(".price-calendar-route").each(function (i, e) {
          var this_date = $(e).find(".calendar-block").eq(0).attr("date-pick").split("-");
          var last_date = new Date(parseInt(this_date[0]), parseInt(this_date[1]), parseInt(this_date[2]));
          month_list = getMonthDay([last_date]);
          all_month.push(month_list[0]);
          $(e).find(".date-blank").html("");
        });
        baseCalendar(all_month);
        if(params.is_range){
          rangeInit();
        } else {
          var this_date = $(".price-calendar-route").find(".calendar-block").eq(0).attr("date-pick").split("-");
          var last_date = new Date(parseInt(this_date[0]), parseInt(this_date[1]) - 1, parseInt(this_date[2]));
          params.nextMonthCallBack(last_date);
        }
      } else if (ltype==='year') {
        var this_year = parseInt(self.find('.price-calendar-title').text()) + 1;
        self.find('.price-calendar-title').text(this_year);
        self.find('.month-picker ul li').click(function (e) {
          e.stopPropagation();
          chooseMonth($(this));
        });
      } else if (ltype==='years') {
        var this_year = self.find('.price-calendar-title').text().split('-');
        this_year[0] = parseInt(this_year[0]) + 10;
        this_year[1] = parseInt(this_year[1]) + 10;
        self.find('.price-calendar-title').text(this_year[0] + '-' + this_year[1]);
        var year_list = '';
        var all_year_list;
        for (var i=0; i<12; i++) {
          year_list = year_list + '<li><span>'+(parseInt(this_year[1])+i-11)+'</span></li>';
        }
        year_list = '<div class="swiper-slide"><ul>'+year_list+'</ul></div>';
        all_year_list = '<div class="swiper-container year-picker"><div class="swiper-wrapper">' + year_list + '</div></div>';
        self.find('.year-picker').remove();
        if (self.find('.swiper-container').length===0){
          self.find('.price-calendar-route').append(all_year_list);
          self.find('.year-picker ul li').click(function (e) {
            e.stopPropagation();
            chooseYear($(this));
          });
        }

      }
    }

    // 点击事件
    function pickFn(callback) {
      if (params.is_range) {
        self.find(".date-blank").click(function (e) {
          e.stopPropagation();
          if ($(this).find('.calendar-block').length!==0&&!$(this).find(".date-num").hasClass("status-ban")&&!$(this).find(".calendar-block").hasClass("disable")) {
            if(self.find(".date-blank.picked").length===0){
              $(this).addClass("picked").addClass("first");
              self.find(".date-blank.picked.first").find('.date-num-wrp').append('<span class="start-text">'+params.start_text+'</span>');
            }else if(self.find(".date-blank.picked").length===1&&self.find(".date-blank.picked").hasClass('first')){
              var first_pick = self.find(".date-blank.picked .calendar-block");
              var this_pick = $(this).find(".calendar-block");
              var first_time = new Date(first_pick.attr("date-pick"));
              var this_time = new Date(this_pick.attr("date-pick"));
              if(this_time<first_time){
                self.find(".date-blank").removeClass("picked").removeClass("first");
                self.find(".date-blank").find('.start-text').remove();
                $(this).addClass("picked").addClass("first");
                self.find(".date-blank.picked.first").find('.date-num-wrp').append('<span class="start-text">'+params.start_text+'</span>');
              }else {
                var first_index = self.find(".calendar-block").index(first_pick);
                var this_index = self.find(".calendar-block").index(this_pick);
                if(this_index-first_index+1>params.limit_range){
                  params.outRange();
                }else if($(this).hasClass("first")&&!params.same_day){
                  params.sameDay();
                }else{
                  $(this).addClass("picked").addClass("second");
                  self.find(".date-blank.picked.second").find('.date-num-wrp').append('<span class="end-text">'+params.end_text+'</span>');
                  for (var i=first_index; i<this_index+1; i++){
                    self.find(".calendar-block").eq(i).parent().addClass("date-range");
                  }
                  callback({start: $(".first .calendar-block").attr("date-pick"), end: $(".second .calendar-block").attr("date-pick")}, $(this));
                  if (params.is_double){
                    self.find(".range-calendar-double-wrp").remove();
                  }else{
                    self.find(".range-calendar-single-wrp").remove();
                  }
                }
              }
            }else{
              self.find(".date-blank").find('.start-text').remove();
              self.find(".date-blank").find('.end-text').remove();
              self.find(".date-blank").removeClass("picked").removeClass("date-range").removeClass("first").removeClass("second");
              $(this).addClass("picked").addClass("first");
              self.find(".date-blank.picked.first").find('.date-num-wrp').append('<span class="start-text">'+params.start_text+'</span>');
            }
          }
        });
      } else {
        self.find(".date-blank").click(function (e) {
          e.stopPropagation();
          if ($(this).find('.calendar-block').length!==0&&!$(this).find(".route-status").hasClass("status-ban")&&!$(this).find(".calendar-block").hasClass("disable")&&!$(this).hasClass('picked')) {
            if(params.pick_type==="price"){
              self.find(".date-blank").removeClass("picked");
              $(this).addClass("picked");
              callback($(this).find(".calendar-block").attr("date-pick"), $(this));
            }else{
              callback($(this).find(".calendar-block").attr("date-pick"), $(this));
              self.find(".date-blank").removeClass("picked").removeClass("date-range").removeClass("first").removeClass("second");
              if (params.is_double){
                self.find(".range-calendar-double-wrp").remove();
              }else{
                self.find(".range-calendar-single-wrp").remove();
              }
            }

          }
        });
      }
    }

    // 鼠标悬浮事件
    function hoverFn(callback) {
      if (params.pick_type === "price") {
        self.find(".date-blank").hover(function (e) {
          e.stopPropagation();
          callback($(this).find(".calendar-block").attr("date-pick"), $(this));
        });
      }
    }

    function dbDate(date) {
      date = date.toString();
      date = date.length === 1 ? "0" + date : date;
      return date;
    }

    function rangeInit() {
      if(params.is_range){
        var start_date = self.find("input").eq(0).val();
        var end_date = self.find("input").eq(1).val();
        $(".calendar-block[date-pick='"+start_date+"']").parent().addClass("first").addClass("picked").addClass("date-range");
        $(".calendar-block[date-pick='"+end_date+"']").parent().addClass("second").addClass("picked").addClass("date-range");
        $(".calendar-block[date-pick='"+start_date+"']").parent().find('.date-num-wrp').append('<span class="start-text">'+params.start_text+'</span>');
        $(".calendar-block[date-pick='"+end_date+"']").parent().find('.date-num-wrp').append('<span class="end-text">'+params.end_text+'</span>');
        var first_index = self.find(".calendar-block").index($(".calendar-block[date-pick='"+start_date+"']"));
        var this_index = self.find(".calendar-block").index($(".calendar-block[date-pick='"+end_date+"']"));
        if(first_index!==-1&&this_index!==-1){
          for (var i=first_index; i<this_index+1; i++){
            self.find(".calendar-block").eq(i).parent().addClass("date-range");
          }
        }
      }else{
        var pick_date = self.find("input").eq(0).val();
        $(".calendar-block[date-pick='"+pick_date+"']").parent().addClass("picked");
      }

    }

    function rangeToday() {
      var start_date = self.find("input").eq(0).val();
      var today;
      if (start_date!==""&&start_date!==undefined){
        try {
          today = new Date(start_date);
        }catch (e){
          today = new Date();
        }
      }else{
        today = new Date();
      }
      return today;
    }

    function cleanData(datelist) {
      var temdate;
      var cu, jian, qiang;
      for (var item in datelist) {
        if (isArray(datelist[item])){
          return datelist;
        }
        temdate = datelist[item].split("|");
        temdate[2] = temdate[2].split(",");
        cu = countArrayNum('cu', temdate[2]);
        jian = countArrayNum('jian', temdate[2]);
        qiang = countArrayNum('qiang', temdate[2]);
        var culist = [cu, jian, qiang];
        switch (countArrayNum(0, culist)) {
          case 0:
            temdate[2] = 4;
            break;
          case 1:
            if (qiang!==0) {
              temdate[2] = 4;
            } else {
              temdate[2] = 3;
            }
            break;
          case 2:
            if (cu!==0) {
              temdate[2] = 2;
            } else if (jian!==0) {
              temdate[2] = 1;
            } else if (qiang!==0) {
              temdate[2] = 4;
            }
            break;
          case 3:
            temdate[2] = 0;
            break;
        }
        datelist[item] = temdate;
      }
      return datelist;
    }

    function countArrayNum(str, array) {
      var num = 0;
      for (var i=0; i<array.length; i++) {
        if (array[i]===str) {
          num ++;
        }
      }
      return num;
    }

    // 初始化
    initCalendar();
  };
})(jQuery);
