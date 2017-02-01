// Pomodoro Clock Object
function pomodoroClock(breakLength, sessionLength, currentMode) {
    this.breakLength = breakLength;
    this.sessionLength = sessionLength;
    this.currentMode = currentMode; // -1 - "init" state, 0 - "session" mode, 1 - "break" mode
    this.currentFullLength = 60 * this.sessionLength;
    this.currentTimerValue = 60 * this.sessionLength;
    this.currentTimerState = 0; // 1 - the timer is active, 0 the timer is not avtive 
    this.setBreakLength = function (btnType) { // -1 - when "minus" button was clicked, 1 - when "plus" button was clicked
        if (btnType === -1 && this.breakLength > 1) {
            this.breakLength--;
        } else if (btnType === 1) {
            this.breakLength++;
        } 
    };
    this.getBreakLength = function () {
        return this.breakLength;
    };
    this.setSessionLength = function (btnType) { // -1 - when "minus" button was clicked, 1 - when "plus" button was clicked
        if (btnType === -1 && this.sessionLength > 1) {
            this.sessionLength--;
        } else if (btnType === 1) {
            this.sessionLength++;
        } 
    };
    this.getSessionLength = function () {
        return this.sessionLength;
    };
    this.getCurrentTimerState = function () {
        return this.currentTimerState;
    };
    this.timerTimedCount = function (clockItemsList, time) {
        var thisVal = this; // Let's save reference to this 
        if (time > 0 && this.currentTimerState === 1) {
            time -= 1;
            clockItemsList.display.innerHTML = timeToHHMMSS(time);
            var timePercent = 100*(time / this.currentFullLength);
            if (this.currentMode === 0) {
                clockItemsList.loaderBg.style.height = timePercent +"%";    
            } else {
                clockItemsList.loaderBg.style.height = (100 - timePercent) +"%";
            }
            this.setCurrenTimerValue(time);
            setTimeout(function () {thisVal.timerTimedCount(clockItemsList, time);}, 1000);
        } if (time === 0) {
            this.currentTimerState = 0;
            sound.play();
            if (this.currentMode === 1) {
                clockItemsList.loader.className = "loader-straight";
                clockItemsList.displayMode.textContent = "Session";
            } else {
                clockItemsList.loader.className = "loader-reverse";
                clockItemsList.displayMode.textContent = "Break";
                
            }
            clockItemsList.loader.className += " loader";
            switch (this.currentMode) {
                case 0:
                    time = 60*this.breakLength;
                    this.currentFullLength = time;
                    this.currentMode = 1;
                    this.setCurrenTimerValue(time);
                    this.timerTimedCount(clockItemsList, this.getCurrentTimerValue());
                    break;
                case 1:
                    time = 60*this.sessionLength;
                    this.currentFullLength = time;
                    this.currentMode = 0;
                    this.setCurrenTimerValue(time);
                    this.timerTimedCount(clockItemsList, this.getCurrentTimerValue());
                    break;     
            }
             this.currentTimerState = 1; 
        }
    };
    this.getCurrentTimerValue = function () {
        return this.currentTimerValue;
    };
    this.setCurrenTimerValue = function (termLength) {
        this.currentTimerValue = termLength;
    };
    this.setCurrentFullTime = function (value) {
        this.currentFullLength = value;
    };
};

// Initialization function 
function initIndicators(obj) {
    breakDisplay.textContent = obj.getBreakLength();
    sessionDisplay.textContent = obj.getSessionLength();   
};
function timeToHHMMSS(timeSec) {
    var hours = parseInt(timeSec / 3600) > 0 ? parseInt(timeSec / 3600) + " : " : "";
    timeSec = parseInt(timeSec % 3600);
    return hours + parseInt(timeSec / 60) + " : " + timeSec % 60; 
};
var breakBtnMin  = document.querySelector(".mode-break .btn-min"),
    breakBtnPlus = document.querySelector(".mode-break .btn-plus"),
    breakDisplay = document.querySelector(".mode-break .app-setups-display"),
    sessionBtnMin  = document.querySelector(".mode-session .btn-min"),
    sessionBtnPlus = document.querySelector(".mode-session .btn-plus"),
    sessionDisplay = document.querySelector(".mode-session .app-setups-display"),
    clockDisplay = document.querySelector(".app-clock-display"),
    clockLoader = document.getElementById("load-element"),
    clockLoaderBg = document.getElementById("app-load-bg"),
    displayMode = document.getElementById("display-current-mode"),
    sound = document.getElementById("play");
var clockPartsList = {display : clockDisplay,
                      loader : clockLoader,
                      loaderBg : clockLoaderBg,
                      displayMode : displayMode
                     }

// Creating new certain pomodoro Clock
var curClock = new pomodoroClock(25, 25, 0);
// Inticators Initialization 
initIndicators(curClock);

// Break display setups

breakBtnMin.onclick = function () {
    if (curClock.getCurrentTimerState() === 1) {
        return;
    } 
    curClock.setBreakLength(-1);
    breakDisplay.textContent = curClock.getBreakLength();
    if (curClock.currentMode === 1) {
        curClock.setCurrenTimerValue(60*curClock.getBreakLength());
        curClock.setCurrentFullTime(60*curClock.getBreakLength());
        clockPartsList.display.innerHTML = timeToHHMMSS(curClock.getCurrentTimerValue());    
    }      
}
breakBtnPlus.onclick = function () {
    if (curClock.getCurrentTimerState() === 1) {
        return;
    }
    curClock.setBreakLength(1);
    breakDisplay.textContent = curClock.getBreakLength();
    if (curClock.currentMode === 1) {
        curClock.setCurrenTimerValue(60*curClock.getBreakLength());
        curClock.setCurrentFullTime(60*curClock.getBreakLength());
        clockPartsList.display.innerHTML = timeToHHMMSS(curClock.getCurrentTimerValue());    
    }
}

// Session display setups
sessionBtnMin.onclick = function () {
    if (curClock.getCurrentTimerState() === 1) {
        return;
    }
    curClock.setSessionLength(-1);
    sessionDisplay.textContent = curClock.getSessionLength();
    if (curClock.currentMode === 0) {
        
        curClock.setCurrenTimerValue(60*curClock.getSessionLength());
        curClock.setCurrentFullTime(60*curClock.getSessionLength());
        clockPartsList.display.innerHTML = timeToHHMMSS(curClock.getCurrentTimerValue());    
    }
}
sessionBtnPlus.onclick = function () {
    if (curClock.getCurrentTimerState() === 1) {
        return;
    }
    curClock.setSessionLength(1);
    sessionDisplay.textContent = curClock.getSessionLength();
    if (curClock.currentMode === 0) {
        
        curClock.setCurrenTimerValue(60*curClock.getSessionLength());
        curClock.setCurrentFullTime(60*curClock.getSessionLength());
        clockPartsList.display.innerHTML = timeToHHMMSS(curClock.getCurrentTimerValue());    
    }
}

clockDisplay.onclick = function () {
    if (curClock.currentTimerState !== 1) {
        if (curClock.currentMode === 0) {
            clockPartsList.loader.className = "loader-straight";
            clockPartsList.displayMode.textContent = "Session";
        } else {
            clockPartsList.loader.className = "loader-reverse";
            clockPartsList.displayMode.textContent = "Break";
        }
        clockPartsList.loader.className += " loader";
        curClock.currentTimerState = 1;
        curClock.timerTimedCount(clockPartsList, curClock.getCurrentTimerValue());
    } else {
        curClock.currentTimerState = 0;
        clockPartsList.loader.className = "";
    }
}