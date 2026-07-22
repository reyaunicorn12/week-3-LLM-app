const chatWindow = document.getElementById("chatWindow");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");

async function getBotResponse(message) {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to get response from the LLM.");
    }

    return data.reply;
  } catch (error) {
    console.error(error);
    return "I couldn't reach the tutor server just now. Please try again in a moment! 💖";
  }
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

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  addMessage(message, true);
  userInput.value = "";

  addMessage("Thinking... 💭", false);
  const botMessage = await getBotResponse(message);

  const pending = chatWindow.querySelector(".message.bot-message:last-child .message__bubble");
  if (pending) {
    pending.textContent = botMessage;
  }
});
