let clientPromise = stitch.StitchClientFactory.create("bitcamp2018-qdajj");
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
    db.collection('bills').find({}).execute().then(docs => {
        var html = docs.map(c => '').join('');
        document.getElementById('').innerHTML = html;
    });
}

function billUpVote(bill) {
    db.collection('bills').find({bill_name : bill}).execute().then(doc => {
        var newup = doc[0].upvotes;
        newup = newup || 0; //Prevents newup from being NaN (falsey)
        newup = newup + 1;
        db.collection('bills').updateOne(
            {bill_name : bill},
            {$set : {upvotes : newup}}
        );
    });
   db.collection('bills').find({}).sort({bill_name : -1}).execute().then(docs => {
        refreshBillboard(docs);
   });
}

function billDownVote(bill) {
    db.collection('bills').find({bill_name : bill}).execute().then(doc => {
        var newdown = doc[0].downvotes;
        newdown = newdown || 0; //Prevents newup from being NaN (falsey)
        newdown = newdown + 1;
        db.collection('bills').updateOne(
            {bill_name : bill},
            {$set : {downvotes : newdown}}
        );
    });
   db.collection('bills').find({}).sort({bill_name : -1}).execute().then(docs => {
        refreshBillboard(docs);
   });
}

function getNumUpvotes(bill) {
    return db.collection('bills').find({bill_name : bill}).execute().then(doc => {
        let upvotes = 0;
        doc.map(c => {
            upvotes = c.upvotes;
        });
        return upvotes;
    });
}
function getNumDownvotes(bill) {
    return db.collection('bills').find({bill_name : bill}).execute().then(doc => {
        let downvotes = 0;
        doc.map(c => {
            downvotes = c.downvotes;
        });
        return downvotes;
    });
}

function addComment() {
    var c = document.getElementById('new_comment');
    db.collection('comments').insertOne({owner_id : client.authedId(), comment: c.value}).then(displayComments);
    c.value = '';
}

function getStates() {
    return db.collection('legislators').aggregate( [{$group : {_id :{State : "$State"} }},{$sort : {"_id.State" : 1}}] ).then(docs => {
        var states = docs;
        return states;
    });
}

function getDistricts(state) {
    return db.collection('legislators').aggregate( [{$match : {State : state}},{$group : {_id :{district : "$district"} }},{$sort : {"_id.district" : 1}}] ).then(docs => {
        var districts = docs;
        return districts;
    });
    // var districts = db.collection('legislators').find(
    //     { state: state },
    //     { district: 1, _id: 0 }
    // );
}

function getSenators(state) {
    return db.collection('legislators').find({State : state, Title : "Senator"},{}).execute().then(docs => {
        var senators = docs;
        return senators;
    });
}

function getRepresentatives(state, district) {
    return db.collection('legislators').find({State : state, Title : "Representative", district : district},{}).execute().then(docs => {
        var reps = docs;
        return reps;
    });
}

function getAbbreviation(state) {
    return db.collection('states').find({State : state}, {}).execute().then(doc => {
        var abbrev = doc[0];
        return abbrev;
    });
}

function sendEmail() {
    client.executeFunction("sendMail", "akashworkmail@gmail.com").then(result => {
        console.log ("sent");
    });
    client.executeFunction("sendMail", "josiahwedgwood@ymail.com").then(result => {
        console.log ("sent");
    });
    client.executeFunction("sendMail", "camjaws10@gmail.com").then(result => {
        console.log ("sent");
    });
}