'use strict';

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((e) => {
    const blockedSites = ["facebook.com", "https://twitter.com", "instagram.com", "https://twitter.com/i/flow/login"];
    if (blockedSites.some(site => e.request.url.includes(site))) {
      // Get the tab and update its content with a custom HTML page
      chrome.tabs.get(e.request.tabId, function(tab) {
        chrome.tabs.update(tab.id, {
          url: chrome.runtime.getURL("blocked.html")
        });
      });
    }
  });
  console.log('Service worker started.');