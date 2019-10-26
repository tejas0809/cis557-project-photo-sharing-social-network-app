$(window).scroll(function() {
  if ($(document).scrollTop() > 50) {
    $('nav').addClass('shrink');
    $('.logo').addClass('shrinked');
  } else {
    $('nav').removeClass('shrink');
    $('.logo').removeClass('shrinked');
  }
});
