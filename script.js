let searchInput = document.getElementById("searchInput");
let resultCountries = document.getElementById("resultCountries");
let ListofContries = [];
let userSeach = "";

function createAndAppend(result) {
    let {
        name,
        flag,
        population
    } = result;

    let countryCard = document.createElement("div");
    countryCard.classList.add("col-11", "col-md-5", "country-card", "m-3", "d-flex", "flex-row");
    resultCountries.appendChild(countryCard);

    let flagEl = document.createElement("img");
    flagEl.src = flag;
    flagEl.classList.add("country-flag", "mt-auto", "mb-auto");
    countryCard.appendChild(flagEl);

    let textContEl = document.createElement("div");
    textContEl.classList.add("d-flex", "flex-column", "ml-3");
    countryCard.appendChild(textContEl);

    let countryName = document.createElement("p");
    countryName.classList.add("country-name");
    countryName.textContent = name;
    textContEl.appendChild(countryName);

    let countryPop = document.createElement("p");
    countryPop.classList.add("country-population");
    countryPop.textContent = population;
    textContEl.appendChild(countryPop);


}

function displyResult() {
    resultCountries.textContent = ""; // imp
    for (let result of ListofContries) {
        let need = result.name.toLowerCase();
        if (need.includes(userSeach.toLowerCase())) {
            createAndAppend(result);
        }
    }
}


function HttpRequest() {
    let url = "https://apis.ccbp.in/countries-data";
    let options = {
        method: "GET"
    };

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            ListofContries = jsonData;
            displyResult();
        });
}

function getUserResult(event) {
    userSeach = event.target.value;
    displyResult();
}


searchInput.addEventListener("keyup", getUserResult)

HttpRequest();