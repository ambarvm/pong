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

const sounds = {
	paddle_hit: new Audio('../audio/paddle_hit.wav'),
	score: new Audio('../audio/score.wav')
};

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
		ball.update(dt);
		player1.update(dt);
		player2.update(dt);

		if (ball.x + ball.width > ball.canvas.width || ball.x < 0) {
			sounds.score.play();
			ball.reset();
		}

		if (ball.collides(player1)) {
			ball.vx = -ball.vx * 1.03;
			ball.randomizeYVelocity();
			ball.x = player1.x + player1.width;
			sounds.paddle_hit.play();
			console.log('collided player1');
		}
		if (ball.collides(player2)) {
			ball.vx = -ball.vx * 1.03;
			ball.randomizeYVelocity();
			ball.x = player2.x - ball.width;
			sounds.paddle_hit.play();
			console.log('collided player2');
		}

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

		ball.render(context);
		player1.render();
		player2.render();

		displayFPS();
	}
};

let keys = [];
window.addEventListener(
	'keydown',
	e => {
		keys[e.keyCode] = true;
	},
	false
);

window.addEventListener(
	'keyup',
	e => {
		keys[e.keyCode] = false;
	},
	false
);

function isKeyDown(keyCode) {
	return keys[keyCode];
}

const ball = new Ball(canvas.width / 2 - 2, canvas.height / 2 - 2, 4, 4, context);
const player1 = new Paddle(10, 30, { up: 87, down: 83 }, isKeyDown, context);
const player2 = new Paddle(canvas.width - 15, canvas.height - 30, { up: 38, down: 40 }, isKeyDown, context);

Game.init();
