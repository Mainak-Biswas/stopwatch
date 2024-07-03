// Getting all the elements of DOM
const sw_sp_btn = document.getElementById("stopwatch_start_pause"); // Start and Pause Button
const sw_st_btn = document.getElementById("stopwatch_stop"); // Stop button
const stopwatch_list = document.getElementById("stopwatch_list"); //List to display play pause data

// Local variables and flags to maipulate data
let runningFlag = "stop"; // Flag to know the state of the watch, whether started, paused or stopped
sw_st_btn.disabled = true; // Initially stop button is disabled
let interval; // To maintain an interval of 10ms
let counter = 0; // Counter updates every 10ms
const time = { ms: 0, sec: 0, min: 0, hrs: 0 };
let initial = true; // Tells that the stop was is at intial state

// Adding on click functions to the buttons
sw_sp_btn.onclick = () => {
    // To Start the timer
    if (runningFlag === "stop" || runningFlag === "pause") {
        // Stop button is enabled
        sw_st_btn.disabled = false;
        // play icon changed to pause so that it looks like pause button
        sw_sp_btn.innerHTML = `<i class="fa fa-pause"></i>`;

        // runningFlag  set to start
        runningFlag = "start";
        // Start timer with displaying message in the list as checkpoint
        startTimer();
    }

    // TO Pause the timer
    else if (runningFlag === "start") {
        // Pause icon changed to start so that it looks like start button
        sw_sp_btn.innerHTML = `<i class="fa fa-play"></i>`;

        // runningFlag  set to start
        runningFlag = "pause";

        // Pause timer with
        pauseTimer();
    }

    // Displaying message in the list as checkpoint
    displayMsg();
};

sw_st_btn.onclick = () => {
    // Disabling the stop button
    sw_st_btn.disabled = true;

    // start/pause button icon changed to start so that it looks like start button
    sw_sp_btn.innerHTML = `<i class="fa fa-play"></i>`;

    // runningFlag  set to stop
    runningFlag = "stop";

    // Displaying message in the list as checkpoint
    displayMsg();

    // Stop timer with displaying message in List
    stopTimer();
};

// Function to start timer
function startTimer() {
    interval = setInterval(() => {
        counter++;
        // Updating the time
        updateTime();
        //Displaying the time
        displayTime();
        console.log(counter);
    }, 10);
}

// Time updater
function updateTime() {
    // To display milisecs
    let ms = counter % 100;
    time.ms = ms < 10 ? "0" + ms : ms;
    // To display seconds
    let sec = Math.floor(counter / 100);
    sec = sec % 60;
    time.sec = sec < 10 ? "0" + sec : sec;
    // To display minutes
    let min = Math.floor(counter / 6000);
    min = min % 60;
    time.min = min < 10 ? "0" + min : min;
    // To display hours
    let hrs = Math.floor(counter / 360000);
    hrs = hrs % 60;
    time.hrs = hrs < 10 ? "0" + hrs : hrs;
}

// Function to display time
function displayTime() {
    document.getElementById("hr").textContent = time.hrs;
    document.getElementById("mn").textContent = time.min;
    document.getElementById("sc").textContent = time.sec;
    document.getElementById("ms").textContent = time.ms;
}

// Function to pause time
function pauseTimer() {
    //Stopping setInterval function
    clearInterval(interval);
}

// Function to stop time
function stopTimer() {
    //Stopping setInterval function
    clearInterval(interval);
    // Resettting counter value to 0
    counter = 0;
    // Resetting time to 0 and update time will set everything to 0 since counter = 0
    updateTime();
    //Displaying Time
    displayTime();
    // Setting stop watch state to initial = true
    initial = true;
}

//Displaying message in the list
function displayMsg() {
    let message = document.createElement("div");
    const { hrs, min, sec, ms } = time;
    switch (runningFlag) {
        case "start":
            if (initial) {
                // Prints message when stop watch is at initial state that is 0
                initial = false;
                stopwatch_list.textContent = "";
                message.textContent = "Stopwatch started";
            } else return; // So that no extra div is formed
            break;
        case "pause":
            message.textContent = `Checkpoint at ${hrs + "Hr " + min + "Min " + sec + "Sec " + ms + "Ms"}`;
            break;
        case "stop":
            message.textContent = `Stopped at ${hrs + "Hr " + min + "Min " + sec + "Sec " + ms + "Ms"}`;
            break;
    }
    stopwatch_list.appendChild(message);
    message.focus();
}
