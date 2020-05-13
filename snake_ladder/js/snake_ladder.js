import {Canvas2dGraphics} from './sandy-canvas-module.js';
const canvas=document.getElementById('canvas'),
      _canvasObj=new Canvas2dGraphics(canvas),
      WIDTH=500,
      HEIGHT=500,
      numCol=10,
      numRow=10,
      boxSize=WIDTH/numCol,
      player1Color="#cc3399",
      player2Color='#66ccff',
      canvasPlayer=document.createElement('canvas'),
      _canvasPlayerObj=new Canvas2dGraphics(canvasPlayer);

//Variables
var boxArr=[],
    x=0,
    y=(numRow-1)*boxSize,
    dir=1,
    snake1=new Image(),
    snake2=new Image(),
    snake3=new Image(),
    snake4=new Image(),
    ladder1=new Image(),
    ladder2=new Image(),
    ladder3=new Image(),
    player1=new Player(player1Color,1),
    player2=new Player(player2Color,2),
    isPlayer1Turn=Math.random()<0.5?false:true,
    dice=new Dice(20,180,100,'#fff');

snake1.src='./img/snake1.png';
snake2.src='./img/snake2.png';
snake3.src='./img/snake3.png';
snake4.src='./img/snake1.png';
ladder1.src='./img/ladder1.png';
ladder2.src='./img/ladder1.png';
ladder3.src='./img/ladder1.png';


canvas.width=WIDTH;
canvas.height=HEIGHT;
canvasPlayer.width=300;
canvasPlayer.height=300;
canvasPlayer.style.background='#000';
canvasPlayer.style.float='left';
document.body.appendChild(canvasPlayer);

for(let i=0;i<numCol*numRow;i++){
    boxArr.push(new Box(x, y, boxSize,i));
    x=x+boxSize*dir;
    if(x>=WIDTH || x<=-boxSize){
        dir*=-1;
        x+=boxSize*dir;
        y-=boxSize;
    }
}

window.addEventListener('click',playGame);
window.addEventListener('keydown',(e)=>{
    if(e.keyCode==13){
        window.location.reload();
    }
});

function drawPlayerDetails(){
    _canvasPlayerObj.ClearCanvas(0,0,canvasPlayer.width,canvasPlayer.height);
    _canvasPlayerObj.FillText('Player 1',20,30,player1Color,'25px Arial');
    _canvasPlayerObj.FillCircle(150,20,boxSize/3,0,2*Math.PI,false,player1Color);
    _canvasPlayerObj.FillText('Player 2',20,70,player2Color,'25px Arial');
    _canvasPlayerObj.FillCircle(150,60,boxSize/3,0,2*Math.PI,false,player2Color);

    if(isPlayer1Turn){
        _canvasPlayerObj.FillText('Player 2 turn',20,120,player2Color,'25px Arial');        
    }else{
        _canvasPlayerObj.FillText('Player 1 turn',20,120,player1Color,'25px Arial');        
    }
}

