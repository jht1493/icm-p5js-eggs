let fps_tlast;
// Show frames per second averaged over the last n frames
function show_fps() {
  if (!fps_tlast) {
    fps_tlast = [millis()];
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
  show_num('video_fps', 1 / (avg / 1000));
}