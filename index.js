var mainText = document.getElementById("mainText");
var submitBtn = document.getElementById("submitBtn");
var deleteBtn = document.getElementById("deleteBtn");
var firebaseRef = firebase.database().collection('names').doc('eXOQjPc5VIYVnpIEf6T7');;
var index = 0;

function submitFn() {
    window.alert("hi");

    // var text = mainText.value;
    // firebaseRef.set({
    //     first: "akash",
    //     last: "shah"
    // })
    //     .then(function() {
    //         window.alert("Document successfully written!");
    //     })
    //     .catch(function(error) {
    //         window.alert("Error writing document: ", error);
    //     });
    // ;
    // index++;
    // mainText.value = "";
}

function deleteFn() {
    firebaseRef.child("name").remove();
}
