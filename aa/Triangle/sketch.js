function setup() {
  createCanvas(400, 400);

  x_pos = width / 2;
  y_pos = height / 2;
  draw_triangle(a_size);

  a_angle = 45;
  // draw_triangle(a_size);

  a_angle = 90;
  draw_triangle(a_size);
}

let x_pos = 0;
let y_pos = 0;
let a_size = 100;
let a_size2 = a_size * 2;
let a_angle = 0;
let a_alpha = 100;

function draw_triangle(a_size) {
  fill(random_color(80));
  push();
  a_angle = (a_angle + 0) % 360;
  // cell_count = 0
  const half = int(a_size / 2);
  translate(x_pos, y_pos);
  rotate(a_angle);

  // triangle(x1, y1, x2, y2, x3, y3)
  const x1 = -half,
    y1 = half;
  const x2 = 0,
    y2 = -half;
  const x3 = half,
    y3 = half;
  triangle(x1, y1, x2, y2, x3, y3);

  fill(random_color(80));
  circle(0, 0, a_size);

  fill(random_color(80));
  rect(x1, y2, a_size, a_size);

  pop();
}

function random_color(a_alpha) {
  return color(random(255), random(255), random(255), a_alpha);
}
