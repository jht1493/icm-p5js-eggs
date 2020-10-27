function init_ui() {
  a_canvas.mouseMoved(canvas_mouseMoved);

  let cb_pause = createCheckbox('Pause', false);
  cb_pause.style('font-size', '12pt');
  cb_pause.style('margin', '2pt 2pt');
  cb_pause.style('display', 'inline-block');
  cb_pause.changed(function () {
    a_paused = this.checked();
  });

  let cb_circle = createCheckbox('Circle', false);
  cb_circle.style('font-size', '12pt');
  cb_circle.style('margin', '2pt 2pt');
  cb_circle.style('display', 'inline-block');
  cb_circle.changed(function () {
    a_circle = this.checked();
  });

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
  a_select.selected('image');
  a_select.changed(function () {
    s_color = this.value();
    print('s_color', s_color);
  });

  createP();

  let b_span = createSpan('bg color:');
  b_span.style('font-size', '16pt');
  b_span.style('margin', '0pt 0pt 0pt 4pt');

  let bc_slide = createSlider(0, 255, 100);
  bc_slide.style('width', '256px');
  bc_slide.input(function () {
    bg_color = this.value();
    print('bg_color', bg_color);
    background(bg_color);
  });
}
