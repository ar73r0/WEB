'use strict';
const home = 'home'

document.getElementById('home').innerText = home; //Elementen selecteren + Elementen manipuleren
document.getElementById('home').addEventListener('mouseover', e => { alert('watch out!');});//Event aan een element koppelen

validate = (name) => {
    alert('thank you', name);
};
