function createTable() {
    const rows = document.getElementById('rows').value;
    const cols = 3; // Always 3 columns

    const errorContainer = document.getElementById('errorContainer');

    errorContainer.textContent = '';

    if (rows <= 0) {
        errorContainer.textContent = 'Must have at least one exercise!';
        return;
    }
    const tableContainer = document.getElementById('tableContainer');

    tableContainer.innerHTML = '';

    const table = document.createElement('table');

    // Create the table headers
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['Exercise', 'Reps', 'Sets'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
    addRows(rows, cols, table);
}

function addRows(rows, cols, table) {
    // Create the table body
    const tbody = document.createElement('tbody');
    for (let i = 0; i < rows; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('td');
            if (j === 0) {
                const input = document.createElement('input');
                input.type = 'text';
                cell.appendChild(input);
            } else {
                const select = document.createElement('select');
                for (let k = 1; k <= 15; k++) {
                    const option = document.createElement('option');
                    if (j===1 && k===10) {
                        option.selected = true;
                    } else if (j===2 && k===4) {
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
    tableContainer.appendChild(table);
}

function startWorkout() {

}