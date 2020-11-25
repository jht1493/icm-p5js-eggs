let a_song;
let a_volume = 0.8;
let a_pan = 0;
let a_rate = 1;
let sound_files = [
  'media/C-trim.m4a',
  'media/C-trim.mp3',
  'media/C.mp3',
  'media/bass/Arpeggio Octave Major - E2 to E4 - Bass.mp3',
  'media/bass/Standard Octave Chromatic - E2 to E4 - Bass.mp3',
  'media/bass/Unison - E2 to E4 - Bass.mp3',
  'media/rainbow.mp3',
  'media/Untitled 3.m4a',
];
let sound_file = sound_files[0];

function setup() {
  createCanvas(400, 100);
  a_song = loadSound(sound_file, loaded);
  // a_song = loadSound('media/C.mp3', loaded);
  // a_song = loadSound('media/Pentatonic on F Sharp.mp3', loaded);
  init_ui();
}

function loaded() {
  print('loaded ', sound_file);
  print('a_song.duration()', a_song.duration());
  // a_song.play();
  // a_song.loop();
  a_song.setVolume(a_volume);
  // a_song.playMode('restart');
}

function draw() {
  background(200);
  text(sound_file, 10, 50);

  a_song.setVolume(a_volume);
  a_song.pan(a_pan);
  a_song.rate(a_rate);

  show_num('currentTime', a_song.currentTime());
  show_num('duration', a_song.duration());
  show_num('a_volume', a_volume);
  show_num('a_pan', a_pan);
  show_num('a_rate', a_rate);
}

function reset_action() {
  a_volume = 0.05;
  a_pan = 0;
  a_rate = 1;
}

function loop0_action() {
  a_song.loop();
}

function loop1_action() {
  // loop([startTime], [rate], [amp],
  //    [cueLoopStart], [duration])
  let startTime = 0;
  let rate = 1;
  let amp = 1;
  let cueStart = 18;
  let dur = 1;
  a_song.loop(startTime, rate, amp, cueStart, dur);
}

function loop2_action() {
  // loop([startTime], [rate], [amp],
  //    [cueLoopStart], [duration])
  let startTime = 0;
  let rate = 1;
  let amp = 1;
  let cueStart = 1;
  let dur = 1 / 8;
  a_song.loop(startTime, rate, amp, cueStart, dur);
}

function play_action() {
  a_song.play();
}

function stop_action() {
  a_song.stop();
}

function playMode_sustain_action() {
  a_song.playMode('sustain');
}

function playMode_restart_action() {
  a_song.playMode('restart');
}

function playMode_untilDone_action() {
  a_song.playMode('untilDone');
}

// -- Credits -------------------------------------------
// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/Pn1g1wjxl_0
