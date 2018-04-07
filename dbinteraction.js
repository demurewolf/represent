const clientPromise = stitch.StitchClientFactory.create('bitcamp2018-vllen');
clientPromise.then(client => {
    const db = client.service('mongodb', 'mongodb-atlas').db('bdb');
client.login().then(() =>
db.collection('bills').updateOne({owner_id: client.authedId()}, {$set:{number:42}}, {upsert:true})
).then(()=>
db.collection('bills').find({owner_id: client.authedId()}).limit(100).execute()
).then(docs => {
    console.log("Found docs", docs)
console.log("[MongoDB Stitch] Connected to Stitch")
}).catch(err => {
    console.error(err)
});
});