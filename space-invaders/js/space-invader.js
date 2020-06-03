import { Canvas2dGraphics, start } from './sandy-canvas-module.js';
const canvas = document.getElementById('canvas'),
    canvasGraphicsObj = new Canvas2dGraphics(canvas),
    WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight - 30,
    pixelSize = 3,
    col = 8, row = 4;
canvas.width = WIDTH;
canvas.height = HEIGHT;

//Game variables
var starArr = [],
    alienArr = [],
    dir = 1, alienMoved = 0,
    isLeft = false,
    isRight = false,
    bulletSpaceshipArr = [],
    bulletAlienArr = [],
    isGameOver = false, numAlienHit = 0,
    message = "";

var spaceship = new Spaceship(WIDTH / 2, HEIGHT - 10 * pixelSize, pixelSize);

//for loop for stars
for (let i = 0; i < 100; i++) {
    starArr.push(new Star(Math.random() * WIDTH, Math.random() * HEIGHT, Math.random() * 2));
}

for (let i = 0; i < col; i++) {
    alienArr[i] = [];
    for (let j = 0; j < row; j++) {
        let color = (j % row == 0) ? 'red' : (j % row == 1 ? 'navy' : (j % row == 2 ? 'lightpink' : 'wheat'));
        alienArr[i][j] = new Alien(i * 50 + 50, j * 50 + 50, pixelSize, color);
    }
}

//function Star
function Star(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;

    this.drawStars = function () {
        canvasGraphicsObj.FillCircle(this.x, this.y, this.size, 0, 2 * Math.PI, false, 'white');
    }
}

//function to draw the stars
function drawStars() {
    starArr.forEach((s) => {
        s.drawStars();
    })
}

//function to draw the Aliens
function drawAliens() {
    alienArr.forEach((alienRow) => {
        alienRow.forEach((alien) => {
            if (alien.isLive) {
                alien.drawAlien();
            }
        })
    })
}

//function to update the aliens
function updateAliens() {
    alienArr.forEach((alienRow) => {
        alienRow.forEach((alien) => {
            alien.updateAlien(6,spaceship);
        });
    });
}

//function update Spaceship
function updateSpaceship() {
    if (isLeft) {
        spaceship.updateSpaceship(-4);
    } else if (isRight) {
        spaceship.updateSpaceship(4);
    }
}

//function draw bullets
function drawBullets() {
    bulletSpaceshipArr.forEach((b) => {
        b.drawBullet();
    });

    bulletAlienArr.forEach((b) => {
        b.drawBullet();
    })
}

//update Bullets
function updateBullets() {
    bulletSpaceshipArr.forEach((b) => {
        b.updateBullet(-3, alienArr, spaceship);
    });

    bulletAlienArr.forEach((b) => {
        b.updateBullet(3,alienArr,spaceship);
    })
}

//fire Bullets from aliens
function fireBulletsFromAlien() {
    for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
            let random_i = Math.floor(Math.random() * col);
            let random_j = Math.floor(Math.random() * row);
            if (alienArr[random_i][random_j].isLive) {
                alienArr[random_i][random_j].fireBullet();
            }
        }
    }
}

//Function Alien
function Alien(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.isLive = true;
}
Alien.prototype.drawAlien = function () {
    //row 1
    canvasGraphicsObj.FillRectangle(this.x + 3 * this.size, this.y, this.size, this.size, this.color);
    canvasGraphicsObj.FillRectangle(this.x + 8 * this.size, this.y, this.size, this.size, this.color);
    //row 2
    canvasGraphicsObj.FillRectangle(this.x + 4 * this.size, this.y + this.size, this.size, this.size, this.color);
    canvasGraphicsObj.FillRectangle(this.x + 7 * this.size, this.y + this.size, this.size, this.size, this.color);
    //row 3
    canvasGraphicsObj.FillRectangle(this.x + 3 * this.size, this.y + 2 * this.size, 6 * this.size, this.size, this.color);
    //row 4
    canvasGraphicsObj.FillRectangle(this.x + 2 * this.size, this.y + 3 * this.size, 2 * this.size, this.size, this.color);
    canvasGraphicsObj.FillRectangle(this.x + 5 * this.size, this.y + 3 * this.size, 2 * this.size, this.size, this.color);
    canvasGraphicsObj.FillRectangle(this.x + 8 * this.size, this.y + 3 * this.size, 2 * this.size, this.size, this.color);
    //row 5
    canvasGraphicsObj.FillRectangle(this.x + 1 * this.size, this.y + 4 * this.size, 10 * this.size, this.size, this.color);
    //row 6
    canvasGraphicsObj.FillRectangle(this.x + 1 * this.size, this.y + 5 * this.size, 1 * this.size, this.size, this.color);
    canvasGraphicsObj.FillRectangle(this.x + 3 * this.size, this.y + 5 * this.size, 6 * this.size, this.size, this.color);
    canvasGraphicsObj.FillRectangle(this.x + 10 * this.size, this.y + 5 * this.size, 1 * this.size, this.size, this.color);
    //row 7
    canvasGraphicsObj.FillRectangle(this.x + 1 * this.size, this.y + 6 * this.size, 1 * this.size, this.size, this.color);
    canvasGraphicsObj.FillRectangle(this.x + 3 * this.size, this.y + 6 * this.size, 1 * this.size, this.size, this.color);
    canvasGraphicsObj.FillRectangle(this.x + 8 * this.size, this.y + 6 * this.size, 1 * this.size, this.size, this.color);
    canvasGraphicsObj.FillRectangle(this.x + 10 * this.size, this.y + 6 * this.size, 1 * this.size, this.size, this.color);
    //row 8
    canvasGraphicsObj.FillRectangle(this.x + 4 * this.size, this.y + 7 * this.size, 1 * this.size, this.size, this.color);
    canvasGraphicsObj.FillRectangle(this.x + 7 * this.size, this.y + 7 * this.size, 1 * this.size, this.size, this.color);
}
Alien.prototype.updateAlien = function (speed,spaceship) {
    if (alienMoved >= 4) {
        dir *= -1;
        alienArr.forEach((alienRow) => {
            alienRow.forEach((alien) => {
                alien.y += 10;
            });
        });
        alienMoved = 0;
    }
    if (alienMoved < 4) {
        this.x += speed * dir;
    }
    alienArr.forEach((alienRow)=>{
        alienRow.forEach((alien)=>{
            if(alien.isLive){
                if(alien.y+8*alien.size>spaceship.y){
                    isGameOver=true;
                    message="Alien : ha ha ! we got you.";
                }
            }
        })
    })
}
Alien.prototype.fireBullet = function () {
    if (bulletAlienArr.length == 0) {
        bulletAlienArr.push(new Bullet(this.x + 5 * this.size, this.y + 8 * this.size, false));
    }
}

