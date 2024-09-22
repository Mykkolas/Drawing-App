const canvas = document.getElementById("canvas");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const sizeEl = document.getElementById("size");
const colorEl = document.getElementById("color");
const clearEl = document.getElementById("clear");
const ctx = canvas.getContext("2d");

let size = 30;
let isPressed = false;
let color = "black";
let x = undefined;
let y = undefined;

canvas.addEventListener("mousedown", (e) => {
    isPressed = true;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    x = (e.clientX - rect.left) * scaleX;
    y = (e.clientY - rect.top) * scaleY;

    // Draw a circle immediately at the starting point
    drawCircle(x, y);
});

canvas.addEventListener("mouseup", (e) => {
    isPressed = false;

    x = undefined;
    y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
    if (isPressed) {
        const rect = canvas.getBoundingClientRect(); // Get the current size of the canvas
        const scaleX = canvas.width / rect.width;    // Scale factor in the X direction
        const scaleY = canvas.height / rect.height;  // Scale factor in the Y direction
        
        const x2 = (e.clientX - rect.left) * scaleX; // Adjust the X coordinate
        const y2 = (e.clientY - rect.top) * scaleY;  // Adjust the Y coordinate

        drawCircle(x2, y2);
        drawLine(x, y, x2, y2);
        x = x2;
        y = y2;
    }
});


canvas.addEventListener("touchstart", (e) => {
    isPressed = true;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const touch = e.touches[0];
    x = (touch.clientX - rect.left) * scaleX;
    y = (touch.clientY - rect.top) * scaleY;

    drawCircle(x, y);
});

canvas.addEventListener("touchend", () => {
    isPressed = false;
    x = undefined;
    y = undefined;
});

canvas.addEventListener("touchmove", (e) => {
    if (isPressed) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        const touch = e.touches[0];
        const x2 = (touch.clientX - rect.left) * scaleX;
        const y2 = (touch.clientY - rect.top) * scaleY;

        drawCircle(x2, y2);
        drawLine(x, y, x2, y2);
        x = x2;
        y = y2;
    }
    e.preventDefault(); // Prevent scrolling when touching the canvas
});

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}

increaseBtn.addEventListener("click", () => {
    size += 5;

    if (size > 50) {
        size = 50;
    }

    updateSizeOnScreen();
});

decreaseBtn.addEventListener("click", () => {
    size -= 5;

    if (size < 5) {
        size = 5;
    }

    updateSizeOnScreen();
});

colorEl.addEventListener("change", (e) => {
    color = e.target.value;
});

clearEl.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function updateSizeOnScreen() {
    sizeEl.innerText = size;
}

