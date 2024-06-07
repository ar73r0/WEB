"use strict"
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use('/images', express.static('images'));
app.use(cors());
app.use(express.json());



let tents = [
    { id: 1, name: "Kleine Tent", price: 50, image: "tentenverhuur-api/images/kleinetent.jpg" },
    { id: 2, name: "Medium Tent", price: 75, image: "tentenverhuur-api/images/mediumtent.jpg" },
    { id: 3, name: "Grote Tent", price: 100, image: "tentenverhuur-api/images/grotetent.jpg" }
];

app.get('/api/tents', (req, res) => {
    res.json(tents);
});

app.post('/api/tents', (req, res) => {
    const { name, price, image, ...rest} = req.body;
    const newTent = {
        id: tents.length + 1,
        name,
        price,
        image, 
        ... rest
    };
    tents = [...tents, newTent];
    res.status(201).json(newTent);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
