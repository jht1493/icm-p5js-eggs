let a_paused;
let bg_color = 240;
let s_color;

function init_ui() {
  // createImg(src, alt)
  let img0 = createImg(img_names[0], 'alt-0');
  img0.id('image-0');
  img0.style('width', '50px');
  img0.mousePressed(img0_action);

  let img1 = createImg(img_names[1], 'alt-1');
  img1.id('image-1');
  img1.style('width', '50px');
  img1.mousePressed(img1_action);

  let img2 = createImg(img_names[2], 'alt-2');
  img2.id('image-2');
  img2.style('width', '50px');
  img2.mousePressed(img2_action);

  let cb_pause = createCheckbox('Pause', false);
  cb_pause.style('font-size', '12pt');

  cb_pause.style('margin', '2pt 2pt');
  cb_pause.changed(function () {
    a_paused = this.checked();
  });

  let save_btn = createButton('Save');
  save_btn.style('font-size', '12pt');
  save_btn.style('margin', '2pt 0pt');
  save_btn.mousePressed(save_action);

  let more_btn = createButton('More');
  more_btn.style('font-size', '12pt');
  more_btn.style('margin', '2pt 2pt');
  more_btn.mousePressed(more_action);

  let reset_btn = createButton('Reset');
  reset_btn.style('font-size', '12pt');
  reset_btn.style('margin', '2pt 2pt');
  reset_btn.mousePressed(reset_action);

  let a_span = createSpan('color:');
  a_span.style('font-size', '16pt');
  a_span.style('margin', '0pt 0pt 0pt 4pt');

  let a_select = createSelect();
  a_select.style('font-size', '12pt');
  a_select.style('margin', '2pt 2pt');
  a_select.option('random');
  a_select.option('black');
  a_select.option('white');
  a_select.option('image');
  a_select.selected('image');
  a_select.changed(function () {
    s_color = this.value();
    print('s_color', s_color);
  });

  createP();

  let b_span = createSpan('a_side:');
  b_span.style('font-size', '16pt');
  b_span.style('margin', '0pt 0pt 0pt 4pt');

  let a_slide = createSlider(1, 100, a_side);
  a_slide.style('width', '256px');
  a_slide.input(function () {
    a_side = this.value();
    print('a_side', a_side);
  });
}
