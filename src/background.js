'use strict';

/**
 * Created by park9eon on 2019-01-03
 */
const tabs = {};
const onNewTab = (tabId) => {
    if (tabs[tabId] === 7) {
        chrome.tabs.executeScript(tabId, {
            file: 'message.js'
        });
        tabs[tabId] = 0;
    }
};

chrome.tabs.onCreated.addListener((tab) => {
    tabs[tab.id] = 1;
});

chrome.tabs.onActivated.addListener(({tabId}) => {
    if (tabs[tabId] > 0) {
        tabs[tabId] |= 2;
        onNewTab(tabId);
    }
});

chrome.tabs.onUpdated.addListener((tabId, {url, status}) => {
    if (tabs[tabId] > 0 && !/^about:newtab/.test(url) && status === "complete") {
        tabs[tabId] |= 4;
        onNewTab(tabId);
    }
});

chrome.tabs.onRemoved.addListener((tabId) => {
    delete tabs[tabId];
});
