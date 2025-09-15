const niceCar = document.querySelector(".niceCar")
const times = document.querySelector("#times")
let timesClicked = 0

const createHeart = (e) => {
  const heart = document.createElement("div")
  heart.innerHTML = "🤍"
  heart.style.position = "fixed"
  heart.style.left = e.clientX + "px"
  heart.style.top = e.clientY + "px"
  heart.style.fontSize = "80px"
  heart.style.zIndex = "99999"
  heart.style.pointerEvents = "none"
  heart.style.transform = "translate(-50%, -50%) scale(0)"
  heart.style.opacity = "0"
  heart.style.transition = "all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)"

  document.body.appendChild(heart)

  setTimeout(() => {
    heart.style.transform = "translate(-50%, -50%) scale(1)"
    heart.style.opacity = "0.4"
  }, 10)

  setTimeout(() => {
    heart.style.transform = "translate(-50%, -50%) scale(1.5) translateY(-30px)"
    heart.style.opacity = "0"
  }, 800)

  timesClicked++
  times.textContent = timesClicked

  setTimeout(() => heart.remove(), 1400)
}

niceCar.addEventListener("dblclick", createHeart)
