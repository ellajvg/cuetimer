document.addEventListener('DOMContentLoaded', function() {
    const restSelectContainer = document.getElementById('restDropdownContainer');
    restSelectContainer.appendChild(createRestDropdown());

    const roundSelectContainer = document.getElementById('roundDropdownContainer');
    roundSelectContainer.appendChild(createNumberDropdown(1, 100));

    const roundRestSelectContainer = document.getElementById('roundRestDropdownContainer');
    roundRestSelectContainer.appendChild(createRestDropdown());

    addWork();
});

let exercise = 1;

function addWork() {
    const workContainer = document.getElementById('workContainer');
    const table = workContainer.querySelector('table');

    const tbody = document.getElementById('workTableBody');
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    const head = document.createElement('th');

    if (exercise === 1) {
        head.textContent = 'Work';
    } else {
        tbody.rows[0].querySelector('th').textContent = 'Work period ' + 1;
        head.textContent = 'Work period ' + exercise;

        const exerciseRestHeader = document.getElementById('exerciseRestHeader');
        exerciseRestHeader.querySelector('h3').textContent = 'Rest between work periods'

        document.getElementById('roundRestHeader').style.display = 'block';
        document.getElementById('roundRestDropdownContainer').style.display = 'block';
    }

    cell.appendChild(head);
    cell.appendChild(createTimeDropdown());
    row.appendChild(cell);
    tbody.appendChild(row);
    table.appendChild(tbody);

    exercise++;
}

function removeWork() {
    const tbody = document.getElementById('workTableBody');

    if (tbody.rows.length > 1) {
        tbody.deleteRow(tbody.rows.length - 1);

        tbody.rows[0].querySelector('th').textContent = 'Work';

        const exerciseRestHeader = document.getElementById('exerciseRestHeader');
        exerciseRestHeader.querySelector('h3').textContent = 'Rest'

        document.getElementById('roundRestHeader').style.display = 'none';
        document.getElementById('roundRestDropdownContainer').style.display = 'none';
    } else {
        window.alert("Cannot remove the last remaining row.");
    }

    exercise--;
}

function createTimeDropdown() {
    const select = document.createElement('select');

    for (let i = 5; i < 305; i += 5) {
        let minutes = Math.floor(i / 60);
        let seconds = i % 60;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        const option = document.createElement('option');
        option.value = i;
        option.textContent = minutes + ":" + seconds;;

        select.appendChild(option);
    }

    return select;
}

function createRestDropdown() {
    const select = document.createElement('select');

    const moreTimes = createTimeDropdown();
    select.append(...moreTimes.children);

    const defaultOption = document.createElement('option')
    defaultOption.value = 0;
    defaultOption.textContent = '00:00';
    defaultOption.selected = true;
    select.prepend(defaultOption);

    return select;
}

function createPeriodArray() {
    const table = document.getElementById('workContainer');
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');

    let periods;
    periods = Array.from(rows).map(row => {
        const cells = row.querySelectorAll('td');
        return {
            work_period: parseInt(cells[0].querySelector('select').value, 10),
        };
    });

    return periods;
}

