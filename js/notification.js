(function ( $ ) {
	$.fn.notify = function( options ) {
		var settings = $.extend({
			autoClose : "yes",
			closable : "yes",
			color: "background-color: #F3DDCE;",
			icon : "theme/desktop/default/contents/alert.svg",
			class : "notification",
			massage : "Notification"
		}, options );

		var notify_length = $('#notifications').children().length;
		$("#notifications").append('\
			<div class="notify '+settings.class+'" id="notify_'+notify_length+'">\
				<div class="notify_icon" style="'+settings.color+'">\
					<div class="notify_progress">\
						<img src="'+settings.icon+'">\
					</div>\
				</div>\
				<div class="notify_content">'+settings.massage+'</div>\
			</div>'
		);

		if ( settings.closable == "yes" ) {
			$("#notify_"+notify_length).children(".notify_content").append('<img id="close_'+notify_length+'" src="theme/desktop/default/contents/close.svg">');
		}

		$("#close_"+notify_length).click(function(){
			$("#notify_"+notify_length).remove();
		});

		$("#notify_"+notify_length).show().css("display","inline-block");
		setTimeout(function(){
			$("#notify_"+notify_length).children(".notify_content").show().css("display","inline-block");
		},200);

		$("#notify_"+notify_length).mouseover(function(){
			$("#notify_"+notify_length).children(".notify_content").show().css("display","inline-block");
		});

		$("#notify_"+notify_length).mouseout(function(){
			$("#notify_"+notify_length).children(".notify_content").hide();
		});

		setTimeout(function(){
			$("#notify_"+notify_length).children(".notify_content").hide();
			if ( settings.autoClose == "yes") {
				setTimeout(function(){
					$("#notify_"+notify_length).remove();
				},3000);
			}
		},4000);

	};
}( jQuery ));