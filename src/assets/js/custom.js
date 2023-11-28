// preloder js start

$(window).on('load', function () {
  $('#preloder').delay(1000).fadeOut('slow');
})

// back to top button js

var btn = $('#back-to-top');

$(window).scroll(function () {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function (e) {
  e.preventDefault();
  $('html, body').animate({ scrollTop: 0 }, '300');
});




// header js start
// mobile menu js

$(document).ready(function () {
  $(".toggle-btn , .overlay").on('click', function () {
    $(".toggle-btn").toggleClass("open");
    $(".main-menu ul.float-end").toggleClass("close");
    $(".main-menu .overlay").toggleClass("close");
    $(".maindropdown").hide();
  });
});

$(document).ready(function () {
  $(".search-toggle").on('click', function () {
    $(".search-dropsown").toggleClass("open")
    $(".searchDropClose").toggleClass("open")
  });
  $(".searchDropClose").on('click', function () {
    $(this).toggleClass("open")
    $(".search-dropsown").toggleClass("open")
  });
});

$(document).ready(function () {
  $(".sidebar-toggle , .sidebar-close").on('click', function () {
    $("#right-sidebar").toggleClass("open")
  });
});

$(document).ready(function () {
  $(".mydropdown a").on('click', function () {
    $(this).next().slideToggle()
  });
});

$(document).ready(function () {
  $("header .main-header .main-menu > ul li").on('click', function () {
    $(this).toggleClass("active")
  });
});
// var owl = $('.sidebar-profile').owlCarousel({
//     loop: true,
//     responsiveClass: true,
//     nav: false,
//     margin: 0,    
//     autoplay:true,
//     autoplayTimeout:4000,
//     autoplayHoverPause:true,
//     smartSpeed: 400,
//     center: true,
//     responsive: {
//         0: {
//             items: 1,
//         },
//         600: {
//             items: 3
//         },
//         1200: {
//             items: 3
//         }
//     }
// });




// select js  start

function create_custom_dropdowns() {
  $('select').each(function (i, select) {
    if (!$(this).next().hasClass('dropdown')) {
      $(this).after('<div class="dropdown ' + ($(this).attr('class') || '') + '" tabindex="0"><span class="current"></span><div class="list"><ul></ul></div></div>');
      var dropdown = $(this).next();
      var options = $(select).find('option');
      var selected = $(this).find('option:selected');
      dropdown.find('.current').html(selected.data('display-text') || selected.text());
      options.each(function (j, o) {
        var display = $(o).data('display-text') || '';
        dropdown.find('ul').append('<li class="option ' + ($(o).is(':selected') ? 'selected' : '') + '" data-value="' + $(o).val() + '" data-display-text="' + display + '">' + $(o).text() + '</li>');
      });
    }
  });
}

// Event listeners

// Open/close
$(document).on('click', '.dropdown', function (event) {
  $('.dropdown').not($(this)).removeClass('open');
  $(this).toggleClass('open');
  if ($(this).hasClass('open')) {
    $(this).find('.option').attr('tabindex', 0);
    $(this).find('.selected').focus();
  } else {
    $(this).find('.option').removeAttr('tabindex');
    $(this).focus();
  }
});
// Close when clicking outside
$(document).on('click', function (event) {
  if ($(event.target).closest('.dropdown').length === 0) {
    $('.dropdown').removeClass('open');
    $('.dropdown .option').removeAttr('tabindex');
  }
  event.stopPropagation();
});
// Option click
$(document).on('click', '.dropdown .option', function (event) {
  $(this).closest('.list').find('.selected').removeClass('selected');
  $(this).addClass('selected');
  var text = $(this).data('display-text') || $(this).text();
  $(this).closest('.dropdown').find('.current').text(text);
  $(this).closest('.dropdown').prev('select').val($(this).data('value')).trigger('change');
});

// Keyboard events
$(document).on('keydown', '.dropdown', function (event) {
  var focused_option = $($(this).find('.list .option:focus')[0] || $(this).find('.list .option.selected')[0]);
  // Space or Enter
  if (event.keyCode == 32 || event.keyCode == 13) {
    if ($(this).hasClass('open')) {
      focused_option.trigger('click');
    } else {
      $(this).trigger('click');
    }
    return false;
    // Down
  } else if (event.keyCode == 40) {
    if (!$(this).hasClass('open')) {
      $(this).trigger('click');
    } else {
      focused_option.next().focus();
    }
    return false;
    // Up
  } else if (event.keyCode == 38) {
    if (!$(this).hasClass('open')) {
      $(this).trigger('click');
    } else {
      var focused_option = $($(this).find('.list .option:focus')[0] || $(this).find('.list .option.selected')[0]);
      focused_option.prev().focus();
    }
    return false;
    // Esc
  } else if (event.keyCode == 27) {
    if ($(this).hasClass('open')) {
      $(this).trigger('click');
    }
    return false;
  }
});

$(document).ready(function () {
  create_custom_dropdowns();
});



// docter love js start

function compute() {
  var name1 = document.getElementById("nameInput1").value;
  var name2 = document.getElementById("nameInput2").value;
  var num1 = 0;
  var num2 = 0;
  for (var i = 0; i < name1.length; i++) {
    num1 = num1 + name1.charCodeAt(i);
  }
  for (var j = 0; j < name2.length; j++) {
    num2 = num2 + name2.charCodeAt(j);
  }
  var result = (num1 * num2 * 2730);
  var strRes = result.toString();

  return strRes.substring(0, 2) + "%";
}
/* make visible, make animation, use the compute method, display the right result, unselect button and remove animated class*/
function magicHappens() {
  var element = document.getElementById("resultLabel");
  element.innerHTML = "";
  element.style.display = "block";
  element.classList.toggle("animated");
  setTimeout('display()', 3005);
}
function display() {
  var element = document.getElementById("resultLabel");
  element.innerHTML = compute();
  element.classList.toggle("animated");
  document.getElementById("compute").blur();
}

// customers-slider js start

// $('.customers-slider .owl-carousel').owlCarousel({
//   animateOut: 'fadeOut',
//   animateIn: 'flipInX',
//   loop: true,
//   margin: 10,
//   nav: true,
//   navText : ["<i class=\"fas fa-arrow-left\"></i>","<i class=\"fas fa-arrow-right\"></i>"],
//   dots: false,
//   responsive: {
//     0: {
//       items: 1
//     },
//     600: {
//       items: 1
//     },
//     1000: {
//       items: 1
//     }
//   }
// })



$('.counter').each(function () {
  var $this = $(this),
    countTo = $this.attr('data-count');

  $({ countNum: $this.text() }).animate({
    countNum: countTo
  },

    {

      duration: 3000,
      easing: 'linear',
      step: function () {
        $this.text(Math.floor(this.countNum));
      },
      complete: function () {
        $this.text(this.countNum);
        //alert('finished');
      }

    });


});

if (localStorage.getItem('darkmode') === 'true') {
  document.body.className = 'dark';
}
