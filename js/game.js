const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');

canvas.width = 432;
canvas.height = 243;

context.font = '15px retro';
context.fillStyle = 'white';
context.textAlign = 'center';

document.fonts.load('20px retro').then(() => {
	context.fillText('Hello Pong!', canvas.width / 2, 30);
});

context.fillRect(canvas.width / 2 - 2, canvas.height / 2 - 2, 4, 4);

context.fillRect(10, 30, 5, 20);
context.fillRect(canvas.width - 15, canvas.height - 30, 5, 20);
