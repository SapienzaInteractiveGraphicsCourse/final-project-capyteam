import * as THREE from 'three';

//Import GLTFLoader
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//Import orbit controls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//Import tween.js for smooth animation
import * as TWEEN from '@tweenjs/tween.js';

import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

// Get references to the menu elements
const menu = document.getElementById('menu');
const startButton = document.getElementById('startButton');
const instructionsButton = document.getElementById('instructionsButton');
const modelsButton = document.getElementById('modelsButton');
const instructionsContainer = document.getElementById('instructionsContainer');

// Add event listeners to the buttons
startButton.addEventListener('click', startGame);
instructionsButton.addEventListener('click', showInstructions);
modelsButton.addEventListener('click', showModels);



//Function to show the 3D models
function showModels() {
  // Hide the menu and start the game
  menu.style.display = 'none';

  //Setup the scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );


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
  /*
  //Add 3D models
  const loader = new GLTFLoader();

  loader.load('models/blueBot/blueBot.gltf', function (gltf) {
    gltf.scene;
    scene.add(gltf.scene);
  }, undefined, function (error) {
    console.error(error);
  });*/

  // Create the text geometry
  const fontLoader = new FontLoader();

  // Load the font file
  fontLoader.load('fonts/optimer_regular.typeface.json', function (font) {
    const textGeometry = new TextGeometry('Hello, 3D World!', {
      font: font,
      size: 80,
      height: 5,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 10,
      bevelSize: 8,
      bevelOffset: 0,
      bevelSegments: 5
    });

    const textMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);

    scene.add(textMesh);
  });

  camera.position.z = 5;

  // Create OrbitControls and attach them to the camera
  const controls = new OrbitControls(camera, renderer.domElement);

  function animate() {
	   requestAnimationFrame( animate );
     controls.update();
	   renderer.render( scene, camera );
  }
  animate();
}

