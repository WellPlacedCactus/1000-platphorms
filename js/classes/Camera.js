
class Camera {
	constructor() {
		this.xOffset = 0;
		this.yOffset = 0;
	}

	focus(entity) {
		this.yOffset = entity.y - (canvas.height - entity.height) / 2;
	}
}