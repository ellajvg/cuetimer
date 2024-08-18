document.getElementById('bothBtn').addEventListener('click', () => {
    document.getElementById('roundHeader').style.display = 'none';
    document.getElementById('roundDropdownContainer').style.display = 'none';
});

/*
document.getElementById('toTimerBtn').addEventListener('click', () => {
    document.getElementById('cues').style.display = 'none';
    document.getElementById('timer').style.display = 'block';
    document.getElementById('toCueBtn').style.display = 'block';
    document.getElementById('toTimerBtn').style.display = 'none';
    document.getElementById('previewWorkout').style.display = 'block';
    document.getElementById('startBothButton').style.display = 'block';
});


document.getElementById('toCueBtn').addEventListener('click', () => {
    document.getElementById('cues').style.display = 'block';
    document.getElementById('timer').style.display = 'none';
    document.getElementById('toCueBtn').style.display = 'none';
    document.getElementById('toTimerBtn').style.display = 'block';
    document.getElementById('previewWorkout').style.display = 'none';
    document.getElementById('startBothButton').style.display = 'none';
});
*/


function goBack() {
    location.reload();
}

function previewWorkout() {

}

function showContent(content) {
    document.querySelectorAll('.content').forEach(el => el.style.display = 'none');
    document.getElementById(content).style.display = 'block';
    if (content === 'timer') {
        document.getElementById('timerSpecific').style.display = 'block';
    } else if (content === 'cues') {
        document.getElementById('cueSpecific').style.display = 'block';
    } else {
        document.getElementById('cues').style.display = 'block';
        //document.getElementById('toCueBtn').style.display = 'none';
        //document.getElementById('previewWorkout').style.display = 'none';
        //document.getElementById('startBothButton').style.display = 'none';
    }
    document.getElementById('buttons').style.display = 'none';
}

function createNumberDropdown(min, max) {
    const select = document.createElement('select');
    if (min === 0) {
        const defaultOption = document.createElement('option')
        defaultOption.value = 0;
        defaultOption.textContent = '';
        defaultOption.selected = true;
        select.appendChild(defaultOption);
    }

    for (let k = 1; k <= max; k++) {
        const option = document.createElement('option');
        option.value = k;
        option.textContent = k;
        select.appendChild(option);
    }
    return select;
}

function startBothWorkout() {
    let repeats = parseInt(document.getElementById('repeatDropdownContainer').querySelector('select').value, 10);
    let exercises = createExerciseArray();
    let numberOfExercises = 0;
    for (let i = 0; i < exercises.length; i++) {
        numberOfExercises += parseInt(exercises[i].sets);
    }
    numberOfExercises *= repeats;

    let workPeriods = createPeriodArray();
    let numberOfWorkPeriods = workPeriods.length;

    if (numberOfExercises < numberOfWorkPeriods) {
        const missingExercises = numberOfWorkPeriods - numberOfExercises;
        const exerciseText = missingExercises === 1 ? 'exercise' : 'exercises';
        window.alert(`Please add ${missingExercises} ${exerciseText}.`);
    } else if (numberOfExercises % numberOfWorkPeriods !== 0) {
        const toAdd = numberOfWorkPeriods - (numberOfExercises % numberOfWorkPeriods);
        const toRemove = numberOfExercises % numberOfWorkPeriods;
        const addText = toAdd === 1 ? 'exercise' : 'exercises';
        const removeText = toRemove === 1 ? 'exercise' : 'exercises';

        if (toAdd === toRemove) {
            window.alert(`Please add or remove ${toAdd} ${addText}.`);
        } else {
            window.alert(`Please add ${toAdd} ${addText} or remove ${toRemove} ${removeText}.`);
        }

    } else {
        const roundDropdown = document.getElementById('roundDropdownContainer').querySelector('select');
        roundDropdown.value = numberOfExercises/numberOfWorkPeriods;
        startTimerWorkout();
    }
}

/*
document.getElementById('bothBtn').addEventListener('click', () => {
    document.getElementById('roundHeader').style.display = 'none';
    document.getElementById('roundDropdownContainer').style.display = 'none';
});

document.getElementById('toTimerBtn').addEventListener('click', () => {
    document.getElementById('cues').style.display = 'none';
    document.getElementById('toTimerBtn').style.display = 'none';
    document.getElementById('timer').style.display = 'block';
    document.getElementById('toCueBtn').style.display = 'block';
    document.getElementById('previewWorkout').style.display = 'block';
    document.getElementById('startBothButton').style.display = 'block';
});

document.getElementById('toCueBtn').addEventListener('click', () => {
    document.getElementById('cues').style.display = 'block';
    document.getElementById('toTimerBtn').style.display = 'block';
    document.getElementById('previewWorkout').style.display = 'none';
    document.getElementById('timer').style.display = 'none';
    document.getElementById('startBothButton').style.display = 'none';
});

function goBack() {
    location.reload();
}

function previewWorkout() {

}

function showContent(content) {
    document.querySelectorAll('.content').forEach(el => el.style.display = 'none');
    document.getElementById(content).style.display = 'block';
    if (content === 'timer') {
        document.getElementById('timerSpecific').style.display = 'block';
    } else if (content === 'cues') {
        document.getElementById('cueSpecific').style.display = 'block';
    } else {
        document.getElementById('cues').style.display = 'block';
        document.getElementById('toCueBtn').style.display = 'none';
    }
    document.getElementById('buttons').style.display = 'none';
}

function createNumberDropdown(min, max) {
    const select = document.createElement('select');
    if (min === 0) {
        const defaultOption = document.createElement('option')
        defaultOption.value = 0;
        defaultOption.textContent = '';
        defaultOption.selected = true;
        select.appendChild(defaultOption);
    }

    for (let k = 1; k <= max; k++) {
        const option = document.createElement('option');
        option.value = k;
        option.textContent = k;
        select.appendChild(option);
    }
    return select;
}

function startBothWorkout() {
    let repeats = parseInt(document.getElementById('repeatDropdownContainer').querySelector('select').value, 10);
    let exercises = createExerciseArray();
    let numberOfExercises = 0;
    for (let i = 0; i < exercises.length; i++) {
        numberOfExercises += parseInt(exercises[i].sets);
    }
    numberOfExercises *= repeats;

    let workPeriods = createPeriodArray();
    let numberOfWorkPeriods = workPeriods.length;

    if (numberOfExercises < numberOfWorkPeriods) {
        const missingExercises = numberOfWorkPeriods - numberOfExercises;
        const exerciseText = missingExercises === 1 ? 'exercise' : 'exercises';
        window.alert(`Please add ${missingExercises} ${exerciseText}.`);
    } else if (numberOfExercises % numberOfWorkPeriods !== 0) {
        const toAdd = numberOfWorkPeriods - (numberOfExercises % numberOfWorkPeriods);
        const toRemove = numberOfExercises % numberOfWorkPeriods;
        const addText = toAdd === 1 ? 'exercise' : 'exercises';
        const removeText = toRemove === 1 ? 'exercise' : 'exercises';

        if (toAdd === toRemove) {
            window.alert(`Please add or remove ${toAdd} ${addText}.`);
        } else {
            window.alert(`Please add ${toAdd} ${addText} or remove ${toRemove} ${removeText}.`);
        }

    } else {
        const roundDropdown = document.getElementById('roundDropdownContainer').querySelector('select');
        roundDropdown.value = numberOfExercises/numberOfWorkPeriods;
        startTimerWorkout();
    }
}

 */