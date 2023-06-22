import * as THREE from 'three';

//Import GLTFLoader
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//Import orbit controls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//Import tween.js for smooth animation
import * as TWEEN from '@tweenjs/tween.js'

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
      clickX = 0;
      clickZ = 0;
      scene.remove(line);
      isRobotMoving = false;
      isRobotMoving2 = true;
      break;
    case 'KeyE':
      clickX = 0;
      clickZ = 0;
      scene.remove(line);
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

  if(isRobotMoving){
    createArrow(robot_1, clickX, clickZ);

    scene.add(line);

    moveFrom = new THREE.Vector3(robot_1.position.x, robot_1.position.y, robot_1.position.z);
    moveTo = new THREE.Vector3(clickX, robot_1.position.y, clickZ);
    velocity = 0.1;
  }

  if(isRobotMoving2){
    createArrow(robot_2, clickX, clickZ);

    scene.add(line);

    moveFrom = new THREE.Vector3(robot_2.position.x, robot_2.position.y, robot_2.position.z);
    moveTo = new THREE.Vector3(clickX, robot_2.position.y, clickZ);
    velocity = 0.1;
  }

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
var robot_3;
var robot_4;
var robot_5;
var robot_6;
var football_pitch;
var ball;


//Bounding boxes
var box_robot1;
var box_robot2;
var box_robot3;
var box_robot4;
var box_robot5;
var box_robot6;
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
var neck_1;
var head_1;
var left_shoulder_1;
var left_arm_1;
var left_fore_arm_1;
var left_hand_1;
var right_shoulder_1;
var right_arm_1;
var right_fore_arm_1;
var right_hand_1;
var left_up_leg_1;
var left_leg_1;
var left_foot_1;
var right_up_leg_1;
var right_leg_1;
var right_foot_1;

//Mesh components robot_2


//Mesh components robot_3


//Mesh components robot_4


//Mesh components robot_5


//Mesh components robot_6



//sinistra in basso
loader.load('models/blueBot/blueBot.gltf', function (gltf) {
  robot_1 = gltf.scene;
  scene.add(robot_1);

  robot_1.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  robot_1.position.x = -5;
  robot_1.position.z = 3;
  robot_1.rotation.y = 90 * (Math.PI / 180.0);
  robot_1.scale.set(1.7, 1.7, 1.7);

  neck_1 = robot_1.getObjectByName('mixamorigNeck');
  head_1 = robot_1.getObjectByName('mixamorigHead');
  // LEFT ARM
  left_shoulder_1 = robot_1.getObjectByName('mixamorigLeftShoulder');
  left_arm_1 = robot_1.getObjectByName('mixamorigLeftArm');
  left_fore_arm_1 = robot_1.getObjectByName('mixamorigLeftForeArm');
  left_hand_1 = robot_1.getObjectByName('mixamorigLeftHand');
  // RIGHT ARM
  right_shoulder_1 = robot_1.getObjectByName('mixamorigRightShoulder');
  right_arm_1 = robot_1.getObjectByName('mixamorigRightArm');
  right_fore_arm_1 = robot_1.getObjectByName('mixamorigRightForeArm');
  right_hand_1 = robot_1.getObjectByName('mixamorigRightHand');
  // LEFT LEG
  left_up_leg_1 = robot_1.getObjectByName('mixamorigLeftUpLeg');
  left_leg_1 = robot_1.getObjectByName('mixamorigLeftLeg');
  left_foot_1 = robot_1.getObjectByName('mixamorigLeftFoot');
  // RIGHT LEG
  right_up_leg_1 = robot_1.getObjectByName('mixamorigRightUpLeg');
  right_leg_1 = robot_1.getObjectByName('mixamorigRightLeg');
  right_foot_1 = robot_1.getObjectByName('mixamorigRightFoot');


  //Setup a bounding box around robot_1
  box_robot1 = new THREE.Box3().setFromObject(robot_1);
  const siz_robot1 = box_robot1.getSize(new THREE.Vector3()).length();
  const center_robot1 = box_robot1.getCenter(new THREE.Vector3());

}, undefined, function (error) {
  console.error(error);
});

//sinistra in alto
loader.load('models/blueBot/blueBot.gltf', function (gltf1) {
  robot_2 = gltf1.scene;
  scene.add(robot_2);

  robot_2.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  robot_2.position.x = -5;
  robot_2.position.z = -3;
  robot_2.rotation.y = 90 * (Math.PI / 180.0);
  robot_2.scale.set(1.7, 1.7, 1.7);

  //Setup a bounding box around robot_2
  box_robot2 = new THREE.Box3().setFromObject(robot_2);
  const size_robot2 = box_robot2.getSize(new THREE.Vector3()).length();
  const center_robot2 = box_robot2.getCenter(new THREE.Vector3());

}, undefined, function (error) {
  console.error(error);
});

//destra in alto
loader.load('models/redBot/redBot.gltf', function (gltf2) {
  robot_3 = gltf2.scene;
  scene.add(robot_3);

  robot_3.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  robot_3.position.x = 5;
  robot_3.position.z = -3;
  robot_3.rotation.y = -90 * (Math.PI / 180.0);
  robot_3.scale.set(1.7, 1.7, 1.7);

  //Setup a bounding box around robot_3
  box_robot3 = new THREE.Box3().setFromObject(robot_3);
  const size_robot3 = box_robot3.getSize(new THREE.Vector3()).length();
  const center_robot3 = box_robot3.getCenter(new THREE.Vector3());

}, undefined, function (error) {
  console.error(error);
});

//destra in basso
loader.load('models/redBot/redBot.gltf', function (gltf3) {
  robot_4 = gltf3.scene;
  scene.add(robot_4);

  robot_4.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  robot_4.position.x = 5;
  robot_4.position.z = 3;
  robot_4.rotation.y = -90 * (Math.PI / 180.0);
  robot_4.scale.set(1.7, 1.7, 1.7);

  //Setup a bounding box around robot_4
  box_robot4 = new THREE.Box3().setFromObject(robot_4);
  const size_robot4 = box_robot4.getSize(new THREE.Vector3()).length();
  const center_robot4 = box_robot4.getCenter(new THREE.Vector3());

}, undefined, function (error) {
  console.error(error);
});

//sinistra al centro
loader.load('models/blueBot/blueBot.gltf', function (gltf4) {
  robot_5 = gltf4.scene;
  scene.add(robot_5);

  robot_5.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  robot_5.position.x = -9;
  robot_5.rotation.y = 90 * (Math.PI / 180.0);
  robot_5.scale.set(1.7, 1.7, 1.7);

  //Setup a bounding box around robot_5
  box_robot5 = new THREE.Box3().setFromObject(robot_5);
  const size_robot5 = box_robot5.getSize(new THREE.Vector3()).length();
  const center_robot5 = box_robot5.getCenter(new THREE.Vector3());

}, undefined, function (error) {
  console.error(error);
});

//destra al centro
loader.load('models/redBot/redBot.gltf', function (gltf5) {
  robot_6 = gltf5.scene;
  scene.add(robot_6);

  robot_6.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  robot_6.position.x = 9;
  robot_6.rotation.y = -90 * (Math.PI / 180.0);
  robot_6.scale.set(1.7, 1.7, 1.7);

  //Setup a bounding box around robot_6
  box_robot6 = new THREE.Box3().setFromObject(robot_6);
  const size_robot6 = box_robot6.getSize(new THREE.Vector3()).length();
  const center_robot6 = box_robot6.getCenter(new THREE.Vector3());

}, undefined, function (error) {
  console.error(error);
});


loader.load('models/football_pitch/scene.gltf', function (gltf6) {
  football_pitch = gltf6.scene;
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

loader.load('models/football_ball/scene.gltf', function (gltf7) {
  ball = gltf7.scene;
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

  checkPitchCollisions(box_robot1);
  //checkPitchCollisions(box_ball);

  animation();

  if(isRobotMoving2){
    moveRobot(robot_2, box_robot2);
  }

  if(isRobotMoving){
    moveRobot(robot_1, box_robot1);
  }


  /*// Check if the variable has reached the minimum or maximum value
  if (robot_2.position.z >= 3 || robot_2.position.z <= -3) {
    increment *= -1; // Invert the increment direction
  }*/

  // Move the cube based on keyboard input
  if (moveForward) robot_1.position.z -= 0.1;
  if (moveBackward) robot_1.position.z += 0.1;
  if (moveLeft) robot_1.position.x -= 0.1;
  if (moveRight) robot_1.position.x += 0.1;


  if(isMoving){
    ball.position.x += 0.1;
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
  }

  if(ball.position.x >= 10 && !goal){
    goal = true;
    alert("GOAL!");
    location.reload();
  }

  TWEEN.update();


  renderer.render(scene, camera);
}

animate();




function moveRobot(object, box_object){
  if(clickX != 0 && clickZ != 0){
    var diff_x = clickX-object.position.x;
    var diff_y = clickZ-object.position.z;

    //console.log(diff_x+" "+diff_y+" "+clickX+" "+clickZ+" "+object.position.x+" "+object.position.z);

    var j = Math.sqrt((Math.pow(diff_y, 2)) / (Math.pow(diff_x, 2) + Math.pow(diff_y, 2))) * Math.sign(diff_y);
    var k = (diff_x / diff_y) * j;


    if( object.position.x < clickX ){
      object.position.x += k;
      if( object.position.x >= clickX ){
        object.position.x = clickX;
      }
    }else if(object.position.x > clickX  ){
      object.position.x += k;
      if( object.position.x <= clickX ){
        object.position.x = clickX;
      }
    }

    if(object.position.z > clickZ  ){
      object.position.z += j;
      if( object.position.z <= clickZ ){
        object.position.z = clickZ;
      }
    }else if(  object.position.z < clickZ){
      object.position.z += j;
      if( object.position.z >= clickZ ){
        object.position.z = clickZ;
      }
    }

    box_object.setFromObject(object);
  }
}


function animation(){
  //var tween = new TWEEN.Tween(ball.position).to({x: 100, y: 100, z: 100}, 3000).start();
}




function checkPitchCollisions(box_object) {
  // Check collision with the left edge
  if (box_object.intersectsBox(leftEdgeBox.box)) {
    // Collision with left edge detected
    alert("left collision");
  }

  // Check collision with the right edge
  if (box_object.intersectsBox(rightEdgeBox.box)) {
    // Collision with right edge detected
    alert("right collision");
  }

  // Check collision with the top edge
  if (box_object.intersectsBox(topEdgeBox.box)) {
    // Collision with top edge detected
    alert("top collision");
  }

  // Check collision with the bottom edge
  if (box_object.intersectsBox(bottomEdgeBox.box)) {
    // Collision with bottom edge detected
    alert("bottom collision");
  }
}
