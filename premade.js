document.getElementById('menuBtn').addEventListener('click', (event) => {
    const menu= document.getElementById('menuContent');
    menu.style.display = 'flex';
    event.stopPropagation();
});

document.addEventListener('click', (event) => {
    const menu = document.getElementById('menuContent');
    const menuBtn = document.getElementById('menuBtn');
    const themes = document.getElementById('themes');
    if (!menu.contains(event.target) && !themes.contains(event.target) && event.target !== menuBtn) {
        menu.style.display = 'none';
    }
});

document.getElementById('menuBtn').addEventListener('mouseenter', () => {
    const menu= document.getElementById('menuContent');
    if (menu.style.display === 'flex') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'flex';
    }
});


document.getElementById('menuContent').addEventListener('mouseleave', () => {
    const menu= document.getElementById('menuContent');
    menu.style.display = 'none';

});

document.getElementById('gluteHam').addEventListener('click', () => {
    addRows();
    addRows();

    const table = document.getElementById('tableContainer');
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    const data = ['Bulgarian split squats (R)', 'Bulgarian split squats (L)', 'Bulgarian split squats (R)',
        'Bulgarian split squats (L)', 'Bulgarian split squats (R)', 'Bulgarian split squats (L)',
        'Bulgarian split squats (R)', 'Bulgarian split squats (L)', 'RDLs', 'Good mornings', 'Glute bridges'];

    setCueExercise(rows, 0, 11, data)
    setCueReps(rows, 0, 11, 10);
    setCueSets(rows, 8, 11, 4);
    removeRows(tbody.rows.length-data.length);
    showContent('cues');
});

document.getElementById('gluteFin').addEventListener('click', () => {
    addRows();
    addRows();
    addRows();

    const table = document.getElementById('tableContainer');
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    const data = ['Full range GBs', '1 1/2 rep GBs', 'Full range GBs', '1 1/2 rep GBs', 'Full range GBs',
        '1 1/2 rep GBs', '1/2 rep GBs', 'GB hold', '1/2 rep GBs', 'GB hold', '1/2 rep GBs', 'GB hold',
        'Bridge abduction', 'Sitting abduction', 'Bridge abduction', 'Sitting abduction', 'Sitting abduction', 'Bridge abduction'];

    setCueExercise(rows, 0, 18, data)
    removeRows(tbody.rows.length-data.length);

    addWork();
    addWork();
    addWork();
    addWork();
    addWork();

    const timerTable = document.getElementById('timerTable');
    const tbodyTimer = timerTable.querySelector('tbody');
    const rowsTimer = tbodyTimer.querySelectorAll('tr');

    setTimer(rowsTimer, 6, 30)
    while (tbodyTimer.rows.length > 6) {
        removeWork();
    }

    showContent('both');

    document.getElementById('roundRestHeader').style.display = 'inline-block';
    document.getElementById('roundRestDropdownContainer').style.display = 'inline-block';
    document.getElementById('roundRestDropdownContainer').querySelector('select').value = '30';
});

document.getElementById('chestTri').addEventListener('click', () => {
    const table = document.getElementById('tableContainer');
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    const data = ['Chest press', 'Shoulder press', 'Tricep push-ups', 'Skull crushers'];

    setCueExercise(rows, 0, 4, data)
    setCueReps(rows, 0, 4, 10);
    setCueSets(rows, 0, 2, 4);
    setCueSets(rows, 2, 4, 3);
    removeRows(tbody.rows.length-data.length);
    showContent('cues');
});

document.getElementById('plankFin').addEventListener('click', () => {
    addRows();

    const table = document.getElementById('tableContainer');
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    const data = ['Plank', 'Plank saw', 'Spiderman plank', 'Plank push-ups', 'Plank to bear',
        'Plank kick throughs', 'DD to plank', 'Plank toe taps', 'Alt side planks', 'Plank'];

    setCueExercise(rows, 0, 10, data)
    removeRows(tbody.rows.length-data.length);

    const timerTable = document.getElementById('timerTable');
    const tbodyTimer = timerTable.querySelector('tbody');
    const rowsTimer = tbodyTimer.querySelectorAll('tr');

    setTimer(rowsTimer, 1, 60)
    while (tbodyTimer.rows.length > 1) {
        removeWork();
    }

    document.getElementById('restDropdownContainer').querySelector('select').value = '15';
    showContent('both');

});

