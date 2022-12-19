class Actor extends SceneObject {
	constructor({ x = 0, y = 0, model = [], rotation = 0, color = 'black' }) {
		super({ x, y, model, rotation, color });
		this.x = x;
		this.y = y;
		this.model = model;
		this.angle = rotation;
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
		ctx.strokeStyle = this.color;
		ctx.translate(this.x, this.y);
		ctx.rotate(this.angleRad);
		ctx.translate(-this.x, -this.y)
		ctx.beginPath();
		ctx.moveTo(this.x + model[0].x, this.y + model[0].y);
		for (let i = 1; i < model.length; i++) {
			ctx.lineTo(this.x + model[i].x, this.y + model[i].y);
		}
		ctx.lineTo(this.x + model[0].x, this.y + model[0].y);
		ctx.fill();
		ctx.setTransform(1,0,0,1,0,0);
	}
}