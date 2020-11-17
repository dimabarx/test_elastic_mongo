const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://192.168.1.131:9200' })
const testFolder = './mymyzika/';
const fs = require('fs');
const jsmediatags = require("jsmediatags");





async function run () {
  // promise API
  const { body } = await client.search({
    index: 'dima',
    type:'employee'
   
  })
 console.log(body.hits.hits)
}
async function createIndex (data)
{
    await client.index({  
index: 'mywork',
type:'_doc',
 body: data
  })
    await client.indices.refresh({ index: 'mywork' })

}


// console.log(run().catch);
const mongodbClient = require("mongodb").MongoClient;
const connectionString = "mongodb://192.168.1.131:27017/test_mongodb"
let clientM;

async function getDb() {
  if (!clientM || !clientM.isConnected()) {
    clientM = await mongodbClient.connect(connectionString, {"useNewUrlParser": true, "useUnifiedTopology": true});
  }
  return clientM.db();
}

async function getCollection(collectionName) {
  const db = await getDb();
  return db.collection(collectionName);
}



async function insertWork (data)
{
let woksCollection = await getCollection("work");
  await woksCollection.insertOne(data);

}


async function getCollectionByName(name) {
    let woksCollection = await getCollection(name);
    return  woksCollection.find();
}





function init () {
    fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {

            jsmediatags.read(testFolder + file, {
                onSuccess: function (tag) {


                    console.log(tag.tags.title);
                    insertWork(tag.tags);


                     createIndex(tag.tags);


                },
                onError: function (error) {
                    console.log(':(', error.type, error.info);
                }
            });
        });
    })

}


async function initToElastic ()
{

   let work =  await getCollectionByName('work');
    await  work.forEach(  function (item) {
        delete item._id
           createIndex(item);
      // console.log(item);
   })

}

initToElastic();

//init()