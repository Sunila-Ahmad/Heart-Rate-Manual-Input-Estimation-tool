// --- Water Logic ---
let glasses = 0;
function addWater() {
    glasses++;
    document.getElementById('waterCount').innerText = glasses;
    localStorage.setItem('dailyWater', glasses); // Persistence
}

// --- Stopwatch Logic ---
let timer;
let seconds = 0;
let running = false;

document.getElementById('startStop').addEventListener('click', function() {
    if (!running) {
        running = true;
        this.innerText = "Pause";
        timer = setInterval(() => {
            seconds++;
            let hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
            let mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
            let secs = (seconds % 60).toString().padStart(2, '0');
            document.getElementById('stopwatch').innerText = `${hrs}:${mins}:${secs}`;
        }, 1000);
    } else {
        running = false;
        this.innerText = "Start";
        clearInterval(timer);
    }
});

// --- Step Counter (Using Device Motion) ---
let steps = 0;
let lastAcceleration = { x: 0, y: 0, z: 0 };
const threshold = 12; // Sensitivity for a "step"

window.addEventListener('devicemotion', (event) => {
    let acc = event.accelerationIncludingGravity;
    let deltaX = Math.abs(acc.x - lastAcceleration.x);
    let deltaY = Math.abs(acc.y - lastAcceleration.y);
    let deltaZ = Math.abs(acc.z - lastAcceleration.z);

    if (deltaX + deltaY + deltaZ > threshold) {
        steps++;
        document.getElementById('stepCount').innerText = Math.floor(steps / 6); // Rough filter
        document.getElementById('status').innerText = "Moving...";
    } else {
        document.getElementById('status').innerText = "Stationary";
    }
    lastAcceleration = acc;
});

// --- Heart Rate Simulation ---
// Real HR requires Web Bluetooth (Connecting to a strap)
function simulateHeartRate() {
    document.getElementById('bpm').innerText = "Reading...";
    setTimeout(() => {
        let randomHR = Math.floor(Math.random() * (120 - 65 + 1)) + 65;
        document.getElementById('bpm').innerText = randomHR;
    }, 2000);
}