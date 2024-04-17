// Enemies our player must avoid
let Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.reset();
};

//https://stackoverflow.com/questions/19132637/selected-a-random-number-from-a-set
function getRandomFromSet(set)
{
    var rndm = Math.floor(Math.random() * set.length);
    return set[rndm];
}

// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    const temp = this.speed * dt;
    if((this.x + temp) > 505){
      this.reset();
    }else{
      this.x += (this.speed * dt);
    }
    const enemyCoords = this.determineCoordinates(dt);
    const playerCoords = player.determineCoordinates();

    if(enemyCoords[0] == playerCoords[0] && enemyCoords[1] == playerCoords[1]){
      player.reset();
    }
  //  this.y += this.y * dt;
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.determineCoordinates = function(dt){
  let coords = [];
  coords[0] = Math.round(this.x / 101);
  coords[1] = ((this.y + 25) / 83 );
  return coords;
}

Enemy.prototype.reset = function(){
    this.sprite = 'images/enemy-bug.png';
    this.x = 1;
    this.y = getRandomFromSet([(1*83)-25,(2*83)-25, (3*83)-25]);
    this.speed = getRandomInt(50,500);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

let Player = function(){
  this.reset();
};

Player.prototype.update = function(){

};


Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key){
  console.log(key);
  if(key === "left" && this.x > 0){
    this.x = this.x - 101;
  }else if (key === "right" && this.x < 404){
    this.x = this.x + 101;
  }else if(key === "up" && this.y > 58){
    this.y = this.y - 83;
  }else if(key === "down" && this.y < 390){
    this.y = this.y + 83;
  }else if (key === "up" && this.y <= 58){
    this.reset();
    alert("You win!");
  }
};

Player.prototype.determineCoordinates = function(){
  let coords = [];
  coords[0] = Math.round(this.x / 101);
  coords[1] = Math.round((this.y) / 83 );
  return coords;
};

Player.prototype.reset = function(){
    this.sprite = 'images/char-boy.png';
    this.x = 2*101;
    this.y = (4*83)-25;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = new Array();
for(let x = 0; x < 3; x ++){
  allEnemies[x] = new Enemy();
  console.log(allEnemies[x]);
}
// Place the player object in a variable called player
let player = new Player();
console.log(player);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     
                                                                         
function handleTouchStart(evt) {
    console.log('Touch Start')
    console.log(evt)
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
    var direction = ''
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* right swipe */ 
            direction = 'right'
        } else {
            /* left swipe */
            direction = 'left'
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* down swipe */ 
            direction = 'down'
        } else { 
            /* up swipe */
            direction = 'up'
        }                                                                 
    }
    if(direction){
      console.log('I have direction!')
      player.handleInput(direction);
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
