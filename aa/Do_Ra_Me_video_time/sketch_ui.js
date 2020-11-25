function sketch_ui() {
  {
    let span = createSpan('Press on rows Z, A, Q, 1');
    span.style('font-size', '30px');
  }
  createP();

  {
    let span = createSpan().id('rate');
    span.style('font-size', '30px');
  }

  {
    let elm = createSpan().id('a_keys');
    elm.style('font-size', '30px');
  }
  createP();

  for (let index = 0; index < 2; index++) {
    let btn = createButton('cue' + index).id('cue_btn_' + index);
    btn.style('font-size', '30px');
    btn.mousePressed(function () {
      ui_set_cue(index);
    });
  }
  createP();

  {
    let elm = createSpan().id('cue');
    elm.style('font-size', '30px');
  }

  createP();

  function ui_set_cue(nindex) {
    for (let index = 0; index < 2; index++) {
      select('#cue_btn_' + index).style('background-color', 'white');
    }
    select('#cue_btn_' + nindex).style('background-color', 'gray');
    set_cue(nindex);
  }
  createP();

  {
    let btn = createButton('play');
    btn.style('font-size', '30px');
    btn.mousePressed(play_action);
  }

  {
    let btn = createButton('stop');
    btn.style('font-size', '30px');
    btn.mousePressed(stop_action);
  }
  createP();

  {
    let span = createSpan('volume:');
    span.style('font-size', '30px');
    // createSlider(min, max, [value], [step])
    let slider = createSlider(0, 1, v_volume, 0.01);
    slider.style('width', '360px');
    slider.input(function () {
      v_volume = slider.value();
    });
  }
  createP();

  {
    let span = createSpan().id('video_time');
    span.style('font-size', '30px');
  }
  createP();

  {
    let span = createSpan().id('video_fps');
    span.style('font-size', '30px');
  }
}

function show_num(label, num) {
  let elm = select('#' + label);
  num = round(num, 2);
  elm.html('[' + label + ' ' + num + '] ');
}

function show_value(label, value) {
  let elm = select('#' + label);
  value = JSON.stringify(value);
  elm.html('[' + label + ' ' + value + '] ');
}
