"use strict";

const express = require('express');
const cors = require('cors');
const { MongoClient, GridFSBucket } = require('mongodb');
const multer = require('multer'); // For handling file uploads
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', '*');
    next();
  });
  app.route('/api/resource')
  .get((req, res) => {
    res.send('GET request');
  })
  .post((req, res) => {
    res.send('POST request');
  });
// MongoDB connection URI
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

let tentsCollection;
let bucket;

// Connect to MongoDB
client.connect()
  .then(async () => {
    console.log("Connected to MongoDB");
    const db = client.db('verhuur');
    tentsCollection = db.collection('tenten');
    
    // Create or reference a custom GridFS bucket
    bucket = new GridFSBucket(db, { bucketName: 'tentImages' });

    // Ensure the 'tenten' collection has an initial document
    const existingDocument = await tentsCollection.findOne({});
    if (!existingDocument) {
      await tentsCollection.insertOne({ tents: [] });
    }

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Configure Multer to handle file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Upload an image to GridFS
app.post('/api/upload', upload.single('file'), async (req, res) => {
    const { file } = req;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });
  
    try {
      const uploadStream = bucket.openUploadStream(file.originalname, {
        chunkSizeBytes: 1048576, // Optional: you can specify chunk size here
        metadata: { 
          field: 'myField', // Example metadata field
          value: 'myValue'
        }
      });
      
      uploadStream.end(file.buffer);
      
      uploadStream.on('finish', () => {
        res.status(201).json({ message: 'File uploaded successfully', filename: file.originalname });
      });
    } catch (err) {
      console.error('Error uploading file:', err);
      res.status(500).json({ error: 'Failed to upload file' });
    }
  });

// Retrieve an image from GridFS
app.get('/api/images/:filename', (req, res) => {
  const { filename } = req.params;
  const downloadStream = bucket.openDownloadStreamByName(filename);

  downloadStream.on('data', chunk => {
    res.write(chunk);
  });
  downloadStream.on('end', () => {
    res.end();
  });
  downloadStream.on('error', () => {
    res.status(404).json({ error: 'File not found' });
  });
});

// Fetch all tents
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

// Add a new tent with image URL
app.post('/api/tents', async (req, res) => {
  const { name, price, image } = req.body;
  const newTent = { id: Date.now(), name, price, image };

  try {
    const result = await tentsCollection.updateOne(
      {},
      { $push: { tents: newTent } }
    );
    if (result.matchedCount > 0) {
      res.status(201).json(newTent);
    } else {
      res.status(404).json({ error: 'Document not found' });
    }
  } catch (err) {
    console.error('Error adding new tent:', err);
    res.status(500).json({ error: 'Failed to add new tent' });
  }
});

// Handle 404 errors for undefined routes
app.use((req, res) => {
  res.status(404).send('Not Found');
});