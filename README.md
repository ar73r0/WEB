# WEB ADVANCED

# Portfolio - Tentenverhuur Webapplicatie

Deze webapplicatie is ontwikkeld als portfolio voor het vak web advanced. Het toont mijn kennis en toepassing van verschillende JavaScript en web development concepten.

## Overzicht van Onderwerpen

1. **Elementen selecteren**
   - Gebruik van `document.querySelector` om tent selectie element te selecteren.
   - Code voorbeeld: const tentsContainer = document.querySelector('#tents-container');

2. **Elementen manipuleren**
   - Dynamisch bijwerken van prijs weergave op basis van selectie.
   - Code voorbeeld: totalPriceDisplay.textContent = `Totale prijs: €${totalPrice.toFixed(2)}`;

3. **Event aan een element koppelen**
   - Event listener toegevoegd aan de 'Add to Cart' knop.
   - Code voorbeeld: 
   document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => 

4. **Basis CSS Animatie**
   - Toegevoegde eenvoudige schaalanimatie aan de knop "Voeg toe aan winkelwagen".
   - Code voorbeeld: transform: scale(1.1);

5. **Gebruiken van een constante**
   - Gebruik van `const` voor het definiëren van de basis URL voor API-communicatie.
   - Code voorbeeld: const response = await fetch('/api/tents');

6. **Arrow function**
   - Gebruik van arrow function voor het toevoegen van tenten aan de winkelwagen.
   - Code voorbeeld: document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => {

7. **Formulier valideren**
   - Validatie van het boekingsformulier op basis van vereiste velden.
   - Code voorbeeld: if (!naam || !email || !aankomstdatum || !vertrekdatum) {
        alert('Alle velden zijn verplicht.');
        return false;
    }

8. **Gebruik van template literals**
   - Dynamische generatie van HTML-inhoud voor tentweergave.
   - Code voorbeeld: <h3>${tent.name}</h3>

9. **Destructuring**
   - Destructuring van tentobjecten bij het toevoegen aan de winkelwagen.
   - Code voorbeeld: const {name, price} = item

10. **Spread & Rest operator**
    - Gebruik van spread operator bij het bijwerken van de winkelwagen.
    - Code voorbeeld: cart = [...cart, tent];const { name, price, image, ...rest} = req.body;

11. **Iteration over een array**
    - Itereren over de lijst van beschikbare tenten voor weergave op de website.
    - Code voorbeeld: tents.forEach

12. **Callback function**
    - Callback functie toegevoegd aan de event listener voor het toevoegen van tenten aan de winkelwagen.
    - Code voorbeeld: app.get('/api/tents', (res) => {
    res.json(tents);
});

13. **Promise**
    - Gebruik van Promise voor het asynchroon ophalen van tentgegevens van de server.
    - Code voorbeeld: return new Promise((resolve, reject) => {

14. **Consumer methods**
    - Gebruik van `then` en `catch` voor het verwerken van asynchrone resultaten.
    - Code voorbeeld: 
                .then(data => resolve(data))
                .catch(error => reject(error));

15. **Async & Await**
    - Gebruik van async/await voor asynchrone operaties zoals het ophalen van tentgegevens.
    - Code voorbeeld: async function fetchTents()await fetch('/api/tents');

16. **Self executing function**
    - Zelf uitvoerende functie gebruikt voor het initialiseren van de applicatie.
    - Code voorbeeld: iife.js

17. **Fetch om data op te halen**
    - Fetch API gebruikt voor het ophalen van tentgegevens van de server.
    - Code voorbeeld: await fetch('/api/tents');

18. **JSON manipuleren en weergeven**
    - Omzetten van tentgegevens naar JSON-formaat voor weergave op de website.
    - Code voorbeeld: res.status(201).json(newTent);

19. **Gebruik van een flexbox of CSS grid**
    - Gebruik van flexbox voor de lay-out van tenten op de website.
    - Code voorbeeld: display: flex;

20. **Gebruik van LocalStorage**
    - Opslaan van geselecteerde tenten in de LocalStorage voor persistentie.
    - Code voorbeeld: localStorage.setItem('cart', JSON.stringify(cart));

## Gebruikte Bronnen
- [MDN Web Docs](https://developer.mozilla.org/)
- [W3Schools](https://www.w3schools.com/)

