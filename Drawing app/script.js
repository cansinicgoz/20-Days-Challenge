// Canvas ve butonları al
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const decreaseBtn = document.getElementById("decrease")
const increaseBtn = document.getElementById("increase")
const sizeSpan = document.getElementById("size")
const colorInput = document.getElementById("color")
const clearBtn = document.getElementById("clear")
const startBtn = document.getElementById("startBtn")
const welcomeScreen = document.getElementById("welcomeScreen")
const mainApp = document.getElementById("mainApp")

// Çizim değişkenleri
let size = 10
let color = "black"
let isPressed = false
let x, y, x2, y2

// Canvas ayarları
ctx.lineCap = "round"
ctx.lineJoin = "round"

// Başla butonuna tıklama
startBtn.addEventListener("click", () => {
  welcomeScreen.style.display = "none"
  mainApp.style.display = "flex"
})

// Mouse olayları
canvas.addEventListener("mousedown", (e) => {
  isPressed = true
  x = e.offsetX
  y = e.offsetY
})

canvas.addEventListener("mouseup", (e) => {
  isPressed = false
  x = undefined
  y = undefined
})

canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    x2 = e.offsetX
    y2 = e.offsetY
    drawCircle(x2, y2, size)
    drawLine(x, y, x2, y2)
    x = x2
    y = y2
  }
})

// Çizim fonksiyonları
function drawCircle(x, y, radius) {
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fillStyle = color
  ctx.fill()
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.strokeStyle = color
  ctx.lineWidth = size * 2
  ctx.stroke()
}

function updateSizeOnScreen() {
  sizeSpan.innerHTML = size
}

colorInput.addEventListener("change", (e) => {
  color = e.target.value
})

increaseBtn.addEventListener("click", () => {
  size += 5
  if (size > 50) {
    size = 50
  }
  updateSizeOnScreen()
})

decreaseBtn.addEventListener("click", () => {
  size -= 5
  if (size < 5) {
    size = 5
  }
  updateSizeOnScreen()
})

clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
})
