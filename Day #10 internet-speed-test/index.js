let startTime, endTime;
let imageSize = "";
let image = new Image();
let bitSpeed = document.getElementById("bits"),
    kbSpeed = document.getElementById("kbs"),
    mbSpeed = document.getElementById("mbs"),
    info = document.getElementById("info");

let totalBitSpeed = 0;
let totalKbSpeed = 0;
let totalMbSpeed = 0;
let numTests = 1;
let testCompleted = 0;

// get random image from unsplash.com
let imageApi = "https://source.unsplash.com/random?topic=nature";

// when image loads
image.onload = async function () {
    endTime = new Date().getTime();

    // get image size
    fetch(imageApi).then((response) => {
        imageSize = response.headers.get("content-length");
        calculateSpeed();
    });
};

// function to calculate speed
function calculateSpeed() {
    // time taken in seconds
    let timeDuration = (endTime - startTime) / 1000;
    // total bits
    let loadedBits = imageSize * 8;
    let speedInBts = loadedBits / timeDuration;
    let speedInKbs = speedInBts / 1024;
    let speedInMbs = speedInKbs / 1024;

    totalBitSpeed += speedInBts;
    totalKbSpeed += speedInKbs;
    totalMbSpeed += speedInMbs;

    testCompleted++;

    // If all tests completed(get 5 images then calculate average)
    if (testCompleted === numTests) {
        let averageSpeedInBps = (totalBitSpeed / numTests).toFixed(2);
        let averageSpeedInKbps = (totalKbSpeed / numTests).toFixed(2);
        let averageSpeedInMbps = (totalMbSpeed / numTests).toFixed(2);

        // display average speed
        bitSpeed.innerHTML += `${averageSpeedInBps} bps`;
        kbSpeed.innerHTML += `${averageSpeedInKbps} Kbps`;
        mbSpeed.innerHTML += `${averageSpeedInMbps} Mbps`;
        info.innerHTML = "Test Completed!";
    } else {
        startTime = new Date().getTime();
        image.src = imageApi;
    }
}

// initial function to start tests
const runTest = async () => {
    info.innerHTML = "Testing...";
    startTime = new Date().getTime();
    image.src = imageApi;
};

// run tests when window loads
window.onload = () => {
    for (let i = 0; i < numTests; i++) {
        runTest();
    }
};