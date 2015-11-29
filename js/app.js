var snd_win = new Audio("images/win.wav");
var snd_lose = new Audio("images/lose.wav");


var Enemy = function(x,y) {
    this.xMin = -150;
    this.xMax = 600;
    this.yLanes = [30, 140, 220];
    this.y = this.yLanes[y];
    this.Xvel = 250;
    this.sprite = 'images/enemy-bug.png';
    this.start(x,this.y);
};

Enemy.prototype.reset = function() {
    this.x = -300;
    this.speed = 150;
}

Enemy.prototype.start = function(x,y) { 
    this.x = x;
    this.y = y;
    this.speed = 80 * (Math.floor(2*Math.random())+1);
}

Enemy.prototype.update = function(dt) {
    this.x += this.speed* dt;
   if (this.x > this.xMax) {
      this.reset();
   }
};

Enemy.prototype.render = function() {

    console.log(this.sprite);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.start();
};

Player.prototype.update = function(dt) {

    for(bad in allEnemies) {
        
        
        if (55 > distance_sq(allEnemies[bad].x, allEnemies[bad].y, this.x + 50, this.y)){
            snd_lose.play();
            this.start();

        }
    }
    if(this.y < 0){
        allEnemies.push(new Enemy(150, Math.floor(2*Math.random())));
        snd_win.play();
        this.start();

    }

};
function distance_sq(obj_x, obj_y, x, y) {

   var distance = Math.sqrt((obj_y-y)*(obj_y - y) + (obj_x-x) * (obj_x-x));
   console.log(distance);
    return distance;
}

Player.prototype.render = function() {

    //canvasContext.translate(width, 0);
   //canvasContext.scale(-1,1);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.start = function() {
    this.x = 200;
    this.y = 400;
};

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

matt = new Enemy(100, 0); 
samantha = new Enemy(-120, 2);
cole = new Enemy(-400, 1);
paige = new Enemy(400, 2);
var allEnemies = [matt, samantha, cole, paige];
var player = new Player();
