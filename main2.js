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

// Keyboard input variables
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;

var clickX;
var clickY;
var clickZ;

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
      case 'KeyQ':
        isRobotMoving = false;
        isRobotMoving2 = true;
        break;
        case 'KeyE':
          isRobotMoving = true;
          isRobotMoving2 = false;
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


// Handle mouse events
var mouseDown = false;
var endMouseX = 0;
var endMouseY = 0;
var line;

var moveFrom;
var moveTo;
var velocity;
var readyToMove = false;

document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);

function handleMouseDown(event) {
  mouseDown = true;

  scene.remove(line);

  endMouseX = event.clientX;
  endMouseY = event.clientY;
}

function handleMouseMove(event) {
}

function handleMouseUp(event) {
  mouseDown = false;
  console.log("Not normalized: "+endMouseX+" "+endMouseY);

  // Convert the viewport coordinates to normalized device coordinates (NDC)
  const normalizedX = (endMouseX / window.innerWidth) * 2 - 1;
  const normalizedY = -(endMouseY / window.innerHeight) * 2 + 1;

  // Create a vector with the normalized device coordinates
  const vector = new THREE.Vector3(normalizedX, normalizedY, 0);

  // Use the unproject method to convert the vector from NDC to world space
  vector.unproject(camera);

  // Retrieve the camera's position and direction
  const cameraPosition = camera.position;
  const cameraDirection = vector.sub(cameraPosition).normalize();

  // Calculate the distance along the camera direction to find the 3D position
  const distance = -cameraPosition.y / cameraDirection.y;
  const clickPosition = cameraPosition.clone().add(cameraDirection.multiplyScalar(distance));

  // Use the clickPosition vector to access the x, y, and z coordinates
   clickX = clickPosition.x;
   clickY = clickPosition.y;
   clickZ = clickPosition.z;
  console.log("Normalized: "+clickX+" "+clickY+" "+clickZ);

  createArrow(robot_1, clickX, clickZ);
  if (isRobotMoving){
    scene.add(line);
  }


  moveFrom = new THREE.Vector3(robot_1.position.x, robot_1.position.y, robot_1.position.z);
  moveTo = new THREE.Vector3(clickX, robot_1.position.y, clickZ);
  velocity = 0.1;
  readyToMove = true;
}

function createArrow(object, endPointX, endPointZ) {
  // Create the start and end points for the line
  const startPoint = new THREE.Vector3(object.position.x, object.position.y, object.position.z);
  const endPoint = new THREE.Vector3(endPointX, object.position.y, endPointZ);

  // Create a buffer geometry for the line
  const lineGeometry = new THREE.BufferGeometry().setFromPoints([startPoint, endPoint]);

  // Create a material for the line
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });

  // Create the line using the geometry and material
  line = new THREE.Line(lineGeometry, lineMaterial);

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




camera.position.set(0, 15, 10);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Add smooth damping effect
controls.dampingFactor = 0.05; // Adjust the damping factor (0.05 is the default)
controls.rotateSpeed = 0.5; // Adjust the rotation speed

//Add 3D models
const loader = new GLTFLoader();
var robot_1;
var robot_2;
var football_pitch;
var ball;

//Bounding boxes
var box_robot1;
var box_robot2;
var box_ball;

var bottomEdgeBox;
var topEdgeBox;
var leftEdgeBox;
var rightEdgeBox;

//Accelleration parameters
var accellerationx;
var accellerationz;
var accellerationballx;
var accellerationballz;

//Mesh components robot_1
var torso_1;
var head_1;
var footL_1;
var footR_1;
var shoulderL_1;
var armL_1;
var handL_1;
var shoulderR_1;
var armR_1;
var handR_1;
var legL_1;
var lowerLegL_1;
var legR_1;
var lowerLegR_1;

