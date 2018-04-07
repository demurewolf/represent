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

function readCSV() {
  /*
  $(document).ready(function() {
    $.ajax({
        url: "Trial_run/bill_board_data.csv",
        dataType: "csv",
        success: data
     });
  });
  console.log(data);
  */
 // Check for the various File API support.
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Great success! All the File APIs are supported.
    console.log("Oh shit waddup");
  } else {
    alert('The File APIs are not fully supported in this browser.');
  }
}