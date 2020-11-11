var song;
var sliderRate;
var sliderPan;

function setup() {
  createCanvas(200, 200);
  song = loadSound('rainbow.mp3', loaded);
  sliderRate = createSlider(0, 1.5, 1, 0.01);
  sliderPan = createSlider(-1, 1, 0, 0.01);
}

function loaded() {
  // song.play();
  song.setVolume(0.5);
}

function draw() {
  // background(random(255));
  song.pan(sliderPan.value());
  song.rate(sliderRate.value());
}
