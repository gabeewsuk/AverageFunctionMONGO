var mongo = require("mongodb").MongoClient;
///
const h = 0;

var average = require("./average.js");
var pushViewsData = require("./pushViewsData.js");

async function Main() {
  const uri =
    "mongodb://Grabes:WmjDNQyKstcF4o4x@influencers-shard-00-00.jczfr.mongodb.net:27017,influencers-shard-00-01.jczfr.mongodb.net:27017,influencers-shard-00-02.jczfr.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-14dp4v-shard-0&authSource=admin&retryWrites=true&w=majority";

  const client = new mongo(uri);
  client.connect(function (err) {
    console.log("Connected successfully to server");
  });

  nicheList3 = await average(client);
  pushViewsData(client, nicheList3);
}
Main();
//
