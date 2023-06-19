import * as THREE from 'three';

//Import GLTFLoader
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//Import orbit controls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//Setup the scene
const scene = new THREE.Scene();
//Camera Keyboard
// Keyboard input variables
let moveCameraForward = false;
let moveCameraBackward = false;
let moveCameraLeft = false;
let moveCameraRight = false;
var arrow;
var arrowDirection = new THREE.Vector3(1, 0, 0); // Direzione della freccia
var arrowLength = 10; // Lunghezza della freccia
var arrowColor = 0xff0000; // Colore della freccia


// Handle key down events
document.addEventListener('keydown', function(event) {
  switch (event.code) {
    case 'ArrowUp':
      moveCameraForward = true;
      break;
    case 'ArrowDown':
      moveCameraBackward = true;
      break;
    case 'ArrowLeft':
      moveCameraLeft = true;
      break;
    case 'ArrowRight':
      moveCameraRight = true;
      break;
  }

  // Handle key up events
  document.addEventListener('keyup', function(event) {
    switch (event.code) {
      case 'ArrowUp':
        moveCameraForward = false;
        break;
      case 'ArrowDown':
        moveCameraBackward = false;
        break;
      case 'ArrowLeft':
        moveCameraLeft = false;
        break;
      case 'ArrowRight':
        moveCameraRight = false;
        break;
    }
  });
});


// Keyboard input variables
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;


// Handle mouse events
{
let mouseDown = false;
let startMouseX = 0;
let startMouseY = 0;

document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);

function handleMouseDown(event) {
  mouseDown = true;
  startMouseX = event.clientX;
  startMouseY = event.clientY;
}

function handleMouseMove(event) {
  if (mouseDown) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const deltaX = mouseX - startMouseX;
    const deltaY = mouseY - startMouseY;

    // Calcola la direzione del trascinamento in base alla variazione delle coordinate del mouse
    if (deltaX > 0) {
      // Trascinamento verso destra
      moveRight = true;
      moveLeft = false;
    } else if (deltaX < 0) {
      // Trascinamento verso sinistra
      moveRight = false;
      moveLeft = true;
    } else {
      moveRight = false;
      moveLeft = false;
    }

    if (deltaY > 0) {
      // Trascinamento verso il basso
      moveForward = false;
      moveBackward = true;
    } else if (deltaY < 0) {
      // Trascinamento verso l'alto
      moveForward = true;
      moveBackward = false;
    } else {
      moveForward = false;
      moveBackward = false;
    }
  }
}

function handleMouseUp(event) {
  mouseDown = false;
  moveForward = false;
  moveBackward = false;
  moveLeft = false;
  moveRight = false;
}
}

// Add a skybox
const t_loader = new THREE.CubeTextureLoader();
const skyboxTextures = [
  'textures/skybox/lightblue/left.png',
  'textures/skybox/lightblue/right.png',
  'textures/skybox/lightblue/top.png',
  'textures/skybox/lightblue/bot.png',
  'textures/skybox/lightblue/back.png',
  'textures/skybox/lightblue/front.png',
];
const skyboxTexture = t_loader.load(skyboxTextures);
scene.background = skyboxTexture;



//camera

var camera;
var cameraRadius = 60;


camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, cameraRadius);

window.addEventListener('resize', resizeCanvas);

function resizeCanvas() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}



//lighting

var lightProps = {
    "ambientColor": 0xffffff,
    "ambientIntensity": 0.1,
    "lightColor": 0xffffff,
    "lightIntensity": 0.5,
    "distance": 100,
}

var ambient = new THREE.AmbientLight(lightProps.ambientColor, lightProps.ambientIntensity)
scene.add(ambient)

//Add first light
const light = new THREE.DirectionalLight(lightProps.lightColor, lightProps.lightIntensity);

light.position.set(lightProps.distance, lightProps.distance, lightProps.distance);
light.castShadow = true;

//Set up shadows
var lightShadowCastRange = 10;
light.shadow.camera.top = lightShadowCastRange;
light.shadow.camera.bottom = -lightShadowCastRange;
light.shadow.camera.left = -lightShadowCastRange;
light.shadow.camera.right = lightShadowCastRange;
light.shadow.camera.near = 100;
light.shadow.camera.far = 300;
light.shadow.bias = -0.0005

scene.add(light);

//Add second light
const light1 = new THREE.DirectionalLight(lightProps.lightColor, lightProps.lightIntensity);

light1.position.set(-lightProps.distance, lightProps.distance, lightProps.distance);
light1.castShadow = true;

//Set up shadows
var lightShadowCastRange = 10;
light1.shadow.camera.top = lightShadowCastRange;
light1.shadow.camera.bottom = -lightShadowCastRange;
light1.shadow.camera.left = -lightShadowCastRange;
light1.shadow.camera.right = lightShadowCastRange;
light1.shadow.camera.near = 100;
light1.shadow.camera.far = 300;
light1.shadow.bias = -0.0005

