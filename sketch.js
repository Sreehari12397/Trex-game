var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var sky
var sentence = "21 " ;
var cactus1 ,cactus2 ,cactus3, cactus4, cactus5, cactus6;
var obstecleGroup;
var cloudGroup

var score = 0;
var gameState = "play";
var gameover;
var restart;
var gameoverImage;
var restartImage;
var Jump;
var death;
var milestone
var test = 7;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  sky = loadImage("cloud.png");
 
  cactus1 = loadImage("obstacle1.png");
  cactus2 = loadImage("obstacle2.png");
  cactus3 = loadImage("obstacle3.png");
  cactus4 = loadImage("obstacle4.png");
  cactus5 = loadImage("obstacle5.png");
  cactus6 = loadImage("obstacle6.png");
  
  gameoverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
  
  Jump = loadSound("jump.mp3");
  death = loadSound("die.mp3");
  milestone = loadSound("checkPoint.mp3")
}

function setup() {
  background(220)
  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.setCollider("circle",0,0,40);
  trex.debug = false;
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  gameover = createSprite(300,50,20,20);
  gameover.addImage(gameoverImage);
  gameover.visible = false;
  gameover.scale = 0.7;
  
  restart = createSprite(300,100,20,20);
  restart.addImage(restartImage);
  restart.visible = false;
  restart.scale = 0.5;
  
  //generate random numbers
  var rand =  Math.round(random(1,100))
  //console.log(rand)
  console.log( sentence + "how are you");
  
  obstecleGroup = new Group();
  
  
  cloudGroup = new Group();
  
  
  
}

function draw() {
  //set background color
  background(180);
  
  //console.log(frameCount)
  console.log(test);
  
  
  // jump when the space key is pressed
  if(gameState === "play"){
    //move the ground
    ground.velocityX = -4;
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& trex.y >= 100) {
        trex.velocityY = -13;
        Jump.play();
    }
    
    //add gravity
    trex.velocityY = trex.velocityY + 0.8
  
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    obstecles();
    
    if(obstecleGroup.isTouching(trex)){
        gameState = "end";
        death.play();
        //trex.velocityY = -13;
    }
    if(score % 100 == 0 && score > 0)
      {
        milestone.play();
      }
    
    
  }
   else if (gameState === "end") {
     ground.velocityX = 0;
     trex.velocityY = 0;
     
     obstecleGroup.setVelocityXEach(0);
     cloudGroup.setVelocityXEach(0);
     
     obstecleGroup.setLifetimeEach(-5);
     cloudGroup.setLifetimeEach(-5);
     
     gameover.visible = true;
     restart.visible = true;
     
     trex.changeAnimation("collided",trex_collided);
     
     if(mousePressedOver(restart))
       {
         reset();
       }
       
   }
  
  trex.collide(invisibleGround);
  text("Score: " + score ,500,20);
  
  drawSprites();
}

//function to spawn the clouds
function spawnClouds()
{
  if(frameCount % 80 == 0)
    {
      // write your code here 
      var cloud = createSprite(600,70,50,20); 
      cloud.addImage(sky);
      cloud.velocityX = -5;
      //cloud.y = Math.round(random(10,70));
      //cloud.scale = 0.5;
      var cloudpos = Math.round(random(10,70))
      if(cloudpos > 40)
        {
          cloud.scale = 1.5;
          cloud.y = cloudpos;
        }
      else
        cloud.scale = 0.5;
        cloud.y = cloudpos;
      
      cloud.lifetime = 124;
      cloudGroup.add(cloud);
      
    }

  
  
}

function obstecles()
{
  if(frameCount % 80 == 0)
  {
    var Cactus = createSprite(600,160,30,40);
    var cactusX = Math.round(random(1,6));
    switch(cactusX)
    {
      case 1: Cactus.addImage(cactus1);
              break;
              
      case 2: Cactus.addImage(cactus2);
              break;
              
      case 3: Cactus.addImage(cactus3);
              break;
              
      case 4: Cactus.addImage(cactus4);
              break;
              
      case 5: Cactus.addImage(cactus5);
              break;
              
      case 6: Cactus.addImage(cactus6);
              break;
              
      default: break;        
    }
    Cactus.velocityX = -(4 + (score / 500));
    
    Cactus.scale = 0.6;
    Cactus.lifetime = 150;
    obstecleGroup.add(Cactus);
  }
}

  
function reset()
  {
    gameState = "play";
    restart.visible = false;
    gameover.visible = false;
    obstecleGroup.destroyEach();
    cloudGroup.destroyEach();
    score = 0;
  }


