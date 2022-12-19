# About engine
This engine is a simple web engine that provides powerful tools for you.

# Using

## Basic guide

This is basic beginner guide.
It will teach you how to create a scene,
add objects to it and add behaviors to them.

### Html

Create HTML file and import scripts you need.
In this example, we will only use `Mesh` and `StaticMesh` object types.
```HTML
<script src="/engine/engine.js"></script>
<script src="/objects/mesh.js"></script>

<script src="main.js"></script>
```
At the end is our script.

Then add canvas. It is used to render the game.
```HTML
<canvas id="canvas" width="300" height="300"></canvas>
```

### JavaScript

Let's add some JavaScript.
Here's scene and some objects.
```JavaScript
// Scene
// First argument is canvas ID that's used to render scene.
let scene = new Scene('canvas');

// Cube
let cube = new Mesh({
  // position
  x: 150,
  y: 150,
  // model
  // this is basic cube model, we just use it
  model: new Model([
    [-10, -10],
    [-10, 10],
    [10, 10],
    [10, -10]
  ]).get(),
  // cube color
  color: 'rgb(0,0,0)'
});

// Add cube to scene
scene.create(cube);
```
If you run this code, nothing will happen.
The scene needs to start.
```JavaScript
scene.start();
```

# Documentation

## Scene

### Start and stop

To run scene, you needed to call `start` method.
Tho stop it from running, call `stop`.
```JavaScript
scene.start();
scene.stop();
```

### Objects

```
// Create
scene.add(<object>);
// Delete
scene.objects.splice(<object index>);
```
Unfortunately, there is no normal way to delete objects.
But we can delete them directly.

### Ticks

`scene.tick` is a function that is executed every tick.

```JavaScript
scene.tick = function() {
	scene.objects.forEach(obj => obj.y += 1);
}
```

### Others

```JavaScript
scene.objects

scene._tick()

scene.enabled
```
