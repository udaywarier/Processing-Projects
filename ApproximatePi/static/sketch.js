// Global variables for the size of the canvas and radius of the ellipse.
var canvas_width = 800;
var canvas_height = 800;
var ellipse_radius = canvas_width/2;

// We can change these to get a slower/faster rate of convergence. Set frequency to 1 for maximum point generation.
var draw_count = 0;
var sample_frequency = 1;
var point_limit = 10000;

// Keep track of how many points we generated and how many of these are in the 'unit' circle, to be used for our approximation.
var total_sample_points = 0;
var circle_sample_points = 0;
var pi_approximation = 0;
var error = 0;

// Text div elements to display our results.
var number_text;
var approximate_text;
var error_text;

function setup() {
  // Create the canvas and set the global stroke settings for the box and the ellipse.
  createCanvas(canvas_width, canvas_height + 100);
  stroke(51);
  strokeWeight(5);

  // Initialize the text objects.
  number_text = createDiv('temp');
  approximate_text = createDiv('temp');
  error_text = createDiv('temp');

  // Draw a border around the canvas, fill in the canvas with a light blue color.
  fill(173, 216, 255);
  rect(1, 1, canvas_width - 2, canvas_height - 2);

  // Draw an ellipse inside the canvas, fill it in with a light orange color.
  fill(254, 216, 177);
  ellipse(canvas_width/2, canvas_height/2, canvas_width, canvas_height);
}
  
function draw() {

  // Clear the old text strings that were on the screen.
  approximate_text.remove();
  error_text.remove();
  number_text.remove();

  draw_count++;
  if(total_sample_points < point_limit && draw_count % sample_frequency == 0){
    // Randomly generate and plot a point on the canvas.
    var rand_x = Math.random() * canvas_width;
    var rand_y = Math.random() * canvas_height;
    stroke('green');
    strokeWeight(10);
    point(rand_x, rand_y);

    // Keep track of this point in our overall sample.
    total_sample_points++;

    // Generated point lies within our 'unit' circle!
    rand_x -= ellipse_radius;
    rand_y -= ellipse_radius;
    if(Math.sqrt(Math.pow(rand_x, 2) + Math.pow(rand_y, 2)) <= ellipse_radius) {
      circle_sample_points++;
    }

    // Area of circle = pi*r^2. Area of square is (2r)^2 = 4r^2. So (area of circle)/(area of square) = pi/4. 
    pi_approximation = 4 * (circle_sample_points / total_sample_points);

    // Absolute percent error between the approximation and the 'actual' value of pi.
    error = Math.abs(Math.PI - pi_approximation)/Math.PI;
  }

  // Write the approximation and the error to the screen.
  fill(0);
  textSize(32);
  textFont();
  stroke('black');
  strokeWeight(1);
  number_text = createDiv('Number of iterations: ' + total_sample_points);
  number_text.position(10, 870);
  number_text.style('font-size', '24px', 'color', 'black');
  approximate_text = createDiv('Approximate value of Pi: ' + pi_approximation);
  approximate_text.position(10, 890);
  approximate_text.style('font-size', '24px', 'color', 'black');
  error_text = createDiv('Percent error:  ' + error*100 + '\%');
  error_text.position(10, 910);
  error_text.style('font-size', '24px', 'color', 'black');
}