// https://p5js.org/reference/#/p5.Image
let a_side = 100;
let a_canvas;
let img_names = ['images/jht-side-400.jpg', 'images/jht-hs-4x-cu.jpg'];
let a_imgs = [];
let a_img;

function preload() {
  a_imgs[0] = loadImage(img_names[0]);
  a_imgs[1] = loadImage(img_names[1]);
}

function setup() {
  a_img = a_imgs[0];
  a_canvas = createCanvas(a_img.width, a_img.height);
  background(bg_color);
  init_ui();

  // a_canvas.mouseMoved(canvas_mouseMoved);
  // a_canvas.mouseMoved(canvas_mouseMoved);
}

function draw() {
  if (a_paused) return;
  draw_image();
}

function draw_image() {
  // Draw entire image scale to a_side
  draw_scaled();

  // Draw portion of an image
  draw_part(mouseX, mouseY);
}

function draw_part(sx, sy) {
  // image(img, dx, dy, dWidth, dHeight,
  //            sx, sy, [sWidth], [sHeight])

  let hscale = a_img.height / a_img.width;
  // Destination
  let dWidth = a_side;
  let dHeight = dWidth * hscale;
  let dx = width / 2 - a_side / 2;
  let dy = height / 2 - dHeight / 2;
  // Source
  // let sx = mouseX;
  // let sy = mouseY;
  let sWidth = a_side;
  let sHeight = sWidth * hscale;
  image(a_img, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight);
}

function draw_scaled() {
  let hscale = a_img.height / a_img.width;
  // image(img, x, y, [width], [height])
  image(a_img, 0, 0, a_side, a_side * hscale);
}

function img1_action() {
  print('img1_action');
  a_img = a_imgs[0];
}

function img2_action() {
  print('img2_action');
  a_img = a_imgs[1];
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
  print('reset_action');
}
