$.getJSON("user/loggedin.json", function(user){
$.getJSON("user/"+user.user+"/settings", function(json) {
	//Set current desktop theme
	$.each(json.theme,function (i,theme) {
		$("#desktop_theme").attr("href", ""+theme.desktop+"/desktop.css");
		$("#panel_theme").attr("href", ""+theme.panel+"/panel.css");
		
		//Set current background
		$("#background").attr("src", ""+theme.background+"/background.html");

		//Set start-up text
		$("#startup_text").text(theme.startup_text);

		//Set UI theme
		$("#ui_theme").attr("href", ""+theme.ui+"/jquery-ui.css");
		$("#ui_theme2").attr("href", ""+theme.ui+"/jquery-ui.structure.css");
		$("#ui_theme3").attr("href", ""+theme.ui+"/jquery-ui.theme.css");

		//Set Window theme
		$("#window_theme").attr("href", ""+theme.window+"/window.css");
	});	

	//Set font family //Use index.html style for now.
	$.each(json.font,function (i,font) {
		//General
		//$("body").css("font-family",""+font.general+"");
		//Start-up
		//$("#startup_text").css("font-family",""+font.startup+"");
		
	});
	
	//Set animation
	$.each(json.animation,function (i,animation) {
		//Start-up	
		$("#startup_animation").attr("src", ""+animation.startup+".js");
		
	});
	
	//Set text-color
	$.each(json.text_color,function (i,text_color) {
		//Start-up
		$("#startup_text").css("color",""+text_color.startup+"");
		
	});
		
	//Set theme color
	$.each(json.theme_color,function (i,theme_color) {
		//Start-up
		$("#startup").css("background-color",""+theme_color.startup+"");
		
	//Set icon set
		
	});


});
});