$(function () {
	$('#startup_text').delay(100).fadeIn(300);
});

$(window).bind("load", function() {
    $('#desktop').delay(2000).animate({opacity:'1'},500);
    $('#top-area').delay(4000).animate({opacity:'1'},300);
    $('#left_panel').delay(2700).show( { effect: "slide", duration:1300, easing:"easeOutExpo"});
    $('#right_panel').delay(3300).show( { effect:"slide", direction:"right", duration:1300,  easing:"easeOutExpo"});
    $("#startup_text").delay(3000).fadeOut(0);
});
