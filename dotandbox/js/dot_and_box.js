const canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight,
    GRID_SIZE = 12,
    CELL_SIZE = WIDTH / GRID_SIZE;
canvas.width = WIDTH;
canvas.height = HEIGHT - 50;

//Game variables
var boxArr,
    boxSides = {
        BOT: 0,
        LEFT: 1,
        RIGHT: 2,
        TOP: 3
    },
    isPlayer1Turn,
    currentBox,
    Player={
        player1Score:0,
        player2Score:0
    };

initializeGame();

//function initialize game
function initializeGame() {
    currentBox = [];
    isPlayer1Turn = Math.random() > 0.5 ? false : true;
    boxArr = [];
    for (let i = 0; i < GRID_SIZE - 1; i++) {
        boxArr[i] = [];
        for (let j = 0; j < GRID_SIZE - 1; j++) {
            boxArr[i][j] = new Box(CELL_SIZE * (i + 1), CELL_SIZE * (j + 1), CELL_SIZE);
        }
    }
}

//function box
function Box(x, y, size) {
    this.x = x;
    this.y = y;
    this.w = size;
    this.h = size;
    this.top = y;
    this.left = x;
    this.right = x + size;
    this.bottom = y + size;
    this.highLight = null;
    this.numOfSideSelected=0;
    this.owner=null;
    this.sideTop = { owner: null, isSelected: false };
    this.sideLeft = { owner: null, isSelected: false };
    this.sideRight = { owner: null, isSelected: false };
    this.sideBot = { owner: null, isSelected: false };

    this.isMouseInsideBox = function (x, y) {
        return (x >= this.left && x < this.right && y >= this.top && y < this.bottom);
    };

    this.highLightSide = function (x, y) {
        let dTop = y - this.top,
            dLeft = x - this.left,
            dRight = this.right - x,
            dBot = this.bottom - y;
        let minDist = Math.min(dTop, dLeft, dRight, dBot);

        if (minDist == dTop && !this.sideTop.isSelected) {
            this.highLight = boxSides.TOP;
        } else if (minDist == dLeft && !this.sideLeft.isSelected) {
            this.highLight = boxSides.LEFT;
        } else if (minDist == dRight && !this.sideRight.isSelected) {
            this.highLight = boxSides.RIGHT;
        } else if (minDist == dBot && !this.sideBot.isSelected) {
            this.highLight = boxSides.BOT;
        }
        return this.highLight;
    };

    this.drawBoxSides = function () {
        if (this.highLight != null) {
            this.drawBoxSide(this.highLight, getPlayerColor(isPlayer1Turn, true));
        }
        if(this.sideTop.isSelected){
            this.drawBoxSide(boxSides.TOP,getPlayerColor(this.sideTop.owner));
        }
        if(this.sideLeft.isSelected){
            this.drawBoxSide(boxSides.LEFT,getPlayerColor(this.sideLeft.owner));
        }
        if(this.sideRight.isSelected){
            this.drawBoxSide(boxSides.RIGHT,getPlayerColor(this.sideRight.owner));
        }
        if(this.sideBot.isSelected){
            this.drawBoxSide(boxSides.BOT,getPlayerColor(this.sideBot.owner));
        }
    }

    this.drawBoxSide = function (side, sideColor) {
        switch (side) {
            case boxSides.TOP:
                drawLine(this.left, this.top, this.right, this.top, sideColor);
                break;
            case boxSides.LEFT:
                drawLine(this.left, this.top, this.left, this.bottom, sideColor);
                break;
            case boxSides.RIGHT:
                drawLine(this.right, this.top, this.right, this.bottom, sideColor);
                break;
            case boxSides.BOT:
                drawLine(this.left, this.bottom, this.right, this.bottom, sideColor);
                break;
        }
    };

    this.selectBoxSide = function () {
        if (this.highLight == null) {
            return;
        }

        switch (this.highLight) {
            case boxSides.TOP:
                this.sideTop.owner = isPlayer1Turn;
                this.sideTop.isSelected = true;
                break;
            case boxSides.LEFT:
                this.sideLeft.owner = isPlayer1Turn;
                this.sideLeft.isSelected = true;
                break;
            case boxSides.RIGHT:
                this.sideRight.owner = isPlayer1Turn;
                this.sideRight.isSelected = true;
                break;
            case boxSides.BOT:
                this.sideBot.owner = isPlayer1Turn;
                this.sideBot.isSelected = true;
                break;
        }
        this.highLight=null;
        this.numOfSideSelected++;
        if(this.numOfSideSelected==4){
            if(isPlayer1Turn){
                Player.player1Score++;
            }else{
                Player.player2Score++;
            }
            this.owner=isPlayer1Turn;
            return true;
        }else{
            return false;
        }
    };

    this.fillBox=function(){
        if(this.owner==null){
            return;
        }
        context.beginPath();
        context.fillStyle=getPlayerColor(this.owner, false);
        context.fillRect(this.x+CELL_SIZE/10,this.y+CELL_SIZE/10,this.w-2*CELL_SIZE/10,this.h-2*CELL_SIZE/10);
        context.closePath();
    }
}


