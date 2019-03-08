let birdXPos, birdYPos, button;
let birdSpeed = 0;
let birdAcc = 0.4;
let birdJump = -12;
let birdSize = 60;

let columnSpeed = -10;
let columnWidth = 100;
let columnDistance = 1000;

let columns = [];
let clouds = [];

let fontsize = 40;
let score = 0;

let isDead;

let cloud1, cloud2, cloud3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cloud1 = loadImage('assets/cloud1.PNG');
  cloud2 = loadImage('assets/cloud2.PNG');
  cloud3 = loadImage('assets/cloud3.PNG');
  Start();
}

function draw() {
  background(170);
  UpdateClouds();
  UpdateBird();
  UpdateColumn();
  UpdateScore();
  
  
}

function Start(){
  isDead=true; 
  birdSpeed = 0;
  textSize(fontsize * 3);
  textAlign(CENTER);
  fill(255);
  text("START", windowWidth/2, windowHeight/2);
  button = createButton('START');
  button.position(windowWidth/2 - 50, windowHeight/2 + 100);
  button.mousePressed(restart);
  noLoop();
}

function Dead(){
  isDead = true;
  birdSpeed = 0;
  textSize(fontsize * 3);
  textAlign(CENTER);
  fill(255, 50, 50);
  text("DEAD", windowWidth/2, windowHeight/2);
  button.textContent="Restart";
  button.show();
  noLoop();
}

function restart(){
  isDead = false;
  birdXPos = windowWidth/10;
  birdYPos = windowHeight/3;
  birdSpeed = 0;
  columns = [];
  score = 0;
  button.hide();
  loop();
}

function UpdateClouds(){
  image(cloud1, 0, 0);
  image(cloud2, 200, 200);
  image(cloud3, 500, 500);
}

function UpdateBird(){
  fill(255, 255, 0);
  ellipse(birdXPos, birdYPos, birdSize, birdSize);

  let tri = birdXPos + birdSize/2 - 10;
  fill(255, 0, 0);
  triangle(tri, birdYPos-10, tri, birdYPos+15, tri + 20, birdYPos + 12);

  fill(0);
  ellipse(birdXPos + birdSize/4, birdYPos - birdSize/4, 5, 5);

  birdSpeed += birdAcc;
  birdYPos += birdSpeed;
  if (birdYPos + birdSize/2 >= windowHeight || birdYPos - birdSize/2 < 0){
    Dead(); 
  }
  
}

function UpdateColumn(){
  if (columns.length < 1){
    CreateColumn();
  } else {
    if (columns[columns.length -1].columnXPos < windowWidth - columnDistance){
      CreateColumn();
    }
  }
  columns.forEach(function(element) {
    if (birdXPos+birdSize/2>element.columnXPos && birdXPos-birdSize/2<=element.columnXPos+columnWidth){
      if (birdYPos-birdSize/2<element.columnTopYHeight || birdYPos+birdSize/2 > element.columnBottomYPos){
        Dead();
      }
    }


    if (element.columnXPos < 0- columnWidth){
      columns.shift();
      score++; 
      return;
    }

    element.columnXPos += columnSpeed;
    fill(50, 205, 50);
    rect(element.columnXPos, element.columnBottomYPos, element.width, element.height);
    rect(element.columnXPos, 0, element.width, element.columnTopYHeight);
  });
}

function UpdateScore(){
  textSize(fontsize);
  textAlign(CENTER);
  fill(255);
  text(score, windowWidth/2, 80);
}


function CreateColumn(){
  let randVal = getRndInteger(100, windowHeight-200);
  var newCol = {
    columnXPos: windowWidth,
    columnBottomYPos: windowHeight - randVal,
    columnTopYHeight: windowHeight - randVal - 250,
    height: windowHeight,
    width: columnWidth
  }
  columns.push(newCol);
}

function keyPressed(){
  if(keyCode == 32){
    if(isDead){
      restart();
    } else {
      birdSpeed = birdJump;
    }
  }
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}