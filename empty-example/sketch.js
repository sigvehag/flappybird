let birdXPos, birdYPos;
let birdSpeed = 0;
let birdAcc = 0.4;
let birdJump = -12;
let birdSize = 80;

let columnSpeed = -10;
let columnWidth = 50;

let columns = [];

let fontsize = 40;
let score = 0;

function setup() {
  textSize(fontsize);
  createCanvas(windowWidth, windowHeight);
  restart();
}

function draw() {
  background(170);
  UpdateBird();
  UpdateColumn();
  UpdateScore();
  
}

function restart(){
  birdXPos = windowWidth/10;
  birdYPos = windowHeight/3;
  birdSpeed = 0;
  columns = [];
  score = 0;
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
  if (birdYPos >= windowHeight){
    restart(); 
  }
  
}

function UpdateColumn(){
  if (columns.length < 1){
    CreateColumn();
  } else {
    if (columns[columns.length -1].columnXPos < windowWidth - 750){
      CreateColumn();
    }
  }
  columns.forEach(function(element) {
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
    birdSpeed = birdJump;
  }
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}