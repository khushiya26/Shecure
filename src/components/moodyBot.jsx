import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const LawBotApp = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState(""); // State to hold input box value

  const GEMINI_API_KEY = "AIzaSyBMREO4PCJMht5NxAw16JK097DOW9R3QEU";  // Replace with your API key

  const handleGenerateResponse = async (prompt) => {
    setIsLoading(true);
    setResponseMessage("");

    try {
      // Initialize the GoogleGenerativeAI instance with the API key
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

      // Get the generative model, matching the doc's example
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Generate content using the provided prompt
      const result = await model.generateContent(prompt);

      // Ensure the response is extracted correctly
      setResponseMessage(result.response.text || "No response generated.");
    } catch (error) {
      console.error("Error calling Gemini AI:", error);
      setResponseMessage("Network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = (text) => {
    handleGenerateResponse(text); // For pre-defined prompts
  };

  const handleInputSubmit = () => {
    if (userInput.trim() !== "") {
      handleGenerateResponse(userInput); // For custom user input
    } else {
      setResponseMessage("Please enter a valid query.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">What can I help you with?</h1>
      <div className="w-full max-w-xl px-4">
        {/* Input Box for Custom User Queries */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Type your query here..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={isLoading} // Disable input while loading
          />
          <button
            onClick={handleInputSubmit}
            className="absolute right-2 top-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 disabled:opacity-50"
            disabled={isLoading}
          >
            Submit
          </button>
        </div>

        {/* Pre-defined Prompt Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          {["Indian Law", "Indian Law IPC 320", "Women Rights", "Women Safety"].map(
            (text) => (
              <button
                key={text}
                className="px-4 py-2 flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                onClick={() => handleButtonClick(text)}
                disabled={isLoading} // Disable buttons while loading
              >
                <span>⚖️</span>
                {text}
              </button>
            )
          )}
        </div>

        {/* Display Response */}
        <div className="mt-6">
          {isLoading ? (
            <p className="text-blue-500">Fetching response...</p>
          ) : (
            responseMessage && (
              <div className="p-4 bg-gray-100 border border-gray-300 rounded-md">
                <h2 className="text-lg font-semibold">Gemini Response:</h2>
                <p className="text-gray-700 mt-2">{responseMessage}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default LawBotApp;