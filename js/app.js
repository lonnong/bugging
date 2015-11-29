
// Sound Files Located 
var snd_win = new Audio("images/win.wav");
var snd_lose = new Audio("images/lose.wav");

// Creates Enemies
var Enemy = function(x,y) {
    // Enemies staying in lanes helps simple collision detector
    this.yLanes = [30, 140, 220];
    this.y = this.yLanes[y];
    this.x = x;
    this.speed = randomSpeed();

    // Had lots of trouble with other Images but this one works
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.reset = function() {
    this.x = -100;
    this.speed = randomSpeed();
}

//Enemy.prototype.start = function(x) { 
//  this.x = x;
//   this.speed = randomSpeed();
//}

// dt is time Delta between updates
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
   if (this.x > this.xMax) {
      this.reset();
   }
};

//draw BUG image to screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//  setup Player
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.start();
};

Player.prototype.update = function(dt) {
// Loop through enemies to see if any are near prince
// The delta added to this.x is due to the images not being centered makes hits more authenic
    for(bad in allEnemies) {
        if (55 > distance(allEnemies[bad].x, allEnemies[bad].y, this.x + 50, this.y)){
            snd_lose.play();
            this.start();
        }
    }
    if(this.y < 0){
        //Random number selects enemies lane
        allEnemies.push(new Enemy(150, Math.floor(3*Math.random())));
        snd_win.play();
        this.start();

    }

};
function randomSpeed() {
    return 80 * (Math.floor(2*Math.random())+1);
};
function distance(obj_x, obj_y, x, y) {

   var distance = Math.sqrt((obj_y-y)*(obj_y - y) + (obj_x-x) * (obj_x-x));
   console.log(distance);
    return distance;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.start = function() {
    this.x = 200;
    this.y = 400;
};
// Moves Player Image and makes sure it stays on screen
Player.prototype.handleInput = function(key) {

    if (key === 'left') {
        if (this.x > 0) {
            this.x -= 100;
        }
    }
    else if (key === 'right') {
        if (this.x < 400) {
        this.x += 100;
        }
    }
    else if (key === 'up') {
        if (this.y  > -50) {
        this.y -= 100;
        }
    }
    else if (key === 'down') {
        if (this.y < 400) {
        this.y += 100;
        }  
    }

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
// Start with standard enemy opening
matt = new Enemy(100, 0); 
samantha = new Enemy(-120, 2);
cole = new Enemy(-400, 1);
paige = new Enemy(400, 2);
var allEnemies = [matt, samantha, cole, paige];
var player = new Player();
