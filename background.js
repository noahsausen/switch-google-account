function updateIcon(tabId, url) {
  if (
      !url ||
      url.startsWith("chrome://") ||
      url.startsWith("chrome-extension://") ||
      url.startsWith("file://") ||
      url.startsWith("about:")
  ) {
    setUnsupportedIcon(tabId);
    return;
  }

  if (url.includes("/u/0") || url.includes("?authuser=0")) {
    chrome.action.setIcon({
      tabId: tabId,
      path: {
        "16": "icons/icon_u0_16.png",
        "48": "icons/icon_u0_48.png",
        "128": "icons/icon_u0_128.png",
      },
    });
    // chrome.action.enable(tabId);
  } else if (url.includes("/u/1") || url.includes("?authuser=1")) {
    chrome.action.setIcon({
      tabId: tabId,
      path: {
        "16": "icons/icon_u1_16.png",
        "48": "icons/icon_u1_48.png",
        "128": "icons/icon_u1_128.png",
      },
    });
    // chrome.action.enable(tabId);
  } else {
    setUnsupportedIcon(tabId);
  }
}

function setUnsupportedIcon(tabId) {
  chrome.action.setIcon({
    tabId: tabId,
    path: {
      "16": "icons/icon_unavail_16.png",
      "48": "icons/icon_unavail_48.png",
      "128": "icons/icon_unavail_128.png",
    },
  });
  // chrome.action.disable(tabId);
}

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.url) return;

  let url = tab.url;
  let newUrl = null;

  if (url.includes("/u/0")) {
    newUrl = url.replace("/u/0", "/u/1");
  } else if (url.includes("/u/1")) {
    newUrl = url.replace("/u/1", "/u/0");
  }
  if (url.includes("?authuser=0")) {
    newUrl = url.replace("?authuser=0", "?authuser=1");
  } else if (url.includes("?authuser=1")) {
    newUrl = url.replace("?authuser=1", "?authuser=0");
  }

  if (newUrl) {
    chrome.tabs.update(tab.id, {url: newUrl});
  }
  // else {
  //   chrome.scripting.executeScript({
  //     target: { tabId: tab.id },
  //     function: () => alert("Google Account switching unavailable for this site."),
  //   });
  // }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    updateIcon(tabId, changeInfo.url);
  }
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  updateIcon(tab.id, tab.url);
});

// Optional: On startup, update all tabs to set correct icon states
chrome.runtime.onStartup.addListener(() => {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      updateIcon(tab.id, tab.url);
    });
  });
});