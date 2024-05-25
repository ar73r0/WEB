'use strict';
let home = 'home';

document.getElementById('home').innerText = home; //Elementen selecteren + Elementen manipuleren
document.getElementById('home').addEventListener('mouseover', e => {document.getElementById('home').style.color = 'red';});//Event aan een element koppelen

// scripts.js

window.addEventListener('load', () => {
    const loadingOverlay = document.getElementById('loadOverlay');
    setTimeout(() => {
        loadingOverlay.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }, 2500); // Display the loading screen for 5 seconds
});

const validateForm = () => {
    const choice = document.getElementById("choice").value;
    let isValid = true;

    if (choice == "" || choice == "False")
    {
        isValid = false;
    }
    else if (choice == "Correct"){isValid=true;}

    console.log(isValid)
    return isValid;
}

function greeting(naam){
    console.log(`Hallo ${naam}`);
}
function processInput(callback){
    const naam = prompt("Wat is jouw naam? :");
    if(naam){
        localStorage.setItem('naam', naam);
        callback(naam);
    }
}

function checkNaam(callback){
    const stored = localStorage.getItem('naam');
    if(stored){
        callback(stored);
    }else{
        processInput(callback);
    }
}

checkNaam(greeting);
//callback function

const abc = [10, 20, 30, 40, 50];
const [a, b, ...rest] = abc;
// DESTRUCTERING + REST OPERATOR
const def = [1, 2];
const spread = [...abc, ...def]
// SPREAD OPERATOR

spread.forEach(element => {
  console.log(element); //array itteration
})

let jsonObject = JSON.parse('{"name": "Alice", "age": 30, "city": "New York"}');

// Modify the object
jsonObject.age = 31;
jsonObject.city = "San Francisco";

// Convert it back to a JSON string
const jsonString = JSON.stringify(jsonObject);

console.log(jsonString);
// Output: '{"name":"Alice","age":31,"city":"San Francisco"}'


async function fetchData() {
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        if (!response.ok) {
            throw new Error('no network connection');
        }
        let data = await response.json();
        console.log(data); 
    } catch (error) {
        console.error('I didnt wanna fetch:', error);
    }
}


fetchData();
