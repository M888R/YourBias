chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({score: 0}, function() {
        console.log("Bias is Neutral by default.");
    });

    chrome.storage.sync.set({sites: JSON.parse(sources_database)}, function() {
        console.log("Stored site database.");
    });
});

chrome.history.onVisited.addListener(function (result) {
    var currentSiteUrl = result.url;
    var currentSite = "";
    var sites = [];
    
    var sections = currentSiteUrl.split(".");
    var reachedWWW = false;
    var reachedCom = false;
    for (var i = 0; i < sections.length - 1; i++) {
        if (sections[i + 1].includes("com")) {
            reachedCom = true;
            break;
        }
        if (reachedWWW) {
            currentSite += sections[i + 1];
        }
        if (sections[i].includes("www")) {
            currentSite += sections[i + 1];
            reachedWWW = true;
        }
    }
    if (reachedCom) {
        chrome.storage.sync.get('sites', function(sitewrapper) {
            sites = sitewrapper.sites;
        });
        for (var i = 0; i < sites.length; i++) {
            let currentCheckUrl = sites[i].url;
            if (currentCheckUrl.includes(currentSite)) {
                var oldScore = 0;
                chrome.storage.sync.get('score', function (result) {
                    oldScore = result.score;
                });
                chrome.storage.sync.set({score: oldScore + sites[i].score}, function() {
                    console.log("Updated score to " + oldScore + sites[i].score);
                });
            }
        }
    }
});