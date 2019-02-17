async function loadCompanies() {
    const scoreWrapper = await chromeStorageGetPromise('userScore');
    const score = scoreWrapper.userScore;
    console.log(score);
    var supportCompanies = [];
    var againstCompanies = [];

    var request = new XMLHttpRequest();
    request.open("GET", "./companies_database.json", false);
    request.send(null)
    var companies = JSON.parse(request.responseText);
    console.log(companies.extremeconservative);

    if (score > 50) { // extreme conservative
        supportCompanies = companies.extremeconservative;
        console.log(supportCompanies);
        againstCompanies = companies.extremeliberal;
    } else if (score > 0) { // somewhat conservative
        supportCompanies = companies.somewhatconservative;
        againstCompanies = companies.somewhatliberal;
    } else if (score > -50) { // somewhat liberal
        supportCompanies = companies.somewhatliberal;
        againstCompanies = companies.somewhatconservative;
    } else if (score < -50) { // extreme liberal
        supportCompanies = companies.extremeliberal;
        againstCompanies = companies.extremeconservative;
    }

    for (var i = 0; i < supportCompanies.length; i++) {
        var currentListing = document.createElement("LI");
        var company = document.createTextNode(supportCompanies[i]);
        currentListing.appendChild(company);
        document.getElementById("supportlist").appendChild(currentListing);
    }
    for (var i = 0; i < againstCompanies.length; i++) {
        var currentListing = document.createElement("LI");
        var company = document.createTextNode(againstCompanies[i]);
        currentListing.appendChild(company);
        document.getElementById("avoidlist").appendChild(currentListing);
    }
}

function chromeStorageGetPromise (...args) {
    return new Promise(resolve => {
        chrome.storage.sync.get(...args, resolve)
    })
}

document.addEventListener("DOMContentLoaded", loadCompanies, false);