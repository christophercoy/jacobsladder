console.log("Hello there");

var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 200;

var ctx = canvas.getContext("2d");

var x = 100;
var y = 100;
var width = 100;
var height = 100;

ctx.fillRect(x, y, width, height);

function changeTitle() {
    var title = document.getElementById("myTitle");
    title.innerText = "Hello Jacob";
}

function makeBoxBigger() {
    width = width + 10;
    height = height + 10;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(x, y, width, height);
}