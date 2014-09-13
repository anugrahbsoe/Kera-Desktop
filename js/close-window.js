$(document).on("click", ".w-button-close", function() {

	$( this ).parent().parent().hide( { effect: "fade", duration: 200, queue: false});
	$( this ).parent().parent().transition({ perspective:"400px", rotateY:"60deg", scale:"0.4"}, 500);
	var this_window = this
	setTimeout(function(){ 
		$( this_window ).parent().parent().parent().remove(); 
		var running_windows = $('#application').children().length;
		$("#application").attr("value",running_windows);
	},600);

	var this_appno = $( this ).parent().parent().parent().attr("appno");
	$("#tb-"+this_appno+"").css({ "top": "-50px"});
	$("#tb-"+this_appno+"").animate({ opacity: "0"},200);
	$("#tb-"+this_appno+"").animate({ width: "0"},200);
	setTimeout(function(){ $("#tb-"+this_appno).remove(); },500);
	
});