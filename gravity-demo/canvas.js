/*
    Set up our environment with variables.
*/
var canvas = getTag("canvas");
var context = canvas.getContext("2d");
var gravity = 1.89; // How strong is the gravity?
var friction = .89; // How much energy is lost per frame (over time)
var circleArray = []; // The collection of balls we'll create. Starts empty
var numberOfCircles = 20; // How many balls will we make?
var variableHorizontalSpeed = 10; // How fast, left or right can the balls start out?
var variableVerticalSpeed = 10; // How fast, up or down, can the balls start out?

function getFormValue(valueName) {
    return getTag(valueName).value;
}

// An array of various shades of blue
var colors = [
    "#305e8c",
    "#1b76d1",
    "#2c8da3",
    "#276775",
    "#0768fa",
    "#144896",
    "#3e3cc7",
    "#4ad0e8",
    "#8ee5f5",
    "#5e308c",
    "#761bd1",
    "#8d2ca3",
    "#672775",
    "#6807fa",
    "#481496",
    "#3c3ec7",
    "#d04ae8",
    "#e58ef5"
];
/*
    End of environment set up
*/

// Sizes the canvas and creates the circles/balls
init();

// Starts moving things, frame by frame
animate();

// If the user changes the size of the screen or clicks, change the canvas in response
addEventListener("resize", init);
addEventListener("click", init);

// The circle object holds the x/y coordinates of the circle, the speeds sideways and up/down, the size and the color
// You must create a new circle to put it into memory, call circle.draw() to put it on the screen
// and you must call circle.update() to change its behavior frame by frame
function Circle(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    // Put the object on the canvas visibly using the x,y etc. values.
    this.draw = function() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
        context.stroke();
        context.closePath();
    }

    // Alter the physics of the circle/ball according to our variables. 
    this.update = function() {
        if(this.radius > 0) {
            
            if(this.x + this.radius + this.dx > canvas.width || 
                this.x - this.radius <= 0 || this.x <= 0) {
                // reverse the sideways motion if the ball hits an edge,
                // factor in the loss of energy due to friction
                this.dx = -this.dx
            }

            // reverse the virtical motion if the ball hits an edge or if gravity has set the value to zero,
            // factor in the loss of energy due to friction,
            // let gravity change the speed over time, postive and negative.
            if(this.y + this.radius + this.dy > canvas.height || this.y - this.radius <= 0) {
                this.dy = -this.dy * friction;
            } else {
                this.dy += gravity;
            }
            
            this.x += this.dx;
            this.y += this.dy;        
        }
        this.draw();
    }
}

function createCircles() {
    console.log("circles", numberOfCircles);
    circleArray = [];
    for (var index = 0; index < numberOfCircles; index++) {
        circleArray.push(getRandomizedCircle());
    }
}

function getRandomizedCircle() {
    var radius = randomIntFromRange(10, 30);
    var x = randomIntFromRange(radius + 30, canvas.width - radius);
    var y = randomIntFromRange(radius + 50, canvas.height - radius);
    var dx = randomIntFromRange(-variableHorizontalSpeed, variableHorizontalSpeed);
    var dy = randomIntFromRange(-variableVerticalSpeed, variableVerticalSpeed);
    var color = randomColor();
    var circle = new Circle(x, y, dx, dy, radius, color);
    return circle;
}

/*
    Utility functions:
        randomize numbers, colors
        basic animation loop
        resizing canvas
*/

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor() {
    return colors[randomIntFromRange(0, colors.length - 1)];
}

// Looks up an HTML tag by the "id" of the tag.
// example: if you have <canvas id="bob"> then you can pass "bob" into this
// function and get back the canvas object.
function getTag(tagName) {
    return document.getElementById(tagName);
}

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);

    for(var i=0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

function init() {
    canvas.height = window.innerHeight - 10;
    canvas.width = window.innerWidth-10;
    createCircles();
}
