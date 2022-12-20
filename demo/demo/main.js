let scene = new Scene('canvas');
let width = 400,
	height = 400,
	pixelRatio = 2;

function resize() {
	let m = Math.min(
		window.innerWidth / width,
		window.innerHeight / height
	);
	
	canvas.width = width * pixelRatio;
	canvas.height = height * pixelRatio;
	canvas.style.width = width * m + 'px';
	canvas.style.height = height * m + 'px';
}
resize();
window.onresize = resize;

let cube = new Actor({
	x: 400,
	y: 120,
	model: new Model([
		[-20, -20],
		[-20, 20],
		[20, 20],
		[20, -20]
	]).get(),
	color: '#ff8800'
});

let cube2 = new Actor({
	x: 420,
	y: 190,
	model: new Model([
		[-20, -20],
		[-20, 20],
		[20, 20],
		[20, -20]
	]).get(),
	color: '#00ff55'
});

let ground = new StaticMesh({
	x: 400,
	y: 780,
	model: new Model([
		[-400, 20],
		[400, 20],
		[400, -20],
		[-400, -20]
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

setInterval(() => document.getElementById('info').innerHTML = fps + ' FPS', 1000)