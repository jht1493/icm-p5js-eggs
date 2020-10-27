// https://p5js.org/reference/#/p5.Image
let a_side = 50;
let a_canvas;
let img_names = ['images/DSC06195.JPG', 'images/jht-hs-4x-cu.jpg', 'images/IMG_1805.JPG'];
let a_imgs = [];
let a_img;
let s_x = 0;
let s_y = 0;
let h_scale;
let a_index = 0;

function preload() {
  a_imgs[0] = loadImage(img_names[0]);
  a_imgs[1] = loadImage(img_names[1]);
  a_imgs[2] = loadImage(img_names[2]);
}

function setup() {
  select_img(a_index);
  a_canvas = createCanvas(a_img.width, a_img.height);
  background(bg_color);
  show_vars();
  init_ui();
  frameRate(10);
  // a_canvas.mouseMoved(canvas_mouseMoved);
  print('a_img', a_img);
  angleMode(DEGREES);
}

function draw() {
  if (a_paused) return;
  draw_image();
}

function show_vars() {
  show_num('a_index', a_index);
  show_num('a_side', a_side);
  show_num('s_x', s_x);
  show_num('s_y', s_y, { line: 1 });
}

function draw_image() {
  // Draw portion of an image
  show_vars();
  draw_part(s_x, s_y, s_x, s_y);
  // draw_rotated();
  // select_img_next();
  s_x += a_side;
  if (s_x > width) {
    s_x = 0;
    s_y += a_side * h_scale;
    if (s_y > height) {
      s_y = 0;
      // select_img_next();
      a_img.filter(INVERT);
    }
  }
}

// https://p5js.org/reference/#/p5.Image/filter
// THRESHOLD, GRAY, OPAQUE, INVERT, POSTERIZE, BLUR, ERODE, DILATE or BLUR

function draw_part(dx, dy, sx, sy) {
  // image(img, dx, dy, dWidth, dHeight,
  //            sx, sy, [sWidth], [sHeight])

  // Destination
  let dWidth = a_side;
  let dHeight = dWidth * h_scale;
  // let dx = width / 2 - a_side / 2;
  // let dy = height / 2 - dHeight / 2;
  // Source
  // let sx = mouseX;
  // let sy = mouseY;
  let sWidth = a_side;
  let sHeight = sWidth * h_scale;
  image(a_img, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight);
}

function draw_rotated() {
  push();
  translate(s_x, s_y);
  rotate(random([0, 10, 20, 30]));
  draw_part(0, 0, s_x, s_y);
  pop();
}

function draw_scaled() {
  // image(img, x, y, [width], [height])
  image(a_img, 0, 0, a_side, a_side * h_scale);
}

function select_img(index) {
  a_index = index;
  a_img = a_imgs[index];
  h_scale = a_img.height / a_img.width;
}

function select_img_next() {
  select_img((a_index + 1) % a_imgs.length);
}

function img0_action() {
  print('img0_action', this.id());
  select_img(0);
}

function img1_action() {
  print('img1_action', this.id());
  select_img(1);
}

function img2_action() {
  print('img2_action', this.id());
  select_img(2);
}

function mouseDragged1() {
  print('mouseDragged');
  // prevent default return false
  return false;
}

function reset_action() {
  print('reset_action');
  background(bg_color);
}

function canvas_mouseMoved() {
  print('canvas_mouseMoved');
}

function more_action() {
  print('more_action');
  a_img.filter(INVERT);
}
