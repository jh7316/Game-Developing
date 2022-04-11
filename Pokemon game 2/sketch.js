let gastly,stuffuls,grassfield,sky,gameoverimg,startgameimg;
let bgm,shot;

let gamestate=0;

let pointx=500;
let pointy=425;

let life=5;

let difficulty;
let obsarray=[];
let pausestate=0;
let gamesplayed=0;
window.localStorage.setItem('gamesplayed', 0);

function preload() {


  gastly=loadImage('gastly.png');
  stuffuls=loadImage('stuffuls.png');
  grassfield=loadImage('grassfield.png');
  sky=loadImage('sky.png');
  gameoverimg=loadImage('gameover.jpeg'); 
  startgameimg=loadImage('startgame.jpeg');

  bgm = loadSound("mainbgm.mp3");
  shot=loadSound("shot.mp3");

}


function setup() {

  createCanvas(1000, 850);


}


function draw() {

  if(gamestate==0){
    startscreen();

  }else if(gamestate==1){
    gameplay();
  }else if(gamestate==2 && pausestate==0){
    pause();
  }else if(gamestate==3){
    gameover();
  }

  text("# of games played:"+gamesplayed, width/2, 26);






}

function mousePressed() {
  if(gamestate==3){
    gamestate=0;
  }
}

//obstacle & pokemon class
class obstacle{
  constructor(){
    this.x=random(0,width);
    this.y=0;
    
    //the average speed of gastlies is faster for harder mode
    if(difficulty==1){
      this.xspeed=random(-1,1);
    }else if(difficulty==2){
      this.xspeed=random(-2,2);
    }else if(difficulty==3){
      this.xspeed=random(-3.5,3.5);
    }
    
    this.yspeed=1;
  }

  display(){
    image(gastly,this.x,this.y,80,80);

  }

  move(){

    this.x+=this.xspeed;
    this.y+=this.yspeed;

    //bounce off if when it bumps into the sides
    if(this.x > width-70 || this.x < 0){
      this.xspeed *= -1;
    }

    
  }

}



function startscreen(){
  background(150);
  image(startgameimg,0,0,1000,850);
  textSize(30);
  fill(255);
  text("SAVE THE STUFFULS!",80,125);
  text("Press 1 for easy, 2 for medium and 3 for hard mode",80,170);
  if(keyIsDown(49)){
    difficulty=1;

    gamestate=1;
    gamesplayed+=1;

    localStorage.setItem('gamesplayed', gamesplayed);
  }else if(keyIsDown(50)){
    difficulty=2;

    gamestate=1;
    gamesplayed+=1;

    localStorage.setItem('gamesplayed', gamesplayed);

  }else if(keyIsDown(51)){
    difficulty=3;

    gamestate=1;
    gamesplayed+=1;

    localStorage.setItem('gamesplayed', gamesplayed);

  }
  
}

function gameplay(){
  let pl=bgm.isPlaying();
  if (pl==false){
    bgm.play();
    bgm.loop();
  }

  background(150);
  image(sky,0,0,1200,750);


  //trigges(creates) obstacle by random chance 
  let chance=random(1,30)
  if(chance>20.7 && chance<21){
    let temp=new obstacle();
    obsarray.push(temp);
  }

  //move the obstacles
  
  for(var i=0;i<obsarray.length;i++){

    obsarray[i].move();
    obsarray[i].display();


    //obstacle removed when it reaches the end or is shot 
    if(obsarray[i].y>650){
      obsarray.splice(i,1);
      life-=1;
    }
    if(dist(obsarray[i].x,obsarray[i].y,pointx,pointy)<55 && keyIsDown(32)){
      obsarray.splice(i,1);
      shot.play();
      
    }

    if(life==0){
      gamestate=3;
      life=5;
      obsarray=[];

      bgm.stop(0);
    }
  }


  //draw pointer
  noFill();
  ellipse(pointx,pointy,80,80);
  ellipse(pointx,pointy,70,70);
  fill(0);
  ellipse(pointx,pointy,30,30);

  //move the pointer
  if (keyIsDown(65)&&pointx>40) {
    pointx -= 8;
  }
  if (keyIsDown(68)&&pointx<width-40) {
    pointx += 8;
  }
  if (keyIsDown(87)&&pointy>40) {
    pointy -= 8;
  }
  if (keyIsDown(83)&&pointy<height-180) {
    pointy += 8;
  }

  //draw grassfield
  image(grassfield,0,450,1000,450);
  
  //draw stuffuls
  image(stuffuls,0,550,500,340);
  image(stuffuls,460,550,500,340);
  image(stuffuls,830,550,500,340);
  
  text("Life:"+life,25,25);







}

function pause(){
  if(gamestate==1){
    gamestate=2;
    background('rgba(0,0,0,0.5)');
    fill(255);
    rectMode(CENTER);
    rect(500,425,200,150);
    
    fill(0);
    text("PAUSED:",425,425);
    
    pausestate=1;
  }
  
  

}

function resume(){
  if(gamestate==2){
    gamestate=1;
    pausestate=0;
  }

  

}

function gameover(){


  image(gameoverimg,0,0,1000,850);
  fill(0);
  text("GAME OVER",100,225);
  text("Click anywhere to return to start page",100,270);

}

