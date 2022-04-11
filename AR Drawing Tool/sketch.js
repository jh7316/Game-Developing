// our video object
let capture;

// an image object to "memorize" the previous frame of video
let compareFrame;

// an image object to display the result of the background removal algorithm
let mergedFrame;

// threshold to see how tolerant we should be
let threshold = 60;

// keep track of "motion" pixels
let motionLocationTotalX = 0;
let motionLocationTotalY = 0;
let motionNumPixels = 0;

// our center point
let centerX = 0;
let centerY = 0;

let strokes=[];

let r=0,g=0,b=0;

let highestY=-999;
let highextX;
let finger;

function preload(){

  finger=loadImage("finger.png");
}

function setup() {
  createCanvas(320, 240);

  // start up our web cam
  capture = createCapture({
                            video: {
                                    mandatory: {
                                                minWidth: 320,
                                                minHeight: 240,
                                                maxWidth: 320,
                                                maxHeight: 240
                                              }
                                   }
                          });
  capture.hide();

  // create an empty image that will hold a previous frame of video
  compareFrame = createGraphics(320, 240);
  compareFrame.pixelDensity(1);

  // create an empty image that will hold the result of our motion detection algorithm
  mergedFrame = createGraphics(320, 240);
  mergedFrame.pixelDensity(1);
}

function draw() {
  



  // expose the pixels of each of our image objects
  capture.loadPixels();
  compareFrame.loadPixels();
  mergedFrame.loadPixels();

  // keep track of how many different pixels we have
  let diff = 0;

  // if we have a frame of video and we have a comparison frame we can attempt
  // to perform the background removal algorithm
  if (capture.pixels.length > 0 && compareFrame.pixels.length > 0) {
    // assume that we have no motion pixels
    motionLocationTotalX = 0;
    motionLocationTotalY = 0;
    motionNumPixels = 0;

    // examine all pixels in the video
    for (let i = 0; i < capture.pixels.length; i += 4) {
      // compare these pixels to the compareFrame pixels
      // we can use the distance formula for this
      if (dist(capture.pixels[i], capture.pixels[i+1], capture.pixels[i+2], compareFrame.pixels[i], compareFrame.pixels[i+1], compareFrame.pixels[i+2]) < threshold) {
        // this pixel is very similar - do nothing with it
        mergedFrame.pixels[i] = capture.pixels[i];
        mergedFrame.pixels[i+1] = capture.pixels[i+1];
        mergedFrame.pixels[i+2] = capture.pixels[i+2];
        mergedFrame.pixels[i+3] = 255;
      }
      else {
        // this pixel is very different - make it green to mark it as a "motion" pixel
        mergedFrame.pixels[i] = 0;
        mergedFrame.pixels[i+1] = 255;
        mergedFrame.pixels[i+2] = 0;
        mergedFrame.pixels[i+3] = 255;

        // keep track of this position
        motionLocationTotalX += (i/4)%320;
        motionLocationTotalY += (i/4)/320;

      

        if(highestY=999){
          highestY=(i/4)/320;
          highestX=(i/4)%320;
        }else{
          if((i/4)/320<highestY){
            highestY=(i/4)/320;
            highestX=(i/4)%320;
            
          }
        }

        motionNumPixels++;
        diff++;
      }
    }

    // update pixels and draw our merged frame
    mergedFrame.updatePixels();
    image(mergedFrame, 0, 0);

    // compute the center of motion if we have enough pixels
    if (motionNumPixels > 1000) {
      centerX = (motionLocationTotalX / motionNumPixels);
      centerY = (motionLocationTotalY / motionNumPixels);
    }
    

    rectMode(CENTER);

    fill(255,255,255,160);

    rect(width/2,height/2,width*0.8+25,height*0.8+25);

    fill(0,0,0);

    rect(311,50,15,15);

    fill(255,0,0);

    rect(311,74,15,15);

    fill(0,255,0);
    rect(311,98,15,15);

    fill(0,0,255);
    rect(311,122,15,15);

    fill(255);
    rect(311,164,15,15);

    let fingertip=centerY-highestY/4;

    if(centerX>width*0.1&&centerX<width*0.9&&fingertip>height*0.1&&fingertip<height*0.9){
      strokes.push([centerX,fingertip,r,g,b]);

    }
    
    for(var i=0;i<strokes.length;i++){
      noStroke();
      fill(strokes[i][2],strokes[i][3],strokes[i][4]);
      ellipse(strokes[i][0], strokes[i][1], 6, 6);
      
    }

    fill(r,g,b);
    ellipse(centerX, fingertip, 10, 10);
    image(finger,centerX-17,fingertip,40,40);

    // important - this frame of video becomes our comparision frame for the next iteration of 'draw'
    if (diff !== 0) {
      compareFrame.image(capture, 0, 0, 320, 240);
    }
  }


}


function keyPressed() {

}

function mouseClicked(){
  if(mouseX>303&&mouseX<319){
    if(mouseY>69&&mouseY<83){
      r=255;
      g=0;
      b=0;

    }else if(mouseY>92&&mouseY<107){
      r=0;
      g=255;
      b=0;

    }else if(mouseY>116&&mouseY<131){
      r=0;
      g=0;
      b=255;

    }else if(mouseY>158&&mouseY<172){
      strokes=[];

    }
    else if(mouseY>44&&mouseY<59){
      r=0;
      g=0;
      b=0;

    }



  }



}