function startTimerWorkout() {
    const periods = createPeriodArray();

    const rounds = parseInt(document.getElementById('roundDropdownContainer').querySelector('select').value, 10);
    const exerciseRest = parseInt(document.getElementById('restDropdownContainer').querySelector('select').value, 10);
    const roundRest = parseInt(document.getElementById('roundRestDropdownContainer').querySelector('select').value, 10);

    let currentPeriodIndex = 0;
    let currentRound = 1;
    let isPaused = false;
    let timer;
    let remainingTime;
    let interval;

    if (periods.length > 0 && rounds > 0) {
        startNextInterval(5);
        setTimeout(() => {
            document.getElementById('workOrRest').textContent = "Your workout begins in...";
        }, 1000);
    } else {
        console.error('No periods defined or rounds is zero');
    }

    document.getElementById('pauseResumeBtn').addEventListener('click', function() {
        if (isPaused) {
            isPaused = false;
            this.textContent = "Pause";
            startNextInterval(remainingTime);
        } else {
            isPaused = true;
            this.textContent = "Resume";
            clearInterval(interval);
        }
    });

    function startNextInterval(duration) {
        timer = duration;
        const display = document.getElementById('countdown');

        interval = setInterval(() => {
            if (!isPaused) {
                let minutes = Math.floor(timer / 60);
                let seconds = timer % 60;

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                display.textContent = minutes + ":" + seconds;
                document.getElementById('pauseResumeBtn').style.display = 'block';

                if (--timer < 1) {
                    clearInterval(interval);

                    //responsible for the work and rest timers within rounds
                    if (currentPeriodIndex < periods.length) {
                        currentPeriodIndex++
                        if (exerciseRest > 0 && document.getElementById('workOrRest').textContent === 'Work') {
                            setTimeout(() => {
                                document.getElementById('workOrRest').textContent = "Rest";
                                document.getElementById('currentExerciseContainer').textContent = "Rest";
                            }, 1000);
                            currentPeriodIndex--; //rest doesn't count as a work period
                            startNextInterval(exerciseRest);
                        } else {
                            console.log('here');
                            if (currentRound === 1 && currentPeriodIndex === 1) {
                                setTimeout(() => {
                                    document.getElementById('workOrRest').textContent = "Work";
                                    startCueWorkout();
                                }, 1000);
                            } else {
                                setTimeout(() => {
                                    const event = new CustomEvent('intervalStarted');
                                    document.dispatchEvent(event);
                                    document.getElementById('workOrRest').textContent = "Work";
                                }, 1000);
                            }
                            startNextInterval(periods[currentPeriodIndex - 1].work_period);
                        }

                    //responsible for the rest timer in between rounds and restarting the work timer if there is no rest
                    } else if (currentRound < rounds) {
                        currentPeriodIndex = 0;
                        currentRound++;
                        if (roundRest > 0) {
                            setTimeout(() => {
                                document.getElementById('currentExerciseContainer').textContent = "Rest";
                                document.getElementById('workOrRest').textContent = "Round " + (currentRound-1) + " complete!";
                            }, 1000);
                            startNextInterval(roundRest);
                        } else if (exerciseRest > 0) {
                            setTimeout(() => {
                                document.getElementById('currentExerciseContainer').textContent = "Rest";
                                document.getElementById('workOrRest').textContent = "Rest";
                            }, 1000);
                            startNextInterval(exerciseRest);
                        } else {
                            currentPeriodIndex++
                            setTimeout(() => {
                                document.getElementById('workOrRest').textContent = "Work";
                                const event = new CustomEvent('intervalStarted');
                                document.dispatchEvent(event);
                            }, 1000);
                            startNextInterval(periods[currentPeriodIndex - 1].work_period);
                        }

                    //when there are no more periods and rounds left, workout ends
                    } else {
                        setTimeout(() => {
                            document.getElementById('workOrRest').textContent = "";
                            const event = new CustomEvent('intervalStarted');
                            document.dispatchEvent(event);
                            display.textContent = "Workout complete!";
                        }, 1000);
                    }
                } else {
                    remainingTime = timer;
                }
            }
        }, 1000);
    }
}


