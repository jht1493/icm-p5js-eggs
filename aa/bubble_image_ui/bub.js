function add_bubble(x, y) {
  let colr;
  if (s_color == 'white') {
    colr = [255, 255, 255];
  } else if (s_color == 'black') {
    colr = [0, 0, 0];
  } else if (s_color == 'random') {
    colr = random([
      [0, 0, 0],
      [255, 255, 255],
    ]);
  }
  let r = random(r_options[r_index]);
  let fuz = random(fuz_options[fuz_index]);
  let bub = {
    x,
    y,
    r,
    fuz,
    colr,
  };
  a_bubbles.push(bub);
}

function move_bubble_grid(bub) {
  let r = bub.r;
  let x = int(bub.x);
  x = x - (x % r);
  x = x + random([-1, 0, 1]) * r;
  let y = int(bub.y);
  y = y - (y % r);
  y = y + random([-1, 0, 1]) * r;
  bub.x = constrain(x, 0, width);
  bub.y = constrain(y, 0, height);
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
  }
  // print('colr', colr, 'a_alpha', a_alpha);
  colr[3] = a_alpha;
  let r = bub.r;
  if (a_grid) {
    strokeWeight(0);
  } else {
    r = r * 2;
    strokeWeight(0);
    // stroke(colr);
    // strokeWeight(4);
  }
  fill(colr);
  if (s_brush == 'circle') {
    circle(bub.x, bub.y, r);
  } else if (s_brush == 'square') {
    rect(bub.x, bub.y, r, r);
  } else if (s_brush == 'hrect') {
    rect(bub.x, bub.y, r, r / 2);
  } else if (s_brush == 'vrect') {
    rect(bub.x, bub.y, r / 2, r);
  }
}

function draw_bubble(bub) {
  if (a_grid) move_bubble_grid(bub);
  else move_bubble(bub);
  show_bubble(bub);
}
