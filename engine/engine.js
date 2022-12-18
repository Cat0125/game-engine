let fps = 0,
	_fpsCounter = 0;

class Scene {
	constructor(canvasID) {
		this.canvasID = canvasID;
		this.canvas = document.getElementById(canvasID);
		this.ctx = this.canvas.getContext('2d');
		this.objects = [];
	}

	_tick() {
		let objects = this.objects;
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		objects.forEach((obj, i) => {
			obj._tick(this);
			obj.render(this.ctx);
		})
		this.tick();
		this.ctx.fillStyle = '#000';
		this.ctx.fillText(fps + ' fps', 10, 10);
		_fpsCounter++;
		if (!this.enabled) return;
		requestAnimationFrame(() => this._tick());
	}

	create(object) {
		this.objects.push(object);
	}

	start() {
		requestAnimationFrame(() => this._tick.call(this));
		this.enabled = true;
	}
	
	stop() {
		this.enabled = false;
	}

	tick() { /* empty */ }
}

class SceneObject {
	constructor({ x = 0, y = 0, rotation = 0, color = 'black' }) {
		this.x = x;
		this.y = y;
		this.rotation = rotation;
		this.color = color;
		this.behaviors = [];
		this.velocity = {
			x: 0,
			y: 0
		}
	}

	_tick(scene) {
		this.behaviors.forEach(beh => {
			beh.tick(this, scene);
		});
		this.x += this.velocity.x;
		this.y += this.velocity.y;
		this.tick();
	}
	
	render () { /* empty */ }

	tick() { /* empty */ }
}

class Behavior {
	constructor() { /* empty */ }
	tick() { /* empty */ }
}

function pointInPoly(polyCords, pointX, pointY) {
	var i, j, c = 0;
	for (i = 0, j = polyCords.length - 1; i < polyCords.length; j = i++) {
		if (((polyCords[i][1] > pointY) != (polyCords[j][1] > pointY)) && (pointX < (polyCords[j][0] - polyCords[i][0]) * (pointY - polyCords[i][1]) / (polyCords[j][1] - polyCords[i][1]) + polyCords[i][0])) {
			c = !c;
		}
	}
	return c;
}

setInterval(() => {
	fps = _fpsCounter;
	_fpsCounter = 0;
}, 1000);
