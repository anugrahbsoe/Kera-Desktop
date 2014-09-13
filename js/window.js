$.getJSON("user/loggedin.json", function(user){
$.getJSON("user/"+user.user+"/settings", function(json) {
	$( ".window" ).show( { effect: "scale", queue: false,  easing:"easeOutExpo" });
	$( ".w-buttons" ).show( "fade", 100 );
	$( ".w-title" ).show( "fade", 100 );
	$(".w-normal").draggable({ handle: ".w-title", opacity: 0.7 });
	$(".w-dialog").draggable({ opacity: 0.7 });
	$(".w-normal").resizable({ handles:"all", minHeight: 100, minWidth: 300});
	$( "button" ).button();
	$( ".spinner" ).spinner();
	$( ".tabs" ).tabs({ show: { effect: "blind", duration: 200 } }, { hide: { effect: "blind", duration: 200 } });
	$( document ).tooltip({show: { effect: "fade", delay: 1000 }});

	$.each(json.theme,function (i,theme) {
		$(".w-close").attr("src", theme.window+"/icons/close.svg");
		$(".w-maximize").attr("src", theme.window+"/icons/maximize.svg");
		$(".w-unmaximize").attr("src", theme.window+"/icons/maximize.svg");
		$(".w-minimize").attr("src", theme.window+"/icons/minimize.svg");		
	});

	//Here must be reviewed.
	$(".w-title").dblclick(function(){
		$(this).parent().children(".w-buttons").children(".w-button-maximize").trigger("click");
		//$(this).parent().parent().children(".w-maximized").children(".w-buttons").children(".w-button-unmaximize").trigger("click");
	});

	$(document).on("click", ".w-button-maximize", function(event) {
		var org_width = $(this).parent().parent().css("width");
		var org_height = $(this).parent().parent().css("height");
		var org_left = $(this).parent().parent().css("left");
		var org_top = $(this).parent().parent().css("top");
		var desktop_width = $("#desktop").width();
		var desktop_height = $("#desktop").height();
		$(this).removeClass("w-button-maximize");
		$(this).addClass("w-button-unmaximize");
		$(this).parent().parent().addClass("w-maximized");
		$(this).parent().parent().css({"width":desktop_width,"height":desktop_height, "left":"0", "top":"0"});
		$('#left_panel').hide( "fade", 100 );
		$('#right_panel').hide( "fade", 100 );
		$(".hs_area").css( "opacity", "1" );
    	$("#top-area").animate({ marginRight:"129px" },{ duration:300, queue: false});
    	$("#desktop").animate({ opacity: '0.001' },{ duration:200, queue: false} );
		$(document).on("click", ".w-button-unmaximize", function() {
			$(this).removeClass("w-button-unmaximize");
			$(this).addClass("w-button-maximize");
			$(this).parent().parent().css({"width":org_width, "height":org_height, "left":org_left, "top":org_top});
    		$('#left_panel').show( { effect: "slide", duration:1300, easing:"easeOutExpo"});
    		$('#right_panel').show( { effect:"slide", direction:"right", duration:1300,  easing:"easeOutExpo"});
    		$(".hs_area").css( "opacity", "0" );
    		$("#top-area").animate({ marginRight:"15px" },{ duration:300, queue: false});
    		$("#desktop").animate({ opacity: '1' },{ duration:800, queue: false});
    		var thisis = this
    		setTimeout(function(){$(thisis).parent().parent().removeClass("w-maximized");},500);
		});	
	});	

	$(document).on("click", ".w-button-close", function() {
   		$('#left_panel').show( { effect: "slide", duration:1300, easing:"easeOutExpo"});
   		$('#right_panel').show( { effect:"slide", direction:"right", duration:1300,  easing:"easeOutExpo"});
   		$(".hs_area").css( "opacity", "0" );
    	$("#top-area").animate({ marginRight:"15px" },{ duration:300, queue: false});
    	$("#desktop").animate({opacity:'1'},{ duration:800, queue: false });
	});	
	
	$(document).on("click", ".w-button-minimize", function() {
		$(this).parent().parent().transition({ top: "-3000px", queue:false, easing:"ease", duration: 700});
		$(this).parent().parent().hide({effect:"fade", queue:false, easing:"easeOutExpo", duration: 700});
		$(this).parent().parent().addClass("w-minimized");
		$('#left_panel').show( { effect: "slide", duration:1300, easing:"easeOutExpo"});
    	$('#right_panel').show( { effect:"slide", direction:"right", duration:1300,  easing:"easeOutExpo"});
    	$(".hs_area").css( "opacity", "0" );
    	$("#top-area").animate({ marginRight:"15px" },{ duration:300, queue: false});
    	$("#desktop").animate({opacity:'1'},{ duration:800, queue: false });
	});



	var running_windows = $('#application').children().length;

	//$(".window").parent().parent().css("z-index")

	$("#application").click( function() {
		
	});

	$( ".window" ).mousedown(function(){
		$(this).parent().css("z-index", running_windows);	
		$(".appwin").each(function() {
			var index = $(this).css("z-index")
			$(this).css("z-index", parseInt(index)-1 );
			$(".window").addClass("w-unfocus");
			$(this).children(".window").children(".w-content").css("opacity","0.6");
		});
		$(this).removeClass("w-unfocus");
		$(this).children(".w-content").css("opacity","1");
	});

	$(document).on('mousedown', function(event) {
 		if (!$(event.target).closest('.window').length) {
   		$(".window").addClass("w-unfocus");
   		$(".w-content").css("opacity","0.6");
 		}
	});
});
});
