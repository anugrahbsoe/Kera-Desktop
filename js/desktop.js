$.getJSON("user/loggedin.json", function(user){
$.getJSON("user/"+user.user+"/settings", function(settings) {
	
	//Here must be reviewed.
	$.getJSON("user/"+user.user+"/desktop/entries.json", function(entries) {
		$.each(entries, function(i,entry_list) {
					
			$("#desktop_icons").append('\
				<div class="icon_box">\
					<img class="desktop_icon" style=""></img>\
					<div class="desktop_icon_name" style"text-align:center"></div>\
				</div>\
			');

			$.each(entries.uitest,function (i,desktop_icon_info) {
				$(".desktop_icon").attr("src", ""+desktop_icon_info.icon+"")
				$(".desktop_icon_name").text(desktop_icon_info.name);

				$(document).on("dblclick", ".icon_box", function() {
					var running_windows = $('#application').children().length+1;
					$("#application").attr("value",running_windows);
					$("#application").append('<div class="appwin" id="app_'+running_windows+'" appno="'+running_windows+'" ></div>');
					$("#app_"+running_windows+"").load(desktop_icon_info.run);
					$("#app_"+running_windows+"").css("z-index",running_windows);
					$(".icon_box").css("boxShadow","0 0 10px 0 white");
					setTimeout(function(){
						$(".icon_box").css("boxShadow","inherit");
						$(".icon_box").css("background-color","rgba(0,0,0,0)");
					},100);
				});
			});

		});
		
	});


	$(document).on("mousedown", ".icon_box", function() {
		$(".icon_box").css("background-color","rgba(0,0,0,1)");
	});

	
	$(document).on('mousedown', function(event) {
 		if (!$(event.target).closest('.icon_box').length) {
   		$(".icon_box").css("background-color","rgba(0,0,0,0)");
 	}

//it doesn't apply without clicking. Must be reviewed.
 	/*
 	var desktop_width = $("#desktop").width();
 	var ofset = $(".w-normal").offset().left + $(".window").outerWidth();
 	var right_ofset = desktop_width - ofset
 	
		if ( right_ofset < 70 ) { $("#right_panel").hide("fade"); }
		else { $('#right_panel').show( { effect:"slide", direction:"right", duration:1300,  easing:"easeOutExpo"}); }
	*/
});
	
});
});