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
        bill_name : "H.R. 5427: To amend the Omnibus Crime Control and Safe Streets Act of 1968 to give a public safety and community policing grant preference ...", 
        downvotes : 0,
        link : "https://www.govtrack.us/congress/bills/115/hr5427",
        upvotes : 0
    },
    {
        bill_name : "H.J.Res. 131: Providing for congressional disapproval under chapter 8 of title 5, United States Code, of the rule submitted by the Federal Communications Commission ...", 
        downvotes : 0,
        link : "https://www.govtrack.us/congress/bills/115/hjres131",
        upvotes : 0
    },
    {
        bill_name : "H.R. 5425: Food Labeling Modernization Act of 2018", 
        downvotes : 0,
        link : "https://www.govtrack.us/congress/bills/115/hr5425",
        upvotes : 0
    },
    {
        bill_name : "H.R. 5389: Federal Retirement Fairness Act",
        downvotes : 0,
        link : "https://www.govtrack.us/congress/bills/115/hr5389",
        upvotes : 0
    },
    {
        bill_name : "H.R. 5410: SAFER Now Act",
        downvotes : 0,
        link : "https://www.govtrack.us/congress/bills/115/hr5410",
        upvotes : 0
    }]);
    db.collection('bills').find({}).execute().then(docs => {
        docs.map(c => console.log(c));
    });
}

function getBills() {
    /*
    db.collection('bills').find({}).execute().then(docs => {
        var test = docs.map(c => '<div>' + c.bill_name + '</div>').join('');
        document.getElementById('bills').innerHTML = test;
        // The two following lines should be commented out
        var html = docs.map(c => '<div>' + c.bill_name + '</div>').join('');
        document.getElementById('comments').innerHTML = html;
      });
    */
}