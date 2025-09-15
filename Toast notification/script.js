const button = document.getElementById("button")
const toasts = document.getElementById("toast")

const messages = ["Message One", "Message Two", "Message Three", "Message Four"]

button.addEventListener("click", () => createNotification())

function createNotification() {
  const notif = document.createElement("div")
  notif.classList.add("toast")
  notif.innerText = getRandomMessage()
  toasts.appendChild(notif)
  setTimeout(() => {
    notif.classList.add("fade-out")
    setTimeout(() => {
      notif.remove()
    }, 500)
  }, 3000)
}

function getRandomMessage() {
  return messages[Math.floor(Math.random() * messages.length)]
}
