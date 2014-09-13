$.getJSON("user/loggedin.json", function(user){
$.getJSON("user/"+user.user+"/settings", function(json) {
	/*
		To do list:
		-Sort taskbar items by z-indexes of windows.
		-Focus window when taskbar icon of window is clicked.
		-Unminimize function.
		-Window menu.
		-Hide when fullscreen(not maximized) window to hotspot.
	*/
	//Maybe later.

});
});
