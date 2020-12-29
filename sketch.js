var dog,happyDog,database;
var foodS,foodStock;
var dogImg;

function preload()
{
  dogImg=loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(250,250,70,40);
  dog.scale =  0.2;
  dog.addImage(dogImg)
  database = firebase.database();
  foodStock = database.ref("food");
  foodStock.on("value",readStock)
}


function draw() {  
   background(46,139,87);
   if(keyWentDown(UP_ARROW)){
     writeStock(foodS);
     dog.addImage(happyDog);

   }

  drawSprites();
  textSize(20)
   fill(250);
   text("FOOD REMAINING = "+foodS,170,170);
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if (x<=0){
    x=0
  }
  else{
    x= x-1
  }
  database.ref('/').update({
    food:x
  })
}