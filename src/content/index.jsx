document.addEventListener('mouseup', () => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText) {
    console.log("Selected Text:", selectedText);
    chrome.runtime.sendMessage({ text: selectedText });
  }
});
