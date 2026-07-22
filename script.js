const chatWindow = document.getElementById("chatWindow");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");

const botResponses = [
  {
    keywords: ["hello", "hi", "hey", "yo"],
    response: "Hello, superstar! 🌟 I'm your friendly tutor bot. What would you like help with today?",
  },
  {
    keywords: ["math", "algebra", "geometry", "calculus", "equation"],
    response: "Math is so much fun! 😊 Try breaking the problem into smaller steps, and I can help you work through one at a time.",
  },
  {
    keywords: ["science", "physics", "chemistry", "biology"],
    response: "Science is awesome! 🧪 Want a quick study tip or a summary of a topic? I'm here for your curious questions.",
  },
  {
    keywords: ["english", "reading", "writing", "grammar", "essay"],
    response: "Writing a great essay starts with a strong idea and clear sentences. ✍️ Tell me what you're working on and I'll help polish it.",
  },
  {
    keywords: ["study", "learn", "remember", "review"],
    response: "A good study plan mixes short practice sessions with happy breaks. 🧸 Try studying for 25 minutes and then reward yourself with a tiny break!",
  },
  {
    keywords: ["test", "exam", "quiz", "homework"],
    response: "You can do this! 💪 Focus on the key ideas first and ask me questions when something feels tricky.",
  },
  {
    keywords: ["thank", "thanks", "thx", "thank you"],
    response: "You're welcome! 💖 I'm always here when you need a study buddy.",
  },
  {
    keywords: ["bye", "goodbye", "see you", "later"],
    response: "Bye for now! 🌈 Keep shining and come back anytime for help.",
  },
];

function getBotResponse(message) {
  const normalized = message.toLowerCase();
  for (const reply of botResponses) {
    if (reply.keywords.some((keyword) => normalized.includes(keyword))) {
      return reply.response;
    }
  }

  const fallbackReplies = [
    "That's a sweet question! Can you share a little more so I can help better? 💫",
    "I love helping with learning. What subject or topic are you curious about? 😊",
    "Let me know what you need help with, and I'll do my best to make it easy and fun! 🌟",
  ];

  return fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
}

function addMessage(text, isUser = false) {
  const wrapper = document.createElement("div");
  wrapper.className = isUser ? "message user-message" : "message bot-message";

  const bubble = document.createElement("span");
  bubble.className = "message__bubble";
  bubble.textContent = text;

  wrapper.appendChild(bubble);
  chatWindow.appendChild(wrapper);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  addMessage(message, true);
  userInput.value = "";

  setTimeout(() => {
    addMessage(getBotResponse(message), false);
  }, 450);
});