// Function to start the game
function startGame() {
  // Hide the menu and start the game
  menu.style.display = 'none';

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

  var clickX = 0;
  var clickY = 0;
  var clickZ = 0;
  var mouseX = 0;
  var mouseY = 0;
  var mouseZ = 0;


  var endgame = false;

  var thisrobot = 0;

  var k,j;
  var ballvx = 0;
  var ballvy = 0;
  // TIMES
  var times = 0;
  var circle;
  var turn =1;
  //BALL
  var normball = 0;
  var normball2 = 0;

  var cameraX = 0;
  var cameraY = 15;
  var cameraZ = 10;
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
        if ( turn == 1){
          if(thisrobot ==0){
            scene.remove(circle);
            createCircle(robot_5);
            thisrobot=4;
          }
          else if(thisrobot ==1){
            scene.remove(circle);
            createCircle(robot_1);
            thisrobot=0;
          }
          else if(thisrobot ==4){
            scene.remove(circle);
            createCircle(robot_2);
            thisrobot=1;
          }
        }else if(turn ==2 ){
          if(thisrobot ==2){
            scene.remove(circle);
            createCircle(robot_6);
            thisrobot=5;
          }
          else if(thisrobot ==3){
            scene.remove(circle);
            createCircle(robot_3);
            thisrobot=2;
          }
          else if(thisrobot ==5){
            scene.remove(circle);
            createCircle(robot_4);
            thisrobot=3;
          }
        }
        setThisRobot(thisrobot);
        break;
      case 'KeyE':
        clickX = 0;
        clickZ = 0;
        scene.remove(line);
        if ( turn == 1){
          if(thisrobot ==4){
            scene.remove(circle);
            createCircle(robot_1);
            thisrobot=0;
          }
          else if(thisrobot ==0){
            scene.remove(circle);
            createCircle(robot_2);
            thisrobot=1;
          }
          else if(thisrobot ==1){
            scene.remove(circle);
            createCircle(robot_5);
            thisrobot=4;
          }
        }else if(turn ==2 ){
          if(thisrobot ==5){
            scene.remove(circle);
            createCircle(robot_3);
            thisrobot=2;
          }
          else if(thisrobot ==2){
            scene.remove(circle);
            createCircle(robot_4);
            thisrobot=3;
          }
          else if(thisrobot ==3){
            scene.remove(circle);
            createCircle(robot_6);
            thisrobot=5;
          }

        }
        setThisRobot(thisrobot);
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
    
    const normalizedX = (event.clientX / window.innerWidth) * 2 - 1;
    const normalizedY = -(event.clientY / window.innerHeight) * 2 + 1;
    
    const vector = new THREE.Vector3(normalizedX, normalizedY, 0);

    //Use the unproject method to convert the vector from NDC to world space
    vector.unproject(camera);

    //Retrieve the camera's position and direction
    const cameraPosition = camera.position;
    const cameraDirection = vector.sub(cameraPosition).normalize();

    //Calculate the distance along the camera direction to find the 3D position
    const mousedistance = -cameraPosition.y / cameraDirection.y;
    const mousePosition = cameraPosition.clone().add(cameraDirection.multiplyScalar(mousedistance))
    mouseX = mousePosition.x;
    mouseY = mousePosition.y;
    mouseZ = mousePosition.z;
    console.log("thisrobot"+thisrobot);
  
    if(thisrobot == 0){
      scene.remove(line);
      createArrow(robot_1, mouseX, mouseZ);
      scene.add(line);
    }
    if(thisrobot == 1){
      scene.remove(line);
      createArrow(robot_2, mouseX, mouseZ);
      scene.add(line);
    }
    if(thisrobot == 2){
      scene.remove(line);
      createArrow(robot_3, mouseX, mouseZ);
      scene.add(line);
    }
    if(thisrobot == 3){
      scene.remove(line);
      createArrow(robot_4, mouseX, mouseZ);
      scene.add(line);
    }
    if(thisrobot == 4){
      scene.remove(line);
      createArrow(robot_5, mouseX, mouseZ);
      scene.add(line);
    }
    if(thisrobot == 5){
      scene.remove(line);
      createArrow(robot_6, mouseX, mouseZ);
      scene.add(line);
    }
    
  }

  function handleMouseUp(event) {
    mouseDown = false;
    // console.log("Not normalized: "+endMouseX+" "+endMouseY);

    //Convert the viewport coordinates to normalized device coordinates (NDC)
    const normalizedX = (endMouseX / window.innerWidth) * 2 - 1;
    const normalizedY = -(endMouseY / window.innerHeight) * 2 + 1;

    //Create a vector with the normalized device coordinates
    const vector = new THREE.Vector3(normalizedX, normalizedY, 0);

    //Use the unproject method to convert the vector from NDC to world space
    vector.unproject(camera);

    //Retrieve the camera's position and direction
    const cameraPosition = camera.position;
    const cameraDirection = vector.sub(cameraPosition).normalize();

    //Calculate the distance along the camera direction to find the 3D position
    const distance = -cameraPosition.y / cameraDirection.y;
    const clickPosition = cameraPosition.clone().add(cameraDirection.multiplyScalar(distance));

    //Use the clickPosition vector to access the x, y, and z coordinates
    clickX = clickPosition.x;
    clickY = clickPosition.y;
    clickZ = clickPosition.z;
    //console.log("Normalized: "+clickX+" "+clickY+" "+clickZ);

    if(isRobotMoving && !endgame){
      scene.remove(circle);
      //createArrow(robot_1, clickX, clickZ);
      //createCircle(robot_1);

      scene.add(line);

      moveFrom = new THREE.Vector3(robot_1.position.x, robot_1.position.y, robot_1.position.z);
      moveTo = new THREE.Vector3(clickX, robot_1.position.y, clickZ);
      velocity = 0.1;
    }

    if(isRobotMoving2 && !endgame){
      scene.remove(circle);
      //createArrow(robot_2, clickX, clickZ);
      //createCircle(robot_2);

      scene.add(line);

      moveFrom = new THREE.Vector3(robot_2.position.x, robot_2.position.y, robot_2.position.z);
      moveTo = new THREE.Vector3(clickX, robot_2.position.y, clickZ);
      velocity = 0.1;
    }
    if(isRobotMoving3 && !endgame){
      scene.remove(circle);
      //createArrow(robot_3, clickX, clickZ);
      //createCircle(robot_3);

      scene.add(line);

      moveFrom = new THREE.Vector3(robot_3.position.x, robot_3.position.y, robot_3.position.z);
      moveTo = new THREE.Vector3(clickX, robot_3.position.y, clickZ);
      velocity = 0.1;
    }
    if(isRobotMoving4 && !endgame){
      scene.remove(circle);
      //createArrow(robot_4, clickX, clickZ);
      //createCircle(robot_4);

      scene.add(line);

      moveFrom = new THREE.Vector3(robot_4.position.x, robot_4.position.y, robot_4.position.z);
      moveTo = new THREE.Vector3(clickX, robot_4.position.y, clickZ);
      velocity = 0.1;
    }
    if(isRobotMoving5 && !endgame){
      scene.remove(circle);
      //createArrow(robot_5, clickX, clickZ);
      //createCircle(robot_5);

      scene.add(line);

      moveFrom = new THREE.Vector3(robot_5.position.x, robot_5.position.y, robot_5.position.z);
      moveTo = new THREE.Vector3(clickX, robot_5.position.y, clickZ);
      velocity = 0.1;
    }
    if(isRobotMoving6 && !endgame){
      scene.remove(circle);
      //createArrow(robot_6, clickX, clickZ);
      //createCircle(robot_6);

      scene.add(line);

      moveFrom = new THREE.Vector3(robot_6.position.x, robot_6.position.y, robot_6.position.z);
      moveTo = new THREE.Vector3(clickX, robot_6.position.y, clickZ);
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

  function createCircle(object) {
    const circleGeometry = new THREE.CircleGeometry(0.5, 32);
    var circleMaterial;
    if(turn == 1){
      circleMaterial = new THREE.MeshBasicMaterial({
        color: 0x00008B ,
        side: THREE.DoubleSide,
        wireframe: false,
        //linewidth: 5
      });
    }
    if(turn == 2){
      circleMaterial = new THREE.MeshBasicMaterial({
        color: 0x8B0000 ,
        side: THREE.DoubleSide,
        wireframe: false,
        //linewidth: 5
      });
    }

    circle = new THREE.Mesh(circleGeometry, circleMaterial);

    circle.position.copy(object.position);
    circle.position.x += 0.1;

    circle.rotation.x = Math.PI * 0.5;

    // Imposta il materiale per renderlo opaco e senza bordi visibili
    circleMaterial.transparent = false;
    circleMaterial.opacity = 1;

    scene.add(circle);
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

  //ROBOT BLU SOTTO
  var robot_1;
  //ROBOT BLU SOPRA
  var robot_2;
  //ROBOT ROSA SOPRA
  var robot_3;
  //ROBOT ROSA SOTTO
  var robot_4;
  //ROBOT BLU CENTRO
  var robot_5;
  //ROBOT ROSA CENTRO
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
  var spine_1;
  var spine1_1;
  var spine2_1;
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
  var spine_2;
  var spine1_2;
  var spine2_2;
  var neck_2;
  var head_2;
  var left_shoulder_2;
  var left_arm_2;
  var left_fore_arm_2;
  var left_hand_2;
  var right_shoulder_2;
  var right_arm_2;
  var right_fore_arm_2;
  var right_hand_2;
  var left_up_leg_2;
  var left_leg_2;
  var left_foot_2;
  var right_up_leg_2;
  var right_leg_2;
  var right_foot_2;

  //Mesh components robot_3
  var spine_3;
  var spine1_3;
  var spine2_3;
  var neck_3;
  var head_3;
  var left_shoulder_3;
  var left_arm_3;
  var left_fore_arm_3;
  var left_hand_3;
  var right_shoulder_3;
  var right_arm_3;
  var right_fore_arm_3;
  var right_hand_3;
  var left_up_leg_3;
  var left_leg_3;
  var left_foot_3;
  var right_up_leg_3;
  var right_leg_3;
  var right_foot_3;

  //Mesh components robot_4
  var spine_4;
  var spine1_4;
  var spine2_4;
  var neck_4;
  var head_4;
  var left_shoulder_4;
  var left_arm_4;
  var left_fore_arm_4;
  var left_hand_4;
  var right_shoulder_4;
  var right_arm_4;
  var right_fore_arm_4;
  var right_hand_4;
  var left_up_leg_4;
  var left_leg_4;
  var left_foot_4;
  var right_up_leg_4;
  var right_leg_4;
  var right_foot_4;

  //Mesh components robot_5
  var spine_5;
  var spine1_5;
  var spine2_5;
  var neck_5;
  var head_5;
  var left_shoulder_5;
  var left_arm_5;
  var left_fore_arm_5;
  var left_hand_5;
  var right_shoulder_5;
  var right_arm_5;
  var right_fore_arm_5;
  var right_hand_5;
  var left_up_leg_5;
  var left_leg_5;
  var left_foot_5;
  var right_up_leg_5;
  var right_leg_5;
  var right_foot_5;

  //Mesh components robot_6
  var spine_6;
  var spine1_6;
  var spine2_6;
  var neck_6;
  var head_6;
  var left_shoulder_6;
  var left_arm_6;
  var left_fore_arm_6;
  var left_hand_6;
  var right_shoulder_6;
  var right_arm_6;
  var right_fore_arm_6;
  var right_hand_6;
  var left_up_leg_6;
  var left_leg_6;
  var left_foot_6;
  var right_up_leg_6;
  var right_leg_6;
  var right_foot_6;


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
    robot_1.position.y = 0;
    robot_1.position.z = 3;
    robot_1.rotation.y = 90 * (Math.PI / 180.0);
    robot_1.scale.set(1.7, 1.7, 1.7);

    //SPINE
    spine_1 = robot_1.getObjectByName('mixamorigSpine');
    spine1_1 = robot_1.getObjectByName('mixamorigSpine1');
    spine2_1 = robot_1.getObjectByName('mixamorigSpine2');
    //NECK AND HEAD
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

    left_arm_1.rotation.z = Math.PI * -0.35;
    right_arm_1.rotation.z = Math.PI * 0.35;

    //Setup a bounding box around robot_1
    box_robot1 = new THREE.Box3().setFromObject(robot_1);
    const siz_robot1 = box_robot1.getSize(new THREE.Vector3()).length();
    const center_robot1 = box_robot1.getCenter(new THREE.Vector3());
    createCircle(robot_1);

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
    robot_2.position.y = 0;
    robot_2.position.z = -3;
    robot_2.rotation.y = 90 * (Math.PI / 180.0);
    robot_2.scale.set(1.7, 1.7, 1.7);

    //SPINE
    spine_2 = robot_2.getObjectByName('mixamorigSpine');
    spine1_2 = robot_2.getObjectByName('mixamorigSpine1');
    spine2_2 = robot_2.getObjectByName('mixamorigSpine2');
    //NECK AND HEAD
    neck_2 = robot_2.getObjectByName('mixamorigNeck');
    head_2 = robot_2.getObjectByName('mixamorigHead');
    // LEFT ARM
    left_shoulder_2 = robot_2.getObjectByName('mixamorigLeftShoulder');
    left_arm_2 = robot_2.getObjectByName('mixamorigLeftArm');
    left_fore_arm_2 = robot_2.getObjectByName('mixamorigLeftForeArm');
    left_hand_2 = robot_2.getObjectByName('mixamorigLeftHand');
    // RIGHT ARM
    right_shoulder_2 = robot_2.getObjectByName('mixamorigRightShoulder');
    right_arm_2 = robot_2.getObjectByName('mixamorigRightArm');
    right_fore_arm_2 = robot_2.getObjectByName('mixamorigRightForeArm');
    right_hand_2 = robot_2.getObjectByName('mixamorigRightHand');
    // LEFT LEG
    left_up_leg_2 = robot_2.getObjectByName('mixamorigLeftUpLeg');
    left_leg_2 = robot_2.getObjectByName('mixamorigLeftLeg');
    left_foot_2 = robot_2.getObjectByName('mixamorigLeftFoot');
    // RIGHT LEG
    right_up_leg_2 = robot_2.getObjectByName('mixamorigRightUpLeg');
    right_leg_2 = robot_2.getObjectByName('mixamorigRightLeg');
    right_foot_2 = robot_2.getObjectByName('mixamorigRightFoot');

    left_arm_2.rotation.z = Math.PI * -0.35;
    right_arm_2.rotation.z = Math.PI * 0.35;

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
    robot_3.position.y = 0;
    robot_3.position.z = -3;
    robot_3.rotation.y = -90 * (Math.PI / 180.0);
    robot_3.scale.set(1.7, 1.7, 1.7);

    //SPINE
    spine_3 = robot_3.getObjectByName('mixamorigSpine');
    spine1_3 = robot_3.getObjectByName('mixamorigSpine1');
    spine2_3 = robot_3.getObjectByName('mixamorigSpine2');
    //NECK AND HEAD
    neck_3 = robot_3.getObjectByName('mixamorigNeck');
    head_3 = robot_3.getObjectByName('mixamorigHead');
    // LEFT ARM
    left_shoulder_3 = robot_3.getObjectByName('mixamorigLeftShoulder');
    left_arm_3 = robot_3.getObjectByName('mixamorigLeftArm');
    left_fore_arm_3 = robot_3.getObjectByName('mixamorigLeftForeArm');
    left_hand_3 = robot_3.getObjectByName('mixamorigLeftHand');
    // RIGHT ARM
    right_shoulder_3 = robot_3.getObjectByName('mixamorigRightShoulder');
    right_arm_3 = robot_3.getObjectByName('mixamorigRightArm');
    right_fore_arm_3 = robot_3.getObjectByName('mixamorigRightForeArm');
    right_hand_3 = robot_3.getObjectByName('mixamorigRightHand');
    // LEFT LEG
    left_up_leg_3 = robot_3.getObjectByName('mixamorigLeftUpLeg');
    left_leg_3 = robot_3.getObjectByName('mixamorigLeftLeg');
    left_foot_3 = robot_3.getObjectByName('mixamorigLeftFoot');
    // RIGHT LEG
    right_up_leg_3 = robot_3.getObjectByName('mixamorigRightUpLeg');
    right_leg_3 = robot_3.getObjectByName('mixamorigRightLeg');
    right_foot_3 = robot_3.getObjectByName('mixamorigRightFoot');

    left_arm_3.rotation.z = Math.PI * -0.35;
    right_arm_3.rotation.z = Math.PI * 0.35;

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
    robot_4.position.y = 0;
    robot_4.position.z = 3;
    robot_4.rotation.y = -90 * (Math.PI / 180.0);
    robot_4.scale.set(1.7, 1.7, 1.7);

    //SPINE
    spine_4 = robot_4.getObjectByName('mixamorigSpine');
    spine1_4 = robot_4.getObjectByName('mixamorigSpine1');
    spine2_4 = robot_4.getObjectByName('mixamorigSpine2');
    //NECK AND HEAD
    neck_4 = robot_4.getObjectByName('mixamorigNeck');
    head_4 = robot_4.getObjectByName('mixamorigHead');
    // LEFT ARM
    left_shoulder_4 = robot_4.getObjectByName('mixamorigLeftShoulder');
    left_arm_4 = robot_4.getObjectByName('mixamorigLeftArm');
    left_fore_arm_4 = robot_4.getObjectByName('mixamorigLeftForeArm');
    left_hand_4 = robot_4.getObjectByName('mixamorigLeftHand');
    // RIGHT ARM
    right_shoulder_4 = robot_4.getObjectByName('mixamorigRightShoulder');
    right_arm_4 = robot_4.getObjectByName('mixamorigRightArm');
    right_fore_arm_4 = robot_4.getObjectByName('mixamorigRightForeArm');
    right_hand_4 = robot_4.getObjectByName('mixamorigRightHand');
    // LEFT LEG
    left_up_leg_4 = robot_4.getObjectByName('mixamorigLeftUpLeg');
    left_leg_4 = robot_4.getObjectByName('mixamorigLeftLeg');
    left_foot_4 = robot_4.getObjectByName('mixamorigLeftFoot');
    // RIGHT LEG
    right_up_leg_4 = robot_4.getObjectByName('mixamorigRightUpLeg');
    right_leg_4 = robot_4.getObjectByName('mixamorigRightLeg');
    right_foot_4 = robot_4.getObjectByName('mixamorigRightFoot');

    left_arm_4.rotation.z = Math.PI * -0.35;
    right_arm_4.rotation.z = Math.PI * 0.35;

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
    robot_5.position.y = 0;
    robot_5.position.z = 0;
    robot_5.rotation.y = 90 * (Math.PI / 180.0);
    robot_5.scale.set(1.7, 1.7, 1.7);

    //SPINE
    spine_5 = robot_5.getObjectByName('mixamorigSpine');
    spine1_5 = robot_5.getObjectByName('mixamorigSpine1');
    spine2_5 = robot_5.getObjectByName('mixamorigSpine2');
    //NECK AND HEAD
    neck_5 = robot_5.getObjectByName('mixamorigNeck');
    head_5 = robot_5.getObjectByName('mixamorigHead');
    // LEFT ARM
    left_shoulder_5 = robot_5.getObjectByName('mixamorigLeftShoulder');
    left_arm_5 = robot_5.getObjectByName('mixamorigLeftArm');
    left_fore_arm_5 = robot_5.getObjectByName('mixamorigLeftForeArm');
    left_hand_5 = robot_5.getObjectByName('mixamorigLeftHand');
    // RIGHT ARM
    right_shoulder_5 = robot_5.getObjectByName('mixamorigRightShoulder');
    right_arm_5 = robot_5.getObjectByName('mixamorigRightArm');
    right_fore_arm_5 = robot_5.getObjectByName('mixamorigRightForeArm');
    right_hand_5 = robot_5.getObjectByName('mixamorigRightHand');
    // LEFT LEG
    left_up_leg_5 = robot_5.getObjectByName('mixamorigLeftUpLeg');
    left_leg_5 = robot_5.getObjectByName('mixamorigLeftLeg');
    left_foot_5 = robot_5.getObjectByName('mixamorigLeftFoot');
    // RIGHT LEG
    right_up_leg_5 = robot_5.getObjectByName('mixamorigRightUpLeg');
    right_leg_5 = robot_5.getObjectByName('mixamorigRightLeg');
    right_foot_5 = robot_5.getObjectByName('mixamorigRightFoot');

    left_arm_5.rotation.z = Math.PI * -0.35;
    right_arm_5.rotation.z = Math.PI * 0.35;

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
    robot_6.position.y = 0;
    robot_6.position.z = 0;
    robot_6.rotation.y = -90 * (Math.PI / 180.0);
    robot_6.scale.set(1.7, 1.7, 1.7);

    //SPINE
    spine_6 = robot_6.getObjectByName('mixamorigSpine');
    spine1_6 = robot_6.getObjectByName('mixamorigSpine1');
    spine2_6 = robot_6.getObjectByName('mixamorigSpine2');
    //NECK AND HEAD
    neck_6 = robot_6.getObjectByName('mixamorigNeck');
    head_6 = robot_6.getObjectByName('mixamorigHead');
    // LEFT ARM
    left_shoulder_6 = robot_6.getObjectByName('mixamorigLeftShoulder');
    left_arm_6 = robot_6.getObjectByName('mixamorigLeftArm');
    left_fore_arm_6 = robot_6.getObjectByName('mixamorigLeftForeArm');
    left_hand_6 = robot_6.getObjectByName('mixamorigLeftHand');
    // RIGHT ARM
    right_shoulder_6 = robot_6.getObjectByName('mixamorigRightShoulder');
    right_arm_6 = robot_6.getObjectByName('mixamorigRightArm');
    right_fore_arm_6 = robot_6.getObjectByName('mixamorigRightForeArm');
    right_hand_6 = robot_6.getObjectByName('mixamorigRightHand');
    // LEFT LEG
    left_up_leg_6 = robot_6.getObjectByName('mixamorigLeftUpLeg');
    left_leg_6 = robot_6.getObjectByName('mixamorigLeftLeg');
    left_foot_6 = robot_6.getObjectByName('mixamorigLeftFoot');
    // RIGHT LEG
    right_up_leg_6 = robot_6.getObjectByName('mixamorigRightUpLeg');
    right_leg_6 = robot_6.getObjectByName('mixamorigRightLeg');
    right_foot_6 = robot_6.getObjectByName('mixamorigRightFoot');

    left_arm_6.rotation.z = Math.PI * -0.35;
    right_arm_6.rotation.z = Math.PI * 0.35;

    //Setup a bounding box around robot_6
    box_robot6 = new THREE.Box3().setFromObject(robot_6);
    const size_robot6 = box_robot6.getSize(new THREE.Vector3()).length();
    const center_robot6 = box_robot6.getCenter(new THREE.Vector3());

  }, undefined, function (error) {
    console.error(error);
  });

  loader.load('models/football_pitch/pitch.gltf', function (gltf6) {
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

  //GENERATE 3D TEXT FOR GOAL AND WIN

  // Create the text geometry
  const fontLoader = new FontLoader();

  //Define 3D text variables
  var text_GoalBlue;
  var text_GoalRed;
  var text_Score;

  var text_ExultationBlue;
  var text_ExultationRed;

  var text_VictoryBlue;
  var text_VictoryRed;

  var goal_blue = 0;
  var goal_red = 0;

  function writeScore(){
    // Create the 3D text for Blue score
    fontLoader.load('fonts/optimer_regular.typeface.json', function (font) {
      const textGeometry = new TextGeometry(goal_blue.toString(), {
        font: font,
        size: 4,
        height: 0.1,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
      });

      // Center the text geometry
      textGeometry.computeBoundingBox();
      const textBoundingBox = textGeometry.boundingBox;
      const textWidth = textBoundingBox.max.x - textBoundingBox.min.x;
      textGeometry.translate(-textWidth*1.5, 5, 0);

      const textMaterial = new THREE.MeshBasicMaterial({ color: 0x00008B });
      text_GoalBlue = new THREE.Mesh(textGeometry, textMaterial);

      // Rotate the text to face the camera
      text_GoalBlue.rotation.setFromRotationMatrix(camera.matrix);

      // Make the text always face the camera
      text_GoalBlue.lookAt(camera.position);

      scene.add(text_GoalBlue);
    });

    // Create the 3D text for - symbol
    fontLoader.load('fonts/optimer_regular.typeface.json', function (font) {
      const textGeometry = new TextGeometry('-', {
        font: font,
        size: 4,
        height: 0.1,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
      });

      // Center the text geometry
      textGeometry.computeBoundingBox();
      const textBoundingBox = textGeometry.boundingBox;
      const textWidth = textBoundingBox.max.x - textBoundingBox.min.x;
      textGeometry.translate(-textWidth / 2, 5, 0);

      const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      text_Score = new THREE.Mesh(textGeometry, textMaterial);

      // Rotate the text to face the camera
      text_Score.rotation.setFromRotationMatrix(camera.matrix);

      // Make the text always face the camera
      text_Score.lookAt(camera.position);

      scene.add(text_Score);
    });

    // Create the 3D text for Red score
    fontLoader.load('fonts/optimer_regular.typeface.json', function (font) {
      const textGeometry = new TextGeometry(goal_red.toString(), {
        font: font,
        size: 4,
        height: 0.1,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
      });

      // Center the text geometry
      textGeometry.computeBoundingBox();
      const textBoundingBox = textGeometry.boundingBox;
      const textWidth = textBoundingBox.max.x - textBoundingBox.min.x;
      textGeometry.translate(textWidth*0.5, 5, 0);

      const textMaterial = new THREE.MeshBasicMaterial({ color: 0x8B0000 });
      text_GoalRed = new THREE.Mesh(textGeometry, textMaterial);

      // Rotate the text to face the camera
      text_GoalRed.rotation.setFromRotationMatrix(camera.matrix);

      // Make the text always face the camera
      text_GoalRed.lookAt(camera.position);

      scene.add(text_GoalRed);
    });
  }

  writeScore();

  // Create the 3D text for blue goal
  fontLoader.load('fonts/optimer_regular.typeface.json', function (font) {
    const textGeometry = new TextGeometry('GOAL!', {
      font: font,
      size: 4,
      height: 0.1,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5
    });

    // Center the text geometry
    textGeometry.computeBoundingBox();
    const textBoundingBox = textGeometry.boundingBox;
    const textWidth = textBoundingBox.max.x - textBoundingBox.min.x;
    textGeometry.translate(-textWidth / 2, 5, 0);

    const textMaterial = new THREE.MeshBasicMaterial({ color: 0x00008B });
    text_ExultationBlue = new THREE.Mesh(textGeometry, textMaterial);

    // Rotate the text to face the camera
    text_ExultationBlue.rotation.setFromRotationMatrix(camera.matrix);

    // Make the text always face the camera
    text_ExultationBlue.lookAt(camera.position);

  });

  // Create the 3D text for red goal
  fontLoader.load('fonts/optimer_regular.typeface.json', function (font) {
    const textGeometry = new TextGeometry('GOAL!', {
      font: font,
      size: 4,
      height: 0.1,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5
    });

    // Center the text geometry
    textGeometry.computeBoundingBox();
    const textBoundingBox = textGeometry.boundingBox;
    const textWidth = textBoundingBox.max.x - textBoundingBox.min.x;
    textGeometry.translate(-textWidth / 2, 5, 0);

    const textMaterial = new THREE.MeshBasicMaterial({ color: 0x8B0000 });
    text_ExultationRed = new THREE.Mesh(textGeometry, textMaterial);

    // Rotate the text to face the camera
    text_ExultationRed.rotation.setFromRotationMatrix(camera.matrix);

    // Make the text always face the camera
    text_ExultationRed.lookAt(camera.position);

  });

  // Create the 3D text for blue victory
  fontLoader.load('fonts/optimer_regular.typeface.json', function (font) {
    const textGeometry = new TextGeometry('BLUE WINS!', {
      font: font,
      size: 4,
      height: 0.1,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5
    });

    // Center the text geometry
    textGeometry.computeBoundingBox();
    const textBoundingBox = textGeometry.boundingBox;
    const textWidth = textBoundingBox.max.x - textBoundingBox.min.x;
    textGeometry.translate(-textWidth / 2, 5, 0);

    const textMaterial = new THREE.MeshBasicMaterial({ color: 0x00008B });
    text_VictoryBlue = new THREE.Mesh(textGeometry, textMaterial);

    // Rotate the text to face the camera
    text_VictoryBlue.rotation.setFromRotationMatrix(camera.matrix);

    // Make the text always face the camera
    text_VictoryBlue.lookAt(camera.position);

  });

  // Create the 3D text for red victory
  fontLoader.load('fonts/optimer_regular.typeface.json', function (font) {
    const textGeometry = new TextGeometry('RED WINS!', {
      font: font,
      size: 4,
      height: 0.1,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5
    });

    // Center the text geometry
    textGeometry.computeBoundingBox();
    const textBoundingBox = textGeometry.boundingBox;
    const textWidth = textBoundingBox.max.x - textBoundingBox.min.x;
    textGeometry.translate(-textWidth / 2, 5, 0);

    const textMaterial = new THREE.MeshBasicMaterial({ color: 0x8B0000 });
    text_VictoryRed = new THREE.Mesh(textGeometry, textMaterial);

    // Rotate the text to face the camera
    text_VictoryRed.rotation.setFromRotationMatrix(camera.matrix);

    // Make the text always face the camera
    text_VictoryRed.lookAt(camera.position);

  });



  var isMoving = false;
  var isRobotMoving = true;
  var isRobotMoving2 = false;
  var isRobotMoving3 = false;
  var isRobotMoving4 = false;
  var isRobotMoving5 = false;
  var isRobotMoving6 = false;
  var done = false;
  var increment = 0.05;
  var n_touch = 0;

  var flagBlueGoal = false;
  var flagRedGoal = false;

  var flagBlueWin = false;
  var flagRedWin = false;

  var exultationBlue = false;

  var goal_time = 0;


  //Render the Scene; basically, anything you want to move or change
  //while the app is running has to go through the animate loop.
  function animate() {
    requestAnimationFrame(animate);

    // Moving the camera
    if (moveCameraForward) {
      camera.position.z -= 0.5;
    }
    if (moveCameraBackward) {
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


    if(isRobotMoving){
      scene.remove(circle);
      createCircle(robot_1);
      moveRobot(robot_1, box_robot1);
      running(robot_1, left_arm_1, right_arm_1, left_fore_arm_1, right_fore_arm_1, left_up_leg_1, left_leg_1, right_up_leg_1, right_leg_1, neck_1, head_1);

    }
    if(isRobotMoving2){
      scene.remove(circle);
      createCircle(robot_2);
      moveRobot(robot_2, box_robot2);
      running(robot_2, left_arm_2, right_arm_2, left_fore_arm_2, right_fore_arm_2, left_up_leg_2, left_leg_2, right_up_leg_2, right_leg_2, neck_2, head_2);
    }
    if(isRobotMoving3){
      scene.remove(circle);
      createCircle(robot_3);
      moveRobot(robot_3, box_robot3);
      running(robot_3, left_arm_3, right_arm_3, left_fore_arm_3, right_fore_arm_3, left_up_leg_3, left_leg_3, right_up_leg_3, right_leg_3, neck_3, head_3);
    }
    if(isRobotMoving4){
      scene.remove(circle);
      createCircle(robot_4);
      moveRobot(robot_4, box_robot4);
      running(robot_4, left_arm_4, right_arm_4, left_fore_arm_4, right_fore_arm_4, left_up_leg_4, left_leg_4, right_up_leg_4, right_leg_4, neck_4, head_4);
    }
    if(isRobotMoving5){
      scene.remove(circle);
      createCircle(robot_5);
      moveRobot(robot_5, box_robot5);
      running(robot_5, left_arm_5, right_arm_5, left_fore_arm_5, right_fore_arm_5, left_up_leg_5, left_leg_5, right_up_leg_5, right_leg_5, neck_5, head_5);
    }
    if(isRobotMoving6){
      scene.remove(circle);
      createCircle(robot_6);
      moveRobot(robot_6, box_robot6);
      running(robot_6, left_arm_6, right_arm_6, left_fore_arm_6, right_fore_arm_6, left_up_leg_6, left_leg_6, right_up_leg_6, right_leg_6, neck_6, head_6);
    }


    // Move the robot based on mouse input
    if (moveForward) robot_1.position.z -= 0.1;
    if (moveBackward) robot_1.position.z += 0.1;
    if (moveLeft) robot_1.position.x -= 0.1;
    if (moveRight) robot_1.position.x += 0.1;



    if(isMoving){
      normball=0;
      normball2=0;
      if(times < 8){
        normball =  Math.sign(ballvx)*(Math.sqrt(ballvx*ballvx - 0.1*0.1) * (0.4) / 9);
        normball2 = Math.sign(ballvy)*Math.sqrt(ballvy*ballvy - 0.1*0.1) * (0.4) / 9;
        if (times == 0){
          var positionx= clickX-ballvx;
          var positiony= clickZ-ballvy;
          /*
          console.log("Position X: "+positionx+" Position Y"+positiony);
          console.log("CLICK X: "+clickX+" CLICK Z"+clickZ);
          console.log("BALL X: "+ballvx+" BALL Z"+ballvy);
          console.log("NORMBALL X: "+normball+" NORMBALL Z"+normball2);*/
        }
        if(isNaN(normball)){
          normball = 0;
        }
        if(isNaN(normball2)){
          normball2 = 0;
        }
        ball.position.x += normball*2;
        ball.position.z += normball2*2;
        times += 1;
      }else{
        isMoving = false;
      }
      ball.rotation.z += normball2;
      ball.rotation.x += normball;
      box_ball.setFromObject(ball);
    }

    //Update the bounding boxes
    if(moveForward||moveBackward||moveLeft||moveRight) box_robot1.setFromObject(robot_1);
    if(moveForward||moveBackward||moveLeft||moveRight) box_robot2.setFromObject(robot_2);
    if(moveForward||moveBackward||moveLeft||moveRight) box_robot3.setFromObject(robot_3);
    if(moveForward||moveBackward||moveLeft||moveRight) box_robot4.setFromObject(robot_4);
    if(moveForward||moveBackward||moveLeft||moveRight) box_robot5.setFromObject(robot_5);
    if(moveForward||moveBackward||moveLeft||moveRight) box_robot6.setFromObject(robot_6);
    // Check for collisions
    if (box_robot1.intersectsBox(box_ball)) {
      //Collision detected, stop or modify the object's movement
      //console.log("Collisione in z: "+robot_1.position.z+"Collisione in X"+robot_1.position.x);
      ballvx = 0;
      ballvy = 0;
      ballvx = clickX - robot_1.position.x;
      ballvy = clickZ - robot_1.position.z;
      //console.log("Velocità urto in z: "+ballvx+"Velocità urto in z:"+ballvy);
      isMoving = true;
      times = 0;
      nextPlayer();
    }

    if (box_robot2.intersectsBox(box_ball)) {
      //Collision detected, stop or modify the object's movement
      //console.log("Collisione in z: "+robot_2.position.z+"Collisione in X"+robot_2.position.x);
      ballvx = 0;
      ballvy = 0;
      ballvx = clickX - robot_2.position.x;
      ballvy = clickZ - robot_2.position.z;
      //console.log("Velocità urto in z: "+ballvx+"Velocità urto in z:"+ballvy);
      isMoving = true;
      times = 0;
      nextPlayer();
    }

    if (box_robot3.intersectsBox(box_ball)) {
      //Collision detected, stop or modify the object's movement
      //console.log("Collisione in z: "+robot_3.position.z+"Collisione in X"+robot_3.position.x);
      ballvx = 0;
      ballvy = 0;
      ballvx = clickX - robot_3.position.x;
      ballvy = clickZ - robot_3.position.z;
      //console.log("Velocità urto in z: "+ballvx+"Velocità urto in z:"+ballvy);
      isMoving = true;
      times = 0;
      nextPlayer();
    }

    if (box_robot4.intersectsBox(box_ball)) {
      //Collision detected, stop or modify the object's movement
      //console.log("Collisione in z: "+robot_4.position.z+"Collisione in X"+robot_4.position.x);
      ballvx = 0;
      ballvy = 0;
      ballvx = clickX - robot_4.position.x;
      ballvy = clickZ - robot_4.position.z;
      //console.log("Velocità urto in z: "+ballvx+"Velocità urto in z:"+ballvy);
      isMoving = true;
      times = 0;
      nextPlayer();
    }

    if (box_robot5.intersectsBox(box_ball)) {
      //Collision detected, stop or modify the object's movement
      //console.log("Collisione in z: "+robot_5.position.z+"Collisione in X"+robot_5.position.x);
      ballvx = 0;
      ballvy = 0;
      ballvx = clickX - robot_5.position.x;
      ballvy = clickZ - robot_5.position.z;
      //console.log("Velocità urto in z: "+ballvx+"Velocità urto in z:"+ballvy);
      isMoving = true;
      times = 0;
      nextPlayer();
    }

    if (box_robot6.intersectsBox(box_ball)) {
      //Collision detected, stop or modify the object's movement
      //console.log("Collisione in z: "+robot_6.position.z+"Collisione in X"+robot_6.position.x);
      ballvx = 0;
      ballvy = 0;
      ballvx = clickX - robot_6.position.x;
      ballvy = clickZ - robot_6.position.z;
      //console.log("Velocità urto in z: "+ballvx+"Velocità urto in z:"+ballvy);
      isMoving = true;
      times = 0;
      nextPlayer();
    }

    //Show blue goal screen and update score
    if(flagBlueGoal && goal_blue != 3){
      scene.remove(text_GoalBlue);
      scene.remove(text_Score);
      scene.remove(text_GoalRed);
      scene.add(text_ExultationBlue);
      if(goal_time > 100){
        scene.remove(text_ExultationBlue);
        writeScore();
        goal_time = 0;
        flagBlueGoal = false;
      }
      goal_time += 1;
    }

    //Show red goal screen and update score
    if(flagRedGoal && goal_red != 3){
      scene.remove(text_GoalBlue);
      scene.remove(text_Score);
      scene.remove(text_GoalRed);
      scene.add(text_ExultationRed);
      if(goal_time > 100){
        scene.remove(text_ExultationRed);
        writeScore();
        goal_time = 0;
        flagRedGoal = false;
      }
      goal_time += 1;
    }

    //Show blue victory screen
    if(flagBlueWin){
      scene.remove(text_GoalBlue);
      scene.remove(text_Score);
      scene.remove(text_GoalRed);
      scene.add(text_VictoryBlue);
      setVictoryBlue();
      endgame = true;
      if(goal_time > 300){
        location.reload();
      }
      goal_time += 1;
    }


    //Show red victory screen
    if(flagRedWin){
      scene.remove(text_GoalBlue);
      scene.remove(text_Score);
      scene.remove(text_GoalRed);
      scene.add(text_VictoryRed);
      setVictoryRed();
      endgame = true;
      if(goal_time > 300){
        location.reload();
      }
      goal_time += 1;
    }

    //Check blue goal
    if(ball.position.z>=-3 && ball.position.z<=3 && ball.position.x >= 10){
      isMoving = false;
      goal_blue += 1;
      flagBlueGoal = true;
      if(goal_blue == 2){
        flagBlueWin = true;
      }else{
        reset();
      }
    }

    //Check red goal
    if(ball.position.z>=-3 && ball.position.z<=3 && ball.position.x <= -10){
      isMoving=false;
      goal_red += 1;
      flagRedGoal = true;
      if(goal_red == 2){
        flagRedWin = true;
      }else{
        reset();
      }
    }

    checkBallCollisions();
    checkRobotCollisions(robot_1);
    checkRobotCollisions(robot_2);
    checkRobotCollisions(robot_3);
    checkRobotCollisions(robot_4);
    checkRobotCollisions(robot_5);
    checkRobotCollisions(robot_6);


    renderer.render(scene, camera);
  }

  animate();


  function setVictoryBlue(){
    ball.position.x = 0;
    ball.position.z = 1;

    //Winners positions
    robot_1.position.x = 0;
    robot_1.position.z = 0;
    robot_1.rotation.y = 0 * (Math.PI / 180.0);

    robot_2.position.x = -2;
    robot_2.position.z = 0;
    robot_2.rotation.y = 0 * (Math.PI / 180.0);

    robot_5.position.x = 2;
    robot_5.position.z = 0;
    robot_5.rotation.y = 0 * (Math.PI / 180.0);

    //Defeated positions
    robot_3.position.x = -7;
    robot_3.position.z = -3;
    robot_3.rotation.y = 0 * (Math.PI / 180.0);

    robot_4.position.x = -9;
    robot_4.position.z = -3;
    robot_4.rotation.y = 0 * (Math.PI / 180.0);

    robot_6.position.x = -5;
    robot_6.position.z = -3;
    robot_6.rotation.y = 0 * (Math.PI / 180.0);

    isRobotMoving3 =false;
    isRobotMoving4 =false;
    isRobotMoving6 =false;
    //Exultation animation
    exultation(robot_1, left_arm_1, right_arm_1, left_fore_arm_1, right_fore_arm_1, left_up_leg_1, left_leg_1, right_up_leg_1, right_leg_1, neck_1, head_1, spine_1);
    exultation(robot_2, left_arm_2, right_arm_2, left_fore_arm_2, right_fore_arm_2, left_up_leg_2, left_leg_2, right_up_leg_2, right_leg_2, neck_2, head_2, spine_2);
    exultation(robot_5, left_arm_5, right_arm_5, left_fore_arm_5, right_fore_arm_5, left_up_leg_5, left_leg_5, right_up_leg_5, right_leg_5, neck_5, head_5, spine_5);
  }

  function setVictoryRed(){
    ball.position.x = 0;
    ball.position.z = 1;

    //Winners positions
    robot_3.position.x = 0;
    robot_3.position.z = 0;
    robot_3.rotation.y = 0 * (Math.PI / 180.0);

    robot_4.position.x = -2;
    robot_4.position.z = 0;
    robot_4.rotation.y = 0 * (Math.PI / 180.0);

    robot_6.position.x = 2;
    robot_6.position.z = 0;
    robot_6.rotation.y = 0 * (Math.PI / 180.0);

    //Defeated positions
    robot_1.position.x = -7;
    robot_1.position.z = -3;
    robot_1.rotation.y = 0 * (Math.PI / 180.0);

    robot_2.position.x = -9;
    robot_2.position.z = -3;
    robot_2.rotation.y = 0 * (Math.PI / 180.0);

    robot_5.position.x = -5;
    robot_5.position.z = -3;
    robot_5.rotation.y = 0 * (Math.PI / 180.0);

    //Exultation animation
    isRobotMoving=false;
    
    isRobotMoving2=false;
    isRobotMoving5=false;
    exultation(robot_3, left_arm_3, right_arm_3, left_fore_arm_3, right_fore_arm_3, left_up_leg_3, left_leg_3, right_up_leg_3, right_leg_3, neck_3, head_3, spine_3);
    exultation(robot_4, left_arm_4, right_arm_4, left_fore_arm_4, right_fore_arm_4, left_up_leg_4, left_leg_4, right_up_leg_4, right_leg_4, neck_4, head_4, spine_4);
    exultation(robot_6, left_arm_6, right_arm_6, left_fore_arm_6, right_fore_arm_6, left_up_leg_6, left_leg_6, right_up_leg_6, right_leg_6, neck_6, head_6, spine_6);
  }



  var next = false;


  function nextPlayer(){
    scene.remove(line);
    clickX = 0;
    clickY = 0;
    clickZ = 0;
    next = true;
    nextTurn();
  }

  function nextTurn(){
    if(next){
      //console.log(thisrobot);
      if(thisrobot == 0 || thisrobot == 1 || thisrobot == 4){ //blue team
        turn = 2;
        thisrobot = 2;
        setThisRobot(thisrobot);
      }else if (thisrobot == 2 || thisrobot == 3 || thisrobot == 5){ //red team
        turn = 1;
        thisrobot = 0;
        setThisRobot(thisrobot);
      }
    }
    next = false;
  }

  function reset(){
    scene.remove(line);

    robot_1.position.x = -5;
    robot_1.position.z = 3;
    robot_1.rotation.y = 90 * (Math.PI / 180.0);
    box_robot1.setFromObject(robot_1);

    robot_2.position.x = -5;
    robot_2.position.z = -3;
    robot_2.rotation.y = 90 * (Math.PI / 180.0);
    box_robot2.setFromObject(robot_2);

    robot_3.position.x = 5;
    robot_3.position.z = -3;
    robot_3.rotation.y = -90 * (Math.PI / 180.0);
    box_robot3.setFromObject(robot_3);

    robot_4.position.x = 5;
    robot_4.position.z = 3;
    robot_4.rotation.y = -90 * (Math.PI / 180.0);
    box_robot4.setFromObject(robot_4);

    robot_5.position.x = -9;
    robot_5.rotation.y = 90 * (Math.PI / 180.0);
    box_robot5.setFromObject(robot_5);

    robot_6.position.x = 9;
    robot_6.rotation.y = -90 * (Math.PI / 180.0);
    box_robot6.setFromObject(robot_6);

    ball.position.x = 0;
    ball.position.z = 0;
    box_ball.setFromObject(ball);
  }


  function moveRobot(object, box_object){
    if(clickX != 0 && clickZ != 0){
      var diff_x = clickX-object.position.x;
      var diff_y = clickZ-object.position.z;

      //console.log(diff_x+" "+diff_y+" "+clickX+" "+clickZ+" "+object.position.x+" "+object.position.z);

      j = Math.sqrt((Math.pow(diff_y, 2)) / (Math.pow(diff_x, 2) + Math.pow(diff_y, 2))) * Math.sign(diff_y)*0.05;
      k = (diff_x / diff_y) * j;

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

      if(object.position.x == clickX && object.position.z == clickZ){
        scene.remove(line);
        clickX = 0;
        clickY = 0;
        clickZ = 0;
        next = true;
        nextTurn();
      }
    }
  }


  var downarms = true;
  var downlegs = true;
  var spinelegs = true;

  function running(object, left_arm, right_arm, left_fore_arm, right_fore_arm, left_up_leg, left_leg, right_up_leg, right_leg, neck, head){
    var diff_x = clickX-object.position.x;
    var diff_y = clickZ-object.position.z;
    var angoloRadianti = Math.atan2(diff_x,diff_y);
    object.rotation.y = angoloRadianti;


    // ARM RUNNING
    left_arm.rotation.z = Math.PI * -0.35;
    right_arm.rotation.z = Math.PI * 0.35;
    left_fore_arm.rotation.y = Math.PI * -0.5;
    right_fore_arm.rotation.y =Math.PI * 0.5;
    if(downarms){
      if( left_arm.rotation.x >  Math.PI * -0.35){
        left_arm.rotation.x -=0.08;
      }
      else {
        downarms = false;
      }
      if( right_arm.rotation.x <  Math.PI * 0.35){
        right_arm.rotation.x +=0.08;
      }
    }else{
      if( left_arm.rotation.x <  Math.PI * 0.35){
        left_arm.rotation.x +=0.08;
      }
      else {
        downarms = true;
      }
      if( right_arm.rotation.x >  Math.PI * -0.35){
        right_arm.rotation.x -=0.08;
      }
    }
    //LEGS RUNNING
    if(downlegs){
      if(  left_up_leg.rotation.x > Math.PI * -0.15){
        left_up_leg.rotation.x -=0.02;
      }
      else{
        downlegs = false;
      }
      if(  left_leg.rotation.x < Math.PI * 0.3){
        left_leg.rotation.x +=0.08;
      }

      if(  right_up_leg.rotation.x < 0.15){
        right_up_leg.rotation.x +=0.02;
      }
      if(  right_leg.rotation.x > 0){
        right_leg.rotation.x -=0.08;
      }
    }
    else{
      if(  left_up_leg.rotation.x < 0.15){
        left_up_leg.rotation.x +=0.02;
      }
      else{
        downlegs = true;
      }
      if(  left_leg.rotation.x > 0){
        left_leg.rotation.x -=0.08;
      }

      if(  right_up_leg.rotation.x > Math.PI * -0.15){
        right_up_leg.rotation.x -=0.02;
      }
      if(  right_leg.rotation.x < Math.PI * 0.3){
        right_leg.rotation.x +=0.04;
      }
    }
    neck.rotation.x = Math.PI * 0.35;
    head.rotation.x = Math.PI * -0.25;
  }

  function exultation(object, left_arm, right_arm, left_fore_arm, right_fore_arm, left_up_leg, left_leg, right_up_leg, right_leg, neck, head, spine){
    var diff_x = clickX-object.position.x;
    var diff_y = clickZ-object.position.z;
    var angoloRadianti = Math.atan2(diff_x,diff_y);
    object.rotation.y = angoloRadianti;

 
    right_fore_arm.rotation.z = Math.PI*0.15;
    left_fore_arm.rotation.z = -Math.PI*0.15;
    left_arm.rotation.x = Math.PI;
    right_arm.rotation.x =-Math.PI;
    left_fore_arm.rotation.y =0;
    right_fore_arm.rotation.y =0 ;


    left_arm.rotation.z = Math.PI*-0.35;
    right_arm.rotation.z = Math.PI*0.35;

    // ARM RUNNING
 
    console.log("left "+left_arm.rotation.z);
    console.log("right "+right_arm.rotation.z);
    
    //left_arm.rotation.z = Math.PI*-0.5;
    //right_arm.rotation.z = Math.PI*0.5;

    if(downarms){
      if( left_arm.rotation.z >  -Math.PI*0.5){
        left_arm.rotation.z -=0.1;
        right_arm.rotation.z -= 0.1;


      }
      else {
        downarms = false;
      }
    }else{
      if( left_arm.rotation.z < 0 ){
        left_arm.rotation.z += 0.1;
        right_arm.rotation.z +=0.1;


      }
      else {
        downarms = true;
      }
    }

    //LEGS RUNNING
    if(spinelegs){
      if(  spine.rotation.z > Math.PI * -0.15){
        spine.rotation.z -=0.02;
      }
      else{
        spinelegs = false;
      }


    }
    else{
      if(  spine.rotation.z < 0.15){
        spine.rotation.z +=0.02;
      }
      else{
        spinelegs = true;
      }



    }
    if(downlegs){
      if(  left_up_leg.rotation.x > Math.PI * -0.15){
        left_up_leg.rotation.x -=0.02;
      }
      else{
        downlegs = false;
      }
      if(  left_leg.rotation.x < Math.PI * 0.3){
        left_leg.rotation.x +=0.08;
      }

      if(  right_up_leg.rotation.x < 0.15){
        right_up_leg.rotation.x +=0.02;
      }
      if(  right_leg.rotation.x > 0){
        right_leg.rotation.x -=0.08;
      }
    }
    else{
      if(  left_up_leg.rotation.x < 0.15){
        left_up_leg.rotation.x +=0.02;
      }
      else{
        downlegs = true;
      }
      if(  left_leg.rotation.x > 0){
        left_leg.rotation.x -=0.08;
      }

      if(  right_up_leg.rotation.x > Math.PI * -0.15){
        right_up_leg.rotation.x -=0.02;
      }
      if(  right_leg.rotation.x < Math.PI * 0.3){
        right_leg.rotation.x +=0.04;
      }
    }

  }




  function setThisRobot(thisrobot) {
    if(thisrobot == 0){
      isRobotMoving = true;
      isRobotMoving2 = false;
      isRobotMoving3 = false;
      isRobotMoving4 = false;
      isRobotMoving5 = false;
      isRobotMoving6 = false;
    }
    if(thisrobot == 1){
      isRobotMoving = false;
      isRobotMoving2 = true;
      isRobotMoving3 = false;
      isRobotMoving4 = false;
      isRobotMoving5 = false;
      isRobotMoving6 = false;
    }
    if(thisrobot == 2){
      isRobotMoving = false;
      isRobotMoving2 = false;
      isRobotMoving3 = true;
      isRobotMoving4 = false;
      isRobotMoving5 = false;
      isRobotMoving6 = false;
    }
    if(thisrobot == 3){
      isRobotMoving = false;
      isRobotMoving2 = false;
      isRobotMoving3 = false;
      isRobotMoving4 = true;
      isRobotMoving5 = false;
      isRobotMoving6 = false;
    }
    if(thisrobot == 4){
      isRobotMoving = false;
      isRobotMoving2 = false;
      isRobotMoving3 = false;
      isRobotMoving4 = false;
      isRobotMoving5 = true;
      isRobotMoving6 = false;
    }
    if(thisrobot == 5){
      isRobotMoving = false;
      isRobotMoving2 = false;
      isRobotMoving3 = false;
      isRobotMoving4 = false;
      isRobotMoving5 = false;
      isRobotMoving6 = true;
    }
  }


  function checkBallCollisions(){
    if(ball.position.z < -6.5){
      isMoving = false;
      ball.position.z += 1;
      box_ball.setFromObject(ball);
    }
    if(ball.position.z > 6.5){
      isMoving = false;
      ball.position.z -= 1;
      box_ball.setFromObject(ball);
    }
    if(ball.position.x < -10){
      isMoving = false;
      ball.position.x += 1;
      box_ball.setFromObject(ball);
    }
    if(ball.position.x > 10){
      isMoving = false;
      ball.position.x -= 1;
      box_ball.setFromObject(ball);
    }
  }


  function checkRobotCollisions(object){
    if(object.position.z < -6.5){
      object.position.z += 0.5;
      clickX = object.position.x;
      clickZ = object.position.z;
      stopRobot(object);
      setBound(object);
    }
    if(object.position.z > 6.5){
      object.position.z -= 0.5;
      clickX = object.position.x;
      clickZ = object.position.z;
      stopRobot(object);
      setBound(object);
    }
    if(object.position.x < -10){
      object.position.x += 0.5;
      clickX = object.position.x;
      clickZ = object.position.z;
      stopRobot(object);
      setBound(object);
    }
    if(object.position.x > 10){
      object.position.x -= 0.5;
      clickX = object.position.x;
      clickZ = object.position.z;
      stopRobot(object);
      setBound(object);
    }
  }

  function stopRobot(object){
    switch(object){
      case robot_1:
        isRobotMoving = false;
        break;
      case robot_2:
        isRobotMoving2 = false;
        break;
      case robot_3:
        isRobotMoving3 = false;
        break;
      case robot_4:
        isRobotMoving4 = false;
        break;
      case robot_5:
        isRobotMoving5 = false;
        break;
      case robot_6:
        isRobotMoving6 = false;
        break;
    }
  }


  function setBound(object){
    switch(object){
      case robot_1:
        isRobotMoving = true;
        box_robot1.setFromObject(robot_1);
        break;
      case robot_2:
        isRobotMoving2 = true;
        box_robot2.setFromObject(robot_2);
        break;
      case robot_3:
        isRobotMoving3 = true;
        box_robot3.setFromObject(robot_3);
        break;
      case robot_4:
        isRobotMoving4 = true;
        box_robot4.setFromObject(robot_4);
        break;
      case robot_5:
        isRobotMoving5 = true;
        box_robot5.setFromObject(robot_5);
        break;
      case robot_6:
        isRobotMoving2 = true;
        box_robot2.setFromObject(robot_6);
        break;
    }
  }
}


// Function to show the instructions
function showInstructions() {
  // Hide the menu and show the instructions container
  menu.style.display = 'none';
  instructionsContainer.style.display = 'inline';
}

// Add event listener to hide the instructions when clicked
instructionsContainer.addEventListener('click', hideInstructions);

// Function to hide the instructions
function hideInstructions() {
  // Hide the instructions container and show the menu
  instructionsContainer.style.display = 'none';
  menu.style.display = 'block';
}
