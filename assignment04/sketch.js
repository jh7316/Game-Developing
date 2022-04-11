let uparrow,downarrow,rightarrow,leftarrow;
let mouseclicked=0;
let robarray=[];
let arrowarray=[];
let framecnt=0;
let temp;
let clickcnt;
let score=0;

function preload() {
  uparrow=loadImage('arrow_up.png');
  downarrow=loadImage('arrow_down.png');
  rightarrow=loadImage('arrow_right.png');
  leftarrow=loadImage('arrow_left.png');


}


function setup() {

  createCanvas(800,600);

  //create arrows in advance
  for(var i=1;i<8;i++){
    for(var j=1;j<8;j++){
      let num=random(1,10);
      if(num>8&&(i!=1&&j!=7)&&(i!=7&&j!=7)&&(i!=4&&j!=1)){
        clickcnt=0;
      }else{ clickcnt=10;}
      let temp=new arrow(width*j/8,height*i/8,clickcnt);
      arrowarray.push(temp);
    }

    
  }



    


}


function draw() {
  framecnt+=1;
  background(180);
  fill(0);
  text("SCORE  :  "+score,20,20);

  //display arrow
  for(var i=0;i<arrowarray.length;i++){
    arrowarray[i].checkClick();
    arrowarray[i].display();
  }

  //display 'goals' that robots have to reach 
    fill(244,141,154);
    rect(width,height*7/8,50,50);
    rect(width,height/8,50,50);
  


  //create new robot periodically
  if(framecnt%100==0){
    let temp=new robot(0,height/2,"right");
    robarray.push(temp);
  }

  //display each robot in array
  for(var i=0;i<robarray.length;i++){
    robarray[i].move();
    robarray[i].display();

    //remove robot if it gets out of the screen 
    if(robarray[i].x>800){
      //if robot reaches the goal, add the score
      if(dist(robarray[i].x,robarray[i].y,width,height*7/8)<5||dist(robarray[i].x,robarray[i].y,width,height/8)<5){
        score+=1;
      }
      robarray.splice(i,1);
    }
  }

  



  



  






mouseclicked=0;
}

function mouseClicked(){
  mouseclicked=1;
}



//constructing robot class
class robot{
  constructor(x,y,dir){
    this.x=x;
    this.y=y;
    this.direction=dir;

    //determine robot head,body size
    this.headsize=random(25,50);
    this.bodysize=this.headsize+7

    //determine robot head,body color
    this.r1=random(0,255);
    this.g1=random(0,255);
    this.b1=random(0,255);

    this.r2=random(0,255);
    this.g2=random(0,255);
    this.b2=random(0,255);


    //making sure head color!=body color
    while(this.r1==this.r2&&this.g1==this.g2&&this.b1==this.b2){
      this.r2=random(0,255);
      this.g2=random(0,255);
      this.b2=random(0,255);

      
    }
    
    //determine initial transparency of thruster circle
    this.a=random(0.2,1);
    this.achange=0.01;


    //determine robot eye
    //creates random integer between 0 and 1
    this.eyetype=random([0,1]);

    //determines whether to put on extra decoration on robot
    this.deco=random([0,1]);
    }

