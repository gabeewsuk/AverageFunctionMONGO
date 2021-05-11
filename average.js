var mongo = require("mongodb").MongoClient;
var commentsIndex = require("./viewsQuery.js");

async function average(client) {
  //setting up Object with placeholder
  averageList = [
    {
      num: -1,
      name: "PlaceHolder",
      aveViews: 0,
      aveComments: 0,
      aveShares: 0,
      aveLikes: 0,
    },
  ];
  //initiating  mongo client
  const db = client.db("influencer-database");
  const collections = await db.collections();
  const influencersCollection = db.collection("influencers");

  //projecting fields needed for  average into an array
  const searchViews = await influencersCollection
    .find({})
    .project({
      "influencerPosts.diggCount": 1,
      "influencerPosts.shareCount": 1,
      "influencerPosts.commentCount": 1,
      "authorMeta.name": 1,
      "influencerPosts.playCount": 1,
      _id: 0,
    })
    .toArray();
  nicheList = await commentsIndex(searchViews);

  //loopingthrough list to get average for each category
  for (var i = 0; i < nicheList.length; i++) {
    //setting object entries
    var objectViews = Object.entries(nicheList[i].influencerPosts);

    //setting up average variables + t = total
    var aveViews = 0;
    var aveComments = 0;
    var aveShare = 0;
    var aveLikes = 0;
    var t = 0;
    //iterating through the objects individual posts meta data and totaling so we can average them
    objectViews.forEach(([key, value]) => {
      t++;
      aveViews += value.playCount;
      aveComments += value.commentCount;
      aveShare += value.shareCount;
      aveLikes += value.diggCount;
    });
    //setting average variables
    var averageViews = aveViews / t;
    var averageComments = aveComments / t;
    var averageShares = aveShare / t;
    var averageLikes = aveLikes / t;

    //print statements for tests
    /*

    console.log(nicheList[i].authorMeta.name);
    console.log("views:" + aveViews / t);
    console.log("Comments:" + aveComments / t);
    console.log("Shares:" + aveShare / t);
    console.log("Likes:" + aveLikes / t);
*/
    //pushing the data for each user from the loop into  the object

    averageList.push({
      id: i,
      name: nicheList[i].authroMeta.name,
      aveViews: averageViews,
      aveComments: averageComments,
      aveShares: averageShares,
      aveLikes: averageLikes,
    });
  }

  return averageList;
}

module.exports = average;
