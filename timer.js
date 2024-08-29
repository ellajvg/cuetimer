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
    const tbody = document.getElementById('workTableBody');
    const row = document.createElement('tr');
    const head = document.createElement('th');
    const cell = document.createElement('td');

    if (exercise === 1) {
        head.textContent = 'Work';

    } else {
        console.log('here');
        tbody.rows[0].querySelector('th').textContent = 'Work period ' + 1;

        head.textContent = 'Work period ' + exercise;

        document.getElementById('exerciseRestHeader').textContent = 'Rest (period)';
        document.getElementById('restDropdownContainer').style.marginLeft = '46px';

        document.getElementById('roundRestHeader').style.display = 'inline-block';
        document.getElementById('roundRestDropdownContainer').style.display = 'inline-block';
    }

    cell.appendChild(createTimeDropdown());
    row.appendChild(head);
    row.appendChild(cell);
    tbody.appendChild(row);

    exercise++;
}

function removeWork() {
    const tbody = document.getElementById('workTableBody');

    if (tbody.rows.length > 1) {
        tbody.deleteRow(tbody.rows.length - 1);

        if (tbody.rows.length === 1) {
            tbody.rows[0].querySelector('th').textContent = 'Work';

            document.getElementById('exerciseRestHeader').textContent = 'Rest'
            document.getElementById('restDropdownContainer').style.marginLeft = '42px';

            document.getElementById('roundRestHeader').style.display = 'none';
            document.getElementById('roundRestDropdownContainer').style.display = 'none';
        }
        exercise--;
    } else {
        window.alert("Cannot remove the last remaining row.");
    }
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
        option.textContent = minutes + ":" + seconds;

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

function startTimerWorkout(exercise) {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('currentExerciseContainer').style.display = 'none';
    document.getElementById('nextExerciseContainer').style.display = 'none';

    const periods = createPeriodArray();
    const rounds = parseInt(document.getElementById('roundDropdownContainer').querySelector('select').value, 10);
    const exerciseRest = parseInt(document.getElementById('restDropdownContainer').querySelector('select').value, 10);
    const roundRest = parseInt(document.getElementById('roundRestDropdownContainer').querySelector('select').value, 10);

    let totalTime = 0;
    for (let i=0; i < periods.length; i++) {
        totalTime += periods[i].work_period;
    }
    totalTime *= rounds;
    if (rounds > 1) {
        if (roundRest > 0) {
            totalTime += roundRest*(rounds - 1);
        } else if (exerciseRest > 0) {
            totalTime += exerciseRest*(rounds - 1);
        }
    }
    if (exerciseRest > 0 && periods.length > 1) {
        totalTime += exerciseRest*(rounds*(periods.length -1));
    }

    let progress = document.getElementById('myBar');
    let width = 0;
    let workoutStarted = false;
    let currentPeriodIndex = 0;
    let currentRound = 1;
    let isPaused = false;
    let timer;
    let remainingTime;
    let interval;

    startNextInterval(5);
    setTimeout(() => {
        document.getElementById('cues').style.display = 'none';
        document.getElementById('preTimer').style.display = 'none';
        document.getElementById('progressContainer').style.display = 'flex';
        document.getElementById('countdown').style.display = 'flex';
        document.getElementById('workOrRest').textContent = "Your workout begins in...";
        if (together) {
            document.getElementById('nextExercise').style.marginTop = '1em';
            document.getElementById('nextExercise').textContent = "First up: " + exercise;
        }
    }, 1000);

    document.getElementById('pauseResumeBtn').addEventListener('click', function() {
        if (isPaused) {
            isPaused = false;
            this.textContent = "⏸";
            startNextInterval(remainingTime);
        } else {
            isPaused = true;
            this.textContent = "⏵";
            clearInterval(interval);
        }
    });

    function startNextInterval(duration) {
        let rootStyles = getComputedStyle(document.documentElement);
        let color1 = rootStyles.getPropertyValue('--color1');
        let color2 = rootStyles.getPropertyValue('--color2');

        timer = duration;

        const display = document.getElementById('countdown');
        const workOrRest = document.getElementById('workOrRest');
        const upNext = document.getElementById('nextExercise');
        const currentExercise = document.getElementById('currentExerciseContainer');
        const nextExercise = document.getElementById('nextExerciseContainer');

        interval = setInterval(() => {
            if (workoutStarted && width < 100) {
                setTimeout(() => {
                    width += (100/totalTime);
                    progress.style.width = width + "%";
                    let roundedWidth = Math.round(width);
                    document.getElementById('progressLabel').textContent = roundedWidth + "%";
                }, 1000);
            }

            if (!isPaused && width < 100) {
                let minutes = Math.floor(timer / 60);
                let seconds = timer % 60;

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                display.textContent = minutes + ":" + seconds;
                document.getElementById('pauseResumeBtn').style.display = 'block';

                if (timer === 3 || timer === 2 || timer === 1) {
                    let sound = document.getElementById('countdownSound');
                    sound.volume = 0.1;
                    sound.currentTime = 0; // Restart sound from the beginning
                    sound.play();
                }

                if (--timer < 1 && !isPaused) {
                    workoutStarted = true;
                    clearInterval(interval);

                    //responsible for the work and rest timers within rounds
                    if (currentPeriodIndex < periods.length) {
                        currentPeriodIndex++
                        if (exerciseRest > 0 && (workOrRest.textContent !== 'Rest' && !workOrRest.textContent.startsWith('Your')
                            && !workOrRest.textContent.startsWith('Round'))) {
                            setTimeout(() => {
                                let sound = document.getElementById('completeSound');
                                sound.volume = 0.1;
                                sound.play();
                                document.getElementById('countdown').style.color = color2;
                                workOrRest.textContent = "Rest";
                            }, 1000);
                            currentPeriodIndex--; //rest doesn't count as a work period
                            startNextInterval(exerciseRest);
                        } else {
                            if (currentRound === 1 && currentPeriodIndex === 1) {
                                setTimeout(() => {
                                    let sound = document.getElementById('startSound');
                                    sound.volume = 0.1;
                                    sound.play();
                                    startCueWorkout();
                                    if (together) {
                                        workOrRest.textContent = currentExercise.textContent;
                                        upNext.textContent = nextExercise.textContent;
                                    } else {
                                        workOrRest.textContent = "Work";
                                    }
                                    document.getElementById('countdown').style.color = color1;
                                }, 1000);
                            } else {
                                setTimeout(() => {
                                    let sound = document.getElementById('startSound');
                                    sound.volume = 0.1;
                                    sound.play();
                                    document.getElementById('countdown').style.color = color1;
                                    const event = new CustomEvent('intervalStarted');
                                    document.dispatchEvent(event);
                                    if (together) {
                                        workOrRest.textContent = currentExercise.textContent;
                                        upNext.textContent = nextExercise.textContent;
                                    } else {
                                        workOrRest.textContent = "Work";
                                    }
                                }, 1000);
                            }
                            startNextInterval(periods[currentPeriodIndex - 1].work_period);
                        }

                    //responsible for the rest timer in between rounds and restarting the work timer if there is no rest
                    } else if (currentRound < rounds) {
                        console.log(currentRound);
                        currentPeriodIndex = 0;
                        currentRound++;
                        if (roundRest > 0) {
                            setTimeout(() => {
                                let sound = document.getElementById('completeSound');
                                sound.volume = 0.1;
                                sound.play();
                                document.getElementById('countdown').style.color = color2;
                                workOrRest.textContent = "Round " + (currentRound-1) + " complete!";
                            }, 1000);
                            startNextInterval(roundRest);
                        } else if (exerciseRest > 0) {
                            setTimeout(() => {
                                let sound = document.getElementById('completeSound');
                                sound.volume = 0.1;
                                sound.play();
                                document.getElementById('countdown').style.color = color2;
                                workOrRest.textContent = "Rest";
                            }, 1000);
                            startNextInterval(exerciseRest);
                        } else {
                            currentPeriodIndex++
                            setTimeout(() => {
                                let sound = document.getElementById('startSound');
                                sound.volume = 0.1;
                                sound.play();
                                document.getElementById('countdown').style.color = color1;
                                const event = new CustomEvent('intervalStarted');
                                document.dispatchEvent(event);
                                if (together) {
                                    workOrRest.textContent = currentExercise.textContent;
                                    upNext.textContent = nextExercise.textContent;
                                } else {
                                    workOrRest.textContent = "Work";
                                }
                            }, 1000);
                            startNextInterval(periods[currentPeriodIndex - 1].work_period);
                        }

                    //when there are no more periods and rounds left, workout ends
                    } else {
                        setTimeout(() => {
                            let sound = document.getElementById('completeSound');
                            sound.volume = 0.1;
                            sound.play();
                            document.getElementById('workOrRest').textContent = "Workout complete!";
                            const event = new CustomEvent('intervalStarted');
                            document.dispatchEvent(event);
                            display.textContent = "00:00";
                        }, 1000);
                    }
                } else {

                    remainingTime = timer;
                }
            }
        }, 1000);
    }
}

