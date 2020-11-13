export default function KeyboardControls(object, options) {
	this.object = object;
	options = options || {};

	this.moveSpeed = options.moveSpeed || 1;
}

KeyboardControls.prototype = {

	update : function() {
		if (this.moveForward)
			this.object.translateZ(-this.moveSpeed);
		if (this.moveBackward)
			this.object.translateZ(this.moveSpeed);
		if (this.moveLeft)
			this.object.translateX(-this.moveSpeed);
		if (this.moveRight)
			this.object.translateX(this.moveSpeed);
	},
	onKeyDown : function(event) {
		
		switch (event.keyCode) {
			//case 38 : /* up */
			case 87 : /* W */
				this.moveForward = true;
				break;

			//case 37 : /* left */
			case 65 : /* A */
				this.moveLeft = true;
				break;

			//case 40 : /* down */
			case 83 : /* S */
				this.moveBackward = true;
				break;

			//case 39 : /* right */
			case 68 : /* D */
				this.moveRight = true;
				break;
		}
	},
	onKeyUp : function(event) {

		switch (event.keyCode) {
			case 38 : /* up */
			case 87 : /* W */
				this.moveForward = false;
				break;

			case 37 : /* left */
			case 65 : /* A */
				this.moveLeft = false;
				break;

			case 40 : /* down */
			case 83 : /* S */
				this.moveBackward = false;
				break;

			case 39 : /* right */
			case 68 : /* D */
				this.moveRight = false;
				break;
		}
	}
};
