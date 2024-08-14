document.addEventListener('DOMContentLoaded', function() {
    addRows(5, 'tableContainer');

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

document.addEventListener('intervalStarted', (event) => {
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

    document.getElementById('completeBtn').style.display = 'block';
    document.getElementById('previousExerciseBtn').style.display = 'block';

    createExerciseArray();

    displayCurrentExercise(currentExerciseIndex);
    displayNextExercise(currentExerciseIndex);
}

function displayCurrentExercise(index) {
    const exerciseContainer = document.getElementById('currentExerciseContainer');
    if (index < exercises.length) {
        if (exercises[index].reps > 0) {
            exerciseContainer.textContent = `Now: ${exercises[index].reps} ${exercises[index].exercise}`;
        } else {
            exerciseContainer.textContent = `Now: ${exercises[index].exercise}`;
        }
    } else {
        exerciseContainer.textContent = 'All exercises completed!';
        document.getElementById('completeBtn').style.display = 'none';
    }
}

function displayNextExercise(index) {
    const exerciseContainer = document.getElementById('nextExerciseContainer');
    if (index < exercises.length && currentExerciseSet < exercises[index].sets) {
        exerciseContainer.textContent = `Next exercise is: ${exercises[index].exercise}`;
    } else if (index + 1 < exercises.length) {
        exerciseContainer.textContent = `Next exercise is: ${exercises[index + 1].exercise}`;
    } else {
        let repeats = parseInt(document.getElementById('repeatDropdownContainer').querySelector('select').value);
        if (repeatIndex < repeats) {
            repeatIndex++;
            //currentExerciseIndex = 0;
            //currentExerciseSet = 0;
            exerciseContainer.textContent = `Next exercise is: ${exercises[0].exercise}`;
        } else {
            exerciseContainer.textContent = '';
        }
    }
}

function completeExercise(index) {
    if (index < exercises.length && currentExerciseSet < exercises[index].sets) {
        currentExerciseSet++;
    } else {
        currentExerciseIndex++;
        currentExerciseSet = 1;
    }
    displayCurrentExercise(currentExerciseIndex);
    displayNextExercise(currentExerciseIndex);
}

//NOT WORKING YET FOR REPEATS
function previousExercise(index, set) {
    console.log("index " + index);
    console.log("repeat index " + repeatIndex);
    document.getElementById('completeBtn').style.display = 'block';
    let repeats = parseInt(document.getElementById('repeatDropdownContainer').querySelector('select').value);
    if (set - 1 > 0) {
        currentExerciseSet = set - 1;
    } else if (index - 1 >= 0) {
        currentExerciseIndex = index - 1;
        currentExerciseSet =  exercises[currentExerciseIndex].sets;
    } else if (repeats > 1 && repeatIndex > 1) { //USE INDEX===0?
        repeatIndex--;
        currentExerciseIndex = exercises.length - 1;
        currentExerciseSet =  exercises[currentExerciseIndex].sets;
    } else {
        window.alert("You're at the start of your workout!")
    }
    displayCurrentExercise(currentExerciseIndex);
    displayNextExercise(currentExerciseIndex);
}

