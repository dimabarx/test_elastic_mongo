const mongodbClient = require("mongodb").MongoClient;

const {url } = require("../../lib/config/config_mongo");
let clientM;



/// конект до бази
async function getDb() {
    if (!clientM || !clientM.isConnected()) {
        clientM = await mongodbClient.connect(url, {"useNewUrlParser": true, "useUnifiedTopology": true});
    }
    return clientM.db();
}
// це для взяття колекції з бази - кароч тут получаєм дання з бази монго
const getCollection =  async  (collectionName)  =>  {
    const db = await getDb();
    return db.collection(collectionName);
}
// створив таку функцію щоб в середени неї були методи які мотом можна було юзать із внЄ
const mongo =  () => {

    return {



         // тут піхаєм данні в монго
          insertWork: async  function (data,collectionName )
        {
            let woksCollection = await getCollection(collectionName);
            await woksCollection.insertOne(data);

        }
    }

}

module.exports = {
    mongo:mongo
}