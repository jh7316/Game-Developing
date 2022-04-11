// our VR world object
let world;
let particles=[];
let metaparticles=[];
let buffer1,texture1;
let splash;

function preload(){
  splash=loadSound("watersplash.mp3");
}

function setup() {

  

  

  // no canvas needed
  noCanvas();

  // create a VR World (tell it to look for the 'VRScene' id for our scene tag)
  world = new World('VRScene');
  world.setFlying(true);

  buffer1 = createGraphics(256, 256);
  texture1 = world.createDynamicTextureFromCreateGraphics( buffer1 );

  // set the background (sky sphere)
  world.setBackground(135, 206, 235);
  // create a plane entity.
  let plane1 = new Plane({
      width: 100,
      height: 100,
      asset: 'sand',
      repeatX: 100,
      repeatY: 100,
      rotationX: -90
      });

  // create a box entity.  entities take arguments in the form of an Object
let box3 = new Box({
    x:-40,
    y:0,
    z:0,
    asset:texture1,
    scaleZ: 100,
    scaleX: 30,
    scaleY:0.4,
    red: 0,
    green: 0,
    blue: 255,
    clickFunction: function(entity) {
      splash.play();
			

		},
    dynamicTexture: true,
    dynamicTextureWidth: 256,
    dynamicTextureHeight: 256
    });
let box4 = new Box({
  x:50,
  y:0,
  z:0,
  scaleZ: 100,
  scaleX: 30,
  scaleY:0.1,
  asset: 'stonebrick',
  repeatX: 100,
  repeatY: 50

    });

//stairs
let box5 = new Box({
  x:40,
  y:0,
  z:0,
  scaleZ: 100,
  scaleX: 1,
  scaleY:3,
  asset: 'stonebrick',
  repeatX: 100,
  repeatY: 3

                            });
let box6 = new Box({
          x:46,
          y:0,
          z:0,
          scaleZ: 100,
          scaleX: 6,
          scaleY:6,
          asset: 'stonebrick',
          repeatX: 100,
          repeatY: 6

            });
let box7 = new Box({
            x:49,
            y:0,
            z:0,
            scaleZ: 100,
            scaleX: 6,
            scaleY:9,
            asset: 'stonebrick',
						repeatX: 100,
						repeatY: 9

              });

world.add(plane1);

  // add the entity to the world

  world.add( box3 );
  world.add(box4);
  world.add(box5);
  world.add(box6);
    world.add(box7);


  area = new Circle({
     x:14,
     y:0.1,
     z:-40,
     radius:11,
     asset:"universe",
     rotationX:-90,
     repeatX:3,
     repeatY:3
  });



  tube_1 = new Torus({
         x:-40,
         y:0.5,
         z:0,
         red:255,
         green:0,
         blue:0,
         clickFunction: function(entity) {
          splash.play();
    
          let tempparticles=[];
          for(var i=0;i<30;i++){
            var pos = world.getUserPosition();
            var tempp = new Particle(-40, 0.3, 0);
    
           // add to array
          tempparticles.push( tempp );
    
          }
          metaparticles.push(tempparticles);
          
    
        },
         rotationX:-90
      });

      // add the Torus to the world
  world.add(tube_1);


  // add the circle to the world
  world.add(area);

    dog = new GLTF({
		asset: 'dog',
    x: -7,
    y:0.1,
    rotationY:76
	});

  chair = new OBJ({
  asset: 'chair_obj',
  mtl: 'chair_mtl',
  x: 0,
  y: 2,
  z: 40,
  rotationX:-90,
  rotationY:0,
  rotationYZ:90,
  scaleX:0.6,
  scaleY:0.6,
  scaleZ:0.6,
});
world.add(chair);

let sky = new Sky({
  asset: 'sky2'
});
world.add(sky);

container = new Container3D({
  x:14, 
  y:1, 
  z:-40
});

// add two boxes to the container
var b1 = new Sphere({x:7, red:85, green:130, blue:0});
container.addChild(b1);
container.addChild(dog);

// add the Container to the world
world.add(container);


// random tubes/balls
for(var b=0;b<15;b++){
  var thing=new TubeOrBall(random(-20,20),0.3,random(-20,20));
}



var text = new Text({
  text: 'Click on the red tube!',
  red: 225, green: 0, blue: 0,
  side: 'double',
  x: -40, y: 2, z: 0,
  scaleX: 5, scaleY: 5, scaleZ: 5,
  rotationY:90
});

world.add(text);


}

function draw() {

  if (mouseIsPressed) {
		world.moveUserForward(0.1);
	}








  let s1 = random(5,10);
	buffer1.fill(random(160),0,random(160));
	buffer1.rect(random(0, 256), random(0,256), s1, s1);

  //object  oriented+user interactive

  for(var j=0;j<metaparticles.length;j++){
    for (var k = 0; k < metaparticles[j].length; k++) {
      var result = metaparticles[j][k].move();
      if (result == "gone") {
        metaparticles[j].splice(k, 1);
        k-=1;
      }
    }
    if(metaparticles[j].length==0){
      metaparticles.splice(j,1);
      j-=1;
    }
  }

  container.spinY(1);



}


class Particle {

	constructor(x,y,z) {

		// construct a new Box that lives at this position
		this.myBox = new Box({
								x:x, y:y, z:z,
								red: 0, green:0, blue:random(255),
								radius: 0.5
		});

		// add the box to the world
		world.add(this.myBox);

		// keep track of an offset in Perlin noise space
		this.xOffset = random(1000);
		this.zOffset = random(2000, 3000);
	}

	// function to move our box
	move() {
		// compute how the particle should move
		// the particle should always move up by a small amount
		var yMovement = 0.01;

		// the particle should randomly move in the x & z directions
		var xMovement = map( noise(this.xOffset), 0, 1, -0.05, 0.05);
		var zMovement = map( noise(this.zOffset), 0, 1, -0.05, 0.05);

		// update our poistions in perlin noise space
		this.xOffset += 0.01;
		this.yOffset += 0.01;

		// set the position of our box (using the 'nudge' method)
		this.myBox.nudge(xMovement, yMovement, zMovement);

		// make the boxes shrink a little bit
		var boxScale = this.myBox.getScale();
		this.myBox.setScale( boxScale.x-0.005, boxScale.y-0.005, boxScale.z-0.005);

		// if we get too small we need to indicate that this box is now no longer viable
		if (boxScale.x <= 0) {
			// remove the box from the world
			world.remove(this.myBox);
			return "gone";
		}
		else {
			return "ok";
		}
	}
}


class TubeOrBall {

	constructor(x,y,z) {

    this.num=random([1,2]);
    if(this.num==1){
      this.mything = new Sphere({
        x:x, y:y, z:z,
        red: random(160), green:random(160), blue:random(160),
        radius: 0.5
    });

    }else if(this.num==2){
      this.mything = new Torus({
        x:x, y:y, z:z,
        rotationX:-90,
        red: random(160), green:random(160), blue:random(160),
        radius: 0.5
    });
    }
    
		

		// add the box to the world
		world.add(this.mything);

  }
}