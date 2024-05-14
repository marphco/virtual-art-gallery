import { useState, useEffect, useRef } from "react";

const apiKey = import.meta.env.VITE_APP_OpenAI_API_KEY;
const urlLink = import.meta.env.VITE_APP_OpenAI_API_URL;

function App() {
  const [prompt, setPrompt] = useState("");
  const [dialog, setDialog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [CoolDown, setCoolDown] = useState(false);
  const textareaRef = useRef(null);

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
    <div>
      <h1>OpenAI GPT-3.5 Turbo</h1>
      <textarea
        ref={textareaRef}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt here..."
        style={{ width: "100%", height: "200px" }}
      />
      <button onClick={handleSubmit} disabled={loading || CoolDown}>
        {loading ? "Loading..." : "Submit"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        {dialog.map((entry, index) => (
          <div key={index}>
            <p style={{ fontWeight: "bold", color: "blue" }}>
              <strong>You:</strong> {entry.question}
            </p>
            <p style={{ fontWeight: "bold", color: "green" }}>
              <strong>AI:</strong> {entry.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
