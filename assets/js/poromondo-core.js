// Poromondo Clock Object
function poromondoClock(breakLength, sessionLength, currentMode) {
    this.breakLength = breakLength,
    this.sessionLength = sessionLength,
    this.currentMode = currentMode, // 0 - "session" mode, 1 - "break" mode
    this.currentTimerValue = 60*this.sessionLength,
    this.currentTimerState = 0, // 1 - the timer is active, 0 the timer is not avtive 
    this.setBreakLength = function (btnType) { // -1 - when "minus" button was clicked, 1 - when "plus" button was clicked
        if (btnType === -1 && this.breakLength > 1) {
            this.breakLength--;
        } else if (btnType === 1) {
            this.breakLength++;
        } 
    },
    this.getBreakLength = function () {
        return this.breakLength;
    },
    this.setSessionLength = function (btnType) { // -1 - when "minus" button was clicked, 1 - when "plus" button was clicked
        if (btnType === -1 && this.sessionLength > 1) {
            this.sessionLength--;
        } else if (btnType === 1) {
            this.sessionLength++;
        } 
    },
    this.getSessionLength = function () {
        return this.sessionLength;
    },
    this.getCurrentTimerState = function () {
        return this.currentTimerState;
    },
    this.timerTimedCount = function (displayRef, time) {
        var thisVal = this; // Let's save reference to this 
        if (time > 0 && this.currentTimerState === 1) {
        time -=1;
        this.setCurrenTimerValue(time);
        console.log(time);
        setTimeout(function () {thisVal.timerTimedCount(displayRef, time);}, 50);
        
        } if (time === 0) {
            this.currentTimerState = 0;
            console.log("!!!=====  ", this.currentMode ,"  ======!!!");
            switch (this.currentMode) {
                case 0:
                    time = 60*this.breakLength;
                    this.currentMode = 1;
                    this.setCurrenTimerValue(time);
                    this.timerTimedCount(displayRef, this.getCurrentTimerValue());
                    break;
                case 1:
                    time = 60*this.sessionLength;
                    this.currentMode = 0;
                    this.setCurrenTimerValue(time);
                    this.timerTimedCount(displayRef, this.getCurrentTimerValue());
                    break;
                  
            }
             this.currentTimerState = 1; 
        }
    },
    this.getCurrentTimerValue = function () {
        return this.currentTimerValue;
    },
    this.setCurrenTimerValue = function (termLength) {
        this.currentTimerValue = termLength;
    }
};

// 

// Initialization function 
function initIndicators(obj) {
    breakDisplay.textContent = obj.getBreakLength();
    sessionDisplay.textContent = obj.getSessionLength();
    
};
    var hours = parseInt(timeSec / 3600) > 0 ? parseInt(timeSec / 3600) + " : " : "";
    timeSec = parseInt(timeSec % 3600);
    return hours + parseInt(timeSec / 60) + " : " + timeSec % 60; 
}
var breakBtnMin  = document.querySelector(".mode-break .btn-min"),
    breakBtnPlus = document.querySelector(".mode-break .btn-plus"),
    breakDisplay = document.querySelector(".mode-break .app-setups-display"),
    sessionBtnMin  = document.querySelector(".mode-session .btn-min"),
    sessionBtnPlus = document.querySelector(".mode-session .btn-plus"),
    sessionDisplay = document.querySelector(".mode-session .app-setups-display"),
    clockDisplay = document.querySelector(".app-clock-display");

// Creating new certain poromondo Clock
var curClock = new poromondoClock(5, 5, 0);
// Inticators Initialization 
initIndicators(curClock);

console.log(curClock.getBreakLength());

// Break display setups

breakBtnMin.onclick = function () {
    if (curClock.getCurrentTimerState() === 1) {
        return;
    } 
    curClock.setBreakLength(-1);
    breakDisplay.textContent = curClock.getBreakLength();
    curClock.setCurrenTimerValue(60*curClock.getBreakLength());
    if (curClock.currentMode === 1) {
    }
    
}
breakBtnPlus.onclick = function () {
    if (curClock.getCurrentTimerState() === 1) {
        return;
    }
    curClock.setBreakLength(1);
    breakDisplay.textContent = curClock.getBreakLength();
    curClock.setCurrenTimerValue(60*curClock.getBreakLength());
    if (curClock.currentMode === 1) {
    }
}

// Session display setups
sessionBtnMin.onclick = function () {
    if (curClock.getCurrentTimerState() === 1) {
        return;
    }
    curClock.setSessionLength(-1);
    sessionDisplay.textContent = curClock.getSessionLength();
    curClock.setCurrenTimerValue(60*curClock.getSessionLength());
    if (curClock.currentMode === 0) {
    }
}
sessionBtnPlus.onclick = function () {
    if (curClock.getCurrentTimerState() === 1) {
        return;
    }
    curClock.setSessionLength(1);
    sessionDisplay.textContent = curClock.getSessionLength();
    curClock.setCurrenTimerValue(60*curClock.getSessionLength());
    if (curClock.currentMode === 0) {
    }
}


clockDisplay.onclick = function () {
    if (curClock.currentTimerState !== 1) {
        
        curClock.currentTimerState = 1; // fix it !!!!!!!!!!!!!!!
        curClock.timerTimedCount(clockDisplay, curClock.getCurrentTimerValue());
        //clockDisplay.innerHTML = curClock.getCurrentTimerValue();
    } else {
        curClock.currentTimerState = 0;
        
    }
}