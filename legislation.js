var states = ["maryland","virginia"];

var districts = {"maryland":["0", "1", "2", "3"],
                "virginia":["0", "1", "2"]};

function getStatesHTML() {
    var state_select_html = states.map(s => '<option>' + s + '</option>').join('');
    document.getElementById("state_select").innerHTML = state_select_html;
}


function getDistrictsHTML(state) {
    var state_select_html = districts.state.map(s => '<option>' + s + '</option>').join('');
    document.getElementById("state_select").innerHTML = state_select_html;
}