//function Spaceship
function Spaceship(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
}
Spaceship.prototype.drawSpaceship = function () {
    canvasGraphicsObj.FillRectangle(this.x, this.y, this.size, this.size, 'red');
    canvasGraphicsObj.FillRectangle(this.x - 2 * this.size, this.y + this.size, 5 * this.size, 2 * this.size, 'white');
    canvasGraphicsObj.FillRectangle(this.x - 4 * this.size, this.y + 3 * this.size, 9 * this.size, 3 * this.size, 'white');
}
Spaceship.prototype.updateSpaceship = function (speed) {
    this.x += speed;
    if (this.x - 4 * this.size < 0) {
        this.x = 4 * this.size;
    } else if (this.x + 5 * this.size > WIDTH) {
        this.x = WIDTH - 5 * this.size;
    }
}
Spaceship.prototype.fireBullet = function () {
    if (bulletSpaceshipArr.length == 0) {
        bulletSpaceshipArr.push(new Bullet(this.x, this.y, true));
    }
}

//function Bullet
function Bullet(x, y, isSpaceship) {
    this.x = x;
    this.y = y;
    this.isSpaceship = isSpaceship;
}
Bullet.prototype.drawBullet = function () {
    canvasGraphicsObj.FillRectangle(this.x, this.y, pixelSize, 2 * pixelSize, 'white');
}
Bullet.prototype.updateBullet = function (speed, alienArr, spaceship) {
    this.y += speed;
    if (this.isSpaceship) {
        alienArr.forEach((alienRow) => {
            alienRow.forEach((alien) => {
                if (this.x + pixelSize > alien.x && this.x < alien.x + 10 * alien.size && this.y < alien.y + 7 * alien.size && alien.isLive) {
                    alien.isLive = false;
                    bulletSpaceshipArr.splice(this, 1);
                    numAlienHit++;
                    if (numAlienHit == col * row) {
                        isGameOver = true;
                        message = "ha ha ! Dare to challenge again.";
                    }
                }
            });
        });
        //check if bullet missed
        if (this.y < 0) {
            bulletSpaceshipArr.splice(this, 1);
        }
    } else if (!this.isSpaceship) {
        if (this.x + pixelSize > spaceship.x - 4 * spaceship.size && this.x < spaceship.x + 5 * spaceship.size && this.y > spaceship.y) {
            isGameOver = true;
            message = "Alien : ha ha ! we got you.";
        }
        //check if bullet missed
        if (this.y + 2 * pixelSize > HEIGHT) {
            bulletAlienArr.splice(this, 1);
        }
    }
}

//events
document.addEventListener('keydown', function (e) {
    if (e.keyCode == 37) {
        isLeft = true; isRight = false;
    } else if (e.keyCode == 39) {
        isLeft = false; isRight = true;
    } else if (e.keyCode == 32) {
        if (bulletSpaceshipArr.length == 0) {
            spaceship.fireBullet();
        }
    }else if(e.keyCode==13){
        window.location.reload();
    }
});
document.addEventListener('keyup', () => {
    isLeft = false; isRight = false;
})

setInterval(function () {
    if (!isGameOver) {
        updateAliens();
        fireBulletsFromAlien();
        alienMoved++;
    }

}, 1000);

//function to draw the game
function drawGame() {
    drawStars();
    spaceship.drawSpaceship();
    drawAliens();
    drawBullets();
}

//function game loop
function gameLoop() {
    canvasGraphicsObj.ClearCanvas(0, 0, WIDTH, HEIGHT);
    if(isGameOver){
        document.getElementById('msg').innerHTML=message+" Please press enter to restart the game.";
    }
    
    drawGame();
    if (!isGameOver) {
        updateSpaceship();
        updateBullets();
    }
}

start(gameLoop);