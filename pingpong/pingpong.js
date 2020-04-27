const canvas = document.getElementById('canvas');
const WIDTH = 400,
    HEIGHT = 500;
canvas.width = WIDTH;
canvas.height = HEIGHT;
canvas.style.background = '#66b3ff';
const context = canvas.getContext('2d');

var keydowns = {};
var player = new Player();
var computer = new Computer();
var ball = new Ball(WIDTH / 2 + 10, HEIGHT / 2);

document.addEventListener('keydown', function(event) {
    keydowns[event.keyCode] = true;
});
document.addEventListener('keyup', function(event) {
    delete keydowns[event.keyCode];
});

var render = function() {
    context.clearRect(0, 0, WIDTH, HEIGHT);
    player.render();
    computer.render();
    ball.render();
}

var update = function() {
    player.update();
    computer.update(ball);
    ball.update(player.paddle, computer.paddle);
};

function Paddle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.xSpeed = 0;
    this.ySpeed = 0;
}

Paddle.prototype.render = function() {
    context.beginPath();
    context.fillStyle = "#ff5050";
    context.fillRect(this.x, this.y, this.width, this.height);
    context.closePath();
};

Paddle.prototype.move = function(x, y) {
    this.x += x;
    this.y = y;
    this.xSpeed = x;
    this.ySpeed = y;
    if (this.x < 0) {
        this.x = 0;
        this.xSpeed = 0;
    } else if (this.x + this.width > WIDTH) {
        this.x = WIDTH - this.width;
        this.xSpeed = 0;
    }
};

function Player() {
    this.paddle = new Paddle(WIDTH / 2, HEIGHT - 15, 70, 15);
}

function Computer() {
    this.paddle = new Paddle(WIDTH / 2, 0, 70, 15);
}

Player.prototype.render = function() {
    this.paddle.render();
};
Player.prototype.update = function() {
    for (var key in keydowns) {
        if (key == 37) {
            this.paddle.move(-4, HEIGHT - 15);
        } else if (key == 39) {
            this.paddle.move(4, HEIGHT - 15);
        } else {
            this.paddle.move(0, HEIGHT - 15);
        }
    }
};

Computer.prototype.render = function() {
    this.paddle.render();
};
Computer.prototype.update = function(ball) {
    var diff = -((this.paddle.x + (this.paddle.width / 2) - ball.x));
    if (diff < 0 && diff < -4) {
        diff = -5;
    } else if (diff > 0 && diff > 4) {
        diff = 5;
    }
    this.paddle.move(diff, 0);
    if (this.paddle.x < 0) {
        this.paddle = 0;
    } else if (this.x + this.width > WIDTH) {
        this.x = WIDTH - this.width;
    }
};

function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.xSpeed = 0;
    this.ySpeed = 3;
    this.radius = 5;
}
Ball.prototype.render = function() {
    context.beginPath();
    context.fillStyle = "#333300";
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
    context.closePath();
};
Ball.prototype.update = function(player_paddle, computer_paddle) {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    if (this.x - this.radius < 0) { //hitting the left wall
        this.x = 5;
        this.xSpeed = -this.xSpeed;
    } else if (this.x + this.radius > WIDTH) { //hitting the right wall
        this.x = WIDTH - this.radius;
        this.xSpeed = -this.xSpeed;
    }
    if (this.y - this.radius < 0 || this.y + this.radius > HEIGHT) { //point is scored by either computer or player
        if (this.y < 0) {
            console.log('Player wins !');
        } else if (this.y + this.radius > HEIGHT) {
            console.log('Computer wins !');
        }
        this.xSpeed = 0;
        this.ySpeed = 3;
        this.x = WIDTH / 2;
        this.y = HEIGHT / 2;
    }
    // 
    if (this.y > WIDTH / 2) {
        if ((this.y - this.radius) < (player_paddle.y + player_paddle.height) && (this.y + this.radius) > player_paddle.y && (this.x - this.radius) < (player_paddle.x + player_paddle.width) && (this.x + this.radius) > player_paddle.x) {
            this.ySpeed = -this.ySpeed;
            this.xSpeed += (player_paddle.xSpeed / 2);
            this.y += this.ySpeed;
        }
    } else {
        if ((this.y - this.radius) < (computer_paddle.y + computer_paddle.height) && (this.y + this.radius) > computer_paddle.y && (this.x - this.radius) < (computer_paddle.x + computer_paddle.width) && (this.x + this.radius) > computer_paddle.x) {
            this.ySpeed = -this.ySpeed;
            this.x += (computer_paddle.xSpeed / 2);
            this.y += this.ySpeed;
        }
    }
};


function drawGame() {
    render();
    update();
    requestAnimationFrame(drawGame);
}
drawGame();