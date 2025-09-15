const text = document.getElementById("text")
const speed = document.getElementById("speed")
let textContent = "Hello, world!"
const textSelector = document.getElementById("textSelector")
const startButton = document.getElementById("start")
const reset = document.getElementById("reset")
let idx = 1
let speedValue = 700 / parseInt(speed.textContent)
let timeoutId

writeText()

const minusBtn = document.querySelector(".minus")
const plusBtn = document.querySelector(".plus")

minusBtn.addEventListener("click", function () {
  const currentSpeed = parseInt(speed.textContent)
  if (currentSpeed > 1) {
    speed.textContent = currentSpeed - 1
    speedValue = 300 / parseInt(speed.textContent)
  }
})

plusBtn.addEventListener("click", function () {
  const currentSpeed = parseInt(speed.textContent)
  if (currentSpeed < 5) {
    speed.textContent = currentSpeed + 1
    speedValue = 300 / parseInt(speed.textContent)
  }
})

startButton.addEventListener("click", function () {
  const selectedText = textSelector.value
  if (selectedText.trim() !== "") {
    clearTimeout(timeoutId)
    textContent = selectedText
    idx = 1
    writeText()
  }
})

reset.addEventListener("click", function () {
  clearTimeout(timeoutId)
  textContent = "Hello, world!"
  idx = 1
  writeText()
})

function writeText() {
  text.innerText = textContent.slice(0, idx)
  idx++
  if (idx > textContent.length) {
    idx = 1
  }
  timeoutId = setTimeout(writeText, speedValue)
}
