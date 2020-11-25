var cvs = document.getElementById("canvas");

var ctx = cvs.getContext("2d");

// load images

var fish = new Image();

var background = new Image();

var coral = new Image();

var topObstacle = new Image();

var bottomObstacle = new Image();

fish.src = "images/fish.png";

background.src = "images/background.png";

coral.src = "images/coral.png";

topObstacle.src = "images/topObstacle.png";

bottomObstacle.src = "images/bottomObstacle.png";


// some variables

var gap = 85;

var constant;

var bX = 10;

var bY = 150;

var gravity = 1.5;

var score = 0;

// audio files

var fly = new Audio();

var scor = new Audio();

fly.src = "sounds/fly.mp3";

scor.src = "sounds/score.mp3";

// on key down

document.addEventListener("keydown",moveUp);

function moveUp(){

    bY -= 25;

    fly.play();

}

// pipe coordinates

var obstacle = [];

obstacle[0] = {

    x : cvs.width,

    y : 0

};

// draw images

function draw(){

  
    ctx.drawImage(background,0,0);

    for(var i = 0; i < obstacle.length; i++){     

        constant = topObstacle.height+gap;

        ctx.drawImage(topObstacle,obstacle[i].x,obstacle[i].y);

        ctx.drawImage(bottomObstacle,obstacle[i].x,obstacle[i].y+constant);           

        obstacle[i].x--;      

        if( obstacle[i].x == 125 ){

            obstacle.push({

                x : cvs.width,

                y : Math.floor(Math.random()*topObstacle.height)-topObstacle.height

            });

        }

        // detect collision
      

        if( bX + fish.width >= obstacle[i].x && bX <= obstacle[i].x + topObstacle.width && (bY <= obstacle[i].y + topObstacle.height || bY+fish.height >= obstacle[i].y+constant) || bY + fish.height >=  cvs.height - coral.height){

            location.reload(); // reload the page

        }

     
        if(obstacle[i].x == 5){

            score++;

            scor.play();

        }
          

    }

    ctx.drawImage(coral,0,cvs.height - coral.height);

  

    ctx.drawImage(fish,bX,bY);
 

    bY += gravity;

  

    ctx.fillStyle = "#000";

    ctx.font = "20px Verdana";

    ctx.fillText("Score : "+score,10,cvs.height-20);

  
    requestAnimationFrame(draw);  

}

draw();