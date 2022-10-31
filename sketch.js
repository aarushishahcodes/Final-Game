// declaring global variables (involving icons and images)
var blueberries, health, blueberriesImg, healthImg;
var girlZombie, boyZombie, girlZombieImg, boyZombieImg;
var healthGroup, blueberryGroup, boyZombieGroup, girlZombieGroup;
var player, playerImg;
var bg, bgImg;
var whiteGate, whiteGateImg;
var gameState = "play";
var score = 1;

// preloading images for the game
function preload() {
  blueberriesImg = loadImage("assets/blueberries.png");
  healthImg = loadImage("assets/healthboosters.png");
  girlZombieImg = loadImage("assets/girlzombie.png");
  boyZombieImg = loadImage("assets/boyzombie.png");
  playerImg = loadImage("assets/singularplayer.png");
  whiteGateImg = loadImage("assets/whitegate2.png");
  bgImg = loadImage("assets/bg2.png");
}

// setting up game's default
function setup() {
  createCanvas(displayWidth, displayHeight-75);
  bg = createSprite(width/2,-height*5, width, height*6);
  bg.addImage("forest",bgImg);
  bg.scale = 2.5

  player = createSprite(width/2,height-200);
  player.addImage("player",playerImg);
  player.scale = 0.6;
  
  healthGroup = createGroup();
  blueberryGroup = createGroup();
  boyZombieGroup = createGroup();
  girlZombieGroup = createGroup();

  whiteGate = createSprite(width/2,(-height*5)+200);
  whiteGate.addImage("gate", whiteGateImg);
}

function draw() {
  background("black");

  camera.position.y = player.y;

  if(gameState === "play"){

    // navigation for player's journey
    if(keyDown("RIGHT_ARROW")){
      player.x += 5;
    }
    if(keyDown("LEFT_ARROW")){
      player.x -= 5;
    }
    if(keyDown("UP_ARROW")){
      player.y -= 5;
    }
    if(keyDown("DOWN_ARROW")){
      player.y += 5;
    }
  
    // conditions if player hits blueberries or zombies
    if (player.isTouching (boyZombieGroup) || player.isTouching (girlZombieGroup) || player.isTouching (blueberryGroup)){
      gameState = "end";
    }

    spawnObjects();
    drawSprites();

  }

  // end state involving sweet alert
  if(gameState === "end"){
    textSize(44);
    fill("orange");
    text("Ah shucks! Better luck next time! Happy Halloween :)",100,player.y);
  }

  if(player.y <= whiteGate.y) {
    textSize(44);
    fill("orange");
    text("Awesome job! You have escaped the curse! Happy Halloween!",30,player.y);
  }
}

// creating a function to spawn zombies, blueberries, and health boosters
function spawnObjects(){
  if(frameCount % 120 === 0 && frameCount > 0){
  
    var r = Math.round(random(1,3))
    if(r === 1) {
      girlZombie = createSprite(random(100,width-100),(random(player.y-200,player.y+200)));
      girlZombie.addImage("girl", girlZombieImg);
      girlZombieGroup.add (girlZombie);
      girlZombie.lifetime = 150;
      girlZombie.scale = 0.7;
    }
    else if(r === 2) {
      boyZombie = createSprite(random(100,width-100),(random(player.y-200,player.y+200)));
      boyZombie.addImage("boy", boyZombieImg);
      boyZombieGroup.add (boyZombie);
      boyZombie.lifetime = 150;
      boyZombie.scale = 0.7;

    }
    else if(r === 3) {
      blueberries = createSprite(random(100,width-100),(random(player.y-200,player.y+200)));
      blueberries.addImage("blueberry", blueberriesImg);
      blueberryGroup.add (blueberries);
      blueberries.lifetime = 150;
      blueberries.scale = 0.5;

    }

  }

}
