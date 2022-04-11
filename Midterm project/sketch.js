let jumpMode = false;
let jumpPower=10; 
let gravity=0.4;

let xpos=200;
let ypos=450;

let floorY=450;

let localjumpcnt=0;

let enemyarr=[];
let itemarr=[];
let framecnt=0;

let pstate='normal';

let scrollspeed=7;

let runstate=false;
let maxstate=false;

let runtime=0;
let maxtime=0;

let size;
let size_real;
let width;

let life=200;
let score=0;

let p1=0;
let p2=900;

let p3=0;
let p4=400;
let p_5=800;
let p6=1200;

let slidestate=false;

let gamestate=-1;
let bg;



let bgm;
let startbgm;
let jumpsound;




let mainlogo, starttext,gameover,overtext;
let ground,groundup,physical_high,physical_low;
let magical_high,magical_lowlow,magical_lowhigh;
let spiritual_high,spiritual_low;
let run,max,life1,physicalitem,magicalitem,spiritualitem,lifebarlogo;
let pnormal,pnormal_sliding,pphysical,pphysical_sliding,pspiritual,pspiritual_sliding;


function preload() {

  
  bgm = loadSound('bgm.mp3');
  startbgm =loadSound('startbgm.mp3'); 
  jumpsound=loadSound('jump.wav');
  
  

  mainlogo=loadImage('images/mainlogo.png');
  starttext=loadImage('images/starttext.png');

  gameover=loadImage('images/gameover.png');
  overtext=loadImage('images/overtext.png');

  ground=loadImage('images/ground.png');
  groundup=loadImage('images/groundup.png');
  bg=loadImage('images/bg2.png');
  physical_high=loadImage('images/physical_high.png');
  physical_low=loadImage('images/physical_low.png');

  magical_high=loadImage('images/magical_high.png');
  magical_lowlow=loadImage('images/magical_lowlow.png');
  magical_lowhigh=loadImage('images/magical_lowhigh.png');

  spiritual_high=loadImage('images/spiritual_high.png');
  spiritual_low=loadImage('images/spiritual_low.png');

  run=loadImage('images/run.PNG');
  max=loadImage('images/max.PNG');
  life1=loadImage('images/life.PNG');
  physicalitem=loadImage('images/physicalitem.PNG');
  magicalitem=loadImage('images/magicalitem.PNG');
  spiritualitem=loadImage('images/spiritualitem.PNG');
  lifebarlogo=loadImage('images/lifebarlogo.PNG');


  pnormal=loadImage('images/pnormal.png');
  pnormal_sliding=loadImage('images/pnormal_sliding.png');
  pphysical=loadImage('images/pphysical.png');
  pphysical_sliding=loadImage('images/pphysical_sliding.png');
  pmagical=loadImage('images/pmagical.png');
  pmagical_sliding=loadImage('images/pmagical_sliding.png');
  pspiritual=loadImage('images/pspiritual.png');
  pspiritual_sliding=loadImage('images/pspiritual_sliding.png');

  



}

function setup() {

  createCanvas(900,600);


}


