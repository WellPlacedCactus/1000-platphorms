
class Entity {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.solid = false;
	}

	update() {}

	draw(con) {
		con.fillStyle = 'white';
		con.fillRect(
			this.x - camera.xOffset,
			this.y - camera.yOffset,
			this.width,
			this.height);
	}
}