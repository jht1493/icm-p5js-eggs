let bg_color = 100;
let a_alpha = 60;
let n_start = 20;
let a_canvas;
let s_color;
let a_imgs = [];
let a_img;
let a_bubbles = [];
let a_paused = 0;
let a_grid = 1;
let r_options = [[1, 2, 4], [2, 8, 16], [1, 2, 4, 8, 16, 32], [1], [2], [4]];
let fuz_options = r_options;
let r_index = 0;
let fuz_index = 0;
let s_brush = 'circle';
let a_width = 400;
let a_height = 500;
let a_index = 0;

function preload() {
  for (let ii = 0; ii < img_names.length; ii++) {
    a_imgs[ii] = loadImage('images/' + img_names[ii]);
  }
}

function setup() {
  a_img = a_imgs[0];
  let h_scale = a_img.height / a_img.width;
  a_height = a_width * h_scale;
  for (let ii = 0; ii < a_imgs.length; ii++) {
    a_imgs[ii].resize(a_width, a_height);
  }
  a_canvas = createCanvas(a_width, a_height);
  background(bg_color);
  add_bubbles(n_start);
  init_ui();
}

function draw() {
  if (a_paused) return;
  for (let bub of a_bubbles) {
    draw_bubble(bub);
  }
}

function reset_bubbles() {
  a_bubbles = [];
  background(bg_color);
}

function canvas_mouseMoved() {
  if (mouseIsPressed) {
    add_bubble_mouseXY();
  }
}

function more_bubbles() {
  add_bubbles(n_start);
  print('more_bubbles a_bubbles.length', a_bubbles.length);
}

function add_bubbles(n) {
  for (let ind = 0; ind < n; ind++) {
    let x = random(0, width);
    let y = random(0, height);
    add_bubble(x, y);
  }
}

function add_bubble_mouseXY() {
  add_bubble(mouseX, mouseY);
  print('add_bubble_mouseXY', a_bubbles.length);
}

// from https://editor.p5js.org/jht1493/sketches/LrhcIzvr2
