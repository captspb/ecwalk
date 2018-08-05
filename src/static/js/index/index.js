$(document).ready(function () {
    // control current nav
    navCtl('index');
    // init the main swiper and the production info
    var mainSwiper = new Swiper('.main-focus-swiper', {
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: true
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    });
    var buyInfoSwiper = new Swiper('.pro-msg-swiper', {
        slidesPerView: 'auto',
        direction: 'vertical',
        loop: true,
        autoplay: {
            delay: 4000
        }
    });

    $(".main-focus-swiper").mouseenter(function () {//滑过悬停
        mainSwiper.autoplay.stop();//mainSwiper 为上面你swiper实例化的名称
    }).mouseleave(function(){//离开开启
        mainSwiper.autoplay.start();
    });
    // init tab control
    tabCtl();
    // index hover
    $('ul li.main-list').hover(function () {
        $(this).find(".b2b-prolist-hover-show").show();
    }, function () {
        $(this).find(".b2b-prolist-hover-show").hide();
    });

    $(".ce-nav-ul").scrollFloat({
      isFill: false,
      startDiffer: -94,
      index: $("[data-index='prod-trip']"),
      indexDiffer: 1
    });
});