class Actor extends SceneObject {
	constructor({ x = 0, y = 0, model = [], rotation = 0, color = 'black' }) {
		super({x, y, model, rotation, color});
		this.x = x;
		this.y = y;
		this.model = model;
		this.rotation = rotation;
		this.color = color;
		this.behaviors = [];
		this.velocity = {
			x: 0,
			y: 0
		}
	}
	
	render(ctx) {
		let model = this.model;
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.moveTo(this.x + model[0][0], this.y + model[0][1]);
		for (let i = 1; i < model.length; i++) {
			ctx.lineTo(this.x + model[i][0], this.y + model[i][1]);
		}
		ctx.lineTo(this.x + model[0][0], this.y + model[0][1]);
		ctx.fill();
	}
	
	detail(level) {
		let model = this.model,
			newModel = [];
		model.forEach((p, i, pts) => {
			let nextP = pts[i + 1] || pts[0];
			newModel.push([p[0], p[1]]);
			newModel.push([(p[0] + nextP[0]) / 2, (p[1] + nextP[1]) / 2]);
		});
		this.model = newModel;
		if (level > 0) this.detail(level - 1);
	}
}