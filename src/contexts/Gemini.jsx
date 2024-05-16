/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { useState } from "react";

const apiKey = "AIzaSyCVsvq6vF3hXYiGgoGKpbCC8habBHmWVwo";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

export const Gemini = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  const run = async () => {
    const chatSession = model.startChat({
      generationConfig,
      safetySettings,
      history: [],
    });

    setHistory((prevHistory) => [...prevHistory, { sender: "user", input }]);

    const result = await chatSession.sendMessage(input);

    const message = result.response.text();

    setHistory((prevHistory) => [
      ...prevHistory,
      { sender: "gemini", input: message },
    ]);
  };

  return (
    <div className="w-full">
      <form
        action="#"
        method="post"
        onSubmit={(ev) => {
          ev.preventDefault();
          run();
        }}
      >
        <label htmlFor="prompt">Prompt</label>
        <textarea
          name="prompt"
          id="prompt"
          onChange={(ev) => setInput(ev.currentTarget.value)}
          rows="3"
          className="w-full px-1.5 py-3 text-secondary bg-secondary-100 border-secondary border-2"
        ></textarea>
        <button type="submit" className="bg-secondary px-3 py-1.5 text-white">
          Submit
        </button>
        <ul className="">
          {history.map((message, index) => (
            <li key={index} className="">
              <span>{message.sender}: </span>
              <span dangerouslySetInnerHTML={{ __html: message.input }}></span>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
};
