document.addEventListener("DOMContentLoaded", (event) => {
  const socket = io("https://chat-app-back-beta.vercel.app", {
    transports: ["websocket"],
  }); // Assurez-vous que l'URL correspond à votre serveur Flask
  const chatMessages = document.getElementById("chat-messages");
  const chatForm = document.getElementById("chat-form");
  const messageInput = document.getElementById("message-input");
  const notification = document.getElementById("notification");

  function addMessage(message, isSent = false) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    if (isSent) {
      messageElement.classList.add("sent");
    }

    const timeSpan = document.createElement("span");
    timeSpan.classList.add("time");
    timeSpan.textContent = new Date().toLocaleTimeString();

    const messageText = document.createTextNode(message);

    messageElement.appendChild(messageText);
    messageElement.appendChild(timeSpan);

    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (messageInput.value) {
      socket.emit("message", messageInput.value);
      addMessage(messageInput.value, true);
      messageInput.value = "";
    }
  });

  socket.on("message", (message) => {
    addMessage(message);
  });

  socket.on("notification", (data) => {
    notification.textContent = data.text;
    notification.style.display = "block";
    setTimeout(() => {
      notification.style.display = "none";
    }, 3000);
  });

  socket.on("connect", () => {
    console.log("Connecté au serveur");
  });

  socket.on("disconnect", () => {
    console.log("Déconnecté du serveur");
  });
});
