
class RGBAValue {
	constructor(r, g, b, a) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	}

	toString() {
		return `rgba(
			${this.r},
			${this.g},
			${this.b},
			${this.a / 255})`;
	}
}

class Particle {
	constructor(x, y, width, height, color, velX, velY, decay) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
		this.velX = velX;
		this.velY = velY;
		this.decay = decay;
		this.dead = false;
	}

	update() {
		this.x += this.velX;
		this.y += this.velY;
		this.color.a -= this.decay;

		if (this.color.a < 0) {
			this.dead = true;
		}
	}

	draw(con) {
		con.fillStyle = this.color.toString();
		con.fillRect(
			this.x - this.width / 2 - camera.xOffset,
			this.y - this.height / 2 - camera.yOffset,
			this.width,
			this.height
		);
	}
}