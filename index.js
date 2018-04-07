var mainText = document.getElementById("mainText");
var submitBtn = document.getElementById("submitBtn");
var deleteBtn = document.getElementById("deleteBtn");
var index = 0;

function submitFn() {
    window.alert("hi");

}

function deleteFn() {
    firebaseRef.child("name").remove();
}

db.collection('bills').find({}).sort({bill_name : -1}).execute().then(docs => {
    refreshBillboard(docs);
});

function refreshBillboard(bills) {
    document.getElementById("billConatiner").innerHTML = "";
    bills.forEach(doc => {
        name = doc.bill_name;
        upvotes = doc.upvotes;
        downvotes = doc.downvotes;
        link = doc.link;
        var inner_html = "    <div class=\"container-fluid bg-2 p-2\">\n" +
            "        <div class=\"w-90 p-3\">\n" +
            "            <div class=\"row\">\n" +
            "                <div class=\"col-sm-11\">\n" +
            "                    <div class=\"card h-100\">\n" +
            "                        <div class=\"card-body\">\n" +
            "                            <h5 class=\"card-title\" style=\"color:#474e5d\"><a href=" + link + ">" + name + "</a></h5>\n" +
            "                            <div id=\"progress_" + name + "\"class=\"progress\">\n" +
            "                                <div class=\"progress-bar progress-bar-striped bg-info text-left\" role=\"progressbar\" style=\"width: " + (upvotes/downvotes)*100 + "%\" aria-valuenow=\"" + (upvotes/downvotes)*100 + "\" aria-valuemin=\"0\" aria-valuemax=\"100\"> " + upvotes + "</div>\n" +
            "                                <div class=\"progress-bar progress-bar-striped bg-danger text-right\" role=\"progressbar\" style=\"width: 100%\" aria-valuenow=\"100\" aria-valuemin=\"0\" aria-valuemax=\"100\">" + downvotes + " </div>\n" +
            "                            </div>\n" +
            "                        </div>\n" +
            "                    </div>\n" +
            "                </div>\n" +
            "                <div class=\"col-sm-1\">\n" +
            "                    <div class=\"card\">\n" +
            "                        <div class=\"card-body\">\n" +
            "                            <button id =\"submitBtn\" onClick='billUpVote(\"" + name + "\")' class=\"btn btn-primary\" type=\"button\">+</button>\n" +
            "                        </div>\n" +
            "                    </div>\n" +
            "                    <div class=\"card\">\n" +
            "                        <div class=\"card-body\">\n" +
            "                            <button id =\"submitBtn\" onClick='billDownVote(\"" + name + "\")' class=\"btn btn-primary\" type=\"button\">-</button>\n" +
            "                        </div>\n" +
            "                    </div>\n" +
            "                </div>\n" +
            "            </div>\n" +
            "        </div>\n" +
            "    </div>";
        document.getElementById("billConatiner").innerHTML += inner_html;
    });
}

function updateProgressBar(name) {
    getNumUpvotes(name).then (up_votes => {
        getNumDownvotes(name).then (down_votes => {
            document.getElementById("progress_" + name).innerHTML = 
            "                                <div class=\"progress-bar progress-bar-striped bg-info progress-bar-animated text-left\" role=\"progressbar\" style=\"width: " + (up_votes/down_votes)*100 + "%\" aria-valuenow=\"" + (up_votes/down_votes)*100 + "\" aria-valuemin=\"0\" aria-valuemax=\"100\"> " + up_votes + "</div>\n" +
            "                                <div class=\"progress-bar progress-bar-striped bg-danger progress-bar-animated text-right\" role=\"progressbar\" style=\"width: 100%\" aria-valuenow=\"100\" aria-valuemin=\"0\" aria-valuemax=\"100\">" + down_votes + " </div>\n";
        });
    });
}

// let names = getBillNames();
// alert(names);
// names.forEach(name => {
//     console.log(name);
//     alert(name);
//     var up_votes = getNumUpvotes(name);
//     var down_votes = getNumDownvotes(name);
//     var inner_html = "    <div class=\"container-fluid bg-2 p-2\">\n" +
//         "        <div class=\"w-90 p-3\">\n" +
//         "            <div class=\"row\">\n" +
//         "                <div class=\"col-sm-11\">\n" +
//         "                    <div class=\"card h-100\">\n" +
//         "                        <div class=\"card-body\">\n" +
//         "                            <h5 class=\"card-title\" style=\"color:#474e5d\">" + name + "</h5>\n" +
//         "                            <div class=\"progress\">\n" +
//         "                                <div class=\"progress-bar progress-bar-striped bg-info progress-bar-animated text-left\" role=\"progressbar\" style=\"width: " + (up_votes/down_votes)*100 + "%\" aria-valuenow=\"" + (up_votes/down_votes)*100 + "\" aria-valuemin=\"0\" aria-valuemax=\"100\"> " + up_votes + "</div>\n" +
//         "                                <div class=\"progress-bar progress-bar-striped bg-danger progress-bar-animated text-right\" role=\"progressbar\" style=\"width: 100%\" aria-valuenow=\"100\" aria-valuemin=\"0\" aria-valuemax=\"100\">" + down_votes + " </div>\n" +
//         "                            </div>\n" +
//         "                        </div>\n" +
//         "                    </div>\n" +
//         "                </div>\n" +
//         "                <div class=\"col-sm-1\">\n" +
//         "                    <div class=\"card\">\n" +
//         "                        <div class=\"card-body\">\n" +
//         "                            <button id =\"submitBtn\" onClick=\"billUpVote(\"" + name + "\")\" class=\"btn btn-primary\" type=\"button\">+</button>\n" +
//         "                        </div>\n" +
//         "                    </div>\n" +
//         "                    <div class=\"card\">\n" +
//         "                        <div class=\"card-body\">\n" +
//         "                            <button id =\"submitBtn\" onClick=\"billDownVote(\"" + name + "\")\" class=\"btn btn-primary\" type=\"button\">-</button>\n" +
//         "                        </div>\n" +
//         "                    </div>\n" +
//         "                </div>\n" +
//         "            </div>\n" +
//         "        </div>\n" +
//         "    </div>";
//     document.getElementById("billConatiner").innerHTML += inner_html;
// });


