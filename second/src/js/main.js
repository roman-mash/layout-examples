(function ($) {
  'use strict';
  // ========= Common ===========
  // Variables
  var waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
      if (!uniqueId) {
        uniqueId = "Don't call this twice without a uniqueId";
      }
      if (timers[uniqueId]) {
        clearTimeout(timers[uniqueId]);
      }
      timers[uniqueId] = setTimeout(callback, ms);
    };
  })();

  var backdrop = $('<div class="modal-backdrop in"></div>');

  // Footer
  function footer() {
    if ($('#bottom').length) {
      var height = Math.round(document.getElementById('bottom').offsetHeight);
      $('.wrapper .content').css('padding-bottom', height);
      $('#bottom').css('margin-top', -height);
    }
  }

  // Footer auto on resize
  function footerAuto() {
    $(window).on('resize', function () {
      waitForFinalEvent(
        function () {
          footer();
        },
        100,
        'footer'
      );
    });
  }

  function mask() {
    $('.phone-mask').on('input', function () {
      let val = $('.phone-mask').val();
      if (val[0] == 8 || val[0] == 7) {
        $('.phone-mask').val(val.slice(1));
      }
    });
    $('.phone-mask').mask('+7 (000) 000-00-00');
  }

  // Scroll to target
  function scrollToTarget() {
    $('.scroll-to-target').on('click', function () {
      var target = $(this).attr('href');
      $('html, body').animate(
        {
          scrollTop: $(target).offset().top,
        },
        1000
      );
      return false;
    });
  }

  // ========= Sliders ===========

  function mainSlider() {
    var prev = $('.main-slider .slider-controls .btn-switch.prev');
    var next = $('.main-slider .slider-controls .btn-switch.next');
    var totalAmount = $('.main-slider .main-slide').length;
    $('.main-slider .main-slider-wrap').each(function () {
      $(this).on('init', function () {
        if (totalAmount < 10) {
          $('.main-slider .counter-total').text('0' + totalAmount);
        } else {
          $('.main-slider .counter-total').text(totalAmount);
        }
      });

      $(this).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        infinite: true,
        prevArrow: prev,
        nextArrow: next,
        fade: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
      });

      $(this).on('afterChange', function () {
        var currentSlideNumber = $(this).slick('slickCurrentSlide') + 1;

        if (currentSlideNumber < 10) {
          $('.main-slider .counter-current').text('0' + currentSlideNumber);
        } else {
          $('.main-slider .counter-current').text(currentSlideNumber);
        }
      });
    });
  }

  function defaultSlider() {
    $('.slider-default .slider-default-wrap').each(function () {
      var prev = $(this).siblings('.slider-controls').find('.btn-switch.prev');
      var next = $(this).siblings('.slider-controls').find('.btn-switch.next');
      $(this).slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        dots: false,
        infinite: true,
        prevArrow: prev,
        nextArrow: next,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 4,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
            },
          },
        ],
      });
    });
  }

  function compareSlider() {
    $('.slider-compare .slider-compare-wrap').each(function () {
      var prev = $(this).siblings('.slider-controls').find('.btn-switch.prev');
      var next = $(this).siblings('.slider-controls').find('.btn-switch.next');
      $(this).slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        infinite: true,
        prevArrow: prev,
        nextArrow: next,
        asNavFor: '.slider-compare-tabs .slider-compare-tabs-wrap',
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });
    });

    $('.slider-compare-tabs .slider-compare-tabs-wrap').each(function () {
      $(this).slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        infinite: true,
        asNavFor: '.slider-compare .slider-compare-wrap',
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });
    });
  }

  function clientsSlider() {
    var prev = $('.clients-slider .slider-controls .btn-switch.prev');
    var next = $('.clients-slider .slider-controls .btn-switch.next');
    $('.clients-slider .clients-slider-wrap').each(function () {
      $(this).slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        infinite: true,
        prevArrow: prev,
        nextArrow: next,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
            },
          },
        ],
      });
    });
  }

  function productSlider() {
    $('.product-slider .product-slider-preview .product-slider-preview-wrap').each(function () {
      var prev = $(this).siblings('.slider-controls').find('.btn-switch.prev');
      var next = $(this).siblings('.slider-controls').find('.btn-switch.next');
      $(this).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        infinite: false,
        prevArrow: prev,
        nextArrow: next,
        asNavFor: '.product-slider .product-slider-tabs .product-slider-tabs-wrap',
      });
    });
    $('.product-slider .product-slider-tabs .product-slider-tabs-wrap').each(function () {
      $(this).slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        infinite: false,
        arrows: false,
        focusOnSelect: true,
        asNavFor: '.product-slider .product-slider-preview .product-slider-preview-wrap',
      });
    });
  }

  // ========= Custom ===========

  function stickHeader() {
    if ($('.header').length) {
      $(window).on('scroll', function () {
        sticky();
      });

      // Get the header
      var header = $('.header-bottom');
      var catalog = $('.catalog');
      var headerTopCenterHeight = $('.header-top').innerHeight();
      var firstSection = $('.content').children().first();

      function sticky() {
        if ($(window).scrollTop() > headerTopCenterHeight) {
          header.addClass('scrolled');
          catalog.addClass('scrolled');
          firstSection.css('margin-top', header.innerHeight());
        } else {
          header.removeClass('scrolled');
          catalog.removeClass('scrolled');
          firstSection.css('margin-top', 0);
        }
      }
    }
  }

  function openMenu() {
    $('.btn-open-menu').on('click', function () {
      $(this).toggleClass('open');
      $('.header').toggleClass('menu-opened');
      $('.header-center').slideToggle();
    });
  }

  function countCatalogHeight() {
    var catalog = $('.catalog');
    var catalogLvl1 = $('.catalog__lvl1');
    var catalogLvl2 = $('.catalog__lvl2');
    var catalogLvl3 = $('.catalog__lvl3');
    var heightsArray = [];

    catalogLvl2.each(function (index, catalogItem) {
      heightsArray.push($(catalogItem).innerHeight());
    });

    var min = heightsArray[0];
    var max = min;

    $.each(heightsArray, function (i, item) {
      if (heightsArray[i] > max) max = heightsArray[i];
      if (heightsArray[i] < min) min = heightsArray[i];
    });

    var catalog1Height = catalogLvl1.innerHeight();

    if (catalog1Height > max) {
      catalog.height(catalog1Height);
    } else {
      catalog.height(max);
    }
  }

  function toggleCatalog() {
    $('.btn-catalog').on('click', function () {
      // if ($(".header-bottom").hasClass("scrolled")) {
      //   $(".catalog").css("top", $(".header-bottom").innerHeight());
      // } else {
      //   $(".catalog").css("top", $(".header-content").innerHeight());
      // }
      $('.catalog').fadeToggle();
      if ($(window).width() > 992) {
        countCatalogHeight();
      } else {
        if ($('.catalog').css('display') === 'block') {
          $('.catalog__lvl2').each(function () {
            $(this).removeClass('open');
          });
          $('.catalog__lvl3').each(function () {
            $(this).removeClass('open');
          });
        }
      }
    });

    $(document).on('click', function (evt) {
      if ($('.catalog').css('display') == 'block' && !$(evt.target).closest('.catalog').length && !$(evt.target).is('.catalog') && !$(evt.target).is('.btn-catalog')) {
        $('.catalog').fadeOut();
      }
    });

    $(document).on('scroll', function () {
      if ($('.header-bottom').hasClass('scrolled')) {
        $('.catalog').css('top', $('.header-bottom').innerHeight());
      } else {
        $('.catalog').css('top', $('.header-content').innerHeight());
      }
    });
  }

  function toggleCatalogSubmenu() {
    if ($(window).width() > 992) {
      $('.catalog__lvl1-list > li > a').on('mouseenter', function () {
        $('.catalog__lvl1-list > li > a').each(function () {
          $(this).removeClass('hover');
        });
        $(this).addClass('hover');

        $('.catalog__lvl2').each(function () {
          $(this).removeClass('showed');
        });
        $(this).siblings('.catalog__lvl2').addClass('showed');
      });
    } else {
      $('.catalog__lvl1-list > li > a.has-inner-lvl').on('click', function (evt) {
        evt.preventDefault();
        $(this).siblings('.catalog__lvl2').addClass('open');
        console.log($(this).siblings('.catalog__lvl2'));
      });
      $('.catalog__lvl2-list > li > a.has-inner-lvl').on('click', function (evt) {
        evt.preventDefault();
        $(this).siblings('.catalog__lvl3').addClass('open');
        console.log($(this).siblings('.catalog__lvl3'));
      });
      $('.catalog__lvl2 .catalog-back').on('click', function () {
        $(this).parent('.catalog__lvl2').removeClass('open');
      });
      $('.catalog__lvl3 .catalog-back').on('click', function () {
        $(this).parent('.catalog__lvl3').removeClass('open');
      });
    }
  }

  function toggleLike() {
    $('.js-like').on('click', function () {
      $(this).toggleClass('active');
    });
  }
  function toggleCompare() {
    $('.js-compare').on('click', function () {
      $(this).toggleClass('active');
    });
  }

  function scrollbar() {
    if ($('.scrollbarAdded').length) {
      var containerArray = document.getElementsByClassName('scrollbarAdded');
      for (var i = 0; i < containerArray.length; i++) {
        window['scrollbar_' + i] = window.Scrollbar;
        window['scrollbar_' + i].init(document.getElementsByClassName('scrollbarAdded')[i], {
          alwaysShowTracks: true,
        });
      }
    }
  }

  function openBtnTabs() {
    if ($(window).width() < 768) {
      $('.dropdown-btn-tabs').on('click', function () {
        $('.product-btns-tabs > .nav-tabs').fadeToggle();
      });

      $('.product-btns-tabs > .nav-tabs > li > a').on('click', function (e) {
        $('.product-btns-tabs > .nav-tabs').fadeOut();
        var text = $(e.target).text();
        $('.dropdown-btn-tabs').text(text);
      });
    }
  }

  function countCompareHieght() {
    var amount = $('.compare-points-main .compare-point').length;
    for (let i = 1; i <= amount; i++) {
      $('.compare-point_' + i).matchHeight();
    }
  }

  $(window).on('resize', function () {
    countCatalogHeight();
    openBtnTabs();
  });

  function select2() {
    $('.select2').select2({
      minimumResultsForSearch: -1,
      width: '100%',
      language: 'ru',
    });
    $('.select2-sorting').select2({
      minimumResultsForSearch: -1,
      width: '100%',
      language: 'ru',
    });
  }

  function switchTileList() {
    const productsList = $('.products-list');
    $('.btn-tile').on('click', function () {
      productsList.addClass('tile');
      productsList.removeClass('list');
      $(this).addClass('active');
      $('.btn-list').removeClass('active');
    });
    $('.btn-list').on('click', function () {
      productsList.addClass('list');
      productsList.removeClass('tile');
      $(this).addClass('active');
      $('.btn-tile').removeClass('active');
    });
  }

  function linkToTabs() {
    $('.link-to-all-features').on('click', function (e) {
      $('.product-tabs .nav-tabs li').each(function (i) {
        $(this).removeClass('active');
        if (i === 1) {
          $(this).addClass('active');
        }
      });
      $('.dropdown-btn-tabs').text('Характеристики');
      $('html, body').animate(
        {
          scrollTop: $('.product-tabs').offset().top - 100,
        },
        1000
      );
    });
  }

  function openDeliveryMethod() {
    $('.fix-collapse [data-toggle="collapse"]').on('click', function (evt) {
      $(evt.currentTarget).prop('disabled', false);
      console.log($(evt.currentTarget).prev('input[type=radio]').prop('checked'));
      if ($(evt.currentTarget).prev('input[type=radio]').prop('checked') === true) {
        $(evt.currentTarget).prop('disabled', true);
        return;
      }
      $('.fix-collapse .collapse.in').collapse('hide');
    });
  }

  // Initializing all scripts
  $(document).ready(function () {
    // common
    footer();
    footerAuto();
    mask();
    scrollToTarget();
    // sliders
    mainSlider();
    defaultSlider();
    compareSlider();
    clientsSlider();
    productSlider();
    // custom
    stickHeader();
    openMenu();
    toggleCatalog();
    toggleCatalogSubmenu();
    toggleLike();
    toggleCompare();
    scrollbar();
    openBtnTabs();
    countCompareHieght();
    select2();
    switchTileList();
    linkToTabs();
    openDeliveryMethod();
  });
})(jQuery);
