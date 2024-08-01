function showContent(id) {
    document.querySelectorAll('.content').forEach(div => div.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    document.getElementById('buttons').style.display = 'none';
}

function goBack() {
    document.querySelectorAll('.content').forEach(div => div.style.display = 'none');
    document.getElementById('buttons').style.display = 'block';
}