//Mesh components robot_2
var torso_2;
var head_2;
var footL_2;
var footR_2;
var shoulderL_2;
var armL_2;
var handL_2;
var shoulderR_2;
var armR_2;
var handR_2;
var legL_2;
var lowerLegL_2;
var legR_2;
var lowerLegR_2;


loader.load('robot/RobotExpressive.glb', function (gltf) {
  robot_1 = gltf.scene;
  scene.add(robot_1);

  robot_1.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  robot_1.position.x = -9;
  robot_1.rotation.y = 90 * (Math.PI / 180.0);
  robot_1.scale.set(0.5, 0.5, 0.5);

  torso_1 = robot_1.getObjectByName("Torso");
  head_1 = robot_1.getObjectByName("Head");
  footL_1 = robot_1.getObjectByName("Foot.L");
  footR_1 = robot_1.getObjectByName("Foot.R");
  shoulderL_1 = robot_1.getObjectByName("Shoulder.L");
  armL_1 = robot_1.getObjectByName("UpperArm.L");
  handL_1 = robot_1.getObjectByName("Hand.L");
  shoulderR_1 = robot_1.getObjectByName("Shoulder.R");
  armR_1 = robot_1.getObjectByName("Arm.R");
  handR_1 = robot_1.getObjectByName("Hand.R");
  legL_1 = robot_1.getObjectByName("Leg.L");
  lowerLegL_1 = robot_1.getObjectByName("LowerLeg.L");
  legR_1 = robot_1.getObjectByName("Leg.R");
  lowerLegR_1 = robot_1.getObjectByName("LowerLeg.R");

  //Setup a bounding box around robot_1
  box_robot1 = new THREE.Box3().setFromObject(robot_1);
  const siz_robot1 = box_robot1.getSize(new THREE.Vector3()).length();
  const center_robot1 = box_robot1.getCenter(new THREE.Vector3());

}, undefined, function (error) {
  console.error(error);
});

