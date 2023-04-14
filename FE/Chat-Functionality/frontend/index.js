const socket = io("https://openchatbackend.onrender.com", {
  transports: ["websocket"],
});

const form = document.querySelector("form");
const date_section = document.getElementById("date_section");
const message_input = document.getElementById("message_input");
const container = document.getElementById("container");
const message_submit_button = document.getElementById("message_submit_button");

var sent_tone, receive_tone, new_user_tone, new_user_tone2, left_tone;

window.onload = function () {
  sent_tone = new Audio("./frontend/sent_tone.mp3");
  //  sent_tone.autoplay="true";
  receive_tone = new Audio("./frontend/receive_tone.mp3");
  //  receive_tone.autoplay="true";
  new_user_tone = new Audio("./frontend/new_user_tone.mp3");
  //  new_user_tone.autoplay="true";
  new_user_tone2 = new Audio("./frontend/new_user_tone2.mp3");
  //  new_user_tone2.autoplay="true";
  left_tone = new Audio("./frontend/left_tone.mp3");
  //  left_tone.autoplay="true";
  defaultMessage(name);
};
message_submit_button.disabled = true;
message_input.addEventListener("input", () => {
  if (message_input.value) {
    message_submit_button.disabled = false;
  } else {
    message_submit_button.disabled = true;
  }
});

function defaultMessage(name) {
  container.innerHTML += `
    <div class="message left"><span class="user_name">Money Up Associate <br> </span>Hi ${name}, <br> Hope you are doing good <br> May i know your Concern<span class="time">${getTime()}</span></div>
  `;
  // let message = `${name} has joined please ensure hi doubt solved`
  // appendData(name,message,left)
}

function appendData(name, message, position) {
  if (message !== "joined the chat." && message !== "left the chat.") {
    container.innerHTML += `
            <div class="message ${position}"><span class="user_name">${name} </span>${message}<span class="time">${getTime()}</span></div>
        `;
  } else {
    container.innerHTML += `
            <div class="message ${position}"><span class="user_name">${name} </span>${message}</div>
        `;
  }
  // scroling to bottom on new messages
  container.scrollTo(0, container.scrollHeight);
}

name =
  prompt("Enter your name to join the chat.") ||
  `Guest-${Math.floor(Math.random() * 100000 + 1)}`;

socket.emit("new-user-joined", name);

socket.on("user-joined", (name) => {
  appendData(name, "joined the chat.", "center");
  new_user_tone2.play();
});

socket.on("receive_message", (data) => {
  appendData(data.name, `<br>${data.message}`, "left");
  receive_tone.play();
});

socket.on("left_message", (name) => {
  console.log(name);
  appendData(name, "left the chat.", "center");
  left_tone.play();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = message_input.value;
  appendData("You", `<br>${message}`, "right");
  sent_tone.play();
  socket.emit("send_message", message);
  message_input.value = "";
  message_input.placeholder = "Type a message";
  message_submit_button.disabled = true;
});

// Getting Date
let date = new Date();
var y = date.getFullYear();
var m = date.getMonth() + 1;
var d = date.getDate();
if (m < 10) m = "0" + m;
if (d < 10) d = "0" + d;
var today = d + "/" + m + "/" + y;

function getTime() {
  let dateNow = new Date();
  let hours = dateNow.getHours();
  let mins = dateNow.getMinutes();
  if (hours > 12) {
    hours -= 12;
    x = "pm";
  } else {
    x = "am";
  }
  let time = hours + ":" + mins + " " + x;
  return time;
}
date_section.innerText = today;
