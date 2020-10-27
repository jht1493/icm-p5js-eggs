let bg_color = 240;
let a_alpha = 60;
let n_start = 20;
let a_canvas;
let s_color;
let a_img;
let a_bubbles = [];
let a_paused;

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
  // ellipse(bub.x, bub.y, bub.r * 2);
  const w = bub.r * 2;
  rect(bub.x, bub.y, w / 2, w);
}

function init_ui() {
  a_canvas.mouseMoved(canvas_mouseMoved);

  let cb_pause = createCheckbox('Pause', false);
  cb_pause.style('font-size', '12pt');

  cb_pause.style('margin', '2pt 2pt');
  cb_pause.changed(function () {
    a_paused = this.checked();
  });

  let save_btn = createButton('Save');
  save_btn.style('font-size', '12pt');
  save_btn.style('margin', '2pt 0pt');
  save_btn.mousePressed(save_canvas);

  let more_btn = createButton('More');
  more_btn.style('font-size', '12pt');
  more_btn.style('margin', '2pt 2pt');
  more_btn.mousePressed(more_bubbles);

  let reset_btn = createButton('Reset');
  reset_btn.style('font-size', '12pt');
  reset_btn.style('margin', '2pt 2pt');
  reset_btn.mousePressed(reset_bubbles);

  let a_span = createSpan('color:');
  a_span.style('font-size', '16pt');
  a_span.style('margin', '0pt 0pt 0pt 4pt');

  let a_select = createSelect();
  a_select.style('font-size', '12pt');
  a_select.style('margin', '2pt 2pt');
  a_select.option('random');
  a_select.option('black');
  a_select.option('white');
  a_select.option('image');
  a_select.selected('image');
  a_select.changed(function () {
    s_color = this.value();
    print('s_color', s_color);
  });

  createP();

  let b_span = createSpan('bg color:');
  b_span.style('font-size', '16pt');
  b_span.style('margin', '0pt 0pt 0pt 4pt');

  let bc_slide = createSlider(0, 255, 100);
  bc_slide.style('width', '256px');
  bc_slide.input(function () {
    bg_color = this.value();
    print('bg_color', bg_color);
    background(bg_color);
  });
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

let save_count = 0;
function save_canvas() {
  let fname = 'bubr-' + save_count + '-';
  fname += new Date().toISOString().substring(0, 10);
  // 2020-10-26T16:17:17.843Z
  print('save_btn mousePressed fname', fname);
  saveCanvas(fname, 'png');
  save_count += 1;
}

// from https://editor.p5js.org/jht1493/sketches/LrhcIzvr2
