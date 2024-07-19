import { useState } from "react";
import { OpenAI } from "openai";

const Bot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const apiKey = "e496b963f1594896943b897af638771b";

  const openai = new OpenAI({
    apiKey: apiKey,
    baseURL: "https://api.aimlapi.com",
  });

  const run = async () => {
    setMessages(
      messages.push({
        role: "user",
        content: input,
      })
    );
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages,
      temperature: 0.7,
      max_tokens: 1024,
    });
    setMessages(
      messages.push({
        role: "system",
        content: chatCompletion.choices[0].message.content,
      })
    );
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
          {messages.map((message, index) => (
            <li key={index} className="">
              <span>{message.role}: </span>
              <span
                dangerouslySetInnerHTML={{ __html: message.content }}
              ></span>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
};

export default Bot;
