"use strict"
document.addEventListener('DOMContentLoaded', () => {
    const tentsContainer = document.querySelector('#tents-container');

    fetchTents();

    async function fetchTents() {
        try {
            const response = await fetch('http://localhost:3000/api/tents');
            const data = await response.json();
            displayTents(data);
        } catch (error) {
            console.error('Fout bij het ophalen van tentgegevens:', error);
        }
    }

    function displayTents(tents) {
        tents.forEach(tent => {
            const {id, name, price, image} = tent
            const tentElement = document.createElement('div');
            tentElement.className = 'tent';
            tentElement.innerHTML = 
            `
                <h3>${name}</h3>
                <img src="${image}" alt="${name}" class="tent-image">
                <p>Prijs: €${price}</p>
                <button class="add-to-cart" data-id="${id}" data-name="${name}" data-price="${price}">Voeg toe aan winkelwagen</button>
            `;
            tentsContainer.appendChild(tentElement);
        });

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                const {id, name, price} = button.dataset;
                addToCart({ id, name, price});
            });
        });
    }

    function addToCart(tent) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = [...cart, tent];
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Tent toegevoegd aan winkelwagen!');
    }
});


