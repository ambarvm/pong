const PADDLE_SPEED = 200;
let isKeyDown;
export class Paddle {
	constructor(x, y, keys, isKeyDownFn, canvasContext) {
		this.x = x;
		this.y = y;
		this.width = 5;
		this.height = 20;
		this.vy = 0;

		this.canvasContext = canvasContext;
		this.canvas = canvasContext.canvas;

		this.keys = keys;
		isKeyDown = isKeyDownFn;
	}

	update(dt) {
		if (isKeyDown(this.keys.up)) {
			this.vy = -PADDLE_SPEED;
		} else if (isKeyDown(this.keys.down)) {
			this.vy = PADDLE_SPEED;
		} else {
			this.vy = 0;
		}

		if (this.vy < 0) {
			this.y = Math.max(0, this.y + this.vy * dt);
		} else {
			this.y = Math.min(this.canvas.height - this.height, this.y + this.vy * dt);
		}
	}

	render() {
		this.canvasContext.fillRect(this.x, this.y, this.width, this.height);
	}
}
