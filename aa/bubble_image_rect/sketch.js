let bg_color = 240;
let a_alpha = 60;
let n_start = 20;
let a_canvas;
let s_color;
let a_img;
let a_bubbles = [];
let a_paused;
let a_circle;

function preload() {
  // preload() runs once
  // a_img = loadImage('images/jht-side-400.jpg');
  a_img = loadImage('images/jht-hs-4x-cu.jpg');
  // print('preload img', a_img)
}

function setup() {
  a_canvas = createCanvas(a_img.width, a_img.height);
  background(bg_color);
  // image(a_img, 0, 0);
  add_bubbles(n_start);
  init_ui();
}

function draw() {
  if (a_paused) return;
  for (let bub of a_bubbles) {
    draw_bubble(bub);
  }
}

function add_bubble(x, y) {
  let colr;
  if (s_color == 'white') {
    colr = [255, 255, 255, a_alpha];
  } else if (s_color == 'black') {
    colr = [0, 0, 0, a_alpha];
  } else if (s_color == 'random') {
    colr = random([
      [0, 0, 0, a_alpha],
      [255, 255, 255, a_alpha],
    ]);
  }
  // let r = random(1, 4);
  let r = random([1, 2, 4]);
  // let r = random([4, 8, 16]);
  // let r = random([1, 2, 3]);
  let fuz = random([2, 4, 8]);
  let alpha = a_alpha;
  let bub = {
    x,
    y,
    r,
    fuz,
    colr,
    alpha,
  };
  a_bubbles.push(bub);
}

function draw_bubble(bub) {
  move_bubble(bub);
  show_bubble(bub);
}

function move_bubble(bub) {
  bub.x = bub.x + random(-bub.fuz, bub.fuz);
  bub.y = bub.y + random(-bub.fuz, bub.fuz);
  // constrain(n, low, high)
  bub.x = constrain(bub.x, 0, width);
  bub.y = constrain(bub.y, 0, height);
}

function show_bubble(bub) {
  let colr = bub.colr;
  if (!colr) {
    colr = a_img.get(bub.x, bub.y);
    colr[3] = a_alpha;
  }
  stroke(colr);
  strokeWeight(4);
  fill(colr);
  if (a_circle) {
    circle(bub.x, bub.y, bub.r * 2);
  } else {
    const w = bub.r * 2;
    rect(bub.x, bub.y, w / 2, w);
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
