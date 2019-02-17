async function loadCompanies() {
    const score = await chromeStorageGetPromise('userScore');
    if (score > 70) {

    } else if (score > 30) {

    } else if (score)
}

function chromeStorageGetPromise (...args) {
    return new Promise(resolve => {
        chrome.storage.sync.get(...args, resolve)
    })
}

document.addEventListener("DOMContentLoaded", loadCompanies, false);