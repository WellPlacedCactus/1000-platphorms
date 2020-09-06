
// GLOBALS
const canvas = document.getElementById('viewport');
const context = canvas.getContext('2d');
const keys = [];
const entities = [];
const particles = [];
const camera = new Camera();
const player = new Player(50, -50);
const jumpSound = document.getElementById('jumpSound');
const ui = new UI();

function start() {
	resize();

	// World generation
	// Adding platforms
	for (let i = 0; i < 1000; i++) {
		entities.push(new Platform(
			randi(canvas.width / 4, canvas.width / 2),
			-i * (canvas.height / 11) - (canvas.height / 11) - 20,
			randi(50, 100),
			10,
			new RGBAValue(255, 255 - i * 255 / 1000, 0, 255)
		));
	}

	// Add floor
	entities.push(new Platform(
		0,
		0,
		canvas.width,
		10,
		new RGBAValue(0, 255, 0, 255)
	));

	// Add heaven
	entities.push(new Platform(
		0,
		-71747,
		canvas.width,
		10,
		new RGBAValue(0, 255, 0, 255)
	));

	// Add player
	entities.push(player);

	requestAnimationFrame(loop);
}

function loop() {
	requestAnimationFrame(loop);
	camera.focus(player);
	
	context.fillStyle = 'black';
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillRect(0, 0, canvas.width, canvas.height);

	for (let i = particles.length - 1; i >= 0; --i) {
		const particle = particles[i];
		particle.update();
		particle.draw(context);

		if (particle.dead) {
			particles.splice(i, 1);
		}
	}

	entities.forEach(entity => {
		entity.update();
		entity.draw(context);
	});

	ui.update();
	ui.draw(context);
}

function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

// input

function keydown(e) {
	keys[e.keyCode] = true;
}

function keyup(e) {
	keys[e.keyCode] = false;
}

// utils

function randi(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function randf(min, max) {
	return Math.random() * (max - min) + min;
}

function collision(rect1, rect2) {
	if (rect1.x < rect2.x + rect2.width &&
		rect1.x + rect1.width > rect2.x &&
		rect1.y < rect2.y + rect2.height &&
		rect1.y + rect1.height > rect2.y) {
		return true;
	} else {
		return false;
	}
}

window.onload = start;
window.onresize = resize;
window.onkeydown = keydown;
window.onkeyup = keyup;