let a_images = [];

function preload() {
  a_images[0] = loadImage('images/IMG_2219.jpg');
  a_images[1] = loadImage('images/IMG_2228.jpg');
  a_images[2] = loadImage('images/IMG_0234-face.jpg');
}

function setup() {
  createCanvas(400, 500);
}

let ind = 2;
let n_w = 4;

function draw() {
  background(220);

  let xsize = width / n_w;
  let ysize = height / n_w;
  let x = 0;
  let y = 0;

  for (let y = 0; y < height; y += ysize) {
    let ix = 0;
    for (let x = 0; x < width; x += xsize) {
      // image(img, x, y, [width], [height])
      // let ii = (ind + frameCount) % a_images.length;
      image(a_images[ix], x, y, xsize, ysize);
      ix = (ix + 1) % a_images.length;
    }
  }
  // image(a_images[ind], x + xsize * 1, y + ysize * 0, xsize, ysize);
  // image(a_images[ind], x + xsize * 2, y + ysize * 0, xsize, ysize);
  // image(a_images[ind], x + xsize * 3, y + ysize * 0, xsize, ysize);
  // image(a_images[ind], x + xsize * 4, y + ysize * 0, xsize, ysize);

  // image(a_images[ind], x + xsize * 0, y + ysize * 1, xsize, ysize);
  // image(a_images[ind], x + xsize * 1, y + ysize * 1, xsize, ysize);
  // image(a_images[ind], x + xsize * 2, y + ysize * 1, xsize, ysize);

  // image(a_images[ind], x + xsize * 0, y + ysize * 2, xsize, ysize);
  // image(a_images[ind], x + xsize * 1, y + ysize * 2, xsize, ysize);
  // image(a_images[ind], x + xsize * 2, y + ysize * 2, xsize, ysize);
}

function mousePressed() {
  ind = (ind + 1) % a_images.length;
  print('ind', ind);
}

// Images from http://www.johnhenrythompson.com/3-dice