function draw() {

  if(life==0){
    gamestate=0;
  }

if(gamestate==-1 || gamestate==1){

    //drawing 2 background images(repeating backgrounds)
    imageMode(CORNER);
    image(bg, p1, 0,900,450);
    image(bg, p2, 0,900,450);
  
    // scrolling the images horizontally
    p1 -= scrollspeed*0.1;
    p2 -= scrollspeed*0.1;
  
    // did one of the backgrounds move fully off screen?
    if (p1 <= -900) {
      // move it back to the right of p2
      p1 = p2 + 900;
    }
    if (p2 <= -900) {
      // move it back to the right of p1
      p2 = p1 + 900;
    }
  

  if(gamestate==-1){
    //Opening page
    
    let pl=startbgm.isPlaying();
    if (pl==false){
    startbgm.play();
    startbgm.loop();
    }
    

    imageMode(CENTER);
    image(mainlogo,450,300);
    image(starttext,450,430);
    
  }
  
  
  if(gamestate==1){

    startbgm.stop();
    
    let pl_1=bgm.isPlaying();
     if (pl_1==false){
    bgm.play();
    bgm.loop();
      }
      
  
  
     //jumping mechanics
     // handle jumping
     if (jumpMode) {
      // adjust y position of character based on jumpPower
      ypos -= jumpPower;
  
      // degrade jump power slightly using gravity
      jumpPower -= gravity;
  
      
  
  
  
      // did we go through the floor?  if so, stop jumping and put the player onto the floor
      if (ypos > floorY) {
        jumpMode = false;
        localjumpcnt=0;
        jumpPower = 10;
        ypos = floorY;
      }
    
  
    }
  
    
      //default values
      width=size*1.2;
      scrollspeed=7;
      size=120;
  
      //sliding
    if(keyIsDown(83)&& jumpMode==false){
      slidestate=true;
    }
      //check if the princess is in running state or enlarged state
     if(runstate==true){
       scrollspeed=10;
       runtime+=1;
       if(runtime>200){
         runstate=false;
       }
     }
  
     if(maxstate==true){
      maxtime+=1;
      size=250;
      width=size*1.2;
  
      if(maxtime>200){
        maxstate=false;
      }
    }
  
  
  
    
    if(framecnt%80==0){
      let temp=new enemy();
      enemyarr.push(temp);
  
      let j=random([0,1,2,3]);
      if(j==0){
        let tempitem=new item();
        if(temp.level=='high'){
          tempitem.y=450;
        }else{
          tempitem.y=200;
        }
        itemarr.push(tempitem);
      }
  
      
    }
  
    for(var j=0;j<itemarr.length;j++){
      itemarr[j].move();
      itemarr[j].display();
  
      if(itemarr[j].x<0){
        itemarr.splice(j,1);
      }else if(dist(itemarr[j].x,itemarr[j].y,xpos,ypos)<60){
        itemarr[j].work();
        itemarr.splice(j,1);
      }
  
  
      
  
      
    }
  
    for(var i=0;i<enemyarr.length;i++){
      enemyarr[i].move();
      enemyarr[i].display();
  
      if(enemyarr[i].x<0){
        enemyarr.splice(i,1);
      }else{
        if(enemyarr[i].y+enemyarr[i].height/2-100<ypos-size_real/2||
           enemyarr[i].y-enemyarr[i].height/2>ypos+size_real/2||
           enemyarr[i].x+30<xpos-width/2||enemyarr[i].x-30>xpos+width/2-20){
          console.log(".");
        }else{
          if(pstate==enemyarr[i].type||runstate==true||maxstate==true){
            score+=1;
            enemyarr.splice(i,1);
          }else if(enemyarr[i].bumped==false){
            life-=40;
            enemyarr[i].bumped=true;
          }

        }
        
      }
  
      
    }
  
  
  
  
    pdisplay();
    slidestate=false;
  
    
  
  
    
  
    framecnt++;
  
  }
  //drawing ground images(repeating grounds)
  imageMode(CORNER);
  image(ground, p3, 440,400,150);
  image(ground, p4, 440,400,150);
  image(ground, p_5, 440,400,150);
  image(ground, p6, 440,400,150);

  image(groundup, p3, -100,400,150);
  image(groundup, p4, -100,400,150);
  image(groundup, p_5, -100,400,150);
  image(groundup, p6, -100,400,150);

  // scrolling the images horizontally
  p3 -= scrollspeed;
  p4 -= scrollspeed;
  p_5-=scrollspeed;
  p6 -=scrollspeed;

  // did one of the grounds move fully off screen?
  if (p3 <= -400) {
    p3 = p6 + 400;
  }
  if (p4 <= -400) {
    p4 = p3 + 400;
  }
  if(p_5<=-400) {
    p_5=p4+400;
  }
  if(p6<=-400){
    p6= p_5+400;
  }

  if(gamestate==1){
    //display life bar
    rectMode(CORNER);
    fill(255,255,255,50);
    //rect(70,50,200,20);
    fill(247,136,38);
    rect(70,50,life,20);
    imageMode(CORNER);
    image(lifebarlogo,60,40,40,40);
    rectMode(CENTER);
    fill(255);
    text("Score: "+score,30,30);
  }

}else if(gamestate==0){

  bgm.stop();
  imageMode(CORNER);
    image(bg, p1, 0,900,450);
    image(bg, p2, 0,900,450);

    image(ground, p3, 440,400,150);
  image(ground, p4, 440,400,150);
  image(ground, p_5, 440,400,150);
  image(ground, p6, 440,400,150);

  image(groundup, p3, -100,400,150);
  image(groundup, p4, -100,400,150);
  image(groundup, p_5, -100,400,150);
  image(groundup, p6, -100,400,150);
  
  //Gameover page
  imageMode(CENTER);
  image(gameover,450,300);
  image(overtext,450,430);
}
  
}

