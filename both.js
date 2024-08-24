let together = false;

document.getElementById('bothBtn').addEventListener('click', () => {
    document.getElementById('roundHeader').style.display = 'none';
    document.getElementById('roundDropdownContainer').style.display = 'none';
    together = true;
});

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        document.getElementById('clickSound').play();
    });
});

document.getElementById('pink').addEventListener('click', () => {
    document.documentElement.style.setProperty('--color1', 'hotpink');
    document.documentElement.style.setProperty('--color2', '#ffb7d8');
    document.documentElement.style.setProperty('--color3', '#fff4f8');
    if (document.getElementById('workOrRest').textContent === 'Work') {
        document.getElementById('countdown').style.color = 'hotpink';
    } else {
        document.getElementById('countdown').style.color = '#ffb7d8';
    }
})

document.getElementById('blue').addEventListener('click', () => {
    document.documentElement.style.setProperty('--color1', 'royalblue');
    document.documentElement.style.setProperty('--color2', '#a3b8ef');
    document.documentElement.style.setProperty('--color3', '#f1f4ff');
    if (document.getElementById('workOrRest').textContent === 'Work') {
        document.getElementById('countdown').style.color = 'royalblue';
    } else {
        document.getElementById('countdown').style.color = '#a3b8ef';
    }
})

document.getElementById('gray').addEventListener('click', () => {
    document.documentElement.style.setProperty('--color1', '#353535');
    document.documentElement.style.setProperty('--color2', '#bababa');
    document.documentElement.style.setProperty('--color3', '#f3f3f3');
    if (document.getElementById('workOrRest').textContent === 'Work') {
        document.getElementById('countdown').style.color = '#353535';
    } else {
        document.getElementById('countdown').style.color = '#bababa';
    }
})

function goBack() {
    const rootStyles = getComputedStyle(document.documentElement);
    const color1 = rootStyles.getPropertyValue('--color1');
    localStorage.setItem('savedColor', color1);
    location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
    const savedColor = localStorage.getItem('savedColor');

    if (savedColor === 'hotpink') {
        document.documentElement.style.setProperty('--color1', 'hotpink');
        document.documentElement.style.setProperty('--color2', '#ffb7d8');
        document.documentElement.style.setProperty('--color3', '#fff4f8');
    } else if (savedColor === 'royalblue') {
        document.documentElement.style.setProperty('--color1', 'royalblue');
        document.documentElement.style.setProperty('--color2', '#a3b8ef');
        document.documentElement.style.setProperty('--color3', '#f1f4ff');
    }
});

function showContent(content) {
    document.querySelectorAll('.content').forEach(el => el.style.display = 'none');

    document.getElementById('back').style.display = 'block';
    document.getElementById('startBtn').style.display = 'block';

    document.getElementById('timerStartBtn').style.display = 'none';
    document.getElementById('cuesStartBtn').style.display = 'none';
    document.getElementById('bothStartBtn').style.display = 'none';

    if (content === 'timer') {
        document.getElementById(content).style.display = 'block';
        document.getElementById('timerStartBtn').style.display = 'block';
    } else if (content === 'cues') {
        document.getElementById(content).style.display = 'block';
        document.getElementById('cuesStartBtn').style.display = 'block';
    } else {
        document.getElementById('cues').style.display = 'block';
        document.getElementById('cueSpecific').style.display = 'none';
        document.getElementById('timer').style.display = 'block';
        document.getElementById('bothStartBtn').style.display = 'block';
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
        startTimerWorkout(exercises[0].exercise);
    }
}

