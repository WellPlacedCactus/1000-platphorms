
class Player extends Entity {
	constructor(x, y) {
		super(x, y, 20, 20);
		this.velX = 0;
		this.velY = 0;

		this.gravity = 1;
		this.grounded = false;
		this.jumpPower = 15;

		this.acc = 1;
		this.dec = this.acc;
		this.velMax = 40;
	}

	move() {
		this.x += this.velX;
		this.y += this.velY;

		// y

		this.velY += this.gravity;

		if (this.grounded) {
			if (keys[17] || keys[32]) {
				this.velY -= this.jumpPower;
				this.grounded = false;
				jumpSound.play();
			}
		}

		// x

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
	}

	collide() {

		// with platforms

		entities.forEach(entity => {
			if (entity.solid) {
				if (this.velY > 0) { // if we falling
					if (collision(this, entity)) {
						this.y = entity.y - this.height;
						this.velY = 0;
						this.grounded = true;
					}
				}
			}
		});
	}

	emit() {
		particles.push(new Particle(
			this.x + this.width / 2,
			this.y + this.height / 2,
			randi(10, 15),
			randi(10, 15),
			new RGBAValue(255, randi(0, 255), 0, 255),
			randf(-1, 1),
			randf(-1, -0.01),
			2
		));
	}

	update() {
		this.move();
		this.collide();
		this.emit();
	}

	draw(con) {
		con.fillStyle = 'white';
		con.fillRect(
			this.x - camera.xOffset,
			this.y - camera.yOffset,
			this.width,
			this.height);
	}
}