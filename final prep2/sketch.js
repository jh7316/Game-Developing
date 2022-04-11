
function setup() {

  createCanvas(900,600);

  //1. Basic drawing techniques in p5 (ellipse, rect, point, line, stroke, fill, colors, transparency, etc)
  ellipse(xpos,ypos,width,height);
  rect(xpos,ypos,width,height);
  line(x1,y1,x2,y2);
  triangle(x1, y1, x2, y2, x3, y3);
  point(x1,y1);

  ellipseMode(CORNER);
  rectMode(CENTER);

  //thickness of stroke
  strokeWeight(10);

  fill(255);
  noFill();
  //255=white, 0=black

  strokeJoin(MITER);// default, other options:ROUND, BEVEL
  strokeCap(ROUND);// SQUARE, PROJECT

  //transparency, 0-255;
  fill(255,0,0,128); //=translucent red

  noCursor();

  frameRate(0);




}


function draw() {
  //rotating object example/rotate

  translate(mouseX, mouseY);
  rotate(a);
  image(pika,0,0);





  }
