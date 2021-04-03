
browserify ./app_client/app.js -o ./app_client/bundle.js



sipedi_user
b8mjs7F8jpuymL5j



connection string


mongodb+srv://sipedi_user:b8mjs7F8jpuymL5j@sipedi.dpvlm.mongodb.net/sipedi?retryWrites=true&w=majority



const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://sipedi_user:<password>@sipedi.dpvlm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
