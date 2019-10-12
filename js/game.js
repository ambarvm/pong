import { Ball } from './ball.js';
import { Paddle } from './paddle.js';

const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');

canvas.width = 432;
canvas.height = 243;

const winScore = 5;

let fpsCounter = 0;

function displayFPS() {
	context.fillStyle = 'green';
	context.textAlign = 'left';
	context.font = '15px retro';

	context.fillText(`FPS:${Game.fps}`, 2, 15);
}

function displayScore() {
	context.font = '30px retro';
	context.fillText(player1.score, canvas.width / 2 - 50, canvas.height / 3);
	context.fillText(player2.score, canvas.width / 2 + 50, canvas.height / 3);
}

const Game = {
	lastFrameTime: null,
	fps: '',
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

		if (ball.x < 0) {
			player2.score++;

			if (player2.score === winScore) {
				player1.score = 0;
				player2.score = 0;
			}
			ball.reset();
		}

		if (ball.x + ball.width > canvas.width) {
			player1.score++;
			if (player1.score === winScore) {
				player1.score = 0;
				player2.score = 0;
			}
			ball.reset();
		}

		if (ball.collides(player1)) {
			ball.vx = -ball.vx * 1.03;
			ball.randomizeYVelocity();
			ball.x = player1.x + player1.width;
			console.log('collided player1');
		}
		if (ball.collides(player2)) {
			ball.vx = -ball.vx * 1.03;
			ball.randomizeYVelocity();
			ball.x = player2.x - ball.width;
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
		context.font = '15px retro';

		// All rendering stuff
		context.fillText('Hello Pong!', canvas.width / 2, 30);

		ball.render(context);
		player1.render();
		player2.render();

		displayScore();
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
