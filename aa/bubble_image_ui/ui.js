let img_names = [
  'jht-hs-300.jpg',
  'DSC06148.JPG',
  'DSC06203.JPG',
  'IMG_0082.JPG',
  'IMG_0319.JPG',
  'IMG_1805.JPG',
  'IMG_1889.JPG',
  'IMG_2025.JPG',
  'IMG_2026.JPG',
  'IMG_2553.JPG',
  'IMG_4788.JPG',
];

function init_ui() {
  a_canvas.mouseMoved(canvas_mouseMoved);

  // createImg(src, alt)
  for (let ii = 0; ii < img_names.length; ii++) {
    let img = createImg('images/' + img_names[ii], 'alt-0');
    img.id('image-' + ii);
    img.style('width', '50px');
    img.mousePressed(img_action);
  }
  createP();

  let cb_pause = createCheckbox('Pause', a_paused);
  cb_pause.style('font-size', '12pt');
  cb_pause.style('margin', '2pt 2pt');
  cb_pause.style('display', 'inline-block');
  cb_pause.changed(function () {
    a_paused = this.checked();
  });

  let cb_grid = createCheckbox('Grid', a_grid);
  cb_grid.style('font-size', '12pt');
  cb_grid.style('margin', '2pt 2pt');
  cb_grid.style('display', 'inline-block');
  cb_grid.changed(function () {
    a_grid = this.checked();
  });

  let b_span = createSpan('brush:');
  b_span.style('font-size', '16pt');
  b_span.style('margin', '0pt 0pt 0pt 4pt');

  let b_select = createSelect();
  b_select.style('font-size', '12pt');
  b_select.style('margin', '2pt 2pt');
  b_select.option('circle');
  b_select.option('square');
  b_select.option('hrect');
  b_select.option('vrect');
  b_select.selected(s_brush);
  b_select.changed(function () {
    s_brush = this.value();
    print('s_brush', s_brush);
  });

  createP();

  let save_btn = createButton('Save');
  save_btn.style('font-size', '12pt');
  save_btn.style('margin', '2pt 0pt');
  save_btn.mousePressed(save_action);

  let more_btn = createButton('More');
  more_btn.style('font-size', '12pt');
  more_btn.style('margin', '2pt 2pt');
  more_btn.mousePressed(more_bubbles);

  let reset_btn = createButton('Reset');
  reset_btn.style('font-size', '12pt');
  reset_btn.style('margin', '2pt 2pt');
  reset_btn.mousePressed(reset_bubbles);

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
  a_select.selected(s_color);
  a_select.changed(function () {
    s_color = this.value();
    print('s_color', s_color);
  });

  createP();

  let bc_span = createSpan('bg color:');
  bc_span.style('font-size', '16pt');
  bc_span.style('margin', '0pt 0pt 0pt 4pt');

  let bc_slide = createSlider(0, 255, 100);
  bc_slide.style('width', '256px');
  bc_slide.input(function () {
    bg_color = this.value();
    print('bg_color', bg_color);
    background(bg_color);
  });

  createP();

  let al_span = createSpan('a_alpha:');
  al_span.style('font-size', '16pt');
  al_span.style('margin', '0pt 0pt 0pt 4pt');

  let al_slide = createSlider(0, 255, 100);
  al_slide.style('width', '256px');
  al_slide.input(function () {
    a_alpha = this.value();
  });

  createP();

  let r_span = createSpan('r_index:');
  r_span.style('font-size', '16pt');
  r_span.style('margin', '0pt 0pt 0pt 4pt');

  let r_select = createSelect();
  r_select.style('font-size', '12pt');
  r_select.style('margin', '2pt 2pt');
  for (let ii = 0; ii < r_options.length; ii++) {
    r_select.option(ii + '');
  }
  r_select.changed(function () {
    r_index = this.value();
    fuz_index = r_index;
    // print('r_index', r_index);
  });
}

function select_img(index) {
  a_index = index;
  a_img = a_imgs[index];
}

function select_img_next() {
  select_img((a_index + 1) % a_imgs.length);
}

function img_action() {
  print('img_action', this.id());
  let ii = this.id().split('-')[1];
  select_img(ii);
}
