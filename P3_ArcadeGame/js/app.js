// Enemies our player must avoid
var Enemy = function(x,y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y + 50;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/uni.png';
    this.step = 101;
    this.boundary = this.step * 5;
    this.resetPos = -this.step;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //If enemy not passed Then
    if(this.x < this.boundary) {
        //move forward
        //increment x by speed * dt
        this.x += this.speed * dt;
    }
    else{
        //reset position to start
      this.x = this.resetPos;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class

// This class requires an update(), render() and
// a handleInput() method.
 class Princess {
    constructor(){
      this.sprite='images/duck.png';
      this.step = 101;
      this.jump = 83;
      this.startX = (this.step * 2);
      this.startY = (this.jump * 4) + 50;
      this.x = this.startX;
      this.y = this.startY;
      this.victory = false;
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    //update position
    update() {
      //check for collision
      for(let enemy of allEnemies) {
        if (this.y === enemy.y && (enemy.x + enemy.step/2 > this.x &&
            enemy.x < this.x + this.step/2)) {
          this.reset();
        }
      }
      if(this.y === 50) {
        this.victory = true;
      }
    }

    handleInput(input){
      switch(input){
        case 'left':
          if (this.x > 0) {
            this.x -= this.step;
          }
          break;
        case 'up':
          if (this.y > this.jump) {
            this.y -= this.jump;
          }
          break;
        case 'right':
          if(this.x < this.step * 4) {
            this.x += this.step;
          }
          break;
        case 'down':
          if (this.y < this.jump * 4) {
            this.y += this.jump;
          }
          break;
      }
    }
    reset(){
      this.y= this.startY;
      this.x = this.startX;
    }
 }





// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Princess();
const bugOne = new Enemy(-101, 0, 400);
const bugTwo = new Enemy(-101, 83, 300);
const bugThree = new Enemy((-101*2.5), 83, 300);
const bugFour = new Enemy(-101, 166, 100);
const allEnemies = [];
allEnemies.push(bugOne, bugTwo, bugThree, bugFour);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
