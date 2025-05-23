// const socket = io("http://localhost:3000");

// socket.on("chat-message", (data) => {
//   socket.emit("chat-message", "Hello World");
// sending the hello world through socket.io
// });

const socket = io("http://localhost:3000", { transports: ["websocket"] });
const messageForm = document.getElementById("send-container");
const messageContainer = document.getElementById("message-container");
const messageInput = document.getElementById("message-input");
const name = prompt("What is your name?");
appendMessage("You joined");
// sending new user that signed in to the server
socket.emit("new-user", name);

socket.on("chat-message", (data) => {
  // consoling the data that is received from the server
  console.log("Received:", data);
  appendMessage(`${data.name}: ${data.message}`);
});

socket.on("user-connected", (name) => {
  appendMessage(`${name} connected`);
});

socket.on("user-disconnected", (name) => {
  appendMessage(`${name} disconnected`);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${message}`);
  socket.emit("send-chat-message", message);
  messageInput.value = "";
});

// creating div element and appending message to the div element
function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
