const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 400;

let ball = { x: canvas.width / 5, y: canvas.height / 2, radius: 10, dx: 3, dy: 3 };
let paddle = { width:120, height: 10, x: (canvas.width - 80) / 2, speed: 5 };
let score = 0;
let gameOver = false;

// Event listener for paddle movement
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && paddle.x > 0) {
        paddle.x -= paddle.speed;
    } else if (event.key === "ArrowRight" && paddle.x < canvas.width - paddle.width) {
        paddle.x += paddle.speed;
    }
});

// Function to draw the ball
function drawBall() {
    ctx.beginPath();//it is canvas method begin and close //
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);//arc metho in canvas to create a cricle//
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

// Function to draw the paddle
function drawPaddle() {
    ctx.fillStyle = "skyblue";
ctx.fillRect(paddle.x, canvas.height - paddle.height - 10, paddle.width, paddle.height);//fillrect method is used to create rectangle//
}

// Function to draw the score
function drawScore() {
    document.getElementById("score").innerText = score;
}

// Function to update ball position
function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Wall collision (left & right)
    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        ball.dx *= -1;
    }

    // Ceiling collision
    if (ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    // Paddle collision
    if (
        ball.y + ball.radius >= canvas.height - paddle.height - 10 &&
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.width
    ) {
        ball.dy *= -1;
        score++;
        drawScore();
    }

    // Ball falls (Game Over)
    if (ball.y + ball.radius > canvas.height) {
        gameOver = true;
    }
}

// Function to restart game
function restartGame() {
    score = 0;
    ball = { x: canvas.width / 2, y: canvas.height / 2, radius: 10, dx: 3, dy: 3 };
    gameOver = false;
    drawScore();
    gameLoop();
}

// Game loop
function gameLoop() {
    if (gameOver) {
        alert("Game Over! Score: " + score);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    updateBall();

    requestAnimationFrame(gameLoop);
}

// Start game
drawScore();
gameLoop();
