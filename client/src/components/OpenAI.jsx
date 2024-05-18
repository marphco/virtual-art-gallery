import { useState, useEffect, useRef } from "react";
const apiKey = import.meta.env.VITE_APP_OpenAI_API_KEY;
const urlLink = import.meta.env.VITE_APP_OpenAI_API_URL;
import askAI from "../assets/askAI.jpg";

function App() {
  const [showOpenAIContainer, setShowOpenAIContainer] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [dialog, setDialog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [CoolDown, setCoolDown] = useState(false);
  const textareaRef = useRef(null);

  const handleImageClick = () => {
    setShowOpenAIContainer((prevState) => !prevState);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSubmit();
      }
    };

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (textarea) {
        textarea.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [prompt, CoolDown]);

  const handleSubmit = async () => {
    if (CoolDown || !prompt.trim()) return;

    setLoading(true);
    setError("");
    setCoolDown(true);

    try {
      await makeRequestWithRetry(3);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const makeRequestWithRetry = async (retries) => {
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const response = await fetch(`${urlLink}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 100,
          }),
        });

        if (!response.ok) {
          if (response.status === 429) {
            await new Promise((res) =>
              setTimeout(res, Math.pow(2, attempt) * 1000)
            );
          } else {
            throw new Error(
              response.status === 401
                ? "Unauthorized: Check your API key."
                : `Error: ${response.status}`
            );
          }
        } else {
          const data = await response.json();
          setDialog((prevDialog) => [
            ...prevDialog,
            { question: prompt, answer: data.choices[0].message.content },
          ]);
          setPrompt("");
          setCoolDown(false);
          return;
        }
      } catch (error) {
        if (attempt === retries - 1) throw error;
      }
    }
    throw new Error("Exceeded maximum retries");
  };

  return (
    <>
      <div>
        <img
          src={askAI}
          onClick={handleImageClick}
          alt="Click to interact with OpenAI"
          className="fixed bottom-10 right-10 w-8 h-8 z-20 rounded-lg cursor-pointer"
        />
        {showOpenAIContainer && (
          <div className="fixed bottom-0 right-0 w-72 h-96 bg-white border border-gray-300 shadow-lg m-5 p-4 rounded-lg flex flex-col">
            <h1 className="text-xl font-semibold mb-4">Ask a Question</h1>
            <div className="flex-1 overflow-y-auto mb-4">
              {dialog.map((entry, index) => (
                <div key={index} className="mb-4">
                  <p className="font-bold text-blue-700">
                    <strong>You:</strong> {entry.question}
                  </p>
                  <p className="font-bold text-green-700">
                    <strong>AI:</strong> {entry.answer}
                  </p>
                </div>
              ))}
            </div>
            <input
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt here..."
              className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
            />
            <button
              className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
              onClick={handleSubmit}
              disabled={loading || CoolDown}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
