// Poromondo Clock Object
function poromondoClock(breakLength, sessionLength, currentMode) {
    this.breakLength = breakLength,
    this.sessionLength = sessionLength,
    this.currentMode = currentMode, /* 0 - "session" mode, 1 - "break" mode */
    this.setBreakLength = function (btnType) { // -1 - when "minus" button was clicked, 1 - when "plus" button was clicked
        if (btnType === -1 && this.breakLength > 1) {
            this.breakLength--;
        } else if (btnType === 1 && this.breakLength < 60) {
            this.breakLength++;
        } 
    },
    this.getBreakLength = function () {
        return this.breakLength;
    },
    this.setSessionLength = function (btnType) { // -1 - when "minus" button was clicked, 1 - when "plus" button was clicked
        if (btnType === -1 && this.sessionLength > 1) {
            this.sessionLength--;
        } else if (btnType === 1 && this.sessionLength < 60) {
            this.sessionLength++;
        } 
    },
    this.getSessionLength = function () {
        return this.sessionLength;
    }
};
// Initialization function 
function initIndicators(obj) {
    breakDisplay.textContent = obj.getBreakLength();
    sessionDisplay.textContent = obj.getSessionLength();
}
var breakBtnMin  = document.querySelector(".mode-break .btn-min"),
    breakBtnPlus = document.querySelector(".mode-break .btn-plus"),
    breakDisplay = document.querySelector(".mode-break .app-setups-display"),
    sessionBtnMin  = document.querySelector(".mode-session .btn-min"),
    sessionBtnPlus = document.querySelector(".mode-session .btn-plus"),
    sessionDisplay = document.querySelector(".mode-session .app-setups-display");

// Creating new certain poromondo Clock
var curClock = new poromondoClock(5, 5, 0);
// Inticators Initialization 
initIndicators(curClock);

console.log(curClock.getBreakLength());

// Break display setups
breakBtnMin.onclick = function () {
    curClock.setBreakLength(-1);
    breakDisplay.textContent = curClock.getBreakLength();
}
breakBtnPlus.onclick = function () {
    curClock.setBreakLength(1);
    breakDisplay.textContent = curClock.getBreakLength();
}
// Session display setups
sessionBtnMin.onclick = function () {
    curClock.setSessionLength(-1);
    sessionDisplay.textContent = curClock.getSessionLength();
}
sessionBtnPlus.onclick = function () {
    curClock.setSessionLength(1);
    sessionDisplay.textContent = curClock.getSessionLength();
}