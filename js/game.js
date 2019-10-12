import { Ball } from './ball.js';
import { Paddle } from './paddle.js';

const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');

canvas.width = 432;
canvas.height = 243;

context.font = '15px retro';

let fpsCounter = 0;

function displayFPS() {
	context.fillStyle = 'green';
	context.textAlign = 'left';

	context.fillText(`FPS:${Game.fps}`, 2, 15);
}

const Game = {
	lastFrameTime: null,
	fps: null,
	init: function(time) {
		if (this.lastFrameTime) {
			this.update((time - this.lastFrameTime) / 1000);
			this.render();
		}
		this.lastFrameTime = time;

		requestAnimationFrame(time => {
			this.init(time);
		});
	},
	update: function(dt) {
		// Update game state here
		if (fpsCounter == 20) {
			Game.fps = Math.floor(1 / dt);
			fpsCounter = 0;
		}
		fpsCounter++;
	},
	render: function() {
		// clear the canvas for redraw
		context.clearRect(0, 0, canvas.width, canvas.height);

		context.fillStyle = 'white';
		context.textAlign = 'center';

		// All rendering stuff
		context.fillText('Hello Pong!', canvas.width / 2, 30);
		context.fillRect(canvas.width / 2 - 2, canvas.height / 2 - 2, 4, 4);

		context.fillRect(10, 30, 5, 20);
		context.fillRect(canvas.width - 15, canvas.height - 30, 5, 20);

		displayFPS();
	}
};

Game.init();
