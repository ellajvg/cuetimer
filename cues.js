document.addEventListener('DOMContentLoaded', function() {
    addRows();

    const repeatSelectContainer = document.getElementById('repeatDropdownContainer');

    repeatSelectContainer.appendChild(createNumberDropdown(1, 100));
});

function addRows() {
    const tableContainer = document.getElementById('tableContainer');
    const table = tableContainer.querySelector('table');

    const tbody = document.getElementById('exerciseTableBody');
    for (let i = 0; i < 5; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 4; j++) {
            const cell = document.createElement('td');
            if (j === 0) {
                const input = document.createElement('input');
                input.type = 'text';
                cell.appendChild(input);
            } else if (j === 1) {
                const select = createNumberDropdown(0, 15);
                cell.appendChild(select);
            } else if (j === 2) {
                const select = createNumberDropdown(1, 15);
                cell.appendChild(select);
            } else {
                const select = document.createElement('select');
                const option1 = document.createElement('option');
                option1.value = true;
                option1.textContent = 'Y';
                const option2 = document.createElement('option');
                option2.value = false;
                option2.textContent = 'N';
                const option3 = document.createElement('option');
                option3.value = false;
                option3.selected = true;
                select.appendChild(option1);
                select.appendChild(option2);
                select.appendChild(option3);
                cell.appendChild(select);
            }
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
}

document.getElementById('completeBtn').addEventListener('click', () => {
    completeExercise(currentExerciseIndex);
});


document.getElementById('previousExerciseBtn').addEventListener('click', () => {
    previousExercise(currentExerciseIndex, currentExerciseSet);
});

document.addEventListener('intervalStarted', () => {
    completeExercise(currentExerciseIndex);
});

let exercises = [];
let repeatIndex = 1;
let currentExerciseIndex = 0;
let currentExerciseSet = 1;
let completed = 1;
let numberOfExercises;
let side = '(R)';

function createExerciseArray() {
    const table = document.getElementById('tableContainer');
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');

    exercises = Array.from(rows).map(row => {
            const cells = row.querySelectorAll('td');
            return {
                exercise: cells[0].querySelector('input').value,
                reps: parseInt(cells[1].querySelector('select').value, 10),
                sets: parseInt(cells[2].querySelector('select').value, 10),
                double: cells[3].querySelector('select').value === "true",
            };
        })
        .filter(exercise => exercise.exercise !== '');

    for (let i = 0; i < exercises.length; i++) {
        if (exercises[i].double) {
            exercises[i].sets *= 2;
        }
    }

    return exercises;
}

function startCueWorkout() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('startBtn').style.display = 'none';

    exercises = [];
    repeatIndex = 1;
    currentExerciseIndex = 0;
    currentExerciseSet = 1;

    if (!together) {
        document.getElementById('preCues').style.display = 'none';
        document.getElementById('cueScreen').style.display = 'block';
        document.getElementById('cueScreen').style.minWidth = 'clamp(40vw, 850px, 80vw)';
        document.getElementById('cueText').style.gap = '6vmin';
        document.getElementById('currentExerciseContainer').style.marginTop = '4vw';
        document.getElementById('nextExerciseContainer').style.minHeight = '2em';
        document.getElementById('completeBtn').style.display = 'block';
        document.getElementById('previousExerciseBtn').style.display = 'block';
        document.getElementById('previousExerciseBtn').style.visibility = 'hidden';
    }

    createExerciseArray();
    numberOfExercises = countExercises(exercises);
    document.getElementById('cueProgress').textContent = completed + "/" + numberOfExercises;
    displayCurrentExercise(currentExerciseIndex);
    displayNextExercise(currentExerciseIndex);
}

function displayCurrentExercise(index) {
    const exerciseContainer = document.getElementById('currentExerciseContainer');
    const repeats = parseInt(document.getElementById('repeatDropdownContainer').querySelector('select').value);

    if (index < exercises.length && !(exercises.length === 1 && repeatIndex > repeats)) {
        let currSide = "";
        if (exercises[index].double) {
            currSide = side;
        }
        if (exercises[index].reps > 0) {
            exerciseContainer.textContent = `Now: ${exercises[index].reps} ${exercises[index].exercise} ${currSide}`;
        } else {
            exerciseContainer.textContent = `Now: ${exercises[index].exercise} ${currSide}`;
        }
    } else {
        exerciseContainer.textContent = 'Workout complete!';
        document.getElementById('completeBtn').style.visibility = 'hidden';
        document.getElementById('cueProgress').style.visibility = 'hidden';
    }
}

function displayNextExercise(index) {
    document.getElementById('nextExerciseContainer').style.visibility = 'visible';
    const exerciseContainer = document.getElementById('nextExerciseContainer');
    const repeats = parseInt(document.getElementById('repeatDropdownContainer').querySelector('select').value);

    let nextSide = "";

    if (index < exercises.length && currentExerciseSet < exercises[index].sets) {
        if (exercises[index].double) {
            if (side === '(R)') {
                nextSide = '(L)'
            } else {
                nextSide = '(R)'
            }
        }
        exerciseContainer.textContent = `Next exercise: ${exercises[index].exercise} ${nextSide}`;
    } else if (index + 1 < exercises.length) {
        if (exercises[index + 1].double) {
            nextSide = '(R)'
        }
        exerciseContainer.textContent = `Next exercise: ${exercises[index + 1].exercise} ${nextSide}`;
    } else if (repeatIndex < repeats) {
        if (exercises[index].double) {
            if (side === '(R)') {
                nextSide = '(L)'
            } else {
                nextSide = '(R)'
            }
        }
        exerciseContainer.textContent = `Next exercise: ${exercises[0].exercise} ${nextSide}`;
    } else {
        exerciseContainer.textContent = '';
        document.getElementById('nextExerciseContainer').style.visibility = 'hidden';
    }
}

function completeExercise(index) {
    document.getElementById('previousExerciseBtn').style.visibility = 'visible';
    const repeats = parseInt(document.getElementById('repeatDropdownContainer').querySelector('select').value);

    if (exercises[index].double) {
        if (side === '(R)') {
            side = '(L)'
        } else {
            side = '(R)'
        }
    }

    if (exercises.length === 1) {
        if (currentExerciseSet < exercises[0].sets) {
            currentExerciseSet++;
        } else if (repeatIndex < repeats) {
            repeatIndex++;
            currentExerciseSet = 1;
        } else {
            currentExerciseIndex++;
        }
    } else if (index < exercises.length && currentExerciseSet < exercises[index].sets) {
        currentExerciseSet++;
    } else {
        currentExerciseIndex++;
        currentExerciseSet = 1;
        if (currentExerciseIndex === exercises.length && repeatIndex < repeats) {
            currentExerciseIndex = 0;
            repeatIndex++;
        }
    }

    if (completed < numberOfExercises) {
        completed++;
        document.getElementById('cueProgress').textContent = completed + "/" + numberOfExercises;
    }

    displayCurrentExercise(currentExerciseIndex);
    displayNextExercise(currentExerciseIndex);
}

function previousExercise(index, set) {
    document.getElementById('cueProgress').style.visibility = 'visible';
    document.getElementById('currentExerciseContainer').style.marginBottom = '0';
    document.getElementById('completeBtn').style.visibility = 'visible';

    if (exercises.length === 1 && index === 1) {
        currentExerciseIndex = 0;
        index = 0;
        set++;
    }

    if (set - 1 > 0) {
        if (exercises[index].double) {
            if (side === '(R)') {
                side = '(L)'
            } else {
                side = '(R)'
            }
        }
        currentExerciseSet = set - 1;
    } else if (index - 1 >= 0) {
        if (exercises[index - 1].double) {
            side = '(L)'
        }
        currentExerciseIndex = index - 1;
        currentExerciseSet =  exercises[currentExerciseIndex].sets;
    } else if (repeatIndex > 1) {
        if (exercises[exercises.length - 1].double) {
            side = '(L)'
        }
        repeatIndex--;
        currentExerciseIndex = exercises.length - 1;
        currentExerciseSet =  exercises[currentExerciseIndex].sets;
    }

    if (!((currentExerciseSet - 1 > 0) || (currentExerciseIndex - 1 >= 0) || (repeatIndex > 1))) {
        document.getElementById('previousExerciseBtn').style.visibility = 'hidden';
    }

    if (document.getElementById('currentExerciseContainer').textContent !== 'Workout complete!') {
        completed--;
        document.getElementById('cueProgress').textContent = completed + "/" + numberOfExercises;
    }

    displayCurrentExercise(currentExerciseIndex);
    displayNextExercise(currentExerciseIndex);
}

