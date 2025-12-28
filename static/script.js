const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

addMessage("Hello! I'm Akshaya Chatbot. How can I help you today?", "bot");

function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  addMessage(message, "user");
  input.value = "";

  fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  })
    .then(res => res.json())
    .then(data => {
      addMessage(data.reply, "bot");
    })
    .catch(() => {
      addMessage("Error contacting server.", "bot");
    });
}

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});
