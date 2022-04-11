let penguinseq=[];

let penguinX=50;
let penguinY=250;

let penguin1,penguin2,penguin3,penguin4;
let stone1,stone2,stone3;
let present1,present2,present3;

let stones=[];
let presents=[];

let framecnt=0;

let crash=0;
let present=0;

function preload() {
  penguin1=loadImage("assets/screen/penguin1.png");
  penguin2=loadImage("assets/screen/penguin2.png");
  penguin3=loadImage("assets/screen/penguin3.png");
  penguin4=loadImage("assets/screen/penguin4.png");

  stone1=loadImage("assets/screen/stone1.png");
  stone2=loadImage("assets/screen/stone2.png");
  stone3=loadImage("assets/screen/stone3.png");

  present1=loadImage("assets/screen/present1.png");
  present2=loadImage("assets/screen/present2.png");
  present3=loadImage("assets/screen/present3.png");




}

function setup(){


  createCanvas(800,500);
  penguinseq=[penguin1,penguin2,penguin3,penguin4];

  for(var i=0;i<5;i++){
    let tempstone=new Stone();
    tempstone.y=i*100+50;
    stones.push(tempstone);

    let temppresent=new Present();
    temppresent.y=i*100+50;
    presents.push(temppresent);

  }






}

function draw(){
  //console.log(mouseX,mouseY);
  background(0);
  imageMode(CENTER);
 



  for(var i=0;i<stones.length;i++){
    stones[i].display();
    stones[i].move();

    if(penguinY==stones[i].y&&stones[i].x<80){
      //crash
      crash++;
      stones[i].image=random([stone1,stone2,stone3]);
      stones[i].x=random(830,2300);
    }

    if(stones[i].x<0){
      stones[i].image=random([stone1,stone2,stone3]);
      stones[i].x=random(830,2300);

    }


  }

  for(var i=0;i<presents.length;i++){
    presents[i].display();
    presents[i].move();

    if(penguinY==presents[i].y&&presents[i].x<80){
      //present
      present++;
      presents[i].image=random([present1,present2,present3]);
      presents[i].x=random(830,2300);
    }

    if(stones[i].x<0){
      stones[i].image=random([stone1,stone2,stone3]);
      presents[i].x=random(830,2300);

    }
  }

  textSize(12);
  fill(255);
  text('Presents: '+present, 705, 16);
  text('Crashes: '+crash,705,36);

  image(penguinseq[((framecnt-framecnt%10)/10)%4],penguinX,penguinY);

  framecnt++;

}

function keyPressed() {
  if (key == "w") {
    if(penguinY!=50){
      penguinY-=100;
    }
  } else if (key == "s") {
    if(penguinY!=450){
      penguinY+=100;
    }
  }
}

class Stone {
 constructor() {
   this.image=random([stone1,stone2,stone3]);
   this.x=random(830,2300);
   this.y=random([50,150,250,350,450]);

 }


 display() {
 imageMode(CENTER);
 image(this.image, this.x, this.y,100,100);
 }


 move() {
 this.x -= 3;
}
}

class Present {
  constructor() {
    this.image=random([present1,present2,present3]);
    this.x=random(830,2300);
    this.y=random([50,150,250,350,450]);
 
  }
 
 
  display() {
  imageMode(CENTER);
  image(this.image, this.x, this.y,100,100);
  }
 
 
  move() {
  this.x -= 3;
 }
 }