const WIDTH=500,
      HEIGHT=500,
      canvas=document.getElementById('canvas'),
      context=canvas.getContext('2d');
canvas.width=WIDTH;
canvas.height=HEIGHT;

//Variable
var blockArr=[],
    blockIndex=0,
<<<<<<< HEAD
    numBlockCol=11,
=======
    numBlockCol=7,
>>>>>>> 7f5a356cfd60300417210c8dc6ee469c7069abc4
    numBlockRow=4,
    colWidth=WIDTH/numBlockCol,
    padding=colWidth/4,
    isGameOver=false,
    gameLevel=1,
    numObBlocksHit=0,
    isLeft=false,
    isRight=false,
    isLevelCompleted=false;

//Block Proptery
var blockProp={
    w:colWidth,
    h:padding
}

//Player Properties
var PlayerProp={
    x:(WIDTH/2-colWidth/2),
    y:HEIGHT-(1.5*padding),
    w:colWidth,
    h:padding
}

//Ball Player
var ballProp={
    x:WIDTH/2,
    y:HEIGHT/2,
    radius:padding/3
}

//function objects
var player=new Player(PlayerProp.x,PlayerProp.y,PlayerProp.w,PlayerProp.h);
var ball=new Ball(ballProp.x, ballProp.y, ballProp.radius);

//function Next Level
function nextlevel(){
    if(isLevelCompleted){
        if(gameLevel<4){
            gameLevel++
            if(gameLevel==4){                
                document.getElementById('gameover').innerHTML='Hurrah ! You win the game!';
                isGameOver=true;
            }
            numBlockCol=gameLevel=8?numBlockCol++:numBlockCol+=2;
            colWidth=WIDTH/numBlockCol;
            padding=colWidth/4;
            //Initialize block
            blockProp.w=colWidth;
            blockProp.h=padding
            //Initialise Player
            PlayerProp.x=(WIDTH/2-colWidth/2);
            PlayerProp.y=HEIGHT-(1.5*padding);
            PlayerProp.w=colWidth;
            PlayerProp.h=padding;
            //Initialize ball
            ballProp.x=WIDTH/2;
            ballProp.y=HEIGHT/2;
            ballProp.radius=padding/3;
            
            InitializeBlock();
            ball=new Ball(ballProp.x, ballProp.y, ballProp.radius);
            player=new Player(PlayerProp.x, PlayerProp.y, PlayerProp.w, PlayerProp.h,);
            
            isGameOver=false;
            isLevelCompleted=false;
            gameLoop();
        }
    }
}

InitializeBlock();
window.addEventListener('keydown',(e)=>{
    if(e.keyCode==37){
        isLeft=true;
        isRight=false;
    }else if(e.keyCode==39){
        isLeft=false;
        isRight=true;
    }
});

window.addEventListener('keyup',()=>{
    isLeft=false;
    isRight=false;
});

//Initialize the block
function InitializeBlock(){
    for(let i=1;i<numBlockCol;i++){
        for(let j=0;j<numBlockRow;j++){
            blockArr[blockIndex]=new Block(padding/2+i*(colWidth)-colWidth/2,0.7*colWidth+j*(colWidth-2*padding),blockProp.w-padding,blockProp.h,true);
            blockIndex++;
        }
    }
}

//Block function
function Block(x, y, width, height,isShow){
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
    this.isShow=isShow;
}

