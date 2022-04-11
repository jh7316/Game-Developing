let gamestate=1;
let xpos,ypos;
let size=50;//fffd;
let NoiseOffset=600;
let Movement;

let ghostarray=[];
let framecnt=0;

let point=0;

let prevX=0;
let currentghost;


function preload() {
  bg=loadImage("background_spooky.jpg");
  bat=loadImage("bat.png");
  candycorn=loadImage("candy_corn.png");
  ghostleft=loadImage("ghost_left.png");
  ghostright=loadImage("ghost_right.png");
  lollypop=loadImage("lollypop.png");
  pumpkin=loadImage("pumpkin_normal.png");
}

function setup() {


  createCanvas(800, 450);

  //..//.





  
  currentghost=ghostright;



}

function draw() {
  image(bg,0,0,800,450);

  if(gamestate==1){
      ///
  fill(255); 
  text("Points: "+point,10,10);
  noCursor();


   //

  if(framecnt%20==0){
    let temp=new TrickOrTreat();
    ghostarray.push(temp);
  }

  for(var i=0;i<ghostarray.length;i++){
    ghostarray[i].move();
    ghostarray[i].display();
   

    if(ghostarray[i].y>450){
      ghostarray.splice(i,1);
    }

    if(dist(ghostarray[i].x,ghostarray[i].y,mouseX,mouseY)<20){
      if(ghostarray[i].identity=="candycorn"){
          point+=1;
      }else if(ghostarray[i].identity=="lollypop") {
          point+=5;


      }else if(ghostarray[i].identity=="bat"){
          point-=10;
      }
      if(point>24){
        gamestate=0;
      }
      ghostarray.splice(i,1);
      i-=1;
    }
  }
  //

  //
  imageMode(CENTER);
  image(pumpkin,400,250);
  imageMode(CORNER);


   //ghost
  //perlin noise
  size = map( noise(NoiseOffset), 0, 1, 30, 70 );

  if(size<20){
    size=20;
  }else if(size>80){
    size=80;
  }

  NoiseOffset += 0.01;

  //

  
  
  if(prevX>mouseX){
    currentghost=ghostleft;

  }else if(prevX<mouseX){
    currentghost=ghostright;
    
  }

  image(currentghost,mouseX,mouseY,size,size*2);  
  

  

  //

  }else if(gamestate==0){

    text("You win Halloween!!!",370,230);
  }



  framecnt+=1;

  prevX=mouseX;
  //
}


class TrickOrTreat{
  constructor(){
    this.x=400;
    this.y=225;
    this.chance=random([1,2,3,4,5,6,7,8,9,10]);
    if(this.chance==1){
      this.identity="lollypop";
    }else if(this.chance==2){
      this.identity="bat";
    }else{
      this.identity="candycorn";
    }
    this.xdir=random([-1,1]);
    this.xspeed=random(1,5);
    this.jumpPower=random(4,8);
    this.orientation=random(0,3.14);
  }

  display(){
//
    
   translate(this.x,this.y);
    rotate(this.orientation);
    

    if(this.identity=="lollypop"){
      image(lollypop,0,0);
    }else if(this.identity=="bat"){
      image(bat,0,0);
    }else{
      image(candycorn,0,0);
    }
    

    rotate(-this.orientation);

    translate(-this.x,-this.y);
   

    
    
    
//
    //
  }

  move(){
    //
    //
   //
    
    //

    this.x+=this.xdir*this.xspeed;
    //jumping mechanism 
    this.y -= this.jumpPower;

    // degrade jump power slightly using gravity
    this.jumpPower -= 0.2;

    this.orientation+=0.02;


  }
} 
