
let world;
let trees=[];
let presents=[];
let point=0;
let santa;
let panel,text1,panelcontainer;
let santa_added=false;


function preload(){


}

function setup() {





  // no canvas needed
  noCanvas();



  // create a VR World (tell it to look for the 'VRScene' id for our scene tag)
  world = new World('VRScene');
  world.setBackground(30, 78, 3);
  world.setUserPosition(0,5,0);
  world.setFlying(true);


  let ground = new Plane({
    x: 0, y: 0, z: 0,
    width: 100, height: 100,
    rotationX: -90,
    asset:'snowtile',
    repeatX:100,
    repeatY:100


  });

  for(var i=0;i<20;i++){
    let temptree=new Tree(random(-50,50),0,random(-50,50),random(8,15));
    trees.push(temptree);
  }

  for(var i=0;i<5;i++){
    let temppresent=new Present(random(-50,50),0,random(-50,50),random(3,5));
    presents.push(temppresent);
  }




let sky = new Sky({
  radius:130,
  asset: 'sky'
});



santa=new GLTF({
  asset:'santa',
  x:0,
  y:0,z:0,
  opacity:0

});

panelcontainer=new Container3D({
  x:0,y:10,z:0

});

panel=new Box({
  x:0,y:0,z:0,
  scaleX:30,
  scaleY:3,
  scaleZ:0.5,
  red:255,green:0,blue:0

});

text1=new Text({
  text: 'Presents remaining: '+(5-point),
  red: 255, green: 255, blue: 255,
  side: 'double',
  x: 0, y: 0, z: 1,
  scaleX: 50, scaleY: 50, scaleZ: 50
})

panelcontainer.addChild(panel);
panelcontainer.addChild(text1);


world.add(sky);
world.add(ground);

world.add(panelcontainer);







}

function draw() {
  //console.log(world.getUserPosition().x,world.getUserPosition().y,world.getUserPosition().z);
  console.log(point);
  if (mouseIsPressed) {
    world.moveUserForward(1);
  }

  let currentpos=world.getUserPosition();

  for(var k=0;k<presents.length;k++){
    if(dist(currentpos.x,currentpos.z,presents[k].thing.getX(),presents[k].thing.getZ())<8){
      console.log("hi");
      if(presents[k].taken==false){
        world.remove(presents[k].thing);
        point++;
        presents[k].taken=true;
      }

    }
  }

  if(point==5){
    text1.setText( "You Saved the Holidays!");
    if(santa_added==false){
      world.add(santa);
      santa_added=true;
    }


  }else{
    text1.setText( 'Presents remaining: '+(5-point));

  }


  panelcontainer.spinY(1);


  


}

class Tree{
  constructor(x,y,z,size){
    this.container=new Container3D({
      x:x,y:y,z:z
    });

    this.trunk=new Cylinder({
      x:0,y:0,z:0,
      red:165,green:42,blue:42,
      radius:1,
      height:size

    });

    this.cone=new Cone({
      x:0,y:size*0.6,z:0,
      red:0,green:200,blue:42,
      radiusBottom:3,
      radiusTop:0,
      height:size*0.4
    });

    this.container.addChild(this.trunk);
    this.container.addChild(this.cone);

    world.add(this.container);
  }
}

class Present{
  constructor(x,y,z,size){
    this.thing=new GLTF({
      asset:'present',
      x:x,y:y,z:z,
      scaleX:0.05*size,
      scaleY:0.05*size,
      scaleZ:0.05*size,
      

    });
    this.taken=false

    world.add(this.thing);
  }
}