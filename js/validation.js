"use strict"
function validateForm() {
    const naam = document.getElementById('naam').value;
    const email = document.getElementById('email').value;
    const startdatum = document.getElementById('startdatum').value;
    const einddatum = document.getElementById('einddatum').value;

    if (!naam || !email || !startdatum || !einddatum) {
        alert('Alle velden zijn verplicht.');
        return false;
    }

    const start = new Date(startdatum);
    const eind = new Date(einddatum);

    if (start >= eind) {
        alert('De einddatum moet na de startdatum liggen.');
        return false;
    }

    alert('Boeking succesvol!');
    return true;
}

