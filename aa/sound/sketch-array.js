let a_files = [
  'media/A Flat-G Sharp.mp3',
  'media/C.mp3',
  'media/Pentatonic on F Sharp.mp3',
];
let a_sounds = [];

function preload() {
  let index = 0;
  print('a_files', a_files);
  for (let fname of a_files) {
    print('index', index, 'fname', fname);
    a_sounds[index] = loadSound(fname);
    index += 1;
  }
  print('preload index', index);
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0, 255, 0);
  if (mouseIsPressed) {
    a_sounds[0].play();
  }
}