//function highlightSide
function highlightSide(x, y) {
    //clear the previous highlights
    for (let i = 0; i < GRID_SIZE - 1; i++) {
        for (let j = 0; j < GRID_SIZE - 1; j++) {
            boxArr[i][j].highLight = null;
        }
    }

    currentBox=[];
    let rows=boxArr.length;
    let cols=boxArr[0].length;
    for (let i = 0; i < GRID_SIZE - 2; i++) {
        for (let j = 0; j < GRID_SIZE - 2; j++) {
            if (boxArr[i][j].isMouseInsideBox(x, y)) {
                let side = boxArr[i][j].highLightSide(x, y);
                if (side != null) {
                    currentBox.push({ row: i, col: j });
                }

                let row=i,
                    col=j,
                    highlight,
                    isNeighbor=true;
                if(side==boxSides.LEFT && j>0){
                    row=i-1;
                    highlight=boxSides.RIGHT;
                }else if(side==boxSides.RIGHT && j<cols-1){
                    row=i+1;
                    highlight=boxSides.LEFT;
                }else if(side==boxSides.TOP && i>0){
                    col=j-1;
                    highlight=boxSides.BOT;
                }else if(side==boxSides.BOT && i<rows-1){
                    col=j+1;
                    highlight=boxSides.TOP;
                }else {
                    isNeighbor=false;
                }

                if(isNeighbor){
                    boxArr[row][col].highLight=highlight;
                    currentBox.push({row:row, col:col});
                }

            }
        }
    }
}

//mousemove handler
function mousemove_handler(e) {
    let x = e.clientX,
        y = e.clientY;

    highlightSide(x, y);
}

//function select side
function selectSide() {
    let isBoxFilled=false;
    if (currentBox.length == 0) {
        return;
    }
    for (let box of currentBox) {
        if(boxArr[box.row][box.col].selectBoxSide()){
            isBoxFilled=true;
        }
    }

    currentBox=[];

    if(!isBoxFilled){
        isPlayer1Turn=!isPlayer1Turn;
    }
    
}

//mouse click handler
function click_handler(e) {
    selectSide();
}

//function draw the circles
function drawCircles() {
    for (let i = 0; i < GRID_SIZE - 1; i++) {
        for (let j = 0; j < GRID_SIZE - 1; j++) {
            drawCircle(CELL_SIZE * (i + 1), CELL_SIZE * (j + 1));
        }
    }
}

//function draw circle
function drawCircle(x, y) {
    context.beginPath();
    context.fillStyle = '#123456';
    context.arc(x, y, CELL_SIZE / 10, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
}


//function draw Line
function drawLine(x1, y1, x2, y2, color) {
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = CELL_SIZE / 12;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}

//function to get player color
function getPlayerColor(player, isLight) {
    if (player) {
        return isLight ? '#ff0064' : '#ff0000';
    } else {
        return isLight ? '#0096ff' : '#0000ff';
    }
}

//function draw box
function drawBox() {
    for (let i = 0; i < GRID_SIZE - 1; i++) {
        for (let j = 0; j < GRID_SIZE - 1; j++) {
            boxArr[i][j].drawBoxSides();
            boxArr[i][j].fillBox();
        }
    }
}


//mouse move event
canvas.addEventListener('mousemove', mousemove_handler);

//mouse click event
canvas.addEventListener('click', click_handler);

//loop function
function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBox();
    drawCircles();
    document.getElementById('player1').innerHTML=Player.player1Score;
    document.getElementById('player2').innerHTML=Player.player2Score;

    requestAnimationFrame(gameLoop);
}
gameLoop();