/*
function startTimerWorkout() {
    const periods = createPeriodArray();

    const rounds = parseInt(document.getElementById('roundDropdownContainer').querySelector('select').value, 10);
    const exerciseRest = parseInt(document.getElementById('restDropdownContainer').querySelector('select').value, 10);
    const roundRest = parseInt(document.getElementById('roundRestDropdownContainer').querySelector('select').value, 10);

    let currentPeriodIndex = 0;
    let currentRound = 1;
    let isPaused = false;
    let timer;
    let remainingTime;
    let interval;

    if (periods.length > 0 && rounds > 0) {
        startNextInterval(5);
        setTimeout(() => {
            document.getElementById('workOrRest').textContent = "Your workout begins in...";
        }, 1000);
    } else {
        console.error('No periods defined or rounds is zero');
    }

    document.getElementById('pauseResumeBtn').addEventListener('click', function() {
        if (isPaused) {
            isPaused = false;
            this.textContent = "Pause";
            startNextInterval(remainingTime);
        } else {
            isPaused = true;
            this.textContent = "Resume";
            clearInterval(interval);
        }
    });

    function startNextInterval(duration) {
        timer = duration;
        const display = document.getElementById('countdown');

        interval = setInterval(() => {
            if (!isPaused) {
                let minutes = Math.floor(timer / 60);
                let seconds = timer % 60;

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                display.textContent = minutes + ":" + seconds;
                document.getElementById('pauseResumeBtn').style.display = 'block';

                if (--timer < 1) {
                    clearInterval(interval);

                    if (currentPeriodIndex < periods.length) {
                        currentPeriodIndex++
                        //initializing and updating exercise cues
                        //check if there's rests in between superset exercises
                        if (exerciseRest > 0 && periods.length > 1 &&
                            document.getElementById('workOrRest').textContent === 'Work') {
                            setTimeout(() => {
                                document.getElementById('workOrRest').textContent = "Rest";
                            }, 1000);
                            currentPeriodIndex--; //rest doesn't count as a work period
                            startNextInterval(exerciseRest);
                            //start next work period
                        } else {
                            if (currentRound === 1 && currentPeriodIndex === 1) {
                                setTimeout(() => {
                                    startCueWorkout();
                                }, 1000);
                            } else {
                                setTimeout(() => {
                                    const event = new CustomEvent('intervalStarted');
                                    document.dispatchEvent(event);
                                }, 1000);
                            }
                            setTimeout(() => {
                                document.getElementById('workOrRest').textContent = "Work";
                            }, 1000);
                            startNextInterval(periods[currentPeriodIndex - 1].work_period);
                        }

                    //if not first exercise/superset exercise, check if more rounds
                    } else if (currentRound < rounds) {
                        currentPeriodIndex = 0; //reset period index to 0 at the start of each round
                        currentRound++;
                        //if rest between round is greater than 0 (default), do round rest
                        if (roundRest > 0) {
                            setTimeout(() => {
                                document.getElementById('currentExerciseContainer').textContent = "Rest";
                                document.getElementById('workOrRest').textContent = "Round " + (currentRound-1) + " complete!";
                            }, 1000);
                            startNextInterval(roundRest);
                        //else if exercise rest is greater than 0 do that
                        } else if (exerciseRest > 0) {
                            setTimeout(() => {
                                document.getElementById('currentExerciseContainer').textContent = "Rest";
                                document.getElementById('workOrRest').textContent = "Rest";
                            }, 1000);
                            startNextInterval(exerciseRest);
                        //if no rest, go to next work period
                        } else {
                            currentPeriodIndex++
                            setTimeout(() => {
                                document.getElementById('workOrRest').textContent = "Work";
                                const event = new CustomEvent('intervalStarted');
                                document.dispatchEvent(event);
                            }, 1000);
                            startNextInterval(periods[currentPeriodIndex - 1].work_period);
                        }
                    } else {
                        setTimeout(() => {
                            document.getElementById('workOrRest').textContent = "";
                            const event = new CustomEvent('intervalStarted');
                            document.dispatchEvent(event);
                            display.textContent = "Workout complete!";
                        }, 1000);
                    }
                } else {
                    remainingTime = timer;
                }
            }
        }, 1000);
    }
}
 */

