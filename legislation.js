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
    alert(district_select_html)
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
    var patt = new RegExp("\d");
    var districtAbbr = patt.exec(district);
    
    getAbbreviation(state).then(stateAbbr => {
        getSenators(state).then(senators => {
            getRepresentatives(state, district).then(representatives => {
                document.getElementById("legis_info").innerHTML = 
                "";
            });
        });
    });

}

