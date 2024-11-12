let selectedText = '';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.text) {
    selectedText = message.text;
    console.log("Stored Selected Text in Background:", selectedText);
  }

  if (message.request === 'getSelectedText') {
    sendResponse({ text: selectedText });
  }
});