scene.add(light1);

//Add third light
const light2 = new THREE.DirectionalLight(lightProps.lightColor, lightProps.lightIntensity);

light2.position.set(lightProps.distance, lightProps.distance, -lightProps.distance);
light2.castShadow = true;

//Set up shadows
var lightShadowCastRange = 10;
light2.shadow.camera.top = lightShadowCastRange;
light2.shadow.camera.bottom = -lightShadowCastRange;
light2.shadow.camera.left = -lightShadowCastRange;
light2.shadow.camera.right = lightShadowCastRange;
light2.shadow.camera.near = 100;
light2.shadow.camera.far = 300;
light2.shadow.bias = -0.0005

scene.add(light2);

//Add fourth light
const light3 = new THREE.DirectionalLight(lightProps.lightColor, lightProps.lightIntensity);

light3.position.set(-lightProps.distance, lightProps.distance, -lightProps.distance);
light3.castShadow = true;

//Set up shadows
var lightShadowCastRange = 10;
light3.shadow.camera.top = lightShadowCastRange;
light3.shadow.camera.bottom = -lightShadowCastRange;
light3.shadow.camera.left = -lightShadowCastRange;
light3.shadow.camera.right = lightShadowCastRange;
light3.shadow.camera.near = 100;
light3.shadow.camera.far = 300;
light3.shadow.bias = -0.0005

scene.add(light3);




const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;

renderer.setSize(window.innerWidth, window.innerHeight);




camera.position.set(0, 15, 15);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Add smooth damping effect
controls.dampingFactor = 0.05; // Adjust the damping factor (0.05 is the default)
controls.rotateSpeed = 0.5; // Adjust the rotation speed

//Add 3D models
const loader = new GLTFLoader();
var capybara_1;
var capybara_2;
var football_pitch;
var ball;

//Bounding boxes
var box_capy1;
var box_capy2;
var box_ball;

var bottomEdgeBox;
var topEdgeBox;
var leftEdgeBox;
var rightEdgeBox;

var accellerationx;
var accellerationz;
var accellerationballx;
var accellerationballz;

function createArrow(position) {
  var arrowGeometry = new THREE.BufferGeometry();
  var positions = [];
  positions.push(0, 0, 0); // Origine della freccia (0, 0, 0) relativa al capybara
  positions.push(arrowDirection.x * arrowLength, arrowDirection.y * arrowLength, arrowDirection.z * arrowLength); // Destinazione della freccia relativa al capybara
  arrowGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

  var arrowMaterial = new THREE.LineBasicMaterial({ color: arrowColor });

  return new THREE.Line(arrowGeometry, arrowMaterial);
}

loader.load('capybara_low_poly/scene.gltf', function (gltf) {
  capybara_1 = gltf.scene;
  scene.add(capybara_1);

  capybara_1.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  capybara_1.position.x = -9;
  capybara_1.rotation.y = 90 * (Math.PI / 180.0);
  capybara_1.scale.set(2, 2, 2);

  //Setup a bounding box around capybara_1
  box_capy1 = new THREE.Box3().setFromObject(capybara_1);
  const siz_capy1 = box_capy1.getSize(new THREE.Vector3()).length();
  const center_capy1 = box_capy1.getCenter(new THREE.Vector3());
  arrow = createArrow(capybara_1.position);
  capybara_1.add(arrow);

}, undefined, function (error) {
  console.error(error);
});

loader.load('capybara_low_poly/scene.gltf', function (gltf1) {
  capybara_2 = gltf1.scene;
  scene.add(capybara_2);

  capybara_2.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  capybara_2.position.x = 9;
  capybara_2.rotation.y = -90 * (Math.PI / 180.0);
  capybara_2.scale.set(2, 2, 2);

  //Setup a bounding box around capybara_2
  box_capy2 = new THREE.Box3().setFromObject(capybara_2);
  const size_capy2 = box_capy2.getSize(new THREE.Vector3()).length();
  const center_capy2 = box_capy2.getCenter(new THREE.Vector3());

}, undefined, function (error) {
  console.error(error);
});



