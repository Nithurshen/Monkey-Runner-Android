var monkey;

var banana;

var bananaGroup;

var obstacle;

var obstacleGroup;

var ground;

var invisibleGround;

var gameOver;

var score;

var getSpeed;

var speed;

var randY;

var gameState;

function preload(){
  
  monkeyAnimation = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
  
  groundImage = loadImage("ground.png");
  
  overImage = loadImage("gameover.png");
  
}

function setup(){
  
  createCanvas(400,400);
  
  invisibleGround = createSprite(200, 370, 400, 20);
  invisibleGround.visible = false;
  
  monkey = createSprite(50, 370, 20, 20);
  monkey.addAnimation("Monkey", monkeyAnimation);
  monkey.scale = 0.1;
  monkey.setCollider("Circle", 0, 0, 20);
  monkey.debug = 0;
  
  score = 0;
  
  speed = 0;
  
  getSpeed = 0;
  
  gameState = "Play";
  
  obstacleGroup = createGroup();
  
  bananaGroup = createGroup();
  
}

function draw(){
  
  background("White");
  
  groundSystem();
  
  jumpSystem();
  
  speedSystem();
  
  spawnObstacles();
  
  randomSystem();
  
  spawnBanana();
  
  playSystem();
  
  resetSystem();
  
  drawSprites();
  
}

function groundSystem(){
  
  ground = createSprite(200, 200, 400, 400);
  ground.addImage("Ground", groundImage);
  ground.depth = ground.depth - 100; 
  
}

function jumpSystem(){
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(invisibleGround);
  
  if(monkey.y >= 300 && touches.length > 0 || keyWentDown("Space") && gameState == "Play"){
    
    monkey.velocityY = -15;
    
    touches = [];
    
  }

}

function speedSystem(){
  
  getSpeed = getSpeed + Math.round(getFrameRate()/60);
  
  speed = -(4 + 3 * getSpeed/100);
  
}

function spawnObstacles(){
  
  if(frameCount % 100 == 0 && gameState == "Play"){
    
    obstacle = createSprite(400, 360, 20, 20);
    obstacle.addImage("Obstacle", obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = speed;
    obstacle.lifetime = 100; 
    obstacleGroup.add(obstacle);
    
  }
  
}

function randomSystem(){
  
  randY = Math.round(random(300, 220));
  
}

function spawnBanana(){
  
  if(frameCount % 80 == 0 && gameState == "Play"){
    
    banana = createSprite(400, randY, 20, 20);
    banana.addImage("Banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX = speed;
    banana.lifetime = 100;
    bananaGroup.add(banana);
    
  }
  
}

function playSystem(){
  
  if(monkey.isTouching(bananaGroup)){
    
    bananaGroup.destroyEach();
    
  }
  
  if(monkey.isTouching(obstacleGroup)){
    
    gameState = "End";
    
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    
    gameOver = createSprite(200, 200, 100, 30);
    gameOver.addImage("Game Over", overImage);
    
  }
  
}

function resetSystem(){
  
  if(gameState == "End"){
    
    if(keyDown(ENTER) || touches.length > 0){
      
      gameOver.destroy();
      
      gameState = "Play";
      
      touches = [];
      
    }
    
  }
  
}