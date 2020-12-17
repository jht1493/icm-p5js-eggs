var reefs = []

function setup() {
  createCanvas(1000, 637);
  reefs[0] = loadImage('Maui-Before.jpg');
  reefs[1] = loadImage('Maui-After.jpg');
  reefs[2] = loadImage('LizardIsland-Before.jpg');
  reefs[3] = loadImage('LizardIsland-After.jpg');
  reefs[4] = loadImage('AmericanSamoa-Before.jpg');
  reefs[5] = loadImage('AmericanSamoa-After.jpg');

}

function draw() {
  background(220);
  textSize(20);

  let photo_width = map(mouseX, 0, width, 0, 1000, true);
  print('photo width: ' + photo_width);
  print('mouseY: ' + mouseY);

  // LIZARD ISLAND BEFORE AND AFTER
    image(reefs[2], 0, 0, reefs[2].width, reefs[2].height);
    text("Lizard Island: March 2016", 725, 50);
    if (mouseY < height){
    image(reefs[3], 0, 0, photo_width, reefs[3].height, 0, 0, photo_width, reefs[3].height);

    strokeWeight(5);
    line(mouseX, 0, mouseX, height);
    }

    if (mouseX > 250 && mouseY < height){
      fill(255);
      text("Lizard Island: May 2016", 50, 50);
  }

  //  MAUI BEFORE AND AFTER
//   image(reefs[0], 0, 0, reefs[0].width, reefs[0].height);
//   text("Maui: August 2015", 725, 50);
//   if (mouseY < height) {
//     image(reefs[1], 0, 0, photo_width, reefs[1].height, 0, 0, photo_width, reefs[1].height);

//     strokeWeight(5);
//     line(mouseX, 0, mouseX, height);
//   }

//   if (mouseX > 250 && mouseY < height) {
//     text("Maui: November 2015", 50, 50);
//   }

  // AMERICAN SAMOA BEFORE AND AFTER
  //   image(reefs[4], 0, 0, reefs[4].width, reefs[4].height);
  //   text("American Samoa: December 2014", 650, 50);
  //   if (mouseY < height){
  //   image(reefs[5], 0, 0, photo_width, reefs[5].height, 0, 0, photo_width, reefs[5].height);

  //   strokeWeight(5);
  //   line(mouseX, 0, mouseX, height);
  //   }

  //   if (mouseX > 250 && mouseY < height){
  //    text("American Samoa: February 2015", 50, 50);
  // }

}

// Abby Faelnar
// https://editor.p5js.org/afaelnar/sketches/lnAEoM1OC

// IMAGE CREDITS: THE OCEAN AGENCY CORAL REEF IMAGE BANK