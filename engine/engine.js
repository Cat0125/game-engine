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
		});
		this.tick();
		_fpsCounter++;
		requestAnimationFrame(() => this._tick());
	}

	create(object) {
		this.objects.push(object);
		if (typeof object.oncreate !== 'undefined') object.oncreate(this);
		object.behaviors.forEach(beh => {
			if (typeof beh.create != 'undefined')
				beh.create(object);
		});
	}

	start() {
		if (typeof this.onstart !== 'undefined') this.onstart();
		requestAnimationFrame(() => this._tick.call(this));
		this.enabled = true;
	}

	stop() {
		if (typeof this.onstop !== 'undefined') this.onstop();
		this.enabled = false;
	}

	tick() {}
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

	render() { /* empty */ }
	tick() {}
}

class Behavior { /* empty */ }

class Model {
	constructor(model = null) {
		if (model) this.load(model);
	}

	load(model) {
		if (Array.isArray(model[0])) {
			this.model = model.map(v => ({ x: v[0], y: v[1] }));
		} else if (typeof model[0] == 'object') {
			this.model = model;
		}
		return this;
	}

	get() {
		return this.model;
	}

	detail(level) {
		let model = this.model,
			newModel = [];
		model.forEach((p, i, pts) => {
			let nextP = pts[i + 1] || pts[0];
			newModel.push({
				x: p.x,
				y: p.y
			});
			newModel.push({
				x: (p.x + nextP.x) / 2,
				y: (p.y + nextP.y) / 2
			});
		});
		this.model = newModel;
		if (level > 0) this.detail(level - 1);
		return this;
	}

	roughness(bias) {
		for (let i = 0; i < this.model.length; i++) {
			let p = this.model[i];
			this.model[i] = {
				x: p.x + randomInt(bias * 2) - bias,
				y: p.y + randomInt(bias * 2) - bias
			}
		}
		return this;
	}
}

function pointInPoly(polyCords, pointX, pointY) {
	let i, j, c = 0;
	for (i = 0, j = polyCords.length - 1; i < polyCords.length; j = i++) {
		if (((polyCords[i][1] > pointY) != (polyCords[j][1] > pointY)) && (pointX < (polyCords[j][0] - polyCords[i][0]) * (pointY - polyCords[i][1]) / (polyCords[j][1] - polyCords[i][1]) + polyCords[i][0])) {
			c = !c;
		}
	}
	return c;
}

function random(from, to) {
	return Math.random() * (to - from) + from;
}

function randomInt(from, to) {
	return Math.floor(Math.random() * (to - from) + from);
}

function deg2rad(deg) {
	return deg * Math.PI / 180;
}

function rad2deg(rad) {
	return rad * 180 / Math.PI;
}

setInterval(() => {
	fps = _fpsCounter;
	_fpsCounter = 0;
}, 1000);