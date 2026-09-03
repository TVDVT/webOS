var showadd = document.querySelector("#showadd");
var newcd = document.querySelector("#newcd");
var list = document.querySelector("#list");

var dateInput = document.querySelector("#newcd input[type='date']");
var timeInput = document.querySelector("#newcd input[type='time']");
var eventInput = document.querySelector("input[name='event']");

var dayButton = document.querySelector("#day");
var hourButton = document.querySelector("#hour");
var minuteButton = document.querySelector("#minute");
var secondButton = document.querySelector("#second");

var addButton = document.querySelector("#addbutton");

var countdowns = [];
var nextCountdownId = 0;
var selectedPrecision = "second";

updateCdList();
showadd.addEventListener("click", function() {
    newcd.classList.remove("no");

    dateInput.value = "";
    timeInput.value = "";
    eventInput.value = "";

    selectedPrecision = "second";
});

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

    updateCdList();

    return countdown;
}

function updateCdList() {
    if (countdowns.length === 0) {
        list.innerHTML = `
            <p style="text-align:center;">
                Countdown list empty.<br>
                Add a countdown!
            </p>
        `;
        return;
    }

    list.innerHTML = "";

    countdowns.forEach(function(countdown) {

        var item = document.createElement("div");

        item.className = "cdListItem space-between";
        item.dataset.id = countdown.id;

        item.innerHTML = `
            <div class="cdListInfo">
                <b>${countdown.event}</b>
                <small>${countdown.date} ${countdown.time}</small>
            </div>

            <div class="cdListButtons">
                <button class="showCd">SHOW</button>
                <button class="editCd">EDIT</button>
                <button class="deleteCd">×</button>
            </div>
        `;

        item.querySelector(".showCd").addEventListener("click", function() {
            showCd(countdown.id);
        });

        item.querySelector(".editCd").addEventListener("click", function() {
            editCd(countdown.id);
        });

        item.querySelector(".deleteCd").addEventListener("click", function() {
            deleteCd(countdown.id);
        });

        list.appendChild(item);
    });
}

function showCd(id) {

    var countdown = countdowns.find(function(cd) {
        return cd.id === id;
    });

    if (!countdown) {
        return;
    }

    var existingWindow = document.querySelector(
        '.cdDisplay[data-id="' + id + '"]'
    );

    if (existingWindow) {
        openWindow(existingWindow);
        return;
    }

    var cdWindow = document.createElement("div");

    cdWindow.className = "window cdDisplay";

    cdWindow.dataset.id = countdown.id;

    cdWindow.style.width = "200px";
    cdWindow.style.height = "220px";
    cdWindow.style.top = "50%";
    cdWindow.style.left = "60%";

    cdWindow.innerHTML = `
        <div class="windowheader space-between">

            <div>
                <p>${countdown.event}</p>
            </div>

            <div class="closebutton heart">
                <img src="./Images/heart.png" alt="Heart" class="normal">
                <img src="./Images/brokenheart.png" class="hover">
            </div>

        </div>

        <div class="countdownDisplayContent center">

            <p class="countdownEvent center" style="color:black">
                ${countdown.event}
            </p>

            <p class="countdownTime" style="color:black">
                Loading...
            </p>

        </div>
    `;

    document.body.appendChild(cdWindow);

    var closeButton = cdWindow.querySelector(".closebutton");
    var openButton = cdWindow.querySelector(".openbutton");

    closeButton.addEventListener("click", function(e) {
        e.stopPropagation();
        cdWindow.style.display = "none";
    });

    openButton.addEventListener("click", function(e) {
        e.stopPropagation();
        cdWindow.style.display = "block";
    });

    dragElement(cdWindow);

    openWindow(cdWindow);
    addWindowTapHandling(cdWindow)
    updateDisplay(cdWindow, countdown);
}

var editingId = null;
function editCd(id) {

    var countdown = countdowns.find(function(cd) {
        return cd.id === id;
    });

    if (!countdown) {
        return;
    }

    editingId = id;

    newcd.classList.remove("no");

    dateInput.value = countdown.date;
    timeInput.value = countdown.time;
    eventInput.value = countdown.event;

    selectedPrecision = countdown.precision;

    addButton.textContent = "UPDATE";
}

function deleteCd(id) {

    countdowns = countdowns.filter(function(cd) {
        return cd.id !== id;
    });

    var displayWindow = document.querySelector(
        '.cdDisplay[data-id="' + id + '"]'
    );

    if (displayWindow) {
        displayWindow.remove();
    }

    updateCdList();
}

function clearForm() {

    dateInput.value = "";
    timeInput.value = "";
    eventInput.value = "";

    selectedPrecision = "second";
}

function updateDisplay(cdWindow, countdown) {

    var target = new Date(
        countdown.date + "T" + countdown.time
    ).getTime();

    var now = new Date().getTime();

    var distance = target - now;

    if (distance <= 0) {

        cdWindow.querySelector(".countdownTime").innerHTML =
            "EXPIRED";

        return;
    }

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

    var text = `
    <div>
        <div class="case center">${days}</div>
        <div class="label">D</div>
    </div>
    `;

    if (countdown.precision === "hour") {
        text += `
        <div>
            <div class="case center">${hours}</div>
            <div class="label">H</div>
        </div>
        `;
    }

    else if (countdown.precision === "minute") {
        text += `
        <div>
            <div class="case center">${hours}</div>
            <div class="label">H</div>
        </div>
        <div>
            <div class="case center">${minutes}</div>
            <div class="label">M</div>    
        </div>   
        `;
    }

    else if (countdown.precision === "second") {
        text += `
        <div>
            <div class="case center">${hours}</div>
            <div class="label">H</div>
        </div>
        <div>
            <div class="case center">${minutes}</div>
            <div class="label">M</div> 
        </div> 
        <div>
            <div class="case center">${seconds}</div>
            <div class="label">S</div>    
        </div>        
        `;
    }

    cdWindow.querySelector(".countdownTime").innerHTML = text;
}

addButton.addEventListener("click", function() {
    if (editingId !== null) {

        var countdown = countdowns.find(function(cd) {
            return cd.id === editingId;
        });

        if (!countdown) return;

        countdown.date = dateInput.value;
        countdown.time = timeInput.value;
        countdown.event = eventInput.value;
        countdown.precision = selectedPrecision;

        var displayWindow = document.querySelector(
            '.cdDisplay[data-id="' + editingId + '"]'
        );

        if (displayWindow) {

            displayWindow.querySelector(".countdownEvent").textContent =
                countdown.event;

            displayWindow.querySelector(".windowheader p").textContent =
                countdown.event;

            updateDisplay(displayWindow, countdown);
        }

        updateCdList();

        editingId = null;
        addButton.textContent = "ADD";

        newcd.classList.add("no");
        clearForm();

        return;
    }

    var countdown = addCd();

    if (countdown) {

        showCd(countdown.id);

        newcd.classList.add("no");

        clearForm();
    }
});

setInterval(function() {

    document.querySelectorAll(".cdDisplay").forEach(function(cdWindow) {

        var id = Number(cdWindow.dataset.id);

        var countdown = countdowns.find(function(cd) {
            return cd.id === id;
        });

        if (countdown) {
            updateDisplay(cdWindow, countdown);
        }

    });

}, 1000);

