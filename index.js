var cvs = document.getElementById("canvas");

var ctx = cvs.getContext("2d"); // methods access

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

var gap = 85; // gap between the lasers 

var constant;  // will be top laser height + the gap between the lasers

var fX = 10; // fish x position

var fY = 150; // fish y position

var gravity = 1.5; // sets gravity 

var score = 0;

// audio files

var fly = new Audio();

var scor = new Audio();

var phish = new Audio ();

fly.src = "music/fly.mp3";

scor.src = "music/score.mp3";

phish.src = "music/phish.mp3"

// on key down

document.addEventListener("keydown",moveUp);
// keydown means pressed a key 
function moveUp(){

    fY -= 25; // increments the y position UP by 25 (because decreasing y goes up)

    fly.play();

}

// pipe coordinates

var obstacle = []; // array for lasers

obstacle[0] = {  // initiate array with below coordinates

    x : cvs.width, // x position all the way to the end of canvas (all the way to right) (the 0 index with have this)

    y : 0   // y position 0 (the 0 index with have this)

};

// draw images

function draw(){
    
    phish.play();
    ctx.drawImage(background,0,0);  // x position & y position 0 for background because width & height of images already defined

    for(var i = 0; i < obstacle.length; i++){     

        constant = topObstacle.height+gap;  // top laser height + the gap between the lasers (so the y coordinate for top of lower laser)

        ctx.drawImage(topObstacle,obstacle[i].x,obstacle[i].y);  // obstacle[i].x is x position for every pipe in the array.  top of top laser begins at 0

        ctx.drawImage(bottomObstacle,obstacle[i].x,obstacle[i].y+constant);  // top of bottom laser BEGINS at the height of top laser + gap          

        obstacle[i].x--; // makes laser go from right to left      

        if( obstacle[i].x == 125 ){   // this means if the laser gets to 125 need to create a new laser

            obstacle.push({

                x : cvs.width,  // new laser goes to far right

                y : Math.floor(Math.random()*topObstacle.height)-topObstacle.height  // this creates a negitive y coordinate where the laser begins making different sizes
                    // mathfloor will return an integer
            });

        }

        // detect collision
      

        if( fX + fish.width >= obstacle[i].x && fX <= obstacle[i].x + topObstacle.width && (fY <= obstacle[i].y + topObstacle.height || fY+fish.height >= obstacle[i].y+constant) || fY + fish.height >=  cvs.height - coral.height){
            // 1 & 2 apply to all:  1. if fish hasn't passed laser left edge  2. fish hasn't gone through pipe / scored   3.  top of fish above upper laser  4.  fish bottom bellow lower laser  5.  fish bottom below coral 
            location.reload(); // reload the page

        }

     
        if(obstacle[i].x == 5){ // because laser has gone behind the fish increase score

            score++;

            scor.play();

        }
          

    }

    ctx.drawImage(coral,0,cvs.height - coral.height);  // coral draws image, x position 0, height is canvas height minus coral height (so it's like the distance from top of canvas(a positive y is further down)) 

  

    ctx.drawImage(fish,fX,fY); // fish has an x and y position 
 

    fY += gravity;  // fish's y position reduced by 1.5 gravity every loop

  

    ctx.fillStyle = "#000";

    ctx.font = "20px Verdana";

    ctx.fillText("Score : "+score,10,cvs.height-20);

  
    requestAnimationFrame(draw);  // this calls the draw function continuously 

}

draw(); // requestAnimationFrame runs continuously so have to call draw function just once 