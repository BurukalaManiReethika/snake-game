const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreElement = document.getElementById("score");

const box = 20;

let snake = [
    { x: 200, y: 200 }
];

let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};

let score = 0;

let direction = "RIGHT";

document.addEventListener("keydown", changeDirection);

function changeDirection(event){

    if(event.key === "ArrowLeft" && direction !== "RIGHT"){
        direction = "LEFT";
    }

    if(event.key === "ArrowUp" && direction !== "DOWN"){
        direction = "UP";
    }

    if(event.key === "ArrowRight" && direction !== "LEFT"){
        direction = "RIGHT";
    }

    if(event.key === "ArrowDown" && direction !== "UP"){
        direction = "DOWN";
    }
}

function collision(head, array){

    for(let i = 0; i < array.length; i++){

        if(head.x === array[i].x &&
           head.y === array[i].y){
            return true;
        }
    }

    return false;
}

function draw(){

    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,400,400);

    snake.forEach((segment,index)=>{

        ctx.fillStyle =
            index === 0 ? "lime" : "green";

        ctx.fillRect(
            segment.x,
            segment.y,
            box,
            box
        );
    });

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction === "LEFT") snakeX -= box;
    if(direction === "UP") snakeY -= box;
    if(direction === "RIGHT") snakeX += box;
    if(direction === "DOWN") snakeY += box;

    if(
        snakeX === food.x &&
        snakeY === food.y
    ){
        score++;
        scoreElement.textContent = score;

        food = {
            x: Math.floor(Math.random()*20)*box,
            y: Math.floor(Math.random()*20)*box
        };
    }else{
        snake.pop();
    }

    const newHead = {
        x: snakeX,
        y: snakeY
    };

    if(
        snakeX < 0 ||
        snakeY < 0 ||
        snakeX >= 400 ||
        snakeY >= 400 ||
        collision(newHead, snake)
    ){
        clearInterval(game);
        alert("Game Over! Score: " + score);
    }

    snake.unshift(newHead);
}

let game = setInterval(draw, 120);

function restartGame(){

    snake = [{x:200,y:200}];

    direction = "RIGHT";

    score = 0;

    scoreElement.textContent = score;

    food = {
        x: Math.floor(Math.random()*20)*box,
        y: Math.floor(Math.random()*20)*box
    };

    clearInterval(game);

    game = setInterval(draw,120);
}
