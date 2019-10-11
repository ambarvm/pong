export class Ball {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	update(dt) {}

	render() {}

	/**
	 * Checks collision with paddle and returns a boolean value
	 */
	collides(paddle) {}
}
