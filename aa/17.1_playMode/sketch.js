let a_song;
let a_volume = 0.5;
let a_pan = 0;
let a_rate = 1;
let song_list = [
  'media/Nike/2020-11-09-Nike-If-I-Aint-Got.m4a',
  'media/Nike/2020-11-09-Nike-Jemiyo-Dive.m4a',
  'media/ref/Reference Scales_Chromatic Scale On F Sharp.mp3',
  'media/ref/Reference Scales_On A Flat-G Sharp.mp3',
  'media/ref/Reference Scales_On A.mp3',
  'media/ref/Reference Scales_On B Flat.mp3',
  'media/ref/Reference Scales_On B.mp3',
  'media/ref/Reference Scales_On C Sharp-D Flat .mp3',
  'media/ref/Reference Scales_On C.mp3',
  'media/ref/Reference Scales_On D.mp3',
  'media/ref/Reference Scales_On E Flat-D Sharp.mp3',
  'media/ref/Reference Scales_On E.mp3',
  'media/ref/Reference Scales_On F Sharp-G Flat.mp3',
  'media/ref/Reference Scales_On F.mp3',
  'media/ref/Reference Scales_On G.mp3',
  'media/ref/Reference Scales_Pentatonic on F Sharp.mp3',
  'media/ref/Reference Scales_Whole Tone On C Sharp.mp3',
  'media/ref/Reference scales_Whole Tone On C.mp3',
  'media/A/A Flat-G Sharp.mp3',
  'media/C-trim.m4a',
  'media/F/Reference Scales_Pentatonic on F Sharp.mp3',
  'media/rainbow.mp3',
  // 'media/C' + '.mp3',
  // 'media/this-dot-kp' + '.mp3',
  'media/C.mp3',
  'media/this-dot-kp.mp3',
];
let song_file = song_list[0];
let loop_args = [
  null, // loop0
  { loopStart: 3.1, loopEnd: 4, startTime: 0, rate: 1, amp: 1 }, // loop1
  { loopStart: 5.8, loopEnd: 10.5, startTime: 0, rate: 1, amp: 1 }, // loop2
  { loopStart: 8, loopEnd: 9, startTime: 0, rate: 1, amp: 1 }, // loop3
  { loopStart: 10, loopEnd: 11, startTime: 0, rate: 1, amp: 1 },
];
let playModes = ['restart', 'sustain', 'untilDone'];

function setup() {
  print('setup song_file', song_file);
  createCanvas(400, 80);
  a_song = loadSound(song_file, sound_loaded);
  sketch_ui({ playModes, song_list });
}

function sound_loaded() {
  print('sound_loaded song_file', song_file);
  print('a_song.duration()', a_song.duration());
  // a_song.play();
  // a_song.loop();
  a_song.setVolume(a_volume);
  // a_song.playMode('restart');
  show_num('duration', a_song.duration());
}

function set_song(nsong) {
  if (a_song) a_song.stop();
  song_file = nsong;
  a_song = loadSound(nsong, sound_loaded);
}

function draw() {
  background(200);
  text(song_file, 10, height / 2);
  text(a_song.currentTime(), 10, height - 20);

  a_song.setVolume(a_volume);
  a_song.pan(a_pan);
  a_song.rate(a_rate);

  show_num('currentTime', a_song.currentTime());
  show_num('a_volume', a_volume);
  show_num('a_pan', a_pan);
  show_num('a_rate', a_rate);
}

function set_loop(index) {
  // !!@ Document incorrect
  // loop([startTime], [rate], [amp], [loopStart], [loopEnd])
  let a = loop_args[index];
  print('set_loop a', a);
  if (!a) {
    a_song.loop();
    a = '()';
  } else {
    a_song.loop(a.startTime, a.rate, a.amp, a.loopStart, a.loopEnd);
  }
  show_value('loop', a);
}

function play_action() {
  a_song.play();
}

function stop_action() {
  a_song.stop();
}

function set_playMode(mode) {
  print('set_playMode', mode);
  a_song.playMode(mode);
}

// Issues:
// - currentTime() not reported consistently
// - not clear on cueLoopStart parameter to loop()
// - not clear on duration parameter to loop()
// - song_file name reported oddly.
//    - try let song_file = song_list[2];

// loop 3: goes to end
// { loopStart: 8, loopEnd: 9, startTime: 0, rate: 1, amp: 1 }, // loop3

// Safari: play / stop / playMode restart / play
// [Error] InvalidStateError: The object is in an invalid state.
// 	stop (p5.sound.min.js:2:65311)
// 	(anonymous function) (p5.sound.min.js:2:65311)
// 	(anonymous function) (p5.sound.min.js:2:107542)
// 	play_action (sketch.js:79)
// 	eventPrependedFxn

// Chrome: play
// Uncaught TypeError: Cannot read property 'length' of undefined
//     at RingBuffer.push (5d8e6962-852d-4986-9aba-533290420b39:75)
//     at AudioWorkletProcessor.process (5d8e6962-852d-4986-9aba-533290420b39:170)
// push @ 5d8e6962-852d-4986-9aba-533290420b39:75
// process @ 5d8e6962-852d-4986-9aba-533290420b39:170

// Chrome: no currentTime

// -- Credits ------------------------------------
// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/Pn1g1wjxl_0
//
// https://www.youraccompanist.com/free-scales-and-warm-ups/reference-scales
