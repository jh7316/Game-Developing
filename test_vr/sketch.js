
let world;
let cc=[];

function preload(){


}

function setup() {





  // no canvas needed
  noCanvas();



  // create a VR World (tell it to look for the 'VRScene' id for our scene tag)
  world = new World('VRScene');
  world.setBackground(30, 78, 3);
  world.setUserPosition(0,-7,0);
  world.setFlying(true);


  let ground = new Plane({
    x: 0, y: -10, z: 0,
    width: 200, height: 200,
    rotationX: -90,
    asset:'snowtile',
    repeatX:100,
    repeatY:100


  });




let sky = new Sky({
  radius:130,
  asset: 'sky'
});

cabin = new OBJ({
  asset: 'cabin_obj',
  mtl: 'cabin_mtl',
  x: 0,
  y: -5,
  z: -23,
  scaleX:20,
  scaleY:20,
  scaleZ:20,
  rotationY:90
});

world.add(sky);
world.add(ground);

world.add(cabin);


for(var i=0;i<50;i++){
  let tempx=random(-70,70);
  let tempz=random(-70,70);

  while(tempx<7&&tempx>-7){
    tempx=random(-70,70);
  }
  while(tempz<-15&&tempz>-28){
    tempz=random(-70,70);
  }
  let tempcc=new CandyCane(tempx,-10,tempz,random(0.3,1));
  cc.push(tempcc);

}








}

function draw() {
  console.log(world.getUserPosition().x,world.getUserPosition().y,world.getUserPosition().z);
  if (mouseIsPressed) {
    world.moveUserForward(0.3);
  }

  let currentpos=world.getUserPosition();

  for(var k=0;k<cc.length;k++){
    if(dist(currentpos.x,currentpos.z,cc[k].container.getX(),cc[k].container.getZ())<10){
      /*
      let currentX=cc[k].container.getX();
      let currentY=cc[k].container.getY();
      let currentZ=cc[k].container.getZ();
      */
      cc[k].container.spinY(1);
      //cc[k].container.setPosition(currentX,currentY,currentZ);
    }
  }







}


class CandyCane{

  constructor(x,y,z,size){
    this.container=new Container3D({
      x:x,y:y,z:z

    });
    this.boxes=[];
    let red=255;

    for(var i=0;i<10;i++){


      let tempbox=new Box({
        x:0,
        y:i*size,
        z:0,
        scaleX:size,
        scaleY:size,
        scaleZ:size,
        red:255,green:red,blue:red

      });

      this.boxes.push(tempbox);
      if(red==255){
        red=0;
      }else{
        red=255;
      }

    }

    for(var j=0;j<this.boxes.length;j++){
      this.container.addChild(this.boxes[j]);
    }

    let tempbox1=new Box({
      x:3*size,
      y:9*size,
      z:0,
      scaleX:size,
        scaleY:size,
        scaleZ:size,
      red:255,green:255,blue:255

    });

    let tempbox2=new Box({
      x:3*size,
      y:8*size,
      z:0,
      scaleX:size,
        scaleY:size,
        scaleZ:size,
      red:255,green:0,blue:0

    });

    let tempbox3=new Box({
      x:size,
      y:10*size,
      z:0,
      red:255,green:255,blue:255,
      scaleX:size,
        scaleY:size,
        scaleZ:size

    });

    let tempbox4=new Box({
      x:2*size,
      y:10*size,
      z:0,
      scaleX:size,
        scaleY:size,
        scaleZ:size,
      red:255,green:0,blue:0

    });

    this.container.addChild(tempbox1);
    this.container.addChild(tempbox2);
    this.container.addChild(tempbox3);
    this.container.addChild(tempbox4);

    world.add(this.container);


  }
}
