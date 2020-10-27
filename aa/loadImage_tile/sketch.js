let a_images = [];
let a_index = 2;
let a_side = 5;

function preload() {
  a_images[0] = loadImage('images/IMG_2219.jpg');
  a_images[1] = loadImage('images/IMG_2228.jpg');
  a_images[2] = loadImage('images/IMG_0234-face.jpg');
}

function setup() {
  createCanvas(400, 500);
}

function draw() {
  background(220);

  let xsize = width / a_side;
  let ysize = height / a_side;

  for (let y = 0; y < height; y += ysize) {
    let ix = y + a_index;
    for (let x = 0; x < width; x += xsize) {
      // image(img, x, y, [width], [height])
      // let ii = (a_index + frameCount) % a_images.length;
      ix = (ix + 1) % a_images.length;
      image(a_images[ix], x, y, xsize, ysize);
    }
  }
}

function mousePressed() {
  a_index = (a_index + 1) % a_images.length;
  print('a_index', a_index);
}

// https://editor.p5js.org/jht1493/sketches/C18P0IIfV
// Images from http://www.johnhenrythompson.com/3-dice
