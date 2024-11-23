const hideContextMenu = () => {
  const menu = document.getElementById("context-menu");
  if (menu) {
    menu.classList.add("hidden");
  }
};

// Create the context menu
const createContextMenu = () => {
  let menu = document.getElementById("context-menu");

  if (!menu) {
    menu = document.createElement("div");
    menu.id = "context-menu";
    menu.className = "hidden";
    menu.innerHTML = `
      <button id="highlight">Highlight</button>
      <button id="define">Define</button>
    `;
    document.body.appendChild(menu);

    document.getElementById("highlight").addEventListener("click", () => {
      const selectedText = window.getSelection();
      if (selectedText.rangeCount > 0) {
        const range = selectedText.getRangeAt(0);
        const span = document.createElement("span");
        span.style.backgroundColor = "yellow";
        span.style.color = "black"; 
        span.textContent = selectedText.toString();
        range.deleteContents();
        range.insertNode(span);
        selectedText.removeAllRanges(); // Clear selection
      }
      hideContextMenu();
    });

    document.getElementById("define").addEventListener("click", () => {
      const selectedText = window.getSelection().toString().trim();
      if (selectedText) {

        chrome.runtime.sendMessage({ action: "define", text: selectedText }, (response) => {
          if (response.success) {
            console.log("Definition from AI:", response);
            showChatBox(response.definition.text);
          } else {
            console.error("Error from background:", response.error);
            showChatBox("Failed to retrieve definition. Please try again.");
          }
        });
        hideContextMenu();
      } else {
        console.log("No text selected.");
      }
    });
  }
  return menu;
};

const showContextMenu = (event) => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText) {
    const menu = createContextMenu();
    const { pageX, pageY } = event;
    menu.style.left = `${pageX}px`;
    menu.style.top = `${pageY}px`;
    menu.classList.remove("hidden");
  } else {
    hideContextMenu();
  }
};


document.addEventListener("mouseup", (event) => {
  setTimeout(() => showContextMenu(event), 0);
});

document.addEventListener("click", (event) => {
  const menu = document.getElementById("context-menu");
  if (menu && !menu.contains(event.target)) {
    hideContextMenu();
  }
});


const showChatBox = (message) => {
  let chatBox = document.getElementById("chat-box");

  if (!chatBox) {
    chatBox = document.createElement("div");
    chatBox.id = "chat-box";
    chatBox.style.position = "fixed";
    chatBox.style.bottom = "20px";
    chatBox.style.right = "20px";
    chatBox.style.backgroundColor = "#fff";
    chatBox.style.border = "1px solid #ccc";
    chatBox.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
    chatBox.style.padding = "16px";
    chatBox.style.borderRadius = "8px";
    chatBox.style.zIndex = "10000";
    chatBox.style.maxWidth = "300px";
    chatBox.style.wordWrap = "break-word";
    chatBox.style.fontSize = "14px";
    chatBox.style.color = "#333";

    document.body.appendChild(chatBox);
  }

  chatBox.textContent = message;
};