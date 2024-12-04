const socket = io(
  "https://chat-app-back-a9015g5tx-steveelougas-projects.vercel.app"
);
const messages = document.getElementById("messages");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");
const notification = document.getElementById("notification");

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("message", (message) => {
  const messageElement = document.createElement("div");
  messageElement.textContent = message;
  messageElement.classList.add("message");
  messages.appendChild(messageElement);
  messages.scrollTop = messages.scrollHeight;
});

socket.on("notification", (data) => {
  showNotification(data.text);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (messageInput.value) {
    socket.emit("message", messageInput.value);
    messageInput.value = "";
  }
});

function showNotification(text) {
  notification.textContent = text;
  notification.style.display = "block";
  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
}

socket.on("connect_error", (error) => {
  console.error("Connection error:", error);
  showNotification("Failed to connect to server. Please try again later.");
});
