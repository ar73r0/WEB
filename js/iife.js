"use strict";

(function() {
    document.querySelector('#go-to-cart').addEventListener('click', () => {
        window.location.href = 'cart.html';
    });

    console.log('IIFE has been executed');
})();
