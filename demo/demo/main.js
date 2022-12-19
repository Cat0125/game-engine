let scene = new Scene('canvas');

function resize() {
	let m = Math.min(window.innerWidth / canvas.width, window.innerHeight / canvas.height),
		pixelRatio = 3.6;
	
	canvas.width = canvas.width * pixelRatio;
	canvas.height = canvas.height * pixelRatio;
	canvas.style.width = canvas.width / pixelRatio * m + 'px';
	canvas.style.height = canvas.height / pixelRatio * m + 'px';
}
resize();
window.onresize = resize;

let cube = new Actor({
	x: 200,
	y: 150,
	model: new Model([
		[-10, -10],
		[-10, 10],
		[10, 10],
		[10, -10]
	]).get(),
	color: '#ff8800'
});

let cube2 = new Actor({
	x: 210,
	y: 190,
	model: new Model([
		[-10, -10],
		[-10, 10],
		[10, 10],
		[10, -10]
	]).get(),
	color: '#00ff55'
});

let ground = new StaticMesh({
	x: 200,
	y: 390,
	model: new Model([
		[-200, 10],
		[200, 10],
		[200, -10],
		[-200, -10]
	]).get(),
	color: '#300'
});

cube.behaviors.push(new Physics({
	mass: 2.5
}));
cube2.behaviors.push(new Physics());
ground.behaviors.push(new Physics());

scene.create(cube);
scene.create(cube2)
scene.create(ground);
scene.start();