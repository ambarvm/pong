const PADDLE_SPEED = 200;

export class Paddle {
	constructor(x, y, keys, canvasContext) {
		this.x = x;
		this.y = y;
		this.width = 5;
		this.height = 20;
		this.vy = 0;

		this.canvasContext = canvasContext;
		this.canvas = canvasContext.canvas;

		this.listenKeyboard(keys);
	}

	listenKeyboard(keys) {
		document.addEventListener('keydown', key => {
			if (key.keyCode === keys.up) {
				this.vy = -PADDLE_SPEED;
			} else if (key.keyCode === keys.down) {
				this.vy = PADDLE_SPEED;
			} else {
				this.vy = 0;
			}
		});

		document.addEventListener('keyup', () => (this.vy = 0));
	}

	update(dt) {
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
