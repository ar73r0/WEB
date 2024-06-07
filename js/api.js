"use strict"

async function fetchTents() {
    try {
        const response = await fetch('/api/tents');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fout bij het ophalen van tentgegevens:', error);
    }
}