    //function that draws the robot
    display(){
      noStroke();

      //first, draw the thruster circle
      //gradually change the transparency of thruster
      if(this.a>0.99||this.a<0.2){
        this.achange*= (-1);
      }
      this.a+=this.achange;
      
      fill('rgba(255,255,0,'+this.a+')');

      //determine position of thruster based on direction
      ellipseMode(CENTER);
      if(this.direction=="right"){
        ellipse(this.x-this.bodysize/2,this.y,this.bodysize/2,this.bodysize/2);

      }else if(this.direction=="left"){
        ellipse(this.x+this.bodysize/2,this.y,this.bodysize/2,this.bodysize/2);
        
      }else if(this.direction=="up"){
        ellipse(this.x,this.y+this.bodysize/2,this.bodysize/2,this.bodysize/2);

      }else if(this.direction=="down"){
        ellipse(this.x,this.y-this.bodysize/2-this.headsize,this.headsize/2,this.headsize/2);

      }


      //draw arms/legs
      fill(255);
      rect(this.x,this.y-this.bodysize/4,this.bodysize*1.75,this.bodysize/7);
      rect(this.x-this.bodysize/4,this.y+this.bodysize/4,this.bodysize/7,this.bodysize);
      rect(this.x+this.bodysize/4,this.y+this.bodysize/4,this.bodysize/7,this.bodysize);

      //draw head and body
      rectMode(CENTER);
      fill(this.r1,this.g1,this.b1);
      rect(this.x,this.y-(this.headsize+this.bodysize)/2,this.headsize,this.headsize);
      fill(this.r2,this.g2,this.b2);
      rect(this.x,this.y,this.bodysize,this.bodysize);

      //draw eye
      if(this.eyetype==0){
        fill(255);
        rect(this.x-this.headsize*0.25,this.y-this.headsize*0.75-this.bodysize/2,5,this.headsize*0.2);
        rect(this.x+this.headsize*0.25,this.y-this.headsize*0.75-this.bodysize/2,5,this.headsize*0.2);
      }else if(this.eyetype==1){
        fill(255);
        rect(this.x,this.y-this.headsize*0.75-this.bodysize/2,this.headsize*0.85,this.headsize*0.2);
      }

      //draw mouth
      arc(this.x, this.y-this.bodysize/2-this.headsize/2, this.headsize/2, this.headsize/4, 0, PI);

      //extra frame on some robot's body
      if(this.deco==0){
        fill(this.r1,this.g1,this.b1);
        rect(this.x,this.y,this.bodysize*0.70,this.bodysize*0.70);
      }

      
      
      

  
    }

    //function that moves the robot
    move(){
      

      if(checkArrowNearby(this.x,this.y)!="none"){
        this.direction=checkArrowNearby(this.x,this.y);
      }
      

      if(this.direction=="right"){
        this.x+=1;
      }else if(this.direction=="left"){
        this.x-=1;

      }else if(this.direction=="up"){
        this.y-=1;

      }else if(this.direction=="down"){
        this.y+=1;

      }
    }

  
  
  }

  class arrow{
    constructor(x,y,clickcnt){
      this.x=x;
      this.y=y;

      let i=random([0,1,2,3]);
      if(i==0){
        this.direction="right";
      }else if(i==1){
        this.direction="left";
      
      }else if(i==2){
        this.direction="up";
      }else if(i==3){
        this.direction="down";
      }

      this.clickcnt=clickcnt;


    }

    display(){

      if(this.clickcnt==0){
        fill(200,125,0);
        ellipse(this.x,this.y,65,65);
      }

      imageMode(CENTER);
      if(this.direction=="right"){
        image(rightarrow,this.x,this.y);
    }else if(this.direction=="left"){
      image(leftarrow,this.x,this.y);
    }else if(this.direction=="up"){
      image(uparrow,this.x,this.y);
    }else if(this.direction=="down"){
      image(downarrow,this.x,this.y);
    }
     fill(0);
     text(this.clickcnt,this.x-25,this.y-25);

    
  }


  checkClick(){


    if(mouseclicked==1 && dist(this.x,this.y,mouseX,mouseY)<28&&this.clickcnt!=0){
      this.clickcnt-=1;
      mouseclicked=0;
      if(this.direction=="right"){
        this.direction="down";
      }else if(this.direction=="left"){
        this.direction="up";
      }else if(this.direction=="up"){
        this.direction="right";
      }else if(this.direction=="down"){
        this.direction="left";
    }


    }

  }
  
    
  }

  function checkArrowNearby(x,y){
    let changedir="none";
    for(var i=0;i<arrowarray.length;i++){
      if(dist(x,y,arrowarray[i].x,arrowarray[i].y)<10){
        changedir=arrowarray[i].direction;
        break;
      }
    }

    return changedir;
  }