loader.load('robot/RobotExpressive.glb', function (gltf1) {
  robot_2 = gltf1.scene;
  scene.add(robot_2);

  robot_2.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  robot_2.position.x = 9;
  robot_2.rotation.y = -90 * (Math.PI / 180.0);
  robot_2.scale.set(0.5, 0.5, 0.5);

  torso_2 = robot_2.getObjectByName("Torso");
  head_2 = robot_2.getObjectByName("Head");
  footL_2 = robot_2.getObjectByName("Foot.L");
  footR_2 = robot_2.getObjectByName("Foot.R");
  shoulderL_2 = robot_2.getObjectByName("Shoulder.L");
  armL_2 = robot_2.getObjectByName("Arm.L");
  handL_2 = robot_2.getObjectByName("Hand.L");
  shoulderR_2 = robot_2.getObjectByName("Shoulder.R");
  armR_2 = robot_2.getObjectByName("Arm.R");
  handR_2 = robot_2.getObjectByName("Hand.R");
  legL_2 = robot_2.getObjectByName("Leg.L");
  lowerLegL_2 = robot_2.getObjectByName("LowerLeg.L");
  legR_2 = robot_2.getObjectByName("Leg.R");
  lowerLegR_2 = robot_2.getObjectByName("LowerLeg.R");

  //Setup a bounding box around robot_2
  box_robot2 = new THREE.Box3().setFromObject(robot_2);
  const size_robot2 = box_robot2.getSize(new THREE.Vector3()).length();
  const center_robot2 = box_robot2.getCenter(new THREE.Vector3());

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
var isRobotMoving = true;
var isRobotMoving2 = false;
var done = false;
var increment = 0.05;
var goal = false;

//Render the Scene; basically, anything you want to move or change
//while the app is running has to go through the animate loop.
function animate() {
  requestAnimationFrame(animate);

  // Moving the camera
  if (moveCameraForward) {
    camera.position.z -= 0.5;
  }
  if (moveCameraForward) {
    camera.position.z += 0.5;
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

  //checkPitchCollisions(box_robot1);
  checkPitchCollisions(box_ball);

  if(isRobotMoving2){
    var diff_x = clickX-robot_2.position.x;
    var diff_y = clickZ-robot_2.position.z;

    var j = Math.sqrt((Math.pow(diff_y, 2)) / (Math.pow(diff_x, 2) + Math.pow(diff_y, 2))) * Math.sign(diff_y);
    var k = (diff_x / diff_y) * j;


    if( robot_2.position.x < clickX ){
      robot_2.position.x += k;
      if( robot_2.position.x >= clickX ){
        robot_2.position.x = clickX;
      }
    }
    else if(robot_2.position.x > clickX  ){
      robot_2.position.x += k;
      if( robot_2.position.x <= clickX ){
        robot_2.position.x = clickX;
      }
    }


      if(robot_2.position.z > clickZ  ){
        robot_2.position.z += j;
        if( robot_2.position.z <= clickZ ){
          robot_2.position.z = clickZ;
        }
      }
      else if(  robot_2.position.z < clickZ){
        robot_2.position.z += j;
        if( robot_2.position.z >= clickZ ){
          robot_2.position.z = clickZ;
        }
      }
    box_robot2.setFromObject(robot_2);
  }

  //MOVIMENTO ROBOT1
  if(isRobotMoving){

    var diff_x = clickX-robot_1.position.x;
    var diff_y = clickZ-robot_1.position.z;

    var j = Math.sqrt((Math.pow(diff_y, 2)) / (Math.pow(diff_x, 2) + Math.pow(diff_y, 2))) * Math.sign(diff_y);
    var k = (diff_x / diff_y) * j;


    if( robot_1.position.x < clickX ){
      robot_1.position.x += k;
      if( robot_1.position.x >= clickX ){
        robot_1.position.x = clickX;
      }
    }
    else if(robot_1.position.x > clickX  ){
      robot_1.position.x += k;
      if( robot_1.position.x <= clickX ){
        robot_1.position.x = clickX;
      }
    }


      if(robot_1.position.z > clickZ  ){
        robot_1.position.z += j;
        if( robot_1.position.z <= clickZ ){
          robot_1.position.z = clickZ;
        }
      }
      else if(  robot_1.position.z < clickZ){
        robot_1.position.z += j;
        if( robot_1.position.z >= clickZ ){
          robot_1.position.z = clickZ;
        }
      }
      box_robot1.setFromObject(robot_1);
    }





  // Check if the variable has reached the minimum or maximum value
  /*if (robot_2.position.z >= 3 || robot_2.position.z <= -3) {
    increment *= -1; // Invert the increment direction
  }*/

  // Move the cube based on keyboard input
  if (moveForward) robot_1.position.z -= 0.1;
  if (moveBackward) robot_1.position.z += 0.1;
  if (moveLeft) robot_1.position.x -= 0.1;
  if (moveRight) robot_1.position.x += 0.1;


  if(isMoving){
    ball.position.x += 0.1;
    ball.rotation.z -= 0.2;
    box_ball.setFromObject(ball);
  }

  //Update the bounding boxes
  if(moveForward||moveBackward||moveLeft||moveRight) box_robot1.setFromObject(robot_1);

  // Check for collisions
  if (box_robot1.intersectsBox(box_ball)) {
    // Collision detected, stop or modify the object's movement
    isMoving = true;
  }

  if (box_ball.intersectsBox(box_robot2)) {
    // Collision detected, stop or modify the object's movement
    isMoving = false;
    isRobotMoving = false;
    //box_ball.setFromObject(ball);
  }

  if(ball.position.x >= 10 && !goal){
    goal = true;
    alert("GOAL!");
    location.reload();
  }


  if(readyToMove){
    /*Implementare una funzione che faccia ruotare il
    robot sulla direzione della linea, e poi lo faccia spostare
    su quella direzione con una velocità proporzionale alla
    lunghezza della linea*/
    readyToMove = false;
  }

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
