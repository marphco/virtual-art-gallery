import { useState, useEffect, useRef } from "react";
import openaiLogo from "../assets/openai.svg";
import closeIcon from "../assets/close-icon.svg"; // Add the path to your close icon

const apiKey = import.meta.env.VITE_APP_OpenAI_API_KEY;
const urlLink = import.meta.env.VITE_APP_OpenAI_API_URL;

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
        {!showOpenAIContainer && (
          <div
            id="openai-logo"
            onClick={handleImageClick}
            className="fixed bottom-8 right-8 z-20 rounded-lg cursor-pointer"
            style={{
              backgroundImage: `url(${openaiLogo})`,
              width: '48px',
              height: '48px',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              transition: 'background-image 0.3s ease',
            }}
          ></div>
        )}
        {showOpenAIContainer && (
          <div id="chat-gpt" className="fixed bottom-0 right-0 w-72 h-96 bg-white border border-gray-300 shadow-lg m-5 p-4 rounded-lg flex flex-col z-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Ask a Question</h2>
              <img
                src={closeIcon}
                alt="Close chat"
                className="w-6 h-6 cursor-pointer"
                onClick={handleImageClick}
              />
            </div>
            <div className="flex-1 overflow-y-auto mb-4">
              {dialog.map((entry, index) => (
                <div key={index} className="mb-4">
                  <p className="font-regular text-gray-700">
                    <strong>You:</strong> {entry.question}
                  </p>
                  <p className="font-bold text-black">
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
