"use strict"
document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('#cart-items');
    const totalPriceDisplay = document.querySelector('#total-price');
    const clearCartButton = document.querySelector('#clear-cart');

    function displayCart() {

        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cart.forEach((item, index) => {
            const {name, price, image} = item
            const cartItem = document.createElement('div');
            cartItem.className = 'tent';
            cartItem.innerHTML = `
                <h3>${name}</h3>
                <p>Prijs: €${price}</p>
                <button class="remove-item" data-index="${index}">Verwijder</button>`;
            cartItemsContainer.appendChild(cartItem);
            totalPrice += parseFloat(price);
        });

        totalPriceDisplay.textContent = `Totale prijs: €${totalPrice.toFixed(2)}`;

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                removeItemFromCart(index);
            });
        });
    }

    function removeItemFromCart(index) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }

    clearCartButton.addEventListener('click', () => {
        localStorage.removeItem('cart');
        displayCart();
    });

    displayCart();
    
});


