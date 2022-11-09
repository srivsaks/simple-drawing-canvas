import "./styles.css";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const resetBtn = document.getElementById("clear");
const colorInput = document.getElementById("color");
const increaseSizeBtn = document.getElementById("increase");
const decreaseSizeBtn = document.getElementById("decrease");
const currentSize = document.getElementById("size");

var color = "black";

let hasMouseBeenPressed = false;
let x = null;
let y = null;
let size = 10;

canvas.addEventListener("mousedown", (e) => {
  hasMouseBeenPressed = true;
  x = e.offsetX;
  y = e.offsetY;
  drawCircle(x, y);
});

canvas.addEventListener("mouseup", (e) => {
  if (hasMouseBeenPressed) {
    drawLine(x, y, e.offsetX, e.offsetY);
    hasMouseBeenPressed = false;
    x = null;
    y = null;
  }
});

canvas.addEventListener("mousemove", (e) => {
  if (hasMouseBeenPressed) {
    console.log("yes");
    const x2 = e.offsetX;
    const y2 = e.offsetY;
    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);
    x = x2;
    y = y2;
    // drawLine
  }
});

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = `${color}`;
  ctx.lineWidth = size * 2;
  ctx.stroke();
  ctx.closePath();
}

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, 2 * Math.PI, false);
  ctx.fillStyle = `${color}`;
  ctx.fill();
  ctx.closePath();
}

function clearCanvas() {
  ctx.fillStyle = "ghostwhite";
  ctx.fillRect(0, 0, 400, 400);
}

function changeColor(newColor) {
  color = newColor;
}

resetBtn.addEventListener("click", clearCanvas);
colorInput.addEventListener("change", (e) => {
  changeColor(e.target.value);
});
increaseSizeBtn.addEventListener("click", (e) => {
  size = size + 1;
  currentSize.textContent = `${size}`;
});
decreaseSizeBtn.addEventListener("click", (e) => {
  if (size === 1) return;
  size = size - 1;
  currentSize.textContent = `${size}`;
});
