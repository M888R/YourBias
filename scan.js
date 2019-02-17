chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({userScore: 0}, function() {
        console.log("Bias is Neutral by default.");
    });
});

function chromeStorageGetPromise (...args) {
    return new Promise(resolve => {
        chrome.storage.sync.get(...args, resolve)
    })
}

chrome.history.onVisited.addListener(async function (result) {
    var currentSiteUrl = result.url;
    var currentSite = "";
    var sites = [];
    
    var sections = currentSiteUrl.split(".");
    currentSite = sections[1];
    console.log("Opened site " + currentSite);
    var request = new XMLHttpRequest();
    request.open("GET", "./sources_database.json", false);
    request.send(null)
    var sites = JSON.parse(request.responseText);

    for (var i = 0; i < sites.length; i++) {
        let currentCheckUrl = sites[i].url;
        if (currentCheckUrl.includes(currentSite)) {
            const oldScoreWrapper = await chromeStorageGetPromise('userScore');
            const oldScore = oldScoreWrapper.userScore;
            
            var newScore = (oldScore * 0.3) + (sites[i].score * 0.7);
            chrome.storage.sync.set({'userScore': newScore}, function() {
                console.log("Updated score to " + newScore);
            });
        }
    }
});

chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
});  