document.getElementById('quadCalf').addEventListener('click', () => {
    addRows();
    addRows();

    const table = document.getElementById('tableContainer');
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    const data = ['HE squats', 'FE lunge to staggered squat (R)', 'FE lunge to staggered squat (L)',
        'FE lunge to staggered squat (R)', 'FE lunge to staggered squat (L)', 'FE staggered squat (R)',
        'FE staggered squat (L)', 'FE staggered squat (R)', 'FE staggered squat (L)', 'Squat to calf raise', 'Calf raises'];

    setCueExercise(rows, 0, 11, data)
    setCueReps(rows, 0, 11, 10);
    setCueSets(rows, 0, 1, 3);
    setCueSets(rows, 9, 11, 3);
    removeRows(tbody.rows.length-data.length);
    showContent('cues');
});

document.getElementById('legFin').addEventListener('click', () => {
    addRows();
    addRows();
    addRows();

    const table = document.getElementById('tableContainer');
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    const data = ['Squat hold', '1/2 rep squats', '1 1/2 rep squats', 'Full range squats', 'Lunge hold (R)',
        '1/2 rep lunges (R)', '1 1/2 rep lunges (R)', 'Full range lunges (R)', 'Lunge hold (L)', '1/2 rep lunges (L)',
        '1 1/2 rep lunges (L)', 'Full range lunges (L)', 'Calf raise hold (R)', '1/2 rep calf raises (R)',
        '1 1/2 rep calf raises (R)', 'Full range calf raises (R)', 'Calf raise hold (L)', '1/2 rep calf raises (L)',
        '1 1/2 rep calf raises (L)', 'Full range calf raises (L)'];

    setCueExercise(rows, 0, 20, data)
    removeRows(tbody.rows.length-data.length);

    addWork();
    addWork();
    addWork();

    const timerTable = document.getElementById('timerTable');
    const tbodyTimer = timerTable.querySelector('tbody');
    const rowsTimer = tbodyTimer.querySelectorAll('tr');

    setTimer(rowsTimer, 4, 30)
    while (tbodyTimer.rows.length > 4) {
        removeWork();
    }

    showContent('both');

    document.getElementById('roundRestHeader').style.display = 'inline-block';
    document.getElementById('roundRestDropdownContainer').style.display = 'inline-block';
    document.getElementById('roundRestDropdownContainer').querySelector('select').value = '30';
});

document.getElementById('backBi').addEventListener('click', () => {
    const table = document.getElementById('tableContainer');
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    const data = ['Bent over rows', 'Pullovers', 'Scapula push-ups', 'Zottman curls', 'Wrist curls'];

    setCueExercise(rows, 0, 5, data)
    setCueReps(rows, 0, 5, 10);
    setCueSets(rows, 0, 3, 4);
    setCueSets(rows, 3, 5, 3);
    removeRows(tbody.rows.length-data.length);
    showContent('cues');
});

document.getElementById('hollowFin').addEventListener('click', () => {
    addRows();

    const table = document.getElementById('tableContainer');
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    const data = ['Hollow hold', 'Toe reach to leg lower (W)', 'Toe reach to leg lower (BW)', 'Double deadbug (W)',
        'Double deadbug (BW)', 'Reverse crunches (W)', 'Reverse crunches (BW)', 'Sit-ups (W)', 'Sit-ups (BW)', 'Hollow hold'];

    setCueExercise(rows, 0, 10, data)
    removeRows(tbody.rows.length-data.length);

    const timerTable = document.getElementById('timerTable');
    const tbodyTimer = timerTable.querySelector('tbody');
    const rowsTimer = tbodyTimer.querySelectorAll('tr');

    setTimer(rowsTimer, 1, 60)
    while (tbodyTimer.rows.length > 1) {
        removeWork();
    }

    document.getElementById('restDropdownContainer').querySelector('select').value = '15';
    showContent('both');
});

function setCueExercise(rows, start, end, data) {
    for (let i = start; i < end; i++) {
        if (i < rows.length) {
            const row = rows[i];
            const input = row.cells[0].querySelector('input');
            input.value = data[i];
        }
    }
}

function setCueReps(rows, start, end, value) {
    for (let i = start; i < end; i++) {
        if (i < rows.length) {
            const row = rows[i];
            const select = row.cells[1].querySelector('select');
            select.value = value;
        }
    }
}

function setCueSets(rows, start, end, value) {
    for (let i = start; i < end; i++) {
        if (i < rows.length) {
            const row = rows[i];
            const select = row.cells[2].querySelector('select');
            select.value = value;
        }
    }
}

function setTimer(rows, end, value) {
    for (let i = 0; i < end; i++) {
        const row = rows[i];
        const select = row.cells[1].querySelector('select');
        select.value = value;
    }
}

function removeRows(numberOfRows) {
    const tbody = document.getElementById('exerciseTableBody');
    for (let i = 0; i < numberOfRows; i++) {
        tbody.deleteRow(tbody.rows.length - 1);
    }
}

