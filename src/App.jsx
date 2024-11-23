import { useEffect, useState } from 'react';

function App() {
  const [selectedText, setSelectedText] = useState('No text selected');

  useEffect(() => {
    // Request the selected text from the content or background script
    chrome.runtime.sendMessage({ request: 'getSelectedText' }, (response) => {
      console.log("Popup Received Text:", response?.text);
      setSelectedText(response?.text || 'No text selected');
    });
  }, []);

  // Define button click handler
  const handleDefine = () => {
    if (selectedText !== 'No text selected') {
      alert(`Definition requested for: ${selectedText}`);
      // You can integrate with a dictionary API or other services here
    } else {
      alert('No text selected to define.');
    }
  };

  // Save button click handler
  const handleSave = () => {
    if (selectedText !== 'No text selected') {
      alert(`Text saved: ${selectedText}`);
      // Save logic (e.g., sending text to storage or a database)
    } else {
      alert('No text selected to save.');
    }
  };

  // Highlight button click handler
  const handleHighlight = () => {
    chrome.runtime.sendMessage({ action: 'highlightText' });
    alert('Highlight request sent.');
    // Handle highlight functionality via content script
  };

  return (
    <div style={{ padding: '10px', fontFamily: 'Arial' }}>
      <h4>Research.AI</h4>
    </div>
  );
}

export default App;
