/* Pong */
    var canvasWidth = 1000;
    var canvasHeight = 700;
    var ctx;
    var speedX = 6;
    var speedY = 6;
    var vel = 30;
    var raf;
    var scoreOne = 0;
    var scoreTwo = 0;
    var timeOut;
    var audio = new Audio('audio/pong.mp3')
    
    
    var plyOne = {
        x: 50,
        y: 300, 
        w: 20, 
        h: 100
   };
    var plyTwo = {
        x: 930,
        y: 300,
        w: 20,
        h: 100
   };
    
    var canvas = document.createElement("canvas");

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.margin = "40px auto";
    canvas.style.border = "10px solid grey"
    canvas.style.display = "block";
    canvas.style.backgroundColor = "#090808";
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    
function centerLine(){
    ctx.beginPath();
    ctx.strokeStyle = "#fff"
    ctx.lineWidth = 5;
    ctx.setLineDash([30, 10]);
    ctx.moveTo(500, -2);
    ctx.lineTo(500, 700);
    ctx.stroke();
    window.requestAnimationFrame(centerLine);
}


/************* Draw Players One & Two *********************/ 

function playerOneBody() {
        ctx.fillStyle = "#fff"
        ctx.fillRect(plyOne.x, plyOne.y, plyOne.w, plyOne.h);
        raf = window.requestAnimationFrame(playerOneBody);
    };
    
function playerTwoBody() {
        ctx.fillStyle = "#fff"
        ctx.fillRect(plyTwo.x, plyTwo.y, plyTwo.w, plyTwo.h);
        raf = window.requestAnimationFrame(playerTwoBody)
    };
    
/*************** Players direction functions **************/ 
    function plyOneUp(){
        plyOne.y = plyOne.y - vel;
        ctx.clearRect(plyOne.x ,0 , plyOne.w, canvasHeight);
        playerOneBody();
    };
    
    function plyOneDown(){
        plyOne.y = plyOne.y + vel;
        ctx.clearRect(plyOne.x ,0 , plyOne.w, canvasHeight);
        playerOneBody();
    };

    function plyTwoUp(){
        plyTwo.y = plyTwo.y - vel;
        ctx.clearRect(plyTwo.x ,0 , plyTwo.w, canvasHeight);
        playerTwoBody();
    };
    
    function plyTwoDown(){
        plyTwo.y = plyTwo.y + vel;
        ctx.clearRect(plyTwo.x ,0 , plyTwo.w, canvasHeight);
        playerTwoBody();
    };

/****************** Key Mapping for moving players *****************/
function playersMoving(){
 window.onkeydown = function(event){
        var keyPr = event.keyCode;
        if (keyPr === 90 && plyOne.y > 0) {
            plyOneUp();
        } else if (keyPr === 83 && plyOne.y <= 580) {
            plyOneDown();
        }if (keyPr === 38 && plyTwo.y > 0) {
            plyTwoUp();
        } else if (keyPr === 40 && plyTwo.y <= 580) {
            plyTwoDown();
        }
    }; 
};
playersMoving();

        function scorePOne() {
                ctx.save();
                ctx.font = "bold 100px sans-serif"
                ctx.fillStyle = "gray";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(scoreOne.toString(), 400, 50);
                ctx.restore();
                window.requestAnimationFrame(scorePOne)
            }

            function scorePTwo() {
                ctx.save();
                ctx.font = "bold 100px sans-serif"
                ctx.fillStyle = "gray";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(scoreTwo.toString(), 600, 50);
                ctx.restore();
                window.requestAnimationFrame(scorePTwo)
                }
     
            var ball = {
                x: 100,
                y: 350,
                w: 20, 
                h: 20,
                drawBall: function(){
                    ctx.fillStyle = "#fff"
                    ctx.fillRect(ball.x, ball.y, ball.w, ball.h);
                }
            }

        function drawBall (){
                ctx.clearRect(0 , 0, canvasWidth, canvasHeight)
                ball.drawBall();
                ball.x += speedX
                ball.y += speedY
        

        if (ball.y + speedY >= canvasHeight ||
            ball.y + speedY <= 0){ 
            speedY = -speedY;
            audio.play();
        }
        if (ball.x + speedX >= canvasWidth){
            speedX = -speedX;
            scoreOne++;
            audio.play();  
        }   
        if (ball.x + speedX <= 0) {
            speedX = -speedX;
            scoreTwo++;
            audio.play();
        }
        if (plyOne.x + plyOne.w == ball.x && plyOne.y < ball.y + ball.h && plyOne.h + plyOne.y > ball.y){
            speedX = -speedX;
            audio.play();
        }
        if (plyTwo.x == ball.x + ball.w && plyTwo.y < ball.y + ball.h && plyTwo.h + plyTwo.y > ball.y){
            speedX = -speedX;
            audio.play();
        }
        raf = window.requestAnimationFrame(drawBall, playerOneBody, playerTwoBody);
        
        
    }

  window.addEventListener('load', function(e){
        window.requestAnimationFrame(drawBall);
        window.requestAnimationFrame(playerOneBody);
        window.requestAnimationFrame(playerTwoBody);
        window.requestAnimationFrame(centerLine);
        window.requestAnimationFrame(scorePOne);
        window.requestAnimationFrame(scorePTwo);
});