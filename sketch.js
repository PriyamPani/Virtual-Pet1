//Create variables here
var dog,happyDog,database,foodStock,foodS;
var dogImg,happyDogImg;
var chicken,chickenImg;
var ball,ballImg;
function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
  chickenImg = loadImage("chk1.png");
  chkImg = loadImage("Chicken.jpg");
  ballImg = loadImage("ball.png");

}

function setup() {
  createCanvas(700,600);
  dog = createSprite(350,250,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.3;

  chicken = createSprite(280,310,20,20);
  chicken.addImage(chickenImg);
  chicken.scale = 0.2;
  chicken.visible = false;

  ball = createSprite(50,250,10,10);
  ball.addImage(ballImg);
  ball.scale = 0.2;
  ball.visible = false;
 

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  foodStock.set(50);
  
  
}



function draw() {  
  background("yellow");
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
    chicken.visible = true;
  }
  if(keyWentUp(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg);
    chicken.visible = false;

  }
    if(foodS == 0){
  
      dog.addImage(dogImg);
      foodS = 50;
    
    }
    if(keyWentDown(LEFT_ARROW)){
     dog.velocityX = -3;
     dog.addImage(happyDogImg);
     ball.visible = true;
    }

    if(dog.isTouching(ball)){
     dog.x = 350;
     dog.y = 250;
     dog.velocityX = 0;
     dog.addImage(dogImg);
     ball.visible = false;
    }
  
  
  //add styles here
  strokeWeight()
  stroke("red");
  fill("red");
  textSize(30);
  text("🥩Food🍗 Remaining:" + foodS, 10,30);

  //add styles here
  textSize(20);
  fill("blue")
  text("Hi I am your Virtual Pet Dumbo🐶",400,20);
  text("Press UP ARROW key to feed the dog",200,380);
  text("I am Hungry🍗🍗🍖",400,40)
  text("Press LEFT ARROW to do the dog Run🐕",200,400)
  drawSprites();
}
function readStock(data){
   foodS = data.val();
}
function writeStock (x){
  if(x<=0){
    x = 0;
  }else{
    x=x-1
  }
  database.ref('/').update({
    Food: x 
  })
}