/*
function startTimerWorkout() {
    const periods = createPeriodArray();

    const rounds = parseInt(document.getElementById('roundDropdownContainer').querySelector('select').value, 10);
    const exerciseRest = parseInt(document.getElementById('restDropdownContainer').querySelector('select').value, 10);
    const roundRest = parseInt(document.getElementById('roundRestDropdownContainer').querySelector('select').value, 10);

    let currentPeriodIndex = 0;
    let currentRound = 0;
    let isPaused = false;
    let timer;
    let remainingTime;
    let interval;

    if (periods.length > 0 && rounds > 0) {
        startNextInterval(5);
        setTimeout(() => {
            document.getElementById('workOrRest').textContent = "Your workout begins in...";
        }, 1000);
    } else {
        console.error('No periods defined or rounds is zero');
    }

    document.getElementById('pauseResumeBtn').addEventListener('click', function() {
        if (isPaused) {
            isPaused = false;
            this.textContent = "Pause";
            startNextInterval(remainingTime);
        } else {
            isPaused = true;
            this.textContent = "Resume";
            clearInterval(interval);
        }
    });

    function startNextInterval(duration) {
        timer = duration;
        const display = document.getElementById('countdown');

        interval = setInterval(() => {
            if (!isPaused) {
                let minutes = Math.floor(timer / 60);
                let seconds = timer % 60;

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                display.textContent = minutes + ":" + seconds;
                document.getElementById('pauseResumeBtn').style.display = 'block';

                if (--timer < 1) {
                    clearInterval(interval);


                    if (periods.length === 1 && currentRound < rounds) { //simple timer
                        if (currentRound === 0) { //getting started
                            currentRound++;
                            setTimeout(() => {
                                document.getElementById('workOrRest').textContent = "Work";
                                startCueWorkout();
                            }, 1000);
                            startNextInterval(periods[0].work_period);
                        } else if (exerciseRest > 0 && document.getElementById('workOrRest').textContent === 'Work') {
                            setTimeout(() => {
                                document.getElementById('workOrRest').textContent = "Rest";
                            }, 1000);
                            startNextInterval(exerciseRest);
                        } else {
                            currentRound++;
                            setTimeout(() => {
                                const event = new CustomEvent('intervalStarted');
                                document.dispatchEvent(event);
                                document.getElementById('workOrRest').textContent = "Work";
                            }, 1000);
                            startNextInterval(periods[0].work_period);
                        }


                    } else if (periods.length > 1 && currentRound < rounds) { //complex timer
                        if (currentRound === 0 && currentPeriodIndex === 0) { //getting started
                            currentPeriodIndex++;
                            setTimeout(() => {
                                document.getElementById('workOrRest').textContent = "Work";
                                startCueWorkout();
                            }, 1000);
                            startNextInterval(periods[currentPeriodIndex - 1].work_period);

                        } else if (currentPeriodIndex < periods.length) { //going through periods within round
                            if (exerciseRest > 0 && document.getElementById('workOrRest').textContent === 'Work') {
                                setTimeout(() => {
                                    document.getElementById('workOrRest').textContent = "Rest";
                                }, 1000);
                                startNextInterval(exerciseRest);
                            } else {
                                currentPeriodIndex++;
                                setTimeout(() => {
                                    const event = new CustomEvent('intervalStarted');
                                    document.dispatchEvent(event);
                                    document.getElementById('workOrRest').textContent = "Work";
                                }, 1000);
                                startNextInterval(periods[currentPeriodIndex - 1].work_period);
                            }
                        } else { //round 1 complete
                            currentPeriodIndex = 0;
                            currentRound++;
                            if (roundRest > 0) {
                                setTimeout(() => {
                                    document.getElementById('currentExerciseContainer').textContent = "Rest";
                                    document.getElementById('workOrRest').textContent = "Round " + (currentRound) + " complete!";
                                }, 1000);
                                startNextInterval(roundRest);
                                //else if exercise rest is greater than 0 do that
                            } else if (exerciseRest > 0) {
                                setTimeout(() => {
                                    document.getElementById('currentExerciseContainer').textContent = "Rest";
                                    document.getElementById('workOrRest').textContent = "Rest";
                                }, 1000);
                                startNextInterval(exerciseRest);
                                //if no rest, go to next work period
                            } else {
                                currentPeriodIndex++
                                setTimeout(() => {
                                    document.getElementById('workOrRest').textContent = "Work";
                                    const event = new CustomEvent('intervalStarted');
                                    document.dispatchEvent(event);
                                }, 1000);
                                startNextInterval(periods[currentPeriodIndex - 1].work_period);
                            }
                        }


                    } else if (currentRound === rounds) { //end of workout
                        setTimeout(() => {
                            document.getElementById('workOrRest').textContent = "";
                            const event = new CustomEvent('intervalStarted');
                            document.dispatchEvent(event);
                            display.textContent = "Workout complete!";
                        }, 1000);
                    }
                } else {
                    remainingTime = timer;
                }
            }
        }, 1000);
    }
}
 */