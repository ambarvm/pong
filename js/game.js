import { Ball } from './ball.js';
import { Paddle } from './paddle.js';

const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');

canvas.width = 432;
canvas.height = 243;

const winScore = 5;

let servingPlayer = Math.random() < 0.5 ? 1 : 2;
let winningPlayer;

let fpsCounter = 0;

function displayFPS() {
	context.fillStyle = 'green';
	context.textAlign = 'left';
	context.font = '15px retro';

	context.fillText(`FPS:${Game.fps}`, 2, 15);
}

const sounds = {
	paddle_hit: new Audio('audio/paddle_hit.wav'),
	score: new Audio('audio/score.wav')
};
function displayScore() {
	context.font = '30px retro';
	context.fillText(player1.score, canvas.width / 2 - 50, canvas.height / 3);
	context.fillText(player2.score, canvas.width / 2 + 50, canvas.height / 3);
}

const Game = {
	lastFrameTime: null,
	fps: '',
	state: 'start',
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
		if (this.state === 'serve') {
			ball.vy = Math.random() * 100 - 50;

			let magnitude = 140 + Math.random() * 60;

			if (servingPlayer === 1) {
				ball.vx = magnitude;
			} else {
				ball.vx = -magnitude;
			}

			player1.update(dt);
			player2.update(dt);
		} else if (this.state === 'play') {
			ball.update(dt);
			player1.update(dt);
			player2.update(dt);

			if (ball.x < 0) {
				sounds.score.play();
				servingPlayer = 1;
				player2.score++;

				if (player2.score === winScore) {
					winningPlayer = 2;
					this.state = 'done';
				} else {
					this.state = 'serve';
					ball.reset();
				}
			}

			if (ball.x + ball.width > canvas.width) {
				sounds.score.play();
				servingPlayer = 2;
				player1.score++;

				if (player1.score === winScore) {
					winningPlayer = 1;
					this.state = 'done';
				} else {
					this.state = 'serve';
					ball.reset();
				}
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
		if (this.state === 'start') {
			context.fillText('Hello Pong!', canvas.width / 2, 20);
			context.fillText('Press Enter to Play', canvas.width / 2, 40);
		}

		if (this.state === 'serve') {
			context.fillText(`Player ${servingPlayer}'s Serve`, canvas.width / 2, 20);
			context.fillText('Press Enter to serve', canvas.width / 2, 40);
		}

		if (this.state === 'done') {
			context.fillText(`Player ${winningPlayer} Won`, canvas.width / 2, 20);
		}

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

window.addEventListener('keydown', key => {
	if (key.keyCode === 13 /* Enter */) {
		if (Game.state === 'start') {
			Game.state = 'serve';
		} else if (Game.state === 'serve') {
			Game.state = 'play';
		} else if (Game.state === 'done') {
			Game.state = 'serve';
			ball.reset();

			// reset scores
			player1.score = player2.score = 0;

			// serving player opposite of winning player
			servingPlayer = winningPlayer === 1 ? 2 : 1;
		}
	}
});

const ball = new Ball(canvas.width / 2 - 2, canvas.height / 2 - 2, 4, 4, context);
const player1 = new Paddle(10, 30, { up: 87, down: 83 }, isKeyDown, context);
const player2 = new Paddle(canvas.width - 15, canvas.height - 30, { up: 38, down: 40 }, isKeyDown, context);

Game.init();
