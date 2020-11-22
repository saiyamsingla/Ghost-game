var tower,towerImage;
var door,doorImage,doorGroup;
var climber,climberImage,climberGroup;
var ghost,ghostImage;
var invisibleBlock,invisibleBlockGroup;
var spookySound;
var gameState="play";


function preload(){
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  ghostImage=loadImage("ghost-standing.png");
  spookySound=loadSound("spooky.wav");
  
}

function setup(){
  createCanvas (600,600);
  spookySound.loop();

  tower=createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY=1;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage(ghostImage);
  ghost.scale=0.3;
  
  doorGroup=new Group();
  climberGroup=new Group();
  invisibleBlockGroup=new Group();

}
  
  function draw(){
       background("black");
    if(gameState === "play"){
      
      if(tower.y>400){
      tower.y=300;
    }
    
    if( keyDown("space")){
      ghost.velocityY=-3;
    }
    ghost.velocityY=ghost.velocityY+0.8;
    
    if(keyDown("LEFT_ARROW")){
      ghost.x=ghost.x-3;
    }
    
    if(keyDown("RIGHT_ARROW")){
      ghost.x=ghost.x+3;
    }
       
    if(climberGroup.isTouching(ghost)){
      ghost.velocityY=0;
    }
    
    if(invisibleBlockGroup.isTouching(ghost)||       ghost.y>600){
      ghost.destroy();
      gameState="end";
      }
    
    
    spawnDoor();
    
    drawSprites();
    }
    if(gameState=== "end"){
      stroke("yellow");
      fill("yellow");
      textSize(30);
      text("gameOver",230,250)
    }
  }
  
  function spawnDoor(){
    if(frameCount%240===0){
       door=createSprite(200,-50);
       door.addImage(doorImage);
       door.velocityY=1;
       door.x=Math.round(random(120,400));
       door.lifetime=800;
       doorGroup.add(door);
      
       climber=createSprite(200,10);
       climber.addImage(climberImage);
       climber.velocityY=1;
       climber.lifetime=800;
       climber.x=door.x;
       climberGroup.add(climber);
      
       ghost.depth=door.depth;
       ghost.depth=ghost.depth+1;
      
       invisibleBlock=createSprite(200,15);
       invisibleBlock.x=door.x;
       invisibleBlock.velocityY=1;
       invisibleBlock.debug=true;
       invisibleBlock.width=climber.width;
       invisibleBlock.height=2;
       invisibleBlock.lifetime=800;
       invisibleBlockGroup.add(invisibleBlock);
       
       }
  }
  
  
  
