chrome.storage.sync.get('userScore', function (result) {
    document.getElementById('score').innerHTML = result.userScore;
});