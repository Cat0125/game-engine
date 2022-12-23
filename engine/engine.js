let fps = 0,
	_fpsCounter = 0;

/**
 * It's a class that contains a set of objects and renders them
 * @class
 * @param {string} canvasID id of the canvas to render the scene
 * @property {array} objects a set of objects
 * */
class Scene {
	constructor(canvasID) {
		this.canvasID = canvasID;
		this.canvas = document.getElementById(canvasID);
		this.ctx = this.canvas.getContext('2d');
		this.objects = new Set();
	}

	_tick() {
		let objects = this.objects;
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		for (let obj of objects) {
			obj._tick(this);
			obj.render(this.ctx);
		}
		this.tick();
		_fpsCounter++;
		this.reqHandle = requestAnimationFrame(() => this._tick());
	}

	add(object) {
		this.objects.add(object);
		if (typeof object.oncreate !== 'undefined') object.oncreate(this);
		object.behaviors.forEach(beh => {
			if (typeof beh.create != 'undefined')
				beh.create(object);
		});
	}

	destroy(object) {
		this.objects.delete(object);
		if (typeof object.ondestroy !== 'undefined') object.ondestroy(this);
		object.behaviors.forEach(beh => {
			if (typeof beh.destroy != 'undefined')
				beh.destroy(object);
		});
	}

	clear() {
		for (let obj of this.objects) obj.destroy();
		this.objects = new Set();
	}

	start() {
		if (typeof this.onstart !== 'undefined') this.onstart();
		this.reqHandle = requestAnimationFrame(() => this._tick.call(this));
	}

	stop() {
		if (typeof this.onstop !== 'undefined') this.onstop();
		cancelAnimationFrame(this.reqHandle);
	}

	tick() { /* empty */ }
}

/**
 * It's a class that represents an object in a scene
 * @class
 * @param {number} x the x coordinate of the object
 * @param {number} y the y coordinate of the object
 * @param {number} angle the angle of the object
 * @param {string} color the color of the object
 */
class SceneObject {
	constructor({ x = 0, y = 0, angle = 0, color = 'black' }) {
		this.x = x;
		this.y = y;
		this.angle = angle;
		this.color = color;
		this.behaviors = [];
		this.velocity = {
			x: 0,
			y: 0
		}
	}

	_tick(scene) {
		for (let beh of this.behaviors) {
			beh.tick(this, scene);
		}
		this.x += this.velocity.x;
		this.y += this.velocity.y;
		this.tick();
	}

	destroy() {
		if (typeof this.ondestroy !== 'undefined') this.ondestroy();
		this.behaviors.forEach(beh => {
			if (typeof beh.destroy!== 'undefined') beh.destroy(this);
		});
	}

	render() { /* empty */ }
	tick() { /* empty */ }
}

class Behavior { /* empty */ }

/**
 * A class that represents a model for rendering objects in a scene
 */
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