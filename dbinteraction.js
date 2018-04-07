const clientPromise = stitch.StitchClientFactory.create("bitcamp2018-qdajj");
let client;
let db;
clientPromise.then(stitchClient => {
    client = stitchClient;
    //console.log(client);
    db = client.service('mongodb', 'mongodb-atlas').db('bdb');
}).catch(e => {
    console.log(e);
});

function setupDB() {
    
    db.collection('bills').deleteMany({});
    db.collection('bills').insertMany([{
        bill_name : "Bill 1", 
        downvotes : 0,
        link : "https://www.google.com/",
        upvotes : 0
    },
    {
        bill_name : "Bill 2", 
        downvotes : 0,
        link : "https://www.google.com/",
        upvotes : 0
    },
    {
        bill_name : "Bill 3", 
        downvotes : 0,
        link : "https://www.google.com/",
        upvotes : 0
    }]);
    db.collection('bills').find({}).execute().then(docs => {
        docs.map(c => console.log(c));
    });
}

function getBills() {
    db.collection('bills').find({}).execute().then(docs => {
        var test = docs.map(c => '<div>' + c.bill_name + '</div>').join('');
        document.getElementById('bills').innerHTML = test;
        /*
        var html = docs.map(c => '<div>' + c.bill_name + '</div>').join('');
        document.getElementById('comments').innerHTML = html;
        */
      });
}