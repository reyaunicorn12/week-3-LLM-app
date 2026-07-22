import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import OpenAI from "openai";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.warn("WARNING: OPENAI_API_KEY is not set. The LLM API will not work until you add it to .env.");
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(__dirname));

const openai = new OpenAI({ apiKey });

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Please provide a message string." });
  }

  if (!apiKey) {
    return res.status(500).json({ error: "OpenAI API key is not configured." });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a cute, friendly tutor bot. Answer the user in a cheerful, helpful way using short study tips and supportive language.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 240,
    });

    const reply = response.choices?.[0]?.message?.content;
    if (!reply) {
      throw new Error("No reply from OpenAI");
    }

    res.json({ reply });
  } catch (error) {
    console.error("LLM API error:", error);
    res.status(500).json({ error: "Failed to generate a reply from the LLM." });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
