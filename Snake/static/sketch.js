// Global variables for the size of the canvas.
var canvas_width = 800;
var canvas_height = 800;

// Variable to hold the information associated with our snake.
var snake;
var snake_width = 20;
var snake_height = 20;

// Arrays used to generate random locations for the fruit.
var locations_x;
var locations_y;

// Holds information about the game state.
var fruit_eaten = 0;
var score_text;
var fruit_exists = false;
var fruit_x = 0;
var fruit_y = 0;
var game_over = false;
var game_over_text;

// Controls how fast the game runs.
var game_tick = 0;
var game_speed = 2;

function setup() {
  // Create the canvas.
  createCanvas(canvas_width, canvas_height);

  // Generate all possible starting x and y locations for the fruit.
  locations_x = [];
  for(let i = 0; i < canvas_width / snake_width; i++) {
    locations_x.push(i * snake_width);
  }
  locations_y = [];
  for(let i = 0; i < canvas_height / snake_height; i++) {
    locations_y.push(i * snake_height);
  }

  // Initialize the score text.
  score_text = createDiv('temp');
  game_over_text = createDiv('temp');

  // Create the snake object.
  snake = new Snake(snake_width, snake_height);
}

function keyPressed() {
  // Change the velocity of the snake based on the press of an arrow key.
  if(keyCode == LEFT_ARROW) {
    game_over = snake.update_velocity(-1, 0);
  } else if(keyCode == RIGHT_ARROW) {
    game_over = snake.update_velocity(1, 0);
  } else if(keyCode == UP_ARROW) {
    game_over = snake.update_velocity(0, -1);
  } else if(keyCode == DOWN_ARROW) {
    game_over = snake.update_velocity(0, 1);
  } else {
  }
}

function draw() {

  game_over_text.remove();
  
  // If the game is over, say the game is over!
  if(game_over == true) {
    fill(0);
    textSize(32);
    textFont();
    stroke('black');
    strokeWeight(1);
    game_over_text = createDiv('Game Over');
    game_over_text.position(10, 900);
    game_over_text.style('font-size', '24px', 'color', 'black');
    noLoop();
  }

  score_text.remove();

  game_tick++;

  if(game_tick % game_speed == 0) {
    // Draw black background.
    fill(0);
    rect(0, 0, canvas_width - 1, canvas_height - 1);

    // If the snake just ate the fruit, generate a new fruit.
    if(!fruit_exists) {
      generate_fruit();
    }
    fill(255, 0, 0);
    rect(fruit_x, fruit_y, snake_width, snake_height);

    // At every tick, check the snake's head position and see if it matches up with the fruit.
    check_fruit(snake);

    // Update the position of the snake based on what arrow key the user pressed.
    snake.update_position();

    // Check if the snake's new position leads to the game being over.
    game_over = snake.threshold_position(canvas_width, canvas_height);
    fill(255);
    rect(snake.pos_x, snake.pos_y, snake_width, snake_height);
  }

  // Write the score text to the canvas.
  fill(0);
  textSize(32);
  textFont();
  stroke('black');
  strokeWeight(1);
  score_text = createDiv('Score: ' + fruit_eaten);
  score_text.position(10, 875);
  score_text.style('font-size', '24px', 'color', 'black');
}

// Generate a random location on the board and put a piece of fruit there.
function generate_fruit() {
  fruit_x = locations_x[Math.floor(Math.random() * locations_x.length)];
  fruit_y = locations_y[Math.floor(Math.random() * locations_y.length)];
  fruit_exists = true;
}

// See if the snake has eaten the fruit.
function check_fruit(snake) {
  if(fruit_x == snake.pos_x && fruit_y == snake.pos_y){
    fruit_eaten++;
    fruit_exists = false;
  }
}