//function Dice
function Dice(x, y, size, color){
    this.x=x;
    this.y=y;
    this.size=size;
    this.color=color;

    this.drawDice=function(n){
        _canvasPlayerObj.StrokeRectangle(this.x, this.y, this.size,this.size,this.color);
        switch(n){
            case 1:
                _canvasPlayerObj.FillCircle(this.x+this.size/2,this.y+this.size/2,10,0,2*Math.PI,false,this.color);
                break;
            case 2:
                _canvasPlayerObj.FillCircle(this.x+this.size/4,this.y+this.size/4,10,0,2*Math.PI,false,this.color);
                _canvasPlayerObj.FillCircle(this.x+3*this.size/4,this.y+3*this.size/4,10,0,2*Math.PI,false,this.color);
                break;
            case 3:
                _canvasPlayerObj.FillCircle(this.x+this.size/4,this.y+this.size/4,10,0,2*Math.PI,false,this.color);
                _canvasPlayerObj.FillCircle(this.x+3*this.size/4,this.y+3*this.size/4,10,0,2*Math.PI,false,this.color);
                _canvasPlayerObj.FillCircle(this.x+this.size/2,this.y+this.size/2,10,0,2*Math.PI,false,this.color);
                break;
            case 4:
                _canvasPlayerObj.FillCircle(this.x+this.size/4,this.y+this.size/4,10,0,2*Math.PI,false,this.color);
                _canvasPlayerObj.FillCircle(this.x+3*this.size/4,this.y+this.size/4,10,0,2*Math.PI,false,this.color);
                _canvasPlayerObj.FillCircle(this.x+this.size/4,this.y+3*this.size/4,10,0,2*Math.PI,false,this.color);
                _canvasPlayerObj.FillCircle(this.x+3*this.size/4,this.y+3*this.size/4,10,0,2*Math.PI,false,this.color);
                break;
            case 5:
                _canvasPlayerObj.FillCircle(this.x+this.size/4,this.y+this.size/4,10,0,2*Math.PI,false,this.color);
                _canvasPlayerObj.FillCircle(this.x+3*this.size/4,this.y+this.size/4,10,0,2*Math.PI,false,this.color);
                _canvasPlayerObj.FillCircle(this.x+this.size/4,this.y+3*this.size/4,10,0,2*Math.PI,false,this.color);
                _canvasPlayerObj.FillCircle(this.x+3*this.size/4,this.y+3*this.size/4,10,0,2*Math.PI,false,this.color);
                _canvasPlayerObj.FillCircle(this.x+this.size/2,this.y+this.size/2,10,0,2*Math.PI,false,this.color);
                
                break;
            default:
                _canvasPlayerObj.FillCircle(this.x+this.size/8+10,this.y+this.size/4,10,0,2*Math.PI,false,this.color);
                _canvasPlayerObj.FillCircle(this.x+3*this.size/8+10,this.y+this.size/4,10,0,2*Math.PI,false,this.color);
                _canvasPlayerObj.FillCircle(this.x+5*this.size/8+10,this.y+this.size/4,10,0,2*Math.PI,false,this.color);
                _canvasPlayerObj.FillCircle(this.x+1*this.size/8+10,this.y+3*this.size/4,10,0,2*Math.PI,false,this.color);
                _canvasPlayerObj.FillCircle(this.x+3*this.size/8+10,this.y+3*this.size/4,10,0,2*Math.PI,false,this.color);
                _canvasPlayerObj.FillCircle(this.x+5*this.size/8+10,this.y+3*this.size/4,10,0,2*Math.PI,false,this.color);
                break;
        }
    }
    
}

//function play game
function playGame(){
    if(isPlayer1Turn){
        drawBoard();
        loadSnakeAndLadder();
        player1.rollDice();
        player1.drawPlayer();
        player2.drawPlayer();
        isPlayer1Turn=false;
    }else{
        drawBoard();
        loadSnakeAndLadder();
        player2.rollDice();
        player1.drawPlayer();
        player2.drawPlayer();
        isPlayer1Turn=true;
    }
}

