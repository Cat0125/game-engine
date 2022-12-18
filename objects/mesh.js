class StaticMesh extends Actor {
	constructor({ x = 0, y = 0, model = [], rotation = 0, color = 'black' }) {
		super({x, y, model, rotation, color});
		this.x = x;
		this.y = y;
		this.model = model;
		this.rotation = rotation;
		this.color = color;
		this.behaviors = [];
	}
	
	_tick(scene) {
		this.behaviors.forEach(beh => {
			beh.tick(this, scene);
		});
		this.tick();
	}
}