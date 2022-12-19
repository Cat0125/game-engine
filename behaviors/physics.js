let Physics;
(() => {
	let Engine = Matter.Engine,
		Runner = Matter.Runner,
		Bodies = Matter.Bodies,
		Composite = Matter.Composite;

	let engine = Engine.create();

	class Phys extends Behavior {
		constructor(params = {}) {
			super();
			this.params = params;
		}
		create(object) {
			if (object instanceof StaticMesh) this.params.isStatic = true;
			this.body = Bodies.fromVertices(
				object.x,
				object.y,
				object.model,
				this.params);
			Composite.add(engine.world, [this.body]);
		}
		tick(object) {
			object.y = this.body.position.y;
			object.x = this.body.position.x;
			object.angle = rad2deg(this.body.angle);
			object.angleRad = this.body.angle;
		}
	}

	let runner = Runner.create();
	Runner.run(runner, engine);

	Physics = Phys;
})();