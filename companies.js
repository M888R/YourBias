async function loadCompanies() {
    const score = await chromeStorageGetPromise('userScore');
}

function chromeStorageGetPromise (...args) {
    return new Promise(resolve => {
        chrome.storage.sync.get(...args, resolve)
    })
}