function keyPressed(){
  if(keyCode===ENTER && gamestate!= 1){
    //reset everything
    xpos=200;
    ypos=450;
    jumpMode=false;
    localjumpcnt=0;
    life=200;
    score=0;
    pstate='normal';
    enemyarr=[];
    itemarr=[];


    gamestate=1;
  }
}



  


  //trigger jumping 
  function keyTyped() {
    if (key === "w") {
      localjumpcnt+=1;
      if(localjumpcnt<3){
        jumpsound.play();
        jumpMode= true;
        jumpPower=10;
      }

      
    }


  }


  //class enemies
    //enemies have different states, xpos ypos

class enemy{
      constructor(){
        this.x=900;

        this.level=random(['high','low']);
        if(this.level=='high'){
          this.y=300;
          this.height=390;
        }else{
          this.y=450;
          this.height=random([100,200]);
        }
        this.type=random(['physical','magical','spiritual']);
        this.bumped=false;



      }

      display(){
        imageMode(CENTER);
        if(this.type=='physical'){
          if(this.level=='high'){
            image(physical_high,this.x,this.y-90,100,this.height);
          }else{
            image(physical_low,this.x,this.y-this.height/2,100,this.height);
          }
          
      
        }else if(this.type=='magical'){
          if(this.level=='high'){
            image(magical_high,this.x,this.y-90,100,this.height);
          }else{
            if(this.height==50){
              image(magical_lowlow,this.x,this.y-this.height/2,100,this.height);
            }else{
              image(magical_lowhigh,this.x,this.y-this.height/2,100,this.height);
            }
          }
        }else{
          if(this.level=='high'){
            image(spiritual_high,this.x,this.y-90,100,this.height);
          }else{
            image(spiritual_low,this.x,this.y-this.height/2,100,this.height+30);
          }
        }
        
      }

      move(){
        this.x-=scrollspeed;


      }

    }


class item{
  constructor(){
    this.identity=random(['statechange','life','run','max']);
    if(this.identity=='statechange'){
      this.state=random(['physical','magical','spiritual']);
    }
    this.x=900;
    this.y;
  }

  display(){
    imageMode(CENTER);
    if(this.identity=='statechange'){
      if(this.state=='physical'){
        image(physicalitem,this.x,this.y-32,40,40);
      }else if(this.state=='magical'){
        image(magicalitem,this.x,this.y-32,40,40);
      }else if(this.state=='spiritual'){
        image(spiritualitem,this.x,this.y-32,40,40);
      }
    }else{
      if(this.identity=='life'){
        image(life1,this.x,this.y-32,40,40);

      }else if(this.identity=='run'){
        image(run,this.x,this.y-32,40,40);

      }else{
        image(max,this.x,this.y-32,40,40);

      }
    }
 
  }

  move(){
    this.x-=scrollspeed;
  }

  work(){
    if(this.identity=='statechange'){
      pstate=this.state;
    }else if(this.identity=='run'){
      runtime=0;
      runstate=true;
    }else if(this.identity=='max'){
      maxtime=0;
      maxstate=true;
    }else if(this.identity=='life'){
      life+=40;
      if(life>200){
        life=200;
      }
    }
  
  }
}

function pdisplay(){
  imageMode(CENTER);
  if(pstate=='normal'){
    if(slidestate){
      image(pnormal_sliding,xpos,ypos-size/4,width,size/2);
      size_real=size/2;
    }else{
      image(pnormal,xpos,ypos-size/2,width,size);
      size_real=size;
    }
  }else if(pstate=='physical'){
    if(slidestate){
      image(pphysical_sliding,xpos,ypos-size/3,width*1.2,size/1.5);
      size_real=size/1.5;
    }else{
      image(pphysical,xpos,ypos-size/2,width,size);
      size_real=size;
    }

  }else if(pstate=='magical'){
    if(slidestate){
      image(pmagical_sliding,xpos,ypos-size/4,width,size/2);
      size_real=size/2;
    }else{
      image(pmagical,xpos,ypos-size/2,width,size);
      size_real=size;
    }
 
  }else if(pstate=='spiritual'){
    if(slidestate){
      image(pspiritual_sliding,xpos,ypos-size/3,width,size/1.5);
      size_real=size/1.5;
    }else{
      image(pspiritual,xpos,ypos-size/2,width,size);
      size_real=size;
    }

  }
  

}


