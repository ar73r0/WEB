"use strict";
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb'); 
const app = express();
const port = 3000;

app.use('/images', express.static('images'));
app.use(cors());
app.use(express.json());


const uri = 'mongodb://localhost:27017'; 
const client = new MongoClient(uri);

let tentsCollection;


client.connect()
  .then(() => {
    console.log("Connected to MongoDB");
    const db = client.db('verhuur'); 
    tentsCollection = db.collection('tenten'); 

    
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => console.error('Failed to connect to MongoDB', err));


app.get('/api/tents', async (req, res) => {
    try {
        const result = await tentsCollection.findOne({}); 
        if (result && result.tents) {
            res.json(result.tents); 
        } else {
            res.status(404).json({ error: 'No tents found' });
        }
    } catch (err) {
        console.error('Error fetching tents:', err); 
        res.status(500).json({ error: 'Failed to fetch tents' });
    }
});



app.post('/api/tents', async (req, res) => {
    const { name, price, image, ...rest } = req.body;
    const newTent = {
        name,
        price,
        image,
        ...rest
    };

    try {
        const result = await tentsCollection.insertOne(newTent);
        res.status(201).json(result.ops[0]); 
    } catch (err) {
        console.error('Error adding new tent:', err); 
        res.status(500).json({ error: 'Failed to add new tent' });
    }
});


app.use((req, res) => {
    res.status(404).send('Not Found');
});
