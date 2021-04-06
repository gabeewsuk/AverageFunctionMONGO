var mongo = require("mongodb").MongoClient;
var average = require("./average.js");

pushViewsData = async (client) => {
  //initializing client collection
  const db = client.db("influencer-database");
  const collections = await db.collections();
  const influencersCollection = db.collection("influencers");

  averageObejct = average();
  //parsing through averaObject object to  update database
  for (var i = 1; i < averageObject.length; i++) {
    influencersCollection.update(
      { "authorMeta.name": averageObject[i].name },
      {
        $set: {
          "authorMeta.averageViews": averageObject[i].aveViews,
          "authorMeta.averageComments": averageObject[i].aveComments,
          "authorMeta.averageLikes": averageObject[i].aveLikes,

          "authorMeta.averageShares": averageObject[i].aveShares,
          "authorMeta.averageLikes": averageObject[i].aveLikes,
        },
      }
    );
  }
};

module.exports = pushViewsData;
