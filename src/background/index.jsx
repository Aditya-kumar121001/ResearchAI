import {GoogleGenerativeAI} from "@google/generative-ai";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "define") {
    console.log("Received text from content script:", message.text);
    
    generateAiContent(message.text)
      .then((definition) => {
        console.log("Generated definition:", definition);
        sendResponse({ success: true, definition });
      })
      .catch((error) => {
        console.error("Error generating AI content:", error);
        sendResponse({ success: false, error: error.message });
      });

    return true;
  }
});

const generateAiContent = async (prompt) => {
  const genAI = new GoogleGenerativeAI(""); // Replace with your actual API key
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const question = `Define ${prompt} in 40 words`;

  try {
    const result = await model.generateContent(question);
    if (result && result.response) {
      return result.response.candidates[0].content.parts[0];
    } else {
      throw new Error("Unexpected API response format");
    }
  } catch (error) {
    console.error("Error in generateAiContent:", error);
    throw error;
  }
};
