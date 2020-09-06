
class Platform extends Entity {
	constructor(x, y, width, height, color) {
		super(x, y, width, height);
		this.color = color;
		this.solid = true;
	}

	update() {}

	draw(con) {
		con.fillStyle = this.color.toString();
		con.fillRect(
			this.x - camera.xOffset,
			this.y - camera.yOffset,
			this.width,
			this.height);
	}
}