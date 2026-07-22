# week-3-LLM-app

A friendly, cute tutor bot web app.

## What it includes

- `index.html` — simple chat UI
- `style.css` — soft pastel styling
- `script.js` — chat frontend calling the LLM API
- `server.js` — Express backend forwarding chat messages to OpenAI

## Usage

1. Copy `.env.example` to `.env`
2. Add your `OPENAI_API_KEY`
3. Run `npm install`
4. Run `npm start`
5. Open `http://localhost:3000`

The frontend now sends messages to `/api/chat`, and `server.js` returns responses from OpenAI.
