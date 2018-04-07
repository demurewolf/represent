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

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "bill_board_data.csv",
        dataType: "csv",
        success: function(data) {console.log(data);}
    });
});
var names = ["bill 1", "bill 3", "bill 3", "bill 4", "bill 5"];
names.forEach(name => {
    var inner_html = "    <div class=\"container-fluid bg-2 p-2\">\n" +
        "        <div class=\"w-90 p-3\">\n" +
        "            <div class=\"row\">\n" +
        "                <div class=\"col-sm-11\">\n" +
        "                    <div class=\"card h-100\">\n" +
        "                        <div class=\"card-body\">\n" +
        "                            <h5 class=\"card-title\" style=\"color:#474e5d\">" + name + "</h5>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "                <div class=\"col-sm-1\">\n" +
        "                    <div class=\"card\">\n" +
        "                        <div class=\"card-body\">\n" +
        "                            <a href=\"#\" class=\"btn btn-primary\">+</a>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                    <div class=\"card\">\n" +
        "                        <div class=\"card-body\">\n" +
        "                            <a href=\"#\" class=\"btn btn-primary\">-</a>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "    </div>";
    document.getElementById("billConatiner").innerHTML += inner_html;
});


