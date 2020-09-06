
class UI {
	constructor() {
		this.score = 0;
		this.startTime = new Date();
		this.secondsPassed = 0;
		this.totalDist = (canvas.height / 11) * 1000;
		this.platformsLeft = null;
		this.enabled = true;

		this.reviews = [
			'"I had never shit so hard before" -IGN 10/10',
			'"I had a wife before playing this" -New York Times',
			'"Boss fired me for playing this at work. Taking all jobs. Male, 6\'2, straight." -Jonas Smith',
			'"Lamp" -Lamp',
			'"naw" -Rosa Parks, Benett Foddy, George Washington',
			'"There is a screwdriver on the couch behind you. Take it. Finish the job." -Comrade'
		];
	}

	update() {
		let currentTime = new Date();
		let timeDiff = currentTime - this.startTime;
		this.secondsPassed = Math.round((timeDiff /= 1000) % 60);
		this.platformsLeft = 1000 - Math.floor((this.totalDist - (this.totalDist + player.y)) / (canvas.height / 11));
	}

	draw(con) {
		if (this.enabled) {
			con.font = '25px Comic Sans MS';
			con.fillStyle = 'white';

			con.textAlign = 'left';
			con.fillText('platphorms left lmao: ' + this.platformsLeft, 5, 25);
			con.fillText('seconds of ur lyfe wasted: ' + this.secondsPassed, 5, 55);
			con.fillText(
				'left/right arrow keys 2 move ctrl or space 2 jump',
				5 - camera.xOffset,
				50 - camera.yOffset
			);

			con.textAlign = 'center';
			for (let i = 0; i < this.reviews.length - 1; i++) {
				con.fillText(
					this.reviews[i],
					canvas.width / 2,
					-72000 - camera.yOffset + (30 * i)
				);
			}
		}
	}
}