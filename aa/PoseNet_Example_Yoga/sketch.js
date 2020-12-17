let a_camera;
let a_mov;
let poseNet;
let pose;
let skeleton;

function setup() {
  // createCanvas(640, 480);
  createCanvas(1280 / 2, 720 / 2);

  setup_mov();

  // poseNet = ml5.poseNet(a_camera, modelLoaded);
  poseNet = ml5.poseNet(a_mov, modelLoaded);
  poseNet.on('pose', gotPoses);
  init_ui();
}

function setup_mov() {
  a_mov = createVideo('assets/yoga.mp4', () => {
    a_mov.loop();
    a_mov.volume(0);
    print('a_mov width', a_mov.width, 'height', a_mov.height);
    a_mov.size(width, height);
    a_mov.showControls();
  });
}

function setup_camera() {
  a_camera = createCapture(VIDEO);
  a_camera.hide();
}

function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  print('poseNet ready');
}

function draw() {
  // image(a_camera, 0, 0);
  image(a_mov, 0, 0, width, height);
  if (!pose) return;
  show_fps();

  let eyeR = pose.rightEye;
  let eyeL = pose.leftEye;
  let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);

  fill(255, 0, 0); // Red nose
  ellipse(pose.nose.x, pose.nose.y, d);

  fill(0, 0, 255); // Blue wrists
  ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
  ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);

  for (let i = 0; i < pose.keypoints.length; i++) {
    let x = pose.keypoints[i].position.x;
    let y = pose.keypoints[i].position.y;

    fill(0, 255, 0); // Green
    ellipse(x, y, 16, 16);
  }

  for (let i = 0; i < skeleton.length; i++) {
    let a = skeleton[i][0];
    let b = skeleton[i][1];
    strokeWeight(2);
    stroke(255);
    line(a.position.x, a.position.y, b.position.x, b.position.y);
  }
}

// 2020-11-04 jht: Rebuilt - original fails to duplicate.
//   Added ui.js
// https://editor.p5js.org/codingtrain/sketches/ULA97pJXR
// ml5.js: Pose Estimation with PoseNet
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/Courses/ml5-beginners-guide/7.1-posenet.html
// https://youtu.be/OIo-DIOkNVg
