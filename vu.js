
class Clock {
	constructor(step, cd) {
		this.timer = 0;
		this.step = step;
		this.cd = cd;
	}
	tick() {
		this.timer += this.step;
		if (this.timer > this.cd) {
			this.timer = 0;
			return true;
		} else {
			return false;
		}
	}
}

class Entity {
	constructor(x, y, w, h, c) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.c = c;
		this.d = false;
	}
	tick() {}
	draw() {
		c.fillStyle = this.c;
		c.fillRect(
			this.x,
			this.y,
			this.w,
			this.h
		);
	}
}

class Player extends Entity {
	constructor(x, y, r) {
		super(x, y, r, r, 'red');
		this.velX = 0;
		this.velY = 0;
		this.velMax = 15;
		this.velTerm = 30;
		this.acc = 2;
		this.dec = this.acc * 2;
		this.canJump = false;
		this.jumpPower = 22;
	}
	tick() {
		this.input();
		this.fall();
		this.move();
	}
	input() {
		if (keys[82]) {
			this.x = 0;
			this.y = -100;
			this.velY = 0;
			this.velX = 0;
		}
		if (keys[39]) {
			this.velX += this.acc;
			if (this.velX > this.velMax) {
				this.velX = this.velMax;
			}
		} else {
			if (this.velX > 0) {
				this.velX -= this.dec;
				if (this.velX < 0) {
					this.velX = 0;
				}
			}
		}
		if (keys[37]) {
			this.velX -= this.acc;
			if (this.velX < -this.velMax) {
				this.velX = -this.velMax;
			}
		} else {
			if (this.velX < 0) {
				this.velX += this.dec;
				if (this.velX > 0) {
					this.velX = 0;
				}
			}
		}
		if (keys[17]) {
			if (this.canJump) {
				this.velY -= this.jumpPower;
				this.canJump = false;
			}
		}
	}
	fall() {
		this.velY += 1;
		if (this.velY > this.velTerm) {
			this.velY = this.velTerm;
		}
	}
	move() {
		this.y += this.velY;
		entities.forEach(t => {
			if (collision(this, t)) {
				if (this.velY > 0) {
					if (this.y + this.h > t.y) {
						this.velY = 0;
						this.y = t.y - this.h;
						this.canJump = true;
					}
				}
			}
		});

		this.x += this.velX;
	}
}

const randi = (min, max) => Math.floor(Math.random() * (max - min) + min);
const collision = (e1, e2) => e1.x < e2.x + e2.w && e1.x + e1.w > e2.x && e1.y < e2.y + e2.h && e1.y + e1.h > e2.y;
const canvas = document.createElement('canvas');
const c = canvas.getContext('2d');
const mouse = {};
const keys = [];
const entities = [];
const p = new Player(0, 0, 30);
const gap = 100;

window.onresize = () => { canvas.w = window.innerWidth; canvas.h = window.innerHeight; };
window.oncontextmenu = e => e.preventDefault();
window.onmousemove = ({x, y}) => { mouse.x = x; mouse.y = y; };
window.onmousedown = () => mouse.down = true;
window.onmouseup = () => mouse.down = false;
window.onkeydown = ({keyCode}) => keys[keyCode] = true;
window.onkeyup = ({keyCode}) => keys[keyCode] = false;
window.onload = () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	document.body.appendChild(canvas);
	requestAnimationFrame(loop);

	for (let y = 0; y < 1000; y++) {
		entities.push(new Entity(
			randi(0, 500),
			(y + 1) * gap,
			randi(gap / 2, gap),
			10,
			'yellow'
		));
	}
	entities.push(new Entity(
		0,
		-gap,
		1000,
		10,
		'green'
	));
	entities.push(new Entity(
		0,
		1001 * gap,
		1000,
		10,
		'yellow'
	));
	p.x = 0;
	p.y = 999 * gap;
}

const reviews = [
	'"the worst game i have ever played -Unknown"',
	'"complete waste of time -Unknown"',
	'"no one has time for this sh*t -Fred"',
	'"garbage engine -me"',
];
const patchNotes = [
	'patch notes 0.0.2 beta:',
	'-smoother collision',
	'-smoother movement',
	'-smoother brain',
	'-terminal velocity',
	'-new platform generation alg'
];
function loop() {
	c.fillStyle = 'black';
	c.fillRect(0, 0, canvas.width, canvas.height);
	c.save();
	c.translate(0, -p.y + (canvas.height - p.h) / 2);
	entities.forEach(e => {
		e.tick();
		e.draw();
	});
	p.tick();
	p.draw();
	c.font = '25px monospace';
	c.fillStyle = 'white';
	c.textAlign = 'center';
	reviews.forEach((r, i) => {
		c.fillText(r, canvas.width / 2, -400 + i * 25);
	});
	c.textAlign = 'left';
	patchNotes.forEach((f, i) => {
		c.fillText(f, 700, gap * 998 + i * 25);
	});
	c.restore();
	requestAnimationFrame(loop);
}