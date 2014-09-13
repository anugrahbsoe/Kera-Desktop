$.getJSON("user/loggedin.json", function(user){
$.getJSON("user/"+user.user+"/settings", function(json) {
	$.each(json.panel,function (i,panel) {

		//General Panel Options
		var margin = 10 ;
		var icon_size = ""+panel.icon_size+"" ;
		var item_size = parseInt(icon_size) + parseInt(margin) * 2;
		var center = ((""+item_size+"") * 6 ) / 2 + 5 ;
		var panel_size = ((""+item_size+"")) * 6 + 7 ; 
		var icon_file = 'no' ;
		var icon_file_location ;
		var icon_file_type ;

		$(".hsi_l, .hsi_r").css("height", item_size+"px");
		$(".hs_area").css("margin-top","-"+parseInt(center-4)+"px");
		$(".panel").css("margin-top","-"+center+"px");
		$(".panel_item").css({"width":""+item_size+"px","height":""+item_size+"px"});
		$(".panel_icon").css({
			"margin":""+margin+"px",
			"width":""+icon_size+"",
			"height":""+icon_size+""
			});
		$(".panel_content").css("height",""+panel_size+"px");
		
		var sizes = ["16","22","24","32","48","64","128"]
		
		$.each(sizes, function(){
		
			if (icon_size == this) { icon_file = this; }
		});
	
		if (icon_file == "no" ) {
			icon_file_location = "scalable";
			icon_file_type = "svg";
		}
			
		else {
			icon_file_location = icon_file ;
			icon_file_type = "png"
		}	
		
		//Left Panel
		var icon_names = ["apps","personal","media","games","internet","shop"]
		
		$.each(json.theme,function (i,theme) {
			$.each(icon_names, function(){	
				$("#"+this+"_icon").css("background-image","url('"+theme.desktop+"/contents/panel/icons/"+icon_file_location+"/"+this+"."+icon_file_type+"')");
			});
		});	
		
		//Right (miniapps) Panel
		$.getJSON("panelapps/applist", function(applist) {
			$.each(applist.panelapps, function(i,panelapps) {
					
				$("#miniapp_content").append('\
					<div class="panel_item miniapp app_'+this+'" "appname="'+this+'" style="width:'+item_size+'px;height:'+item_size+'px">\
						</div>\
					</div>\
				');
				
				$(".app_"+this+"").load("panelapps/"+this+"/icon.html");
			});

			//Set color for right hotspot
			setTimeout(function(){
				var hsi_r1 = $(".app_"+applist.panelapps[0]).children("div").css("background-color");
				$(".hsi_r:nth-child(1)").css("background-color",hsi_r1);
				var hsi_r2 = $(".app_"+applist.panelapps[1]).children("div").css("background-color");
				$(".hsi_r:nth-child(2)").css("background-color",hsi_r2);
				var hsi_r3 = $(".app_"+applist.panelapps[2]).children("div").css("background-color");
				$(".hsi_r:nth-child(3)").css("background-color",hsi_r3);
				var hsi_r4 = $(".app_"+applist.panelapps[3]).children("div").css("background-color");
				$(".hsi_r:nth-child(4)").css("background-color",hsi_r4);
				var hsi_r5 = $(".app_"+applist.panelapps[4]).children("div").css("background-color");
				$(".hsi_r:nth-child(5)").css("background-color",hsi_r5);
				var hsi_r6 = $(".app_"+applist.panelapps[5]).children("div").css("background-color");
				$(".hsi_r:nth-child(6)").css("background-color",hsi_r6);
			},5000);
		});
		
	});
	

	

	//Opening Selections 

	$(function () {
		$(".left_item, .hsi_l").click(function(){ 
			$('#left_panel').show("slide");
			var this_item = $(this).attr("id");
			$(".panelapp_mini").remove();
			$("#startitem_content").append('<div class="panelapp_mini" id="mini_'+this_item+'" ></div>');
			$("#mini_"+this_item).load("panelapps/left_panel/"+this_item+"/mini.html");
			setTimeout(function(){
				$("#left_panel").animate({ left: "-30px"}, 	{ queue:false, easing:"easeOutExpo", duration:800});
				$(document).on('click', function(event) {
		 			if (!$(event.target).closest('#left_panel').length) {
		 				$(".panelapp_mini").remove();
		   				$("#left_panel").animate({ left: "-350px"}, { queue:false, easing:"easeOutExpo", duration:800});
		   				var panel_display = $(".hs_area").css("opacity");
		   				if (panel_display == 1 ) {$("#left_panel").hide("fade");}
		   				$(document).off(event, "#left_panel");
		 			}
				});
			},300);
		});

		$(document).on('dblclick', '.left_item, .hsi_l', function() {
			var thisis = this
			setTimeout(function(){
				var this_item = $(thisis).attr("id");
				var running_windows = $('#application').children().length;
				$("#application").attr("value",running_windows);
				$("#application").append('<div class="appwin" id="app_'+running_windows+' full_'+this_item+'" appno="'+running_windows+'" ></div>');
				$("#full_"+this_item+"").load("panelapps/left_panel/"+this_item+"/full.html");
				$("#left_panel").animate({ left: "-350px"}, { queue:false, easing:"easeOutExpo", duration:800});
			},300);
		});


		$(document).on('click', '.miniapp, .hsi_r', function() { 
			$('#right_panel').show( { effect:"slide", direction:"right"});
			var this_item = $(this).attr("appname");
			$(".panelapp_mini").remove();
			$("#panelapp_content").append('<div class="panelapp_mini" id="mini_'+this_item+'"></div>');
			$("#mini_"+this_item).load("panelapps/"+this_item+"/mini.html");
			setTimeout(function(){
				$("#right_panel").animate({ right: "-30px"}, { queue:false, easing:"easeOutExpo", duration:800});
				$(document).on('click', function(event) {
		 			if (!$(event.target).closest('#right_panel').length) {
		 				$(".panelapp_mini").remove();
		   				$("#right_panel").animate({ right: "-355px"}, { queue:false, easing:"easeOutExpo", duration:800});
		   				var panel_display = $(".hs_area").css("opacity");
		   				if (panel_display == 1 ) {$("#right_panel").hide("fade");}
		   				$(document).off(event, "#right_panel");
		 			}
				});
			},300);
		});

		$(document).on('dblclick', '.miniapp, .hsi_r', function() {
			var thisis = this
			setTimeout(function(){
				var this_item = $(thisis).attr("appname");
				var running_windows = $('#application').children().length;
				$("#application").attr("value",running_windows);
				$("#application").append('<div class="appwin" id="app_'+running_windows+' full_'+this_item+'" appno="'+running_windows+'" ></div>');
				$("#full_"+this_item+"").load("panelapps/"+this_item+"/full.html");
				$("#right_panel").animate({ right: "-355px"}, { queue:false, easing:"easeOutExpo", duration:800});
			},300);
		});
	});

	//Disabled because this doesn't work with click.
	/*
	$(function () {
		$("#starter_content").mousedown(function(){ 	
			$("body").mousemove(function(event){	//Get mouse position for  drag the panel
				var left_position = event.pageX - 390	
				if ( event.pageX > 390 ) { left_position = 0 }	//Function for enough dragging to open panel content

	    		$("#left_panel").css("left",+left_position+"px");
	    		$("body").mouseup(function(){
	    			$("body").off( event, "#left_panel");
	    			var left_put = $("#left_panel").css("left").replace(/\D/g,'') ;
	    			if ( left_put < 200 ) { 	//Function enough dragging to close panel
	    				left_put = -30;	
	    				$("#focus_helper").show("fade"); 
	    				$("#focus_helper, #right_panel").mousedown(function(){
	    					left_put = -350;
	    					$("#left_panel").animate({ left: left_put+"px"}, { queue:false, easing:"easeOutExpo", duration:800});
	    					setTimeout(function(){$("#left_panel").finish(); }, 300);
	    					$("#focus_helper").stop().hide("fade"); 
	    				});

	    			}
	    				else { 
	    					left_put = -350;
	    					$("#focus_helper").stop().hide("fade"); 
	    				}
	    					
	    			$("#left_panel").animate({ left: left_put+"px"}, { queue:false, easing:"easeOutExpo", duration:800});	//Dragging with mousemove values.
	   				setTimeout(function(){$("#left_panel").finish(); }, 300);

				});
	  		});

		});


		$("#miniapp_content").mousedown(function(){	//Get mouse position for  drag the panel
			$("body").mousemove(function(event){
				var screen_width = $("body").width();
				var right_position = screen_width - event.pageX - 390
				var right_position_live = screen_width - event.pageX - 390

				if ( right_position_live > 0 ) { right_position = 0 }
	    		$("#right_panel").css("right",+right_position+"px"); 	//Function for enough dragging to open panel content
	    		$("body").mouseup(function(){
	    			$("body").off( event, "#right_panel");

	    			var right_put = $("#right_panel").css("right").replace(/\D/g,'') ;
	    			
	    			if ( right_put < 200 ) { 	//Function enough dragging to close panel
	    				right_put = -30;
	    				$("#focus_helper").show("fade"); 
	    			}
	    				else { 
	    					right_put = -355;
	    					$("#focus_helper").stop().hide("fade"); 
	    					$("#focus_helper, #left_panel").mousedown(function(){
	    						right_put = -355;
	    						$("#right_panel").animate({ right: right_put+"px"}, { queue:false, easing:"easeOutExpo", duration:800});
	    						setTimeout(function(){$("#left_panel").finish(); }, 300);
	    						$("#focus_helper").stop().hide("fade"); 
	    					});
	    				}
	    					
	    			$("#right_panel").animate({ right: right_put+"px"}, { queue:false, easing:"easeOutExpo", duration:800});	//Dragging with mousemove values.
	   				setTimeout(function(){$("#right_panel").finish(); }, 300);
				});
	  		});
		});
	});
	*/	

	//Panel auto hide/show

	$(".hsi_l").mouseenter(function() {
		var foo = function() {
			var panel_display = $(".hs_area").css("opacity");
			if ( panel_display == 1 ) {
				$('#left_panel').show( { effect: "slide", easing:"easeOutExpo"});
				$("#left_panel").mouseleave(function(){
					var panel_display = $(".hs_area").css("opacity");
					if ( panel_display == 1 ) { $("#left_panel").hide("slide"); }
				});
			}
			$( "body" ).off( "mouseover", ".hsi_l", foo );
		}
		$("body").on( "mouseover", ".hsi_l", foo);
	});

	$(".hsi_r").mouseenter(function() {
		var foo = function() {
			var panel_display = $(".hs_area").css("opacity");
			if ( panel_display == 1 ) {
				$('#right_panel').show( { effect: "slide", easing:"easeOutExpo"});
				$("#right_panel").mouseleave(function(){
					var panel_display = $(".hs_area").css("opacity");
					if ( panel_display == 1 ) { $("#right_panel").hide("slide"); }
				});
			}
			$( "body" ).off( "mouseover", ".hsi_r", foo );
		}
		$("body").on( "mouseover", ".hsi_r", foo);
	});
		$( ".left_item" ).tooltip({ position: { my: "left+80 center", at: "left center" }, show: { effect: "fade", delay: 1000 }});
		$( ".miniapp" ).children("body").children("div").tooltip({ position: { my: "right center", at: "right center" }, show: { effect: "fade", delay: 1000 }});
});
});