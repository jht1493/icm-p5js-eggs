// -- init_ui -------------------------------------------
function init_ui() {
  {
    let elm = createSpan().id('currentTime');
    elm.style('font-size', '30px');
  }

  {
    let elm = createSpan().id('duration');
    elm.style('font-size', '30px');
  }
  createP();

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
  }
  createP();

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
    a_button.mousePressed(playMode_sustain_action);
  }

  {
    let a_button = createButton('sustain');
    a_button.style('font-size', '30px');
    a_button.mousePressed(playMode_sustain_action);
  }

  {
    let a_button = createButton('untilDone');
    a_button.style('font-size', '30px');
    a_button.mousePressed(playMode_untilDone_action);
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
    a_button.mousePressed(loop0_action);
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
