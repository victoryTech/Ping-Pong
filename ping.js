var rod1=document.getElementById("rod1");
var rod2=document.getElementById("rod2");
var ball=document.getElementById("ball");

var player=document.getElementById("player");
var scoreBoard=document.getElementById("scoreBoard");
var maxScoreBoard=document.getElementById("maxScoreBoard");

const storeName="PPlayer";
const storeScore="SScore";
const rod1Name="Player 1";
const rod2Name="Player 2";

let score;
let maxScore;
let rod;
let movement;
let ballSpeedX=2;
let ballSpeedY=2;

let gameOn=false;

let viewHeight=window.innerHeight;
let viewWidth=window.innerWidth;

rod1.style.left=rod1.offsetLeft+"px";
rod2.style.left=rod2.offsetLeft+"px";

(function ()
{
    rod=localStorage.getItem(storeName);
    maxScore=localStorage.getItem(storeScore);

    alert("Press A: to go left. Press D: to right. Press Enter to start the game. Have fun!!");

    if(rod==null || maxScore==null)
    {
        
        rod="Player 2";
        // console.log(rod==rod1Name);
        maxScore=0;
    }
    resetBoard(rod);

}
)();

function resetBoard(rod)
{
    rod1.style.left=((viewWidth-rod1.offsetWidth)/2)+"px";
    rod2.style.left=((viewWidth-rod2.offsetWidth)/2)+"px";
    ball.style.left=((viewWidth-ball.offsetWidth)/2)+"px";


    //console.log("reset "+rod);

    if(rod==rod1Name)
    {
      //  console.log("reset p1");
        ball.style.top=(rod2.offsetTop-rod2.offsetHeight)+"px";
        ballSpeedY=-2;
    }
    else if(rod==rod2Name)
    {
      //  console.log("reset p2");
        ball.style.top=(rod1.offsetTop+rod1.offsetHeight)+"px";
        ballSpeedY=2;
    }
    score=0;
    gameOn=false;
}

function storeWin(rod,score)
{
    if(score>maxScore)
    {
        maxScore=score;
        localStorage.setItem(storeName,rod);
        localStorage.setItem(storeScore,maxScore);
    }
    
    player.innerText=rod;
    scoreBoard.innerText=score;
    maxScoreBoard.innerText=maxScore;
    clearInterval(movement);
    resetBoard(rod);
}

function setValue(value)
{
    return value+"px";
}

window.addEventListener("keydown",function(event)
{
    var value=event.keyCode;
    var left1=parseInt(rod1.style.left);
    // var left2=parseInt(rod2.style.left);
    if(value==65)
    {
        if(left1>0)
        {
            rod1.style.left=setValue(left1-20);
            rod2.style.left=rod1.style.left;
        }
    }
    else if(value==68)
    {
        if(left1<viewWidth-rod1.offsetWidth)
        {
            rod1.style.left=setValue(left1+20);
            rod2.style.left=rod1.style.left;
        }
    }

    if(value==13)
    {
        if(!gameOn)
        {
            gameOn=true;
            var ballRect=ball.getBoundingClientRect();
            var ballX=ballRect.x;
            var ballY=ballRect.y;
            var ballDia=ballRect.width;

            var rod1Height=rod1.offsetHeight;
            var rod1Width=rod1.offsetWidth;
            var rod2Height=rod2.offsetHeight;
            var rod2Width=rod2.offsetWidth;

          

            movement=this.setInterval(function()
            {
                ballX+=ballSpeedX;
                ballY+=ballSpeedY;

                ball.style.top=ballY+"px";
                ball.style.left=ballX+"px";

                var rod1X=rod1.getBoundingClientRect().x;
                var rod2X=rod2.getBoundingClientRect().x;

                if(ballX<0 || ballX>(viewWidth-ballDia))
                {
                    ballSpeedX=-ballSpeedX;
                }

                let ballPos=ballX+ballDia;

                if(ballY<=rod1Height)
                {
                    //console.log("ball <= rod1 height");
                    score++;
                    ballSpeedY=-ballSpeedY;
                    console.log(ballPos,rod1X,rod1X+rod1Width);
                    if(ballPos<rod1X || ballPos>(rod1X+rod1Width))
                    {
                        console.log("p1 loses");
                        storeWin(rod2Name,score);
                    }
                    else if(ballPos>=rod1X && ballPos<=rod1Width+rod1X)
                    {
                        console.log("p1 catches ball");
                    }
                }
                else if(ballY+ballDia>=viewHeight-rod2Height)
                {
                    ballSpeedY=-ballSpeedY;
                    score++;
                    console.log(ballPos,rod2X,rod2X+rod2Width);
                    if(ballPos<rod2X || ballPos> (rod2X+rod2Width))
                    {
                        console.log("p2 loses");
                        storeWin(rod1Name,score);
                    }
                    else if(ballPos>=rod2X && ballPos<=rod2Width+rod2X)
                    {
                        console.log("p2 catches ball");
                    }
                }


            },10);
        }
    }
})