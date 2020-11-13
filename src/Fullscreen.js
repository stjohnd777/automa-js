let utils = {};

utils.bodyElement = document.getElementById("body");

utils.toggleFullScreen = function() {

	if (!document.mozFullScreen && !document.webkitFullScreen) {
		if (utils.bodyElement.mozRequestFullScreen) {
			utils.bodyElement.mozRequestFullScreen();
		} else {
			utils.bodyElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
		}
	} else {
		if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else {
			document.webkitCancelFullScreen();
		}
	}
}

document.addEventListener("keydown", function(e) {
	if (e.keyCode == 13) {
		utils.toggleFullScreen();
	}
}, false);

export default utils ;
