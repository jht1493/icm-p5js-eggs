// show_obj(label, obj)
//   Display an object in span
//
function show_obj(label, obj) {
  label = label.replace(/[^a-z0-9+]+/gi, '_');
  let elm = select('#' + label);
  if (!elm) {
    elm = createSpan().id(label);
    elm.style('font-size', '30px');
  }
  obj = JSON.stringify(obj);
  elm.html('[' + label + ' ' + obj + '] '); {
    const brlabel = '_' + label;
    let elm = select('#' + brlabel);
    if (!elm) elm = createElement('br').id(brlabel);
  }
}

// show_num(label, num);
//   Show num in a span
//   label is the html id for the span
// show_span(label, num, opt);
//   opt = { line:1 }      // cause a line break
//   opt = { round:n }   // round num to n decimals
// eg. show miliseconds to 3 decimal places with a line break
//    show_span('milli', millis(), {line:1, round:3});
//
function show_num(label, num, opt) {
  label = label.replace(/[^a-z0-9+]+/gi, '_');
  let elm = select('#' + label);
  if (!elm) {
    elm = createSpan().id(label);
    elm.style('font-size', '30px');
  }
  let ndecimal = 2;
  if (opt && opt.round) {
    ndecimal = opt.round;
  }
  num = round(num, ndecimal)
  elm.html('[' + label + ' ' + num + '] ');
  if (opt && opt.line) {
    const brlabel = '_' + label;
    let elm = select('#' + brlabel);
    if (!elm) elm = createElement('br').id(brlabel);
  }
}

let fps_tlast;
// Show frames per second averaged over the last n frames
function show_fps() {
  if (!fps_tlast) {
    fps_tlast = [millis()];
    return;
  }
  fps_tlast.push(millis());
  if (fps_tlast.length > 60 * 5) {
    fps_tlast.splice(0, 1);
  }
  let sum = 0;
  for (let ind = 1; ind < fps_tlast.length; ind++) {
    sum += fps_tlast[ind] - fps_tlast[ind - 1];
  }
  let avg = sum / (fps_tlast.length - 1);
  show_num('fps', 1 / (avg / 1000));
}