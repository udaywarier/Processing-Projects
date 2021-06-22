// Class to hold all information about the snake.
class Snake {
    constructor(snake_width, snake_height) {
        this.pos_x = 0;
        this.pos_y = 0;
        this.velocity_x = 1;
        this.velocity_y = 0;
        this.snake_width = snake_width;
        this.snake_height = snake_height;
    }

    // Updates the velocity of the snake based on which arrow key the user pressed. You lose if the new direction you pick
    // is exactly opposite to where you are already going!
    update_velocity(new_velocity_x, new_velocity_y) {
        if(this.velocity_x == -new_velocity_x || this.velocity_y == -new_velocity_y) {
            return true;
        } else {
            this.velocity_x = new_velocity_x;
            this.velocity_y = new_velocity_y;
            return false;
        }
    }

    // Updates the position of the snake based on its velocity.
    update_position() {
        this.pos_x += this.snake_width*this.velocity_x;
        this.pos_y += this.snake_height*this.velocity_y;
    }

    // You lose if your new position puts you off the screen!
    threshold_position(canvas_width, canvas_height) {
        if(this.pos_x >= canvas_width) {
            this.pos_x = canvas_width - this.snake_width;
            return true;
        } else if(this.pos_x < 0) {
            this.pos_x = 0;
            return true;
        } else if(this.pos_y >= canvas_height) {
            this.pos_y = canvas_height - this.snake_height;
            return true;
        } else if(this.pos_y < 0) {
            this.pos_y = 0;
            return true;
        } else {
            return false;
        }
    }
}