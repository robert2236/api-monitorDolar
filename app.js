const express = require('express');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const url = process.env.MONGODB_URL;
const dbName = process.env.DB_NAME;
const collectionName = process.env.COLLECTION_NAME;

const app = express();

app.get('/ultima-coleccion', async (req, res) => {
    const client = new MongoClient(url);
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
      const lastDocuments = await collection.find().sort({ _id: -1 }).limit(5).toArray();
      res.json(lastDocuments);
    } catch (error) {
      console.error('Error al obtener los últimos registros:', error);
      res.status(500).json({ error: 'Ocurrió un error al obtener los últimos registros' });
    } finally {
      await client.close();
    }
  });
  
 
  module.exports = app;

// Ejecutar la aplicación
const port = 5000; // Cambia el número de puerto según tus necesidades

app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});