//Player function
function Player(color,playerNumber){
    this.position=0;
    this.color=color;
    this.playerNumber=playerNumber;
    this.isActive=false;

    this.rollDice=function(){
        drawPlayerDetails();
        let r=Math.floor(Math.random()*6)+1;//1 to 6;
        dice.drawDice(r);
        if(r==1){
            this.isActive=true;
        }
        if(r<=(boxArr.length-1)-this.position && this.isActive){
            this.position+=r;
        }
        //Check if player wins
        if(this.position==boxArr.length-1){
            alert('Player '+this.playerNumber+'wins!!!\nPlease press enter to restart the game.');
        }
    };

    this.drawPlayer=function(){
        let currentPos=boxArr[this.position];
        if(this.position==58){
            _canvasObj.FillCircle(currentPos.x+currentPos.size/2,currentPos.y+currentPos.size/2,boxSize/3,0,2*Math.PI,false,this.color);
            this.position=18;
            setTimeout(()=>{
                currentPos=boxArr[this.position];
                _canvasObj.FillCircle(currentPos.x+currentPos.size/2,currentPos.y+currentPos.size/2,boxSize/3,0,2*Math.PI,false,this.color);
            },2000);
        }
        else if(this.position==98){
            _canvasObj.FillCircle(currentPos.x+currentPos.size/2,currentPos.y+currentPos.size/2,boxSize/3,0,2*Math.PI,false,this.color);
            this.position=27;
            setTimeout(()=>{
                currentPos=boxArr[this.position];
                _canvasObj.FillCircle(currentPos.x+currentPos.size/2,currentPos.y+currentPos.size/2,boxSize/3,0,2*Math.PI,false,this.color);
            },2000);
        }
        else if(this.position==74){
            _canvasObj.FillCircle(currentPos.x+currentPos.size/2,currentPos.y+currentPos.size/2,boxSize/3,0,2*Math.PI,false,this.color);
            this.position=33;
            setTimeout(()=>{
                currentPos=boxArr[this.position];
                _canvasObj.FillCircle(currentPos.x+currentPos.size/2,currentPos.y+currentPos.size/2,boxSize/3,0,2*Math.PI,false,this.color);
            },2000);
        }
        else if(this.position==93){
            _canvasObj.FillCircle(currentPos.x+currentPos.size/2,currentPos.y+currentPos.size/2,boxSize/3,0,2*Math.PI,false,this.color);
            this.position=66;
            setTimeout(()=>{
                currentPos=boxArr[this.position];
                _canvasObj.FillCircle(currentPos.x+currentPos.size/2,currentPos.y+currentPos.size/2,boxSize/3,0,2*Math.PI,false,this.color);
            },2000);
        }
        else if(this.position==16){
            _canvasObj.FillCircle(currentPos.x+currentPos.size/2,currentPos.y+currentPos.size/2,boxSize/3,0,2*Math.PI,false,this.color);
            this.position=75;
            setTimeout(()=>{
                currentPos=boxArr[this.position];
                _canvasObj.FillCircle(currentPos.x+currentPos.size/2,currentPos.y+currentPos.size/2,boxSize/3,0,2*Math.PI,false,this.color);
            },2000);
        }
        else if(this.position==6){
            _canvasObj.FillCircle(currentPos.x+currentPos.size/2,currentPos.y+currentPos.size/2,boxSize/3,0,2*Math.PI,false,this.color);
            this.position=34;
            setTimeout(()=>{
                currentPos=boxArr[this.position];
                _canvasObj.FillCircle(currentPos.x+currentPos.size/2,currentPos.y+currentPos.size/2,boxSize/3,0,2*Math.PI,false,this.color);
            },2000);
        }
        else if(this.position==30){
            _canvasObj.FillCircle(currentPos.x+currentPos.size/2,currentPos.y+currentPos.size/2,boxSize/3,0,2*Math.PI,false,this.color);
            this.position=87;
            setTimeout(()=>{
                currentPos=boxArr[this.position];
                _canvasObj.FillCircle(currentPos.x+currentPos.size/2,currentPos.y+currentPos.size/2,boxSize/3,0,2*Math.PI,false,this.color);
            },2000);
        }else{
            _canvasObj.FillCircle(currentPos.x+currentPos.size/2,currentPos.y+currentPos.size/2,boxSize/3,0,2*Math.PI,false,this.color);
        }        
    };
}

//function to draw image of snake and ladder
function loadSnakeAndLadder(){
    _canvasObj.DrawImageWH(snake1,boxSize*1, boxSize*4,100, 250);
    _canvasObj.DrawImageWH(snake2,boxSize*1, 0,230,400);
    _canvasObj.DrawImageWH(snake3,boxSize*5,boxSize*2,100,250);
    _canvasObj.DrawImageWH(snake4,boxSize*6,0,100,200);
    _canvasObj.Save();
    _canvasObj.Rotate(0.25);
    _canvasObj.DrawImageWH(ladder1,boxSize*5, boxSize*3, 30,220);
    _canvasObj.Restore();
    _canvasObj.Save();
    _canvasObj.Rotate(-0.15);
    _canvasObj.DrawImageWH(ladder2,boxSize*7,boxSize*2.5,30,320);
    _canvasObj.Restore();
    _canvasObj.Save();
    _canvasObj.Rotate(-0.2);
    _canvasObj.DrawImageWH(ladder3,boxSize*4, boxSize*7, 30,170);
    _canvasObj.Restore();
}


//function box
function Box(x, y, size, index){
    this.x=x;
    this.y=y;
    this.size=size;
    this.index=index;

    if(this.index % 4 ==1){
        this.color='#f00';        
    }else if(this.index % 4 ==2){
        this.color='#0f0';
    }else if(this.index % 4 ==3){
        this.color='#00f';
    }else{
        this.color='#ffd633';
    }
}

Box.prototype.drawBox=function(){
    _canvasObj.FillRectangle(this.x, this.y, this.size, this.size,this.color);
    _canvasObj.FillText(this.index+1,this.x+this.size/1.5,this.y+this.size/4,'#fff','10px Arial');
}

function drawBoard(){
    boxArr.forEach((b)=>{
        b.drawBox();
    });
}

window.onload=function () {  
    drawBoard();
    loadSnakeAndLadder();
    player1.drawPlayer();
    player2.drawPlayer();
    drawPlayerDetails();
}

