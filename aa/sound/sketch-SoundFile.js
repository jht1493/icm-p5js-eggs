// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/Pn1g1wjxl_0

let a_song;
let a_volume = 0.1;
let a_pan = 0;
let a_rate = 1;

function setup() {
  createCanvas(200, 200);
  a_song = loadSound('media/A Flat-G Sharp.mp3', loaded);
  // a_song = loadSound('media/A Flat-G Sharp.mp3', loaded);
  // a_song = loadSound('media/C.mp3', loaded);
  // a_song = loadSound('media/Pentatonic on F Sharp.mp3', loaded);
  init_ui();
}

function loaded() {
  print('loaded ');
  print('a_song.duration()', a_song.duration());
  // a_song.play();
  // a_song.loop();
  a_song.setVolume(a_volume);
  // a_song.playMode('restart');
}

function draw() {
  // background(random(255));
  // a_song.pan(sliderPan.value());
  // a_song.rate(sliderRate.value());
  a_song.setVolume(a_volume);
  // a_song.pan(a_pan);
  // a_song.rate(a_rate);
  show_num('currentTime', a_song.currentTime());
  show_num('a_volume', a_volume);
  show_num('a_pan', a_pan);
  show_num('a_rate', a_rate);

  // print('a_song.currentTime', a_song.currentTime())
}

function reset_action() {
  a_volume = 0.05;
  a_pan = 0;
  a_rate = 1;
}

function loop1_action() {
  // loop([startTime], [rate], [amp],
  //    [cueLoopStart], [duration])
  let startTime = 0;
  let rate = 1;
  let amp = 1;
  let cueStart = 2;
  let dur = 1;
  a_song.loop(startTime, rate, amp, cueStart, dur);
}

function loop2_action() {
  // loop([startTime], [rate], [amp],
  //    [cueLoopStart], [duration])
  let startTime = 0;
  let rate = 1;
  let amp = 1;
  let cueStart = 4;
  let dur = 1;
  a_song.loop(startTime, rate, amp, cueStart, dur);
}

function play_action() {
  a_song.play();
}

function stop_action() {
  a_song.stop();
}

function init_ui() {
  {
    let elm = createSpan().id('currentTime');
    elm.style('font-size', '30px');
  }

  {
    let elm = createSpan().id('a_volume');
    elm.style('font-size', '30px');
  }

  {
    let elm = createSpan().id('a_pan');
    elm.style('font-size', '30px');
  }

  {
    let elm = createSpan().id('a_rate');
    elm.style('font-size', '30px');
    createP();
  }

  {
    let a_span = createSpan('volume:');
    a_span.style('font-size', '30px');
    // createSlider(min, max, [value], [step])
    let a_slider = createSlider(0, 1, a_volume, 0.01);
    a_slider.style('width', '360px');
    a_slider.input(function () {
      a_volume = a_slider.value();
    });
    createP();
  }

  {
    let a_span = createSpan('pan:');
    a_span.style('font-size', '30px');
    // createSlider(min, max, [value], [step])
    // -1, 1, 0, 0.01
    let a_slider = createSlider(-1, 1, a_pan, 0.01);
    a_slider.style('width', '360px');
    a_slider.input(function () {
      a_pan = a_slider.value();
    });
    createP();
  }

  {
    let a_span = createSpan('rate:');
    a_span.style('font-size', '30px');
    // createSlider(min, max, [value], [step])
    // 0, 1.5, 1, 0.01
    let a_slider = createSlider(-2, 2, a_rate, 0.01);
    a_slider.style('width', '360px');
    a_slider.input(function () {
      a_rate = a_slider.value();
    });
    createP();
  }

  {
    let a_button = createButton('play');
    a_button.style('font-size', '30px');
    a_button.mousePressed(play_action);
  }

  {
    let a_button = createButton('stop');
    a_button.style('font-size', '30px');
    a_button.mousePressed(stop_action);
  }
  createP();

  {
    let a_button = createButton('playMode restart');
    a_button.style('font-size', '30px');
    a_button.mousePressed(function () {
      a_song.playMode('restart');
    });
  }

  {
    let a_button = createButton('sustain');
    a_button.style('font-size', '30px');
    a_button.mousePressed(function () {
      a_song.playMode('sustain');
    });
  }

  {
    let a_button = createButton('untilDone');
    a_button.style('font-size', '30px');
    a_button.mousePressed(function () {
      a_song.playMode('untilDone');
    });
  }
  createP();
  // {
  //   let a_button = createButton('reset');
  //   a_button.style('font-size', '30px');
  //   a_button.mousePressed(reset_action);
  // }

  {
    let a_button = createButton('loop0');
    a_button.style('font-size', '30px');
    a_button.mousePressed(function () {
      a_song.loop();
    });
  }

  {
    let a_button = createButton('loop1');
    a_button.style('font-size', '30px');
    a_button.mousePressed(loop1_action);
  }

  {
    let a_button = createButton('loop2');
    a_button.style('font-size', '30px');
    a_button.mousePressed(loop2_action);
  }
}

function show_num(label, num) {
  let elm = select('#' + label);
  num = round(num, 2);
  elm.html('[' + label + ' ' + num + '] ');
}
