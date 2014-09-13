$.getJSON("user/loggedin.json", function(user){
$.getJSON("user/"+user.user+"/settings", function(json) {
	
	$.each(json.theme,function (i,theme) {
		$(".menu>div>img").attr("src", theme.window+"/icons/menu/undefined.svg");
		$(".menu>div").each(function(){
			var thisid = $(this).attr("id");
			$("#"+thisid+">img").attr("src", theme.window+"/icons/menu/"+thisid+".svg");
		});
	});

	$(".wmi").click(function(){
		var menu_name = $(this).attr("name");
		$("#m-"+menu_name).css("display","inline-block");
		$("#m-"+menu_name).transition({opacity:1, scale:"1", x:"18px", y:"30px", duration: 200});
		$("#m-"+menu_name).position({ my: "left top", at: "left bottom", of: this });
		var thisis = this
			$(document).on('click', function(event) {
				if (!$(event.target).closest('.menu, .mb-'+menu_name+'').length) {
				$("#m-"+menu_name).transition({opacity:0, scale:"0.8", x:"0", y:"0", duration: 200});
				setTimeout(function(){$("#m-"+menu_name).css("display","none");},200);
				$(document).off(event, ".menu");
			}
		}); 
	});

	$(".menu").children("div").click(function(){
		$(this).parent().transition({opacity:0, scale:"0.8", x:"0", y:"0", duration: 200});
		setTimeout(function(){$(this).parent().css("display","none");},200);
	});

});
});