//Display Block function
<<<<<<< HEAD
function displayBlock(){    
=======
function displayBlock(){
    
>>>>>>> 7f5a356cfd60300417210c8dc6ee469c7069abc4
    blockArr.forEach((b)=>{
        if(isBallhitsBlock(ball,b) && b.isShow){
            ball.yDirSpeed=-ball.yDirSpeed;
            b.isShow=false;
            numObBlocksHit++;
            if(numObBlocksHit==(numBlockCol-1)*numBlockRow){
               isLevelCompleted=true; 
               document.getElementById('gameover').innerHTML='Game Level '+gameLevel+' is completed. Click Next to begin next level';
            }
        }
        if(b.isShow){
            context.beginPath();
            context.fillStyle= '#e83030';
            context.fillRect(b.x, b.y, b.width,b.height);
            context.closePath();
        }
    });
}

//Player function
function Player(x, y, width, height){
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
    this.xDirSpeed=4;
    this.lifeCount=3;
}

Player.prototype.drawPlayer=function(){
    context.beginPath();
    context.fillStyle='#27d739';
    context.fillRect(this.x, this.y, this.width,this.height);
    context.closePath();
};

Player.prototype.updatePlayer=function(x){
    
    this.x+=x;
    this.xDirSpeed=x;
   
    if(this.x<0){
        this.x=0
        this.xDirSpeed=0;
    }else if(this.x+this.width>WIDTH){
        this.x=WIDTH-this.width;
        this.xDirSpeed=0;
    }
}


//Ball function
function Ball(x, y, radius){
    this.x=x;
    this.y=y;
    this.radius=radius;
    this.xDirSpeed=Math.random()<0.5?1:-1;
    this.yDirSpeed=Math.random()<0.5?2:-3;
}

Ball.prototype.drawBall=function(){
    context.beginPath();
    context.fillStyle='#e3f245';
    context.arc(this.x, this.y, this.radius,0,2*Math.PI);
    context.fill();
    context.closePath();
};

Ball.prototype.updateBall=function(playerObj){
    this.x+=this.xDirSpeed;
    this.y+=this.yDirSpeed;
    
    document.getElementById('liferemaining').innerHTML=playerObj.lifeCount;
    document.getElementById('gamelevel').innerHTML=gameLevel;
    
    //Check if ball hits the canvas boundary
    if(this.x-this.radius<0){        
        this.xDirSpeed=-this.xDirSpeed;
    }else if(this.x+this.radius > WIDTH){        
        this.xDirSpeed=-this.xDirSpeed;
    }
    else if(this.y-this.radius<0){
        this.yDirSpeed=-this.yDirSpeed;
    }
    
    //Check if ball hits the player
    if(this.x+this.radius>playerObj.x && this.x-this.radius<(playerObj.x+playerObj.width) && this.y+this.radius>(HEIGHT-(1.5*padding))){
        this.yDirSpeed=-this.yDirSpeed;
        this.y+=this.yDirSpeed;
        this.xDirSpeed+=Math.floor(playerObj.xDirSpeed/3)+1;
    }
    
    //Check if ball miss to hit the player
    if((this.x+this.radius< playerObj.x || (this.x+this.radius)>(playerObj.x+playerObj.width)) && this.y+this.radius>HEIGHT){
        playerObj.lifeCount--;
        if(playerObj.lifeCount<=0){
            document.getElementById('gameover').innerHTML='Game Over!!!';
            document.getElementById('liferemaining').innerHTML=playerObj.lifeCount;
            isGameOver=true;
        }
        else{
            this.x=WIDTH/2;
            this.y=HEIGHT/2;
            this.xDirSpeed=Math.random()<0.5?2:-2;
            this.yDirSpeed=Math.random()<0.5?2:-3;
        }
    }
};

//function to check the collison
function isBallhitsBlock(ball, block){
    if(ball.x+ball.radius>block.x && (ball.x-ball.radius<(block.x+block.width)) && ball.y+ball.radius>block.y && ball.y-ball.radius<(block.y+block.height)){
        return true;
    }else {
        false;
    }
}

//Draw Game function
function drawGame(){
    displayBlock();
    player.drawPlayer();
    ball.drawBall();
}

//update game function
function updateGame(){
<<<<<<< HEAD
    ball.updateBall(player);    
=======
    ball.updateBall(player);
    
>>>>>>> 7f5a356cfd60300417210c8dc6ee469c7069abc4
    if(isLeft){
        player.updatePlayer(-4);
    }else if(isRight){
        player.updatePlayer(4);
    }
}


function gameLoop(){
    context.clearRect(0,0,WIDTH,HEIGHT);
    drawGame();
    if(!isGameOver && !isLevelCompleted){
        updateGame();        
    }    
    requestAnimationFrame(gameLoop);
}

gameLoop();






