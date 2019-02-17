chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({userScore: 0}, function() {
        console.log("Bias is Neutral by default.");
    });

    // var sites_database = JSON.parse("./sources_database.json");
    // chrome.storage.sync.set({sites: sites_database}, function() {
    //     console.log("Stored site database.");
    // });
});

chrome.history.onVisited.addListener(function (result) {
    var currentSiteUrl = result.url;
    var currentSite = "";
    var sites = [];
    
    var sections = currentSiteUrl.split(".");
    // var reachedWWW = false;
    // var reachedCom = false;
    // for (var i = 0; i < sections.length - 1; i++) {
    //     if (sections[i + 1].includes("com")) {
    //         reachedCom = true;
    //         break;
    //     }
    //     if (reachedWWW) {
    //         currentSite += sections[i + 1];
    //     }
    //     if (sections[i].includes("www")) {
    //         currentSite += sections[i + 1];
    //         reachedWWW = true;
    //     }
    // }
    currentSite = sections[1];
    console.log("Opened site " + currentSite);
    //if (reachedCom) {
        // chrome.storage.sync.get('sites', function(sitewrapper) {
        //     sites = sitewrapper.sites;
        // });
        var request = new XMLHttpRequest();
        request.open("GET", "./sources_database.json", false);
        request.send(null)
        var sites = JSON.parse(request.responseText);

        for (var i = 0; i < sites.length; i++) {
            let currentCheckUrl = sites[i].url;
            if (currentCheckUrl.includes(currentSite)) {
                var oldScore = 0;
                chrome.storage.sync.get('userScore', function (result) {
                    oldScore = result.userScore;
                    console.log("Old Score: " + oldScore);
                });
                console.log("site score: " + sites[i].score);
                console.log("sum: " + (oldScore + sites[i].score));
                var newScore = (oldScore * 0.3) + (sites[i].score * 0.7);
                chrome.storage.sync.set({'userScore': newScore}, function() {
                    console.log("Updated score to " + newScore);
                });
            }
        }
    //}
});