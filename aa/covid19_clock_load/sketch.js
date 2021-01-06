// Full screen char drawing
let a_count = 3750;
let a_string = a_count + ' USA\nDeaths on\n2020-12-30\n';
let n_chars = 11;
let a_data;
let data_index;

const page_pause_frames = 30 * 5;

let draw_func;
let mstart;

function setup() {
  // createCanvas(340, 200);
  createCanvas(windowWidth, windowHeight - 40);
  // createCanvas(windowWidth, 400);
  // frameRate(2);
  sketch_ui();
  draw_func = draw_bit;
  begin_cycle();
  load_json();
}

function draw() {
  draw_func();
  draw_count(bit_count + '');
  if (!count_reached()) {
    show_num('time', (millis() - mstart) / 1000 / 60);
  }
}

function load_json() {
  let url =
    'https://epvisual.com/COVID-19-Impact/Dashboard/a0/c_data/world/c_series/United_States.json';
  loadJSON(url, (data) => {
    print('load_json data last', data[data.length - 1]);
    a_data = data;
    data_index = data.length - 1;
    select_entry();
  });
}

function select_entry() {
  const ent1 = a_data[data_index];
  const ent0 = a_data[data_index-1];
  a_count = ent1.Deaths - ent0.Deaths;
  a_string = a_count + ' USA\nDeaths on\n' + ent1.on + '\n';
  begin_cycle();
}

// https://github.com/EP-Visual-Design/COVID-19-parsed-data/blob/main/c_data/world/c_series/United_States.json

// https://raw.githubusercontent.com/EP-Visual-Design/COVID-19-parsed-data/main/c_data/world/c_series/United_States.json

function begin_cycle() {
  background(0);
  draw_init();
  mstart = millis();
  bit_count = 0;
  string_index = start_index;
  draw_char_start();
}

function draw_count(str) {
  let x = x_margin + char_len * (n_chars - str.length) / 2;
  // let x = x_margin + char_len * (5 - str.length);
  // print('x', x);
  let y = y_margin;
  fill('black');
  rect(x, y, char_len * 5, char_len);
  for (let ch of str) {
    draw_char(x, y, ch);
    x += char_len;
  }
}

function draw_char(x0, y0, ch) {
  let bytes = font8x8_dict[ch];
  for (let y1 = 0; y1 < 8; y1++) {
    let byte = bytes[y1];
    for (x1 = 0; x1 < 8; x1++) {
      if (byte & (1 << x1)) {
        fill('gray');
        draw_shape(x0 + x1 * pix_len,
          y0 + y1 * pix_len, pix_len, pix_len);
      }
    }
  }
}

const start_index = 0;
const end_index = a_string.length - 1;
let string_index = start_index;

let pix_len;
let char_len;
let x_margin;
let y_margin;
let x_pos;
let y_pos;
let y_top;
let x_right;

let a_char;
let a_bytes;
let bit_index;
let byte_index;
let a_x;
let a_y;
let a_byte;

let cursor_x;
let cursor_y;

let bit_count;
let a_rev = 0;

function draw_init() {
  pix_len = windowWidth / (n_chars * 8);
  // pix_len = floor(windowWidth / (n_chars * 8));
  // print('pix_len', pix_len, 'n', floor(windowWidth / pix_len));
  // pix_len = 10;
  char_len = 8 * pix_len;
  x_margin = pix_len;
  y_margin = pix_len;
  x_pos = x_margin;
  y_top = y_margin + char_len;
  y_pos = y_top;
}

function draw_char_start() {
  a_char = a_string[string_index];
  while (a_char === '\n') {
    draw_next_line();
    next_string_index();
    a_char = a_string[string_index];
    // print('string_index', string_index, 'a_char', a_char);
  }
  a_bytes = font8x8_dict[a_char];
  // print('x_pos', x_pos, 'y_pos', y_pos, 'a_char', a_char);
  // if (!a_bytes || (a_char === ' ' && !a_rev)) {
  if (!a_bytes) {
    // draw_next_char();
    return;
  }
  a_x = x_pos;
  a_y = y_pos;
  byte_index = 0;
  bit_index = 0;
  a_byte = a_bytes[byte_index];
  fill('black');
  rect(a_x, a_y, char_len * 2, char_len);
}

function draw_bit() {
  let bc = bit_count;
  while (bit_count == bc) {
    if (bit_index < 8) {
      if (a_byte & (1 << bit_index)) {
        fill(a_rev ? 'black' : 'white');
        draw_shape(a_x, a_y, pix_len, pix_len);
        if (!a_rev) bit_count++;
      } else {
        if (a_rev) {
          fill('white');
          draw_shape(a_x, a_y, pix_len, pix_len);
          bit_count++;
        }
      }
      bit_index += 1;
      a_x += pix_len;
    } else {
      bit_index = 0;
      byte_index += 1;
      a_x = x_pos;
      a_y += pix_len;
      if (byte_index < 8) {
        a_byte = a_bytes[byte_index];
        draw_bit();
      } else {
        draw_next_char();
      }
    }
    if (count_reached()) {
      //draw_func = draw_stop;
      page_pause_start();
      break;
    }
  }
}

function count_reached() {
  return bit_count >= a_count;
}

function draw_shape(a_x, a_y, len_x, len_y) {
  // rect(a_x, a_y, len_x, len_y)
  ellipse(a_x + len_x / 2, a_y + len_y / 2, len_x, len_y)
}

function draw_next_char() {
  next_string_index();
  x_pos += char_len;
  // if (x_pos + char_len > width - x_margin) {
  if (x_pos + char_len - x_margin > width) {
    draw_next_line();
  }
  draw_char_start();
}

function next_string_index() {
  string_index += 1;
  if (string_index > end_index) {
    string_index = start_index;
    a_rev ^= 1;
  }
}

function draw_next_line() {
  x_pos = x_margin;
  y_pos += char_len;
  if (y_pos + char_len > height - y_margin) {
    y_pos = y_top;
    string_index = start_index;
    // page_pause_start();
    // draw_func = draw_stop;
  }
}

function draw_stop() {

}

let page_pause_count;

function page_pause_start() {
  page_pause_count = page_pause_frames;
  draw_func = page_pause;
}

function page_pause() {
  page_pause_count -= 1;
  // frameRate(2);
  if (page_pause_count < 0) {
    // frameRate(30);
    draw_func = draw_bit;
    // begin_cycle();
    data_index -= 1;
    if (data_index <= 0) {
      data_index = a_data.length - 1;
    }
    select_entry();
  }
}

// const a_string = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
// const a_string = 'BLACK LIVES MATTER';
// const a_string = 'B';