# About engine
This engine is a simple web engine that provides powerful tools for you.

## Performance
![image](https://user-images.githubusercontent.com/106539381/209358987-5b6e86cb-321c-460d-9f4f-f47f7a238539.png)
Screenshot from [examples/demo](examples/demo)

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
  color: '#000'
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

Can be found in [wikis](https://github.com/Cat0125/game-engine/wiki).
