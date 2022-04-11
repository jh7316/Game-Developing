let xPos, yPos;
let ballx, bally;
let xSpeed = 0;
let ySpeed = 0;
let cnt=1;
let objx;
let objy;
let bouncecnt=0;
let collcnt=0;
let deoxys;
let r,g,b;
let rs,gs,bs;
let p1=0;
let p2=1000;
let bouncesfx;
let deoxyssfx;
let runawaysfx;
let bgm;





function preload() {
  deoxys = loadImage('deoxys.png');
  bg = loadImage('background.png');
  bouncesfx = loadSound("bounce.wav");
  deoxyssfx = loadSound("deoxys.mp3");
  runawaysfx = loadSound("runaway.mp3");
  bgm = loadSound("bgm.mp3");
}
function setup() {

  createCanvas(1000, 550);


  xPos =500;
  yPos =540;
  ballx=500;
  bally=250;
  objx=9000;
  objy=9000;


  r=random(128,255);
  g=random(128,255);
  b=random(128,255);

  rs = random(-2,2);
  gs = random(-2,2);
  bs = random(-2,2);


}


function draw() {

  background(0);
  //drawing 2 background images(repeating backgrounds)
  image(bg, p1, 0,1000,550);
  image(bg, p2, 0,1000,550);

  // scrolling the images horizontally
  p1 -= 2;
  p2 -= 2;

  // did one of the backgrounds move fully off screen?
  if (p1 <= -1000) {
    // move it back to the right of p2
    p1 = p2 + 1000;
  }
  if (p2 <= -1000) {
    // move it back to the right of p1
    p2 = p1 + 1000;
  }


  noStroke();
  fill(100,100,200);
  rect(0,0,50,1500);
  rect(1000,0,50,1500);
  rect(0,0,2000,50);

  //text showing number of bounce and collision counts
  fill(255);
  text("Bounces: "+ bouncecnt,30,15);
  text("Collisions: "+ collcnt,130,15);

  //draw the box
  fill(20,20,110);
  rect(xPos, yPos, 130, 10);
  rectMode(CENTER);

    //moving our box

    if (keyIsDown(65)&&xPos>95) {
      xPos -= 15;
    }
    if (keyIsDown(68)&&xPos<width-95) {
      xPos += 15;
    }







   //draw the ball
   fill(r,g,b);
   ellipse(ballx, bally, 40, 40);
   fill(255);
   arc(ballx,bally,40,40,0,PI);
   fill(0);
   ellipse(ballx,bally,12,12);
   fill(250);
   ellipse(ballx,bally,9,9);
   ellipseMode(CENTER);

   //move the ball
   ballx += xSpeed;
   bally += ySpeed;

 // make sure the ball bounces off(stays inside the canvas)
 if (ballx > width-45 || ballx < 45) {

   xSpeed *= -1;
   bouncecnt+=1;
   bouncesfx.play();

 }


 if (bally < 45) {

   ySpeed *= -1;
   bouncecnt+=1;
   bouncesfx.play();
 }

 //bouncing off the box
 if ((ballx+20>(xPos-65)&&ballx-20<(xPos+65))&&yPos-bally-27<0) {
   ySpeed*=-1;
   bouncecnt+=1;
   bouncesfx.play();

   //changing the speed of the ball depending on where it lands on the paddle
   if (xSpeed>0){
     if (ballx<xPos){
        xSpeed=map(ballx,xPos-65,xPos,7,1);
  }else if (ballx>xPos){
        xSpeed=map(ballx,xPos,xPos+65,1,7);
  }
}else if (xSpeed<0){
   if (ballx<xPos){
        xSpeed=map(ballx,xPos-65,xPos,-7,-1);
  }else if (ballx>xPos){
        xSpeed=map(ballx,xPos,xPos+65,-1,-7);
 }
 }
 }



 //if the ball gets lost, restart the game
 if (bally-25>height){
 cnt=1;
 xPos =500;
 yPos =540;
 ballx=500;
 bally=250;
 xSpeed = 0;
 ySpeed = 0;

 objx=9000;
 objy=9000;

   runawaysfx.play();

}

//objective
image(deoxys,objx,objy,140,200);

//collision detection
//variables for rectangular collision detection
noStroke();
let d_top = objy;
let b_top = bally+20;
let d_left = objx;
let b_left = ballx-20;
let d_bottom = objy + 200;
let b_bottom = bally-20;
let d_right = objx + 140;
let b_right = ballx+20;

if (b_bottom < d_top ||
    b_top > d_bottom ||
    b_right < d_left ||
    b_left > d_right) {
    console.log("no collision!");
}
else {
  console.log("no collision!");
  collcnt+=1;
  objx=random(100,700);
  objy=random(200,200);
  deoxyssfx.play();
}



//gradually change the color of the ballx
 if (r > 255 || r < 128) {
   rs *= -1;
 }
 if (g > 255 || b < 128) {
   gs *= -1;
 }
 if (b > 255 || b < 128) {
   bs *= -1;
 }
 r+=rs;
 g+=gs;
 b+=bs;



}


function mousePressed() {
  if (cnt==1){
    //To prevent xSpeed and ySpeed being 0 or close to 0, I'm setting 2 ranges for xSpeed and ySpeed
    //where I avoid the range between -1 and 1.
    //Then, I'm setting another random variable of 1 or 2 that determines which range the speed will come from.
    //(either minus range or plus range)
    let i1= random(1,2);
    if (i1==1){
      xSpeed = random(-3,-1);
    } else{
      xSpeed = random(1,3);
    }

    let i2= random(1,2);
    if (i2==1){
      ySpeed = random(-2,-1);
    } else{
      ySpeed = random(1,2);
    }
    bouncecnt=0;
    collcnt=0;

    objx=random(100,700);
    objy=random(200,200);

    cnt=0;
    let pl=bgm.isPlaying();
    if (pl==false){
      bgm.play();
      bgm.loop();
    }
  }

}
