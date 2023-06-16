import * as THREE from 'three';

//Import GLTFLoader
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//Import orbit controls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//Setup the scene
const scene = new THREE.Scene();


// Keyboard input variables
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

// Handle keyboard events
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
// Handle key down events
function handleKeyDown(event) {
  if (event.key === 'ArrowUp' || event.key === 'w') {
    moveForward = true;
  } else if (event.key === 'ArrowDown' || event.key === 's') {
    moveBackward = true;
  } else if (event.key === 'ArrowLeft' || event.key === 'a') {
    moveLeft = true;
  } else if (event.key === 'ArrowRight' || event.key === 'd') {
    moveRight = true;
  }
}

// Handle key up events
function handleKeyUp(event) {
  if (event.key === 'ArrowUp' || event.key === 'w') {
    moveForward = false;
  } else if (event.key === 'ArrowDown' || event.key === 's') {
    moveBackward = false;
  } else if (event.key === 'ArrowLeft' || event.key === 'a') {
    moveLeft = false;
  } else if (event.key === 'ArrowRight' || event.key === 'd') {
    moveRight = false;
  }
}

//Add skybox from one image
/*const t_loader = new THREE.TextureLoader();
const texture = t_loader.load(
    'path_to_image',
    () => {
        const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
        rt.fromEquirectangularTexture(renderer, texture);
        scene.background = rt.texture;

        //adding fog
        scene.fog = new THREE.FogExp2(0xffe2c6, 0.002);
        var postFolder = gui.addFolder("Fog")
        postFolder.open()
        postFolder.add(scene.fog, "density", 0, 0.01, 0.0001)
    });*/
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
    "lightIntensity": 2,
    "distance": 100,
}

var ambient = new THREE.AmbientLight(lightProps.ambientColor, lightProps.ambientIntensity)
scene.add(ambient)

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




const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;

renderer.setSize(window.innerWidth, window.innerHeight);











camera.position.x = 15;
camera.position.y = 15;
camera.position.z = 15;

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

loader.load('capybara_low_poly/scene.gltf', function (gltf) {
  capybara_1 = gltf.scene;
  scene.add(capybara_1);

  capybara_1.position.x = -9;
  capybara_1.rotation.y = 90 * (Math.PI / 180.0);
  capybara_1.scale.set(2, 2, 2);

  //Setup a bounding box around capybara_1
  box_capy1 = new THREE.Box3().setFromObject(capybara_1);
  const siz_capy1 = box_capy1.getSize(new THREE.Vector3()).length();
  const center_capy1 = box_capy1.getCenter(new THREE.Vector3());

}, undefined, function (error) {
  console.error(error);
});

loader.load('capybara_low_poly/scene.gltf', function (gltf1) {
  capybara_2 = gltf1.scene;
  scene.add(capybara_2);

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

  football_pitch.position.y = -0.05;

}, undefined, function (error) {
  console.error(error);
});

loader.load('ball/scene.gltf', function (gltf3) {
  ball = gltf3.scene;
  scene.add(ball);

  ball.position.x = -0.5;
  ball.position.y = 0.15;
  ball.position.z = -0.2;
  ball.scale.set(0.5, 0.5, 0.5);

  //Setup a bounding box around capybara_1
  box_ball = new THREE.Box3().setFromObject(ball);
  const size_ball = box_ball.getSize(new THREE.Vector3()).length();
  const center_ball = box_ball.getCenter(new THREE.Vector3());

}, undefined, function (error) {
  console.error(error);
});




/*
//Creating an anchor point
var anchorProps = {
    size: 1,
    height: 0.05,
    points: [
        new THREE.Vector3(9.5, 0, 10.7),
        new THREE.Vector3(2.1, 0, 14.4),
        new THREE.Vector3(-2.3, 0, 9.5),
        new THREE.Vector3(-13.5, 0, 9.9),
        new THREE.Vector3(13.8, 0, -0.9),
        new THREE.Vector3(-14.7, 0, -1.1),
        new THREE.Vector3(9.4, 0, -13.8),
        new THREE.Vector3(-0.9, 0, -15.8),
        new THREE.Vector3(-9.2, 0, -10.5),
    ],
    lastAnchorChoice: -1,
}

var anchorBox3, anchorBoxHelper;
var anchorSolid;
{
    var anchorGeometry = new THREE.BoxGeometry(anchorProps.size, anchorProps.height, anchorProps.size);
    var anchorMaterial = new THREE.MeshBasicMaterial({
        color: "#ffffff"
    })
    anchorSolid = new THREE.Mesh(anchorGeometry, anchorMaterial);
    anchorSolid.position.y = -10;
    scene.add(anchorSolid);

    anchorBox3 = new THREE.Box3().setFromObject(anchorSolid);

}*/

var isMoving = false;
var isCapyMoving = true;
var increment = 0.05;

//Render the Scene; basically, anything you want to move or change
//while the app is running has to go through the animate loop.
function animate() {
  requestAnimationFrame(animate);

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

  renderer.render(scene, camera);
}
animate();
