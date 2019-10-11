export class Ball {
	constructor(x, y, width, height, canvasContext) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.canvasContext = canvasContext;
		this.canvas = this.canvasContext.canvas;

		this.vx = Math.random() < 0.5 ? 100 : -100;
		this.vy = Math.random() * 100 - 50;
	}

	update(dt) {
		this.x += this.vx * dt;
		this.y += this.vy * dt;

		if (this.y <= 0) {
			this.y = 0;
			this.vy = -this.vy;
		}

		if (this.y >= this.canvas.height - this.height) {
			this.y = this.canvas.height - this.height;
			this.vy = -this.vy;
		}
	}

	render() {
		this.canvasContext.fillRect(this.x, this.y, this.width, this.height);
	}

	reset() {
		this.x = this.canvas.width / 2 - this.width;
		this.y = this.canvas.height / 2 - this.height;

		this.vx = Math.random() < 0.5 ? 100 : -100;
		this.vy = Math.random() * 100 - 50;
	}

	/**
	 * Checks collision with paddle and returns a boolean value
	 */
	collides(paddle) {
		if (this.x > paddle.x + paddle.width || paddle.x > this.x + this.width) {
			return false;
		}

		if (this.y > paddle.y + paddle.height || paddle.y > this.y + this.height) {
			return false;
		}

		return true;
	}
}
