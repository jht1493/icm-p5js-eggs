function sketch_ui() {
  // print('sketch_ui');
  {
    let elm = createSpan().id('time');
    elm.style('font-size', '20px');
  }
}

function show_num(label, num) {
  let elm = select('#' + label);
  num = round(num, 2);
  elm.html('[' + label + ' ' + num + '] ');
}