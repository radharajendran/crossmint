const { MongoClient, ServerApiVersion } = require('mongodb');
const config = require('./../cfg/config.json');

console.log('------------->', config)

const client = new MongoClient(config.dbConnection, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

client.on('connected', () => {
    console.log('database is connected successfully');
});

client.on('disconnected', () => {
    console.log('database is disconnected successfully');
})

client.on('error', console.error.bind(console, 'connection error:'));

module.exports = connection;