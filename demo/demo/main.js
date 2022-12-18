let scene = new Scene('canvas');

let cube = new Actor({
	x: 90,
	y: 150,
	model: [
		[-10, -10],
		[-10, 10],
		[10, 10],
		[10, -10]
	],
	color: 'rgb(0,0,0)'
});

let ground = new StaticMesh({
	x: 150,
	y: 290,
	model: [
		[-150, 10],
		[150, 10],
		[150, -10],
		[-150, -10]
	],
	color: 'rgb(0,0,0)'
});

cube.behaviors.push(new Physics());
cube.weight = 2.5;
cube.velocity = {x: 3, y: -3};

scene.create(cube);
scene.create(ground);
scene.start();