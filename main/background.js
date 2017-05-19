chrome.runtime.onInstalled.addListener(function() {
	chrome.contextMenus.create({
		title: "Reset MyGS Layout",
		id: "mygs-reset",
		documentUrlPatterns: ["https://my.georgiasouthern.edu/portal/portal.php*"]
	})
});

chrome.contextMenus.onClicked.addListener(function(info,tab) {
	if (info.menuItemId === "mygs-reset") {
		chrome.storage.sync.remove("portal-layout", function() {
			chrome.tabs.reload(tab.id);
		});
	}
});