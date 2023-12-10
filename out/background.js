let activeTabId = null;

chrome.tabs.onActivated.addListener((info) => {
  activeTabId = info.tabId;
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  if (tabId === activeTabId) {
    activeTabId = null;
  }
});

function getActiveTabId() {
  return activeTabId;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getActiveTabId") {
    const tabId = getActiveTabId();
    sendResponse({ tabId });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getActiveTabInfo") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      const tabUrl = new URL(activeTab.url).hostname;

      if (tabUrl) {
        // Check if "e-food.gr"
        if (tabUrl.includes("e-food.gr")) {
          // Get cookies
          chrome.cookies.getAll({ domain: "e-food.gr" }, (cookies) => {
            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError);
            } else {
              const cookieValues = cookies.map(
                (cookie) => `${cookie.name}=${cookie.value}`
              );
              sendResponse({ tabInfo: { url: tabUrl, cookies: cookieValues } });
            }
          });
        } else {
          sendResponse({ tabInfo: { url: tabUrl, cookies: [] } });
        }
      } else {
        sendResponse({ tabInfo: { url: null, cookies: [] } });
      }
    });

    return true;
  }
});
