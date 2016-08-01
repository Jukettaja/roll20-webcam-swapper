// background.js

var toggle = false;

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
    if(tab.url.indexOf("https://app.roll20.net/editor/") != -1){
        
        toggle = !toggle;

        if(toggle){    
            chrome.browserAction.setIcon({"path": "on.png", "tabId": tab.id});
        }else{
            chrome.browserAction.setIcon({"path": "off.png", "tabId": tab.id});
        }    

        // Send a message to the active tab
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var activeTab = tabs[0];

            chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});

        });
        
    }
});