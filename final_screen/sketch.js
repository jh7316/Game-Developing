let bg,present1,present2,present3,present4,present5,sled;

let framecnt=0;

let presents=[];

let points=0;
let localpoints=0;
let addtototal=false;


function preload() {

  bg=loadImage("images/winter_background.png");
  present1=loadImage("images/present1.png");
  present2=loadImage("images/present2.png");
  present3=loadImage("images/present3.png");
  present4=loadImage("images/present4.png");
  present5=loadImage("images/present5.png");

  sled=loadImage("images/sled.png");

}

function setup(){


  createCanvas(800,600);

  imageMode(CENTER);
  image(sled,width/2,height/2);

  for(var i=0;i<20;i++){
    let temppresent=new Present();
    presents.push(temppresent);
  }





}

function draw(){
  console.log(mouseX,mouseY);

  image(bg,width/2,height/2);
  imageMode(CENTER);
  image(sled,width/2,height/2);
  textSize(40);
  fill(0);
  text("points:" + points,width/2-60,height/2+100);

  if (mouseIsPressed) {
    fill(255,255,0,80);
    noStroke();
    ellipseMode(CENTER);
    ellipse(mouseX,mouseY,100,100);
    textSize(30);
    fill(0);
    text(localpoints,mouseX,mouseY+20);
    
    localpoints=0;

    for(var i=0;i<presents.length;i++){
     if(dist(mouseX,mouseY,presents[i].x,presents[i].y)<100){
       this.added=true;
       this.inside=true;
       presents[i].movetowardsmouse();
       if(this.added==true){
        localpoints+=presents[i].point;
        this.added=false;

       }
       
       ////

     }

   }

   if(dist(mouseX,mouseY,width/2,height/2)<20){

      points=points+localpoints;
  
     
     localpoints=0;
   }
  } 


  for(var i=0;i<presents.length;i++){
    presents[i].display();
    presents[i].move();

    if((presents[i].x<-51)||(presents[i].x>width+51||dist(presents[i].x,presents[i].y,width/2,height/2)<20)){
      let temp=random([0,1]);
      if(temp==0){
        presents[i].y=100;
        presents[i].speed=random(3,5);
        presents[i].dir=-1;

      }else{
        presents[i].y=500;
        presents[i].speed=random(3,5);
        presents[i].dir=1;

      }
      
    }
  }

  

 



}



function mousePressed() {
  
}

class Present{
  constructor(){
    this.image=random([present1,present2,present3,present4,present5]);
    this.point=random([1,2,3,4,5]);
    this.level=random(['high','low']);
    if(this.level=='high'){
      this.y=100;
      this.x=width+50;
      this.dir=-1;
    }else{
      this.y=500;
      this.dir=1;
      this.x=-50
    }

    this.speed=random(3,5);
    this.inside=false;
    this.added=false;

  }

  display(){
    imageMode(CENTER);
    image(this.image,this.x,this.y);
    textSize(30);
    fill(0);
    if(mouseIsPressed==false|| dist(mouseX,mouseY,this.x,this.y)>100){
      text(this.point, this.x-10, this.y-40);

    }
    
  }

 

  move(){
    this.x+=this.dir*this.speed;
  }

  movetowardsmouse(){
    let diffx=mouseX-this.x;
    let diffy=mouseY-this.y;

    this.x=this.x+diffx*0.1;
    this.y=this.y+diffy*0.1;
    ///
  }
}