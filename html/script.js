// script.js

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
const gridSize = 20; // Snake grid size
const canvasSize = 400; // Size of the canvas
let snake = [{ x: 160, y: 160 }]; // Initial snake position (middle of canvas)
let direction = 'RIGHT'; // Initial direction
let food = generateFood();
let score = 0;

// Event listener for controlling the snake with arrow keys
document.addEventListener('keydown', changeDirection);

// Function to update game state
function update() {
    moveSnake();
    checkCollisions();
    checkFoodCollision();
    drawGame();
}

// Function to move the snake
function moveSnake() {
    const head = { ...snake[0] };

    if (direction === 'RIGHT') head.x += gridSize;
    if (direction === 'LEFT') head.x -= gridSize;
    if (direction === 'UP') head.y -= gridSize;
    if (direction === 'DOWN') head.y += gridSize;

    // Add the new head to the front of the snake array
    snake.unshift(head);

    // Remove the last segment if no food is eaten
    if (head.x !== food.x || head.y !== food.y) {
        snake.pop();
    }
}

// Function to check if the snake has collided with the walls or itself
function checkCollisions() {
    const head = snake[0];

    // Check wall collisions
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        gameOver();
    }

    // Check snake collisions with itself
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
        }
    }
}

// Function to check if the snake has eaten food
function checkFoodCollision() {
    const head = snake[0];
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = generateFood(); // Generate new food
    }
}

// Function to generate random food location
function generateFood() {
    const x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    const y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    return { x, y };
}

// Function to change the snake's direction based on key press
function changeDirection(event) {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') {
        direction = 'UP';
    } else if (event.key === 'ArrowDown' && direction !== 'UP') {
        direction = 'DOWN';
    } else if (event.key === 'ArrowLeft' && direction !== 'RIGHT') {
        direction = 'LEFT';
    } else if (event.key === 'ArrowRight' && direction !== 'LEFT') {
        direction = 'RIGHT';
    }
}

// Function to draw everything on the canvas
function drawGame() {
    // Clear canvas
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // Draw the snake
    snake.forEach(segment => {
        ctx.fillStyle = '#00FF00'; // Green color for snake
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });

    // Draw the food
    ctx.fillStyle = '#FF0000'; // Red color for food
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    // Draw the score
    ctx.fillStyle = '#000000'; // Black color for score text
    ctx.font = '16px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
}

// Function to end the game
function gameOver() {
    clearInterval(gameInterval); // Stop the game loop
    alert('Game Over! Your score was ' + score);
}

// Game loop
const gameInterval = setInterval(update, 100); // Update every 100ms
