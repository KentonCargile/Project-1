


var player = {
    x: {150, y: 250, size: 50}
    var gravity = 0;
    var goUp = false;
    var crashed = false;

}

var draw = function () {
    background(0,0,0);
    drawPlayer();
    movePlayer();

    if (crashed === false) {
        movePlayer();
    } else {
        youLoseScreen();
    }
};

var drawPlayer = function () {
    fill (0, 0, 225);
    ellipse (player.x, player.y, player.size, player.size, player.size)
}

var movePlayer = function () {
    if (goUp) {
        gravity -= 0.4;
    } else {
        gravity += 0.4;
    }
       
    player.y += gravity;

    if player.y > 500 || player.y < 0 {
        crashed = true;
    }
};


var mousePressed = function () {
    if (mouseButton === LEFT ){
    //if the left mouse button has been pressed
        goUp = true;
    // then if the player has crashed
    if (crashed){
    // set crashed back to false
    // set the player's y position back to the center 
    // set gravity back to 0    


    }
    
    }
}

var mouseReleased = function () {
    if (mouseButton === LEFT ){
        goUp = false;
    }
}

console.log(goUp);


var youLoseScreen = function () {
    fill(255);
    textSize(24);
    text("Game Over", 200, 200);
    text("Click to Restart", 180, 350);
};
