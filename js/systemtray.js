//Clock
function updateClock ( )
    {
    var currentTime = new Date ( );
    var currentHours = currentTime.getHours ( );
    var currentMinutes = currentTime.getMinutes ( );


    // Pad the minutes and seconds with leading zeros, if required
    currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;


    // Choose either "AM" or "PM" as appropriate
    var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";

    // Convert the hours component to 12-hour format if needed
    currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;

    // Convert an hours component of "0" to "12"
    currentHours = ( currentHours == 0 ) ? 12 : currentHours;

    // Compose the string for display
    var currentTimeString = currentHours + ":" + currentMinutes + " " + timeOfDay;
    
    
    $("#clock").html(currentTimeString);
        
 }

$(document).ready(function()
{
   setInterval('updateClock()', 1000);
	setInterval('updateBattery()', 3000);
});

//Battery
function updateBattery () {
var battery = navigator.battery;
   	$('#battery-level').css("width", + Math.round(battery.level * 100) + "%");
   	$("#battery").tooltip({content:"No battery information"});
    $('#battery').tooltip( "option", "content", ((battery.charging) ? "Power mode" : "Battery Mode" )+ "</br>\
    	"+ Math.round(battery.level * 100) + "%</br>\
    	Battery time to charge: " + (Math.round(battery.chargingTime / 60)) + " minutes</br>\
    	Battery time left: " + (Math.round(battery.dischargingTime / 60)) + " minutes");
   /* if (battery.charging) {
        $('#charged').text("Battery time to charge: " + battery.chargingTime);
    } else {
        $('#charged').text("Battery time left: " + (Math.round(battery.dischargingTime / 60)) + " minutes");
    } */
}