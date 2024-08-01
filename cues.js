document.addEventListener('DOMContentLoaded', function() {
    addRows(5, 'tableContainer');
});

function addRows() {
    // Reference the table container
    const tableContainer = document.getElementById('tableContainer');
    const table = tableContainer.querySelector('table');

    // Create the table body
    const tbody = document.getElementById('exerciseTableBody');
    for (let i = 0; i < 5; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('td');
            if (j === 0) {
                const input = document.createElement('input');
                input.type = 'text';
                cell.appendChild(input);
            } else {
                const select = document.createElement('select');
                for (let k = 1; k <= 15; k++) {
                    const option = document.createElement('option');
                    if (j === 1 && k === 10) {
                        option.selected = true;
                    } else if (j === 2 && k === 4) {
                        option.selected = true;
                    }

                    option.value = k;
                    option.textContent = k;
                    select.appendChild(option);
                }
                cell.appendChild(select);
            }
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
}

let exercises = [];
let currentExerciseIndex = 0;
let currentExerciseSet = 1;

document.getElementById('completeBtn').addEventListener('click', () => {
    completeExercise(currentExerciseIndex);
});

function startWorkout(tableContainerId) {
    const table = document.getElementById(tableContainerId);
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    console.log('Table:', table); // Debugging
    console.log('Table:', tbody); // Debugging
    console.log('Rows:', rows); // Debugging

    exercises = Array.from(rows).map(row => {
        const cells = row.querySelectorAll('td');
        console.log('Cells:', cells); // Debugging
        return {
            exercise: cells[0].querySelector('input').value,
            reps: cells[1].querySelector('select').value,
            sets: cells[2].querySelector('select').value,
        };
    });
    console.log('Extracted Exercises:', exercises); // Debugging
    displayCurrentExercise(currentExerciseIndex);
    displayNextExercise(currentExerciseIndex);
}

function displayCurrentExercise(index) {
    if (index < exercises.length) {
        const exerciseContainer = document.getElementById('currentExerciseContainer');
        exerciseContainer.textContent = `Now: ${exercises[index].exercise} for: ${exercises[index].reps}`;
        document.getElementById('completeBtn').style.display = 'block';
    } else {
        document.getElementById('currentExerciseContainer').textContent = 'All exercises completed!';
        document.getElementById('completeBtn').style.display = 'none';
    }
}

function displayNextExercise(index) {
    const exerciseContainer = document.getElementById('nextExerciseContainer');
    if (currentExerciseSet < exercises[index].sets) {
        exerciseContainer.textContent = `Next exercise is: ${exercises[index].exercise}`;
        document.getElementById('completeBtn').style.display = 'block';
    } else if (index + 1 < exercises.length) {
        exerciseContainer.textContent = `Next exercise is: ${exercises[index + 1].exercise}`;
        document.getElementById('completeBtn').style.display = 'block';
    } else {
        exerciseContainer.textContent = ``;
        document.getElementById('completeBtn').style.display = 'block';
    }
}

function completeExercise(index) {
    if (currentExerciseSet < exercises[index].sets) {
        currentExerciseSet++;
    } else {
        currentExerciseIndex++;
        currentExerciseSet = 0;
    }
    displayCurrentExercise(currentExerciseIndex);
    displayNextExercise(currentExerciseIndex);
}