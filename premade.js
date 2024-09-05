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

    const table = document.getElementById('tableContainer');
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    const data = ['Bulgarian split squats', 'RDLs', 'Good mornings', 'GBs'];

    deselect(rows, 1, 5);
    setCueExercise(rows, 0, 4, data)
    setCueReps(rows, 0, 4, 10);
    setCueSets(rows, 0, 4, 4);

    const row = rows[0];
    const select = row.cells[3].querySelector('select');
    select.value = true;

    removeRows(tbody.rows.length-data.length);
    showContent('cues');
});

document.getElementById('gluteFin').addEventListener('click', () => {
    document.getElementById('preCues').style.display = 'block';
    document.getElementById('cueScreen').style.display = 'none';

    addRows();
    addRows();
    addRows();

    const table = document.getElementById('tableContainer');
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    const data = ['Full range GBs', '1 1/2 rep GBs', 'Full range GBs', '1 1/2 rep GBs', 'Full range GBs',
        '1 1/2 rep GBs', '1/2 rep GBs', 'GB hold', '1/2 rep GBs', 'GB hold', '1/2 rep GBs', 'GB hold', 'Bridge abduction',
        'Sitting abduction', 'Bridge abduction', 'Sitting abduction', 'Bridge abduction', 'Sitting abduction'];

    deselect(rows, 0, 5);
    setCueExercise(rows, 0, 18, data)
    setCueReps(rows, 0, 18, 0);
    setCueSets(rows, 0, 18, 1);

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

    document.getElementById('restDropdownContainer').querySelector('select').value = '0';
    document.getElementById('roundRestHeader').style.display = 'inline-block';
    document.getElementById('roundRestDropdownContainer').style.display = 'inline-block';
    document.getElementById('roundRestDropdownContainer').querySelector('select').value = '30';
});

document.getElementById('chestTri').addEventListener('click', () => {
    addRows();
    addRows();

    const table = document.getElementById('tableContainer');
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    const data = ['Chest press', 'Shoulder press', 'Tricep push-ups', 'Skull crushers'];

    deselect(rows, 0, 5);
    setCueExercise(rows, 0, 4, data)
    setCueReps(rows, 0, 4, 10);
    setCueSets(rows, 0, 2, 4);
    setCueSets(rows, 2, 4, 3);
    removeRows(tbody.rows.length-data.length);
    showContent('cues');
});

document.getElementById('plankFin').addEventListener('click', () => {
    addRows();
    addRows();

    const table = document.getElementById('tableContainer');
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    const data = ['Plank', 'Plank saw', 'Spiderman plank', 'Plank push-ups', 'Plank to bear',
        'Plank kick throughs', 'DD to plank', 'Plank toe taps', 'Alt side planks', 'Plank'];

    deselect(rows, 0, 5);
    setCueExercise(rows, 0, 10, data)
    setCueReps(rows, 0, 10, 0);
    setCueSets(rows, 0, 10, 1);
    removeRows(tbody.rows.length-data.length);

    const timerTable = document.getElementById('timerTable');
    const tbodyTimer = timerTable.querySelector('tbody');
    const rowsTimer = tbodyTimer.querySelectorAll('tr');

    setTimer(rowsTimer, 1, 60)
    while (tbodyTimer.rows.length > 1) {
        removeWork();
    }

    document.getElementById('restDropdownContainer').querySelector('select').value = '15';
    document.getElementById('roundRestDropdownContainer').querySelector('select').value = '0';
    showContent('both');

});

document.getElementById('quadCalf').addEventListener('click', () => {
    addRows();

    const table = document.getElementById('tableContainer');
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    const data = ['HE squats', 'FE lunge to staggered squat', 'FE staggered squat', 'Squat to calf raise', 'Calf raises'];

    deselect(rows, 0, 5);
    setCueExercise(rows, 0, 5, data)
    setCueReps(rows, 0, 5, 10);
    setCueSets(rows, 0, 1, 3);
    setCueSets(rows, 1, 3, 2);
    setCueSets(rows, 3, 5, 3);
    const row1 = rows[1];
    const select1 = row1.cells[3].querySelector('select');
    select1.value = true;
    const row2 = rows[2];
    const select2 = row2.cells[3].querySelector('select');
    select2.value = true;
    removeRows(tbody.rows.length-data.length);
    showContent('cues');
});

document.getElementById('legFin').addEventListener('click', () => {
    addRows();
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

    deselect(rows, 0, 5);
    setCueExercise(rows, 0, 20, data)
    setCueReps(rows, 0, 20, 0);
    setCueSets(rows, 0, 20, 1);
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

    document.getElementById('restDropdownContainer').querySelector('select').value = '0';
    document.getElementById('roundRestHeader').style.display = 'inline-block';
    document.getElementById('roundRestDropdownContainer').style.display = 'inline-block';
    document.getElementById('roundRestDropdownContainer').querySelector('select').value = '30';
});

document.getElementById('backBi').addEventListener('click', () => {
    addRows();

    const table = document.getElementById('tableContainer');
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    const data = ['Bent over rows', 'Pullovers', 'Scapula push-ups', 'Zottman curls', 'Wrist curls'];

    deselect(rows, 0, 4);
    setCueExercise(rows, 0, 5, data)
    setCueReps(rows, 0, 5, 10);
    setCueSets(rows, 0, 3, 4);
    setCueSets(rows, 3, 5, 3);
    const row = rows[4];
    const select = row.cells[3].querySelector('select');
    select.value = true;
    removeRows(tbody.rows.length-data.length);
    showContent('cues');
});

document.getElementById('hollowFin').addEventListener('click', () => {
    addRows();
    addRows();

    const table = document.getElementById('tableContainer');
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    const data = ['Hollow hold', 'Toe reach to leg lower (W)', 'Toe reach to leg lower (BW)', 'Double deadbug (W)',
        'Double deadbug (BW)', 'Reverse crunches (W)', 'Reverse crunches (BW)', 'Sit-ups (W)', 'Sit-ups (BW)', 'Hollow hold'];

    deselect(rows, 0, 5);
    setCueExercise(rows, 0, 10, data);
    setCueReps(rows, 0, 10, 0);
    setCueSets(rows, 0, 10, 1);
    removeRows(tbody.rows.length-data.length);

    const timerTable = document.getElementById('timerTable');
    const tbodyTimer = timerTable.querySelector('tbody');
    const rowsTimer = tbodyTimer.querySelectorAll('tr');

    setTimer(rowsTimer, 1, 60)
    while (tbodyTimer.rows.length > 1) {
        removeWork();
    }

    document.getElementById('restDropdownContainer').querySelector('select').value = '15';
    document.getElementById('roundRestDropdownContainer').querySelector('select').value = '0';
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

function deselect(rows, start, end) {
    for (let i = start; i < end; i++) {
        const row = rows[i];
        const select = row.cells[3].querySelector('select');
        select.value = "";
    }
}

