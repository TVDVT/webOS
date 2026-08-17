var countdowns = [];
var nextCountdownId = 0;

var dateInput = document.querySelector("#newcd input[type='date']");
var timeInput = document.querySelector("#newcd input[type='time']");
var eventInput = document.querySelector("input[name='event']");

var dayButton = document.querySelector("#day");
var hourButton = document.querySelector("#hour");
var minuteButton = document.querySelector("#minute");
var secondButton = document.querySelector("#second");

var addButton = document.querySelector("#addbutton");

var selectedPrecision = "second";

dayButton.addEventListener("click", function() {
    selectedPrecision = "day";
});

hourButton.addEventListener("click", function() {
    selectedPrecision = "hour";
});

minuteButton.addEventListener("click", function() {
    selectedPrecision = "minute";
});

secondButton.addEventListener("click", function() {
    selectedPrecision = "second";
});

function addCd() {

    var date = dateInput.value;
    var time = timeInput.value;
    var event = eventInput.value;

    if (!date || !time || !event) {
        return;
    }

    var countdown = {
        id: nextCountdownId++,
        date: date,
        time: time,
        event: event,
        precision: selectedPrecision
    };

    countdowns.push(countdown);

    console.log(countdowns);

    return countdown;
}


// ========================================
// CREATE COUNTDOWN WINDOW
// ========================================

function showCd(id) {

    var countdown = countdowns.find(function(cd) {
        return cd.id === id;
    });

    if (!countdown) {
        return;
    }

    // Create the window
    var cdWindow = document.createElement("div");

    cdWindow.className = "window cdDisplay";

    // Give the window the countdown's ID
    cdWindow.dataset.id = countdown.id;

    // Put the window somewhere on the desktop
    cdWindow.style.width = "300px";
    cdWindow.style.height = "220px";
    cdWindow.style.top = "50%";
    cdWindow.style.left = "60%";

    cdWindow.innerHTML = `
        <div class="windowheader">

            <div>
                <p>${countdown.event}</p>
            </div>

            <div class="buttons">
                <div class="closebutton"></div>
                <div class="openbutton"></div>
            </div>

        </div>

        <div class="countdownDisplayContent">

            <p class="countdownEvent">
                ${countdown.event}
            </p>

            <p class="countdownTime">
                Loading...
            </p>

        </div>
    `;

    document.body.appendChild(cdWindow);


    // Make the window behave like your other windows
    makeClosable(cdWindow);
    dragElement(cdWindow);

    // Bring it to the front
    openWindow(cdWindow);

    // Display countdown immediately
    updateDisplay(cdWindow, countdown);
}


// ========================================
// CALCULATE + DISPLAY COUNTDOWN
// ========================================

function updateDisplay(cdWindow, countdown) {

    var target = new Date(
        countdown.date + "T" + countdown.time
    ).getTime();

    var now = new Date().getTime();

    var distance = target - now;


    // Countdown finished
    if (distance <= 0) {

        cdWindow.querySelector(".countdownTime").innerHTML =
            "EXPIRED";

        return;
    }


    // Calculate time
    var days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    var minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );

    var seconds = Math.floor(
        (distance % (1000 * 60))
        / 1000
    );


    // Start with days
    var text = `${days}d`;


    // Add precision
    if (countdown.precision === "hour") {

        text += ` ${hours}h`;

    }

    else if (countdown.precision === "minute") {

        text += ` ${hours}h ${minutes}m`;

    }

    else if (countdown.precision === "second") {

        text += ` ${hours}h ${minutes}m ${seconds}s`;

    }


    cdWindow.querySelector(".countdownTime").innerHTML = text;
}


// ========================================
// ADD BUTTON
// ========================================

addButton.addEventListener("click", function() {

    var countdown = addCd();

    // If the countdown was successfully created
    if (countdown) {

        showCd(countdown.id);

    }

});


// ========================================
// UPDATE ALL COUNTDOWN WINDOWS
// ========================================

setInterval(function() {

    document.querySelectorAll(".cdDisplay").forEach(function(cdWindow) {

        var id = cdWindow.dataset.id;

        var countdown = countdowns.find(function(cd) {
            return cd.id == id;
        });

        if (countdown) {

            updateDisplay(cdWindow, countdown);

        }

    });

}, 1000);