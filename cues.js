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
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('td');
            if (j === 0) {
                const input = document.createElement('input');
                input.type = 'text';
                cell.appendChild(input);
            } else if (j === 1) {
                const select = createNumberDropdown(0, 15);
                cell.appendChild(select);
            } else {
                const select = createNumberDropdown(1, 15);
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

function createExerciseArray() {
    const table = document.getElementById('tableContainer');
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');

    exercises = Array.from(rows).map(row => {
            const cells = row.querySelectorAll('td');
            return {
                exercise: cells[0].querySelector('input').value, // Trim whitespace
                reps: cells[1].querySelector('select').value,
                sets: cells[2].querySelector('select').value,
            };
        })
        .filter(exercise => exercise.exercise !== '');

    return exercises;
}

function startCueWorkout() {
    exercises = [];
    repeatIndex = 1;
    currentExerciseIndex = 0;
    currentExerciseSet = 1;

    if (!together) {
        document.getElementById('preCues').style.display = 'none';
        document.getElementById('cueScreen').style.display = 'block';
        document.getElementById('cueScreen').style.minWidth = '800px';
        document.getElementById('cueScreen').style.minHeight = '250px';
        document.getElementById('nextExerciseContainer').style.margin = '50px';
        document.getElementById('completeBtn').style.display = 'block';
        document.getElementById('previousExerciseBtn').style.display = 'block';
        document.getElementById('previousExerciseBtn').style.visibility = 'hidden';
    }

    createExerciseArray();

    displayCurrentExercise(currentExerciseIndex);
    displayNextExercise(currentExerciseIndex);
}

function displayCurrentExercise(index) {
    const exerciseContainer = document.getElementById('currentExerciseContainer');
    const repeats = parseInt(document.getElementById('repeatDropdownContainer').querySelector('select').value);
    if (index < exercises.length && !(exercises.length === 1 && repeatIndex > repeats)) {
        if (exercises[index].reps > 0) {
            exerciseContainer.textContent = `Now: ${exercises[index].reps} ${exercises[index].exercise}`;
        } else {
            exerciseContainer.textContent = `Now: ${exercises[index].exercise}`;
        }
    } else {
        exerciseContainer.textContent = 'Workout complete!';
        document.getElementById('completeBtn').style.visibility = 'hidden';
    }
}

function displayNextExercise(index) {
    const exerciseContainer = document.getElementById('nextExerciseContainer');
    const repeats = parseInt(document.getElementById('repeatDropdownContainer').querySelector('select').value);

    if (index < exercises.length && currentExerciseSet < exercises[index].sets) {
        exerciseContainer.textContent = `Next exercise: ${exercises[index].exercise}`;
    } else if (index + 1 < exercises.length) {
        exerciseContainer.textContent = `Next exercise: ${exercises[index + 1].exercise}`;
    } else if (repeatIndex < repeats) {
        exerciseContainer.textContent = `Next exercise: ${exercises[0].exercise}`;
    } else {
        exerciseContainer.textContent = '';
        document.getElementById('currentExerciseContainer').style.marginBottom = '147px';
    }
}

function completeExercise(index) {
    document.getElementById('previousExerciseBtn').style.visibility = 'visible';
    const repeats = parseInt(document.getElementById('repeatDropdownContainer').querySelector('select').value);

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

    displayCurrentExercise(currentExerciseIndex);
    displayNextExercise(currentExerciseIndex);
}

function previousExercise(index, set) {
    document.getElementById('currentExerciseContainer').style.marginBottom = '0';
    document.getElementById('completeBtn').style.visibility = 'visible';

    if (exercises.length === 1 && index === 1) {
        currentExerciseIndex = 0;
        set++;
    }

    if (set - 1 > 0) {
        currentExerciseSet = set - 1;
    } else if (index - 1 >= 0) {
        currentExerciseIndex = index - 1;
        currentExerciseSet =  exercises[currentExerciseIndex].sets;
    } else if (repeatIndex > 1) {
        repeatIndex--;
        currentExerciseIndex = exercises.length - 1;
        currentExerciseSet =  exercises[currentExerciseIndex].sets;
    }

    if (!((currentExerciseSet - 1 > 0) || (currentExerciseIndex - 1 >= 0) || (repeatIndex > 1))) {
        document.getElementById('previousExerciseBtn').style.visibility = 'hidden';
    }

    displayCurrentExercise(currentExerciseIndex);
    displayNextExercise(currentExerciseIndex);
}

