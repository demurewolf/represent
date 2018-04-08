getStates().then(states => {
    getStatesHTML(states);
});

function getStatesHTML(states) {
    states[0]._id.State = "State...";
    var state_select_html = states.map(s => '<option>' + s._id.State + '</option>').join('');
    document.getElementById("state_select").innerHTML = state_select_html;
}


function getDistrictsHTML(districts) {
    var district_select_html = districts.map(d => '<option>' + d._id.district + '</option>').join('');
    document.getElementById("district_select").innerHTML = district_select_html;
}

function updateDistricts() {
    var state = document.getElementById("state_select").value;

    getDistricts(state).then(districts => {
        getDistrictsHTML(districts);
    });
}

function updateContent() {
    //senators, representatives, stateAbbr, districtAbbr
    var state = document.getElementById("state_select").value;
    var district = document.getElementById("district_select").value;
    var legis = document.getElementById("legis_info")
    var patt = new RegExp("[0-9]+");
    var districtAbbr = patt.exec(district);
    
    getAbbreviation(state).then(stateAbbr => {
        getSenators(state).then(senators => {
            getRepresentatives(state, district).then(representatives => {
                var inner =
                        "<div class=\"col\">\n" +
                "            <div class=\"jumbotron p-3\">\n" +
                "                <h5>Senators</h5>\n" +
                "                <hr class=\"my-4\">";

                senators.forEach (senator => {
                    inner +=
                    "                <div class=\"card\" style=\"width: 100%;\">\n" +
                    "                    <div class=\"card-body\">\n" +
                    "                        <h5 class=\"card-title\"><a href=\"" + senator.link + "\" class=\"card-link\">" + senator.first_name + " " + senator.last_name + "</a></h5>\n" +
                    "                        <h6 class=\"card-subtitle mb-2 text-muted\">" + senator.State + "</h6>\n" +
                    "                        <p class=\"card-text\">" + senator.years_served + "</p>\n" +
                    "                        <button id =\"submitBtn\" onClick=\"sendEmail()\" class=\"btn btn-primary\" type=\"button\">Message Me</button>" +
                    "                    </div>\n" +
                    "                </div>";
                });

                inner +=
                    "<h5>Representative</h5>\n" +
                    "                <hr class=\"my-4\">\n";

                representatives.forEach (rep => {
                    inner +=
                    "                <div class=\"card\" style=\"width: 100%;\">\n" +
                    "                    <div class=\"card-body\">\n" +
                    "                        <h5 class=\"card-title\"><a href=\"" + rep.link + "\" class=\"card-link\">" + rep.first_name + " " + rep.last_name + "</a></h5>\n" +
                    "                        <h6 class=\"card-subtitle mb-2 text-muted\">" + rep.State + "</h6>\n" +
                    "                        <p class=\"card-text\">" + rep.years_served + "</p>\n" +
                    "                        <button id =\"submitBtn\" onClick=\"sendEmail()\" class=\"btn btn-primary\" type=\"button\">Message Me</button>" +
                    "                    </div>\n" +
                    "                </div>";
                });

                inner +=
                    "            </div>\n" +
                    "        </div>";

                inner +=
                    "        <div class=\"col\">\n" +
                    "            <iframe width=\"100%\" height=\"100%\" frameborder=\"0\" scrolling=\"no\" marginheight=\"0\" marginwidth=\"0\"\n" +
                    "                    src=\"" + "https://www.govtrack.us/congress/members/embed/mapframe?state=" + stateAbbr.Abbreviation.toLowerCase() + "&district=" + districtAbbr[0] + "\"></iframe>\n" +
                    "        </div>";

                legis.innerHTML = inner;
                console.log(districtAbbr[0]);
            });
        });
    });

}

