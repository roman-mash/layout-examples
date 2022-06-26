(function ($) {
  'use strict';

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

  function advantagesSlider() {
    $('.advantages-slider .advantages-slider-wrap').each(function () {
      var prev = $(this).siblings('.slider-controls').find('.btn-switch.prev');
      var next = $(this).siblings('.slider-controls').find('.btn-switch.next');
      $(this).slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        prevArrow: prev,
        nextArrow: next,
        infinite: false,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
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
  function programsSlider() {
    $('.programs-slider .programs-slider-wrap').each(function () {
      $(this).slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        infinite: false,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
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
  function reviewsSlider() {
    $('.reviews-slider .reviews-slider-wrap').each(function () {
      var prev = $(this).siblings('.slider-controls').find('.btn-switch.prev');
      var next = $(this).siblings('.slider-controls').find('.btn-switch.next');
      $(this).slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: false,
        prevArrow: prev,
        nextArrow: next,
        infinite: false,
        responsive: [
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
  function thankSlider() {
    $('.thank-slider .thank-slider-wrap').each(function () {
      var prev = $(this).siblings('.slider-controls').find('.btn-switch.prev');
      var next = $(this).siblings('.slider-controls').find('.btn-switch.next');
      $(this).slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        prevArrow: prev,
        nextArrow: next,
        infinite: false,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 2,
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

  function screenshotsSlider() {
    $('.screenshots-slider .screenshots-slider-wrap').each(function () {
      var prev = $(this).siblings('.slider-controls').find('.btn-switch.prev');
      var next = $(this).siblings('.slider-controls').find('.btn-switch.next');
      $(this).slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: false,
        prevArrow: prev,
        nextArrow: next,
        infinite: false,
        responsive: [
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

  function similarArticlesSlider() {
    $('.similar-articles-slider .slider-wrap').each(function () {
      var prev = $(this).siblings('.slider-controls').find('.btn-switch.prev');
      var next = $(this).siblings('.slider-controls').find('.btn-switch.next');
      $(this).slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        prevArrow: prev,
        nextArrow: next,
        infinite: false,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });
    });
  }

  //================ Custom ==============

  function toggleMenu() {
    $('.btn-toggle-menu').on('click', function () {
      $(this).toggleClass('open');
      $('.header-mobile .header-menu').fadeToggle();
    });
  }

  function openBtnTabs() {
    $('.dropdown-btn-tabs').on('click', function () {
      $('.block-with-dropdown > .nav-pills').fadeToggle(100);
      $(this).toggleClass('opened');
    });

    $('.block-with-dropdown > .nav-pills > li > a').on('click', function (e) {
      if ($(window).width() <= 768) {
        $('.block-with-dropdown > .nav-pills').fadeOut(100);
      }
      var text = $(e.target).text();
      $('.dropdown-btn-tabs').text(text);
    });
  }

  function fixSlider() {
    $('.reviews-block a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      $('.reviews-slider .reviews-slider-wrap').slick('setPosition');
      $('.thank-slider .thank-slider-wrap').slick('setPosition');
      $('.screenshots-slider .screenshots-slider-wrap').slick('setPosition');
    });

    $('[data-fancybox*="reviews-"]').fancybox({
      backFocus: false,
    });
  }

  // Upload Documents
  function uploadFiles() {
    $('.file-lbl').each(function () {
      var $this = $(this);

      // Drag enter
      $(this).on('dragenter', function (e) {
        e.stopPropagation();
        e.preventDefault();
        if ($(this).hasClass('loaded')) {
          return false;
        } else {
          $(this).addClass('hover');
          $(this).find('.file-lbl__text').text('Отпустите здесь');
        }
      });

      $(this).on('dragleave', function (e) {
        e.stopPropagation();
        e.preventDefault();
        if ($(this).hasClass('loaded')) {
          return false;
        } else {
          $(this).removeClass('hover');
          $(this).find('.file-lbl__text').html('Нажмите, чтобы выбрать файл<br> или перетащите для загрузки');
        }
      });

      // Drag over
      $(this).on('dragover', function (e) {
        e.stopPropagation();
        e.preventDefault();
        if ($(this).hasClass('loaded')) {
          return false;
        } else {
          $('.file-lbl').addClass('hover');
          $(this).find('.file-lbl__text').text('Отпустите здесь');
        }
      });

      // Drop
      $(this).on('drop', function (e) {
        e.stopPropagation();
        e.preventDefault();

        $(this).removeClass('active');
        $(this).addClass('loading');
        $(this).find('.file-lbl__text').text('Загрузка...');
      });

      $(this)
        .siblings('input')
        .change(function () {
          $this.removeClass('active');
          $this.addClass('loading');
          $this.find('.file-lbl__text').text('Загрузка...');
        });
    });
  }

  function uniqueRange() {
    var $range = $('#unique-range');
    var $input = $('#unique-range-input');
    var instance;
    var min = 0;
    var max = 100;

    $range.ionRangeSlider({
      skin: 'round',
      type: 'single',
      min: min,
      max: max,
      from: 60,
      onStart: function (data) {
        $input.prop('value', data.from);
      },
      onChange: function (data) {
        $input.prop('value', data.from);
      },
    });

    instance = $range.data('ionRangeSlider');

    $input.on('input', function () {
      var val = $(this).prop('value');

      // validate
      if (val < min) {
        val = min;
      } else if (val > max) {
        val = max;
      }

      instance.update({
        from: val,
      });
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
    advantagesSlider();
    programsSlider();
    reviewsSlider();
    thankSlider();
    screenshotsSlider();
    similarArticlesSlider();
    //custom
    toggleMenu();
    openBtnTabs();
    fixSlider();
    uploadFiles();
    uniqueRange();
  });
})(jQuery);
