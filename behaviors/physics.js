class Physics extends Behavior {
	tick(object, scene) {
		object.velocity.y += (object.weight / 10 || 1);
		object.velocity.y *= (object.friction || 0.98);
		object.velocity.x *= (object.friction || 0.98);
	}
}