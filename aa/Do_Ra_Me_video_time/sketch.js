let a_files = [
  'media/Do', // 0
  'media/Ra', // 1
  'media/Me', // 2
  'media/Fa', // 3
  'media/So', // 4
  'media/La', // 5
  'media/Te', // 6
  'media/Do-2', // 7
];
let a_sounds = [];
let a_images = [];
let a_video;
let v_volume = 0;

function preload() {
  for (let item of a_files) {
    a_sounds.push(loadSound(item + '.m4a'));
    a_images.push(loadImage(item + '.png'));
  }
  a_video = createVideo('media/Do-Ra-Mi-trim.mov');
}

let a_keys = {};
let snd_active = {};
let a_fft;

let c_cue = [
  { volume: 0.1, cueStart: 0.2, cueEnd: 0.6 },
  { volume: 0.1, cueStart: 0, cueEnd: 1 },
];
let c_index = 0;

let a_image;

function setup() {
  createCanvas(640, 300);
  a_fft = new p5.FFT();
  sketch_ui();
  a_video.hide();
}

function draw() {
  background(200);
  if (a_image) {
    image(a_image, 0, 0, 300, 300);
  }
  if (a_video) {
    // image(img, dx, dy, dWidth, dHeight, sx, sy, [sWidth], [sHeight])
    image(a_video, 340, 0, 300, 300, 40, 0, 300, 388);
    // image(a_video, 340, 0, 300, 300);
  }
  show_value('a_keys', a_keys);
  show_num('video_time', a_video.time());
  show_fft();
  show_fps();
  show_value('cue', c_cue[c_index]);
  a_video.volume(v_volume);
}

let a_start = 0; // Window onto fft data
let a_end = 100;

function show_fft() {
  // plot FFT.analyze() frequency analysis on the canvas
  let spectrum = a_fft.analyze();
  // spectrum.length = 1024

  let i_start = Math.round((spectrum.length * a_start) / 1000);
  let i_end = Math.round((spectrum.length * a_end) / 1000);
  let b_len = width / (i_end - i_start);
  // print('i_start', i_start, 'i_end', i_end, 'blen', blen);

  for (let i = i_start; i < i_end; i++) {
    fill(spectrum[i], 0, 0, 120);
    let x = map(i, i_start, i_end, 0, width);
    let h = map(spectrum[i], 0, 255, 0, height);
    rect(x, height - h, b_len, h);
  }
}

// Create a new oscillator on each keypress
function keyPressed() {
  let index = a_notes[key];
  if (index !== undefined) {
    a_keys[key] = index;
    let snd = a_sounds[index % a_sounds.length];
    let mod = Math.trunc(index / a_sounds.length);
    let rate = 1 + mod / 5;
    // print('index', index, 'mod', mod);

    // loop([startTime], [rate], [amp], [cueStart], [cueEnd])
    let c_ = c_cue[c_index];
    snd.loop(0, rate, c_.volume, c_.cueStart, c_.cueEnd);
    snd_active[key] = snd;

    show_num('rate', rate);
    a_image = a_images[index % a_images.length];
    // print('index', index, 'a_image', a_image)
  }
  // prevent any default behavior
  return false;
}

function keyReleased() {
  // print('keyReleased', key);
  delete a_keys[key];
  let snd = snd_active[key];
  if (snd) {
    delete snd_active[key];
    snd.stop();
  }
  // prevent any default behavior
  return false;
}

function play_action() {
  a_video.loop();
  // a_video.play();
}

function stop_action() {
  a_video.stop();
}

function set_cue(ncue) {
  c_index = ncue;
}
