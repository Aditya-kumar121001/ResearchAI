import { useEffect, useState } from 'react';

function App() {
  const [selectedText, setSelectedText] = useState('No text selected');

  useEffect(() => {
    chrome.runtime.sendMessage({ request: 'getSelectedText' }, (response) => {
      console.log("Popup Received Text:", response?.text);
      setSelectedText(response?.text || 'No text selected');
    });
  }, []);

  return (
    <div style={{ padding: '10px', fontFamily: 'Arial' }}>
      <h3>Selected Text:</h3>
      <p>{selectedText}</p>
    </div>
  );
}

export default App;