loader.load('football_pitch/scene.gltf', function (gltf2) {
  football_pitch = gltf2.scene;
  scene.add(football_pitch);

  football_pitch.traverse(function (child) {
    if (child.isMesh) {
      child.receiveShadow = true;
    }
  });

  football_pitch.position.y = -0.05;

  // Create bounding boxes for the edges
  const pitchSize = new THREE.Box3().setFromObject(football_pitch).getSize(new THREE.Vector3());

  const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });

  // Create a bounding box for the left edge
  leftEdgeBox = new THREE.Box3Helper(new THREE.Box3().setFromCenterAndSize(
    new THREE.Vector3(-pitchSize.x / 2, 1.8, 0),
    new THREE.Vector3(0.1, pitchSize.y, pitchSize.z)
  ), edgeMaterial);
  scene.add(leftEdgeBox);

  // Create a bounding box for the right edge
  rightEdgeBox = new THREE.Box3Helper(new THREE.Box3().setFromCenterAndSize(
    new THREE.Vector3(pitchSize.x / 2, 1.8, 0),
    new THREE.Vector3(0.1, pitchSize.y, pitchSize.z)
  ), edgeMaterial);
  scene.add(rightEdgeBox);

  // Create a bounding box for the top edge
  topEdgeBox = new THREE.Box3Helper(new THREE.Box3().setFromCenterAndSize(
    new THREE.Vector3(0, 1.8, -pitchSize.z / 2),
    new THREE.Vector3(pitchSize.x, pitchSize.y, 0.1)
  ), edgeMaterial);
  scene.add(topEdgeBox);

  // Create a bounding box for the bottom edge
  bottomEdgeBox = new THREE.Box3Helper(new THREE.Box3().setFromCenterAndSize(
    new THREE.Vector3(0, 1.8, pitchSize.z / 2),
    new THREE.Vector3(pitchSize.x, pitchSize.y, 0.1)
  ), edgeMaterial);
  scene.add(bottomEdgeBox);

}, undefined, function (error) {
  console.error(error);
});

loader.load('football_ball/scene.gltf', function (gltf3) {
  ball = gltf3.scene;
  scene.add(ball);

  ball.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  //ball.position.x = -0.5;
  ball.position.y = 0.36;
  //ball.position.z = -0.2;
  ball.scale.set(0.4, 0.4, 0.4);

  //Setup a bounding sphere around ball
  box_ball = new THREE.Box3().setFromObject(ball);
  const size_ball = box_ball.getSize(new THREE.Vector3()).length();
  const center_ball = box_ball.getCenter(new THREE.Vector3());

}, undefined, function (error) {
  console.error(error);
});




var isMoving = false;
var isCapyMoving = true;
var increment = 0.05;
var goal = false;

//Render the Scene; basically, anything you want to move or change
//while the app is running has to go through the animate loop.
function animate() {
  requestAnimationFrame(animate);

  // Moving the camera
  if (moveCameraForward) {
    camera.zoom -= 0.5;
  }
  if (moveCameraForward) {
    camera.zoom += 0.5;
  }
  if (moveCameraLeft) {
    camera.position.x -= 0.5;
  }
  if (moveCameraRight) {
    camera.position.x += 0.5;
  }

  // Update controls
  controls.enabled = false;

  controls.update();


  checkPitchCollisions(box_capy1);
  checkPitchCollisions(box_ball);

  if(isCapyMoving){
    capybara_2.position.z += increment;
    box_capy2.setFromObject(capybara_2);
  }


  // Check if the variable has reached the minimum or maximum value
  if (capybara_2.position.z >= 3 || capybara_2.position.z <= -3) {
    increment *= -1; // Invert the increment direction
  }

  // Move the cube based on keyboard input
  if (moveForward) capybara_1.position.z -= 0.1;
  if (moveBackward) capybara_1.position.z += 0.1;
  if (moveLeft) capybara_1.position.x -= 0.1;
  if (moveRight) capybara_1.position.x += 0.1;


  if(isMoving){
    ball.position.x += 0.1;
    ball.position.z += 0.1;
    ball.rotation.z -= 0.2;
    box_ball.setFromObject(ball);
  }

  //Update the bounding boxes
  if(moveForward||moveBackward||moveLeft||moveRight) box_capy1.setFromObject(capybara_1);

  // Check for collisions
  if (box_capy1.intersectsBox(box_ball)) {
    // Collision detected, stop or modify the object's movement
    isMoving = true;
  }

  if (box_ball.intersectsBox(box_capy2)) {
    // Collision detected, stop or modify the object's movement
    isMoving = false;
    isCapyMoving = false;
    //box_ball.setFromObject(ball);
  }

  if(ball.position.x >= 10 && !goal){
    goal = true;
    alert("GOAL!");
    location.reload();
  }

  
  arrow.geometry.attributes.position.setXYZ(
    1,
    capybara_1.position.x + arrowDirection.x * arrowLength,
    capybara_1.position.y + arrowDirection.y * arrowLength,
    capybara_1.position.z + arrowDirection.z * arrowLength
  );
  arrow.geometry.attributes.position.needsUpdate = true;


  renderer.render(scene, camera);
}
animate();



function checkPitchCollisions(box) {
  // Check collision with the left edge
  if (box.intersectsBox(leftEdgeBox.box)) {
    // Collision with left edge detected
    alert("left collision");
  }

  // Check collision with the right edge
  if (box.intersectsBox(rightEdgeBox.box)) {
    // Collision with right edge detected
    alert("right collision");
  }

  // Check collision with the top edge
  if (box.intersectsBox(topEdgeBox.box)) {
    // Collision with top edge detected
    alert("top collision");
  }

  // Check collision with the bottom edge
  if (box.intersectsBox(bottomEdgeBox.box)) {
    // Collision with bottom edge detected
    alert("bottom collision");
  }
}
