const smallCups = document.querySelectorAll(".cup-small")
const liters = document.getElementById("liters")
const percentage = document.getElementById("percentage")
const remained = document.getElementById("remained")
const motivation = document.getElementById("motivation")
const particles = document.getElementById("particles")

const motivationMessages = [
  "💧 Stay hydrated, stay healthy! 💧",
  "🌊 Water is life! Keep drinking! 🌊",
  "💪 You're doing great! Keep it up! 💪",
  "✨ Hydration is the key to energy! ✨",
  "🎯 Almost there! You can do it! 🎯",
  "🏆 Perfect! You're a hydration champion! 🏆",
  "💎 Your body thanks you for staying hydrated! 💎",
  "🌟 Water power! You're unstoppable! 🌟",
]

updateBigCup()
createParticles()

smallCups.forEach((cup, idx) => {
  cup.addEventListener("click", (e) => {
    createRipple(e, cup)
    pourWaterAnimation(cup, idx)
  })
})

function createParticles() {
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      createParticle()
    }, i * 200)
  }
}

function createParticle() {
  const particle = document.createElement("div")
  particle.className = "particle"
  particle.style.left = Math.random() * 100 + "%"
  particle.style.animationDelay = Math.random() * 8 + "s"
  particle.style.animationDuration = Math.random() * 4 + 6 + "s"
  particles.appendChild(particle)

  setTimeout(() => {
    particle.remove()
  }, 10000)
}

function createRipple(event, element) {
  const ripple = document.createElement("div")
  const rect = element.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2

  ripple.style.width = ripple.style.height = size + "px"
  ripple.style.left = x + "px"
  ripple.style.top = y + "px"
  ripple.className = "ripple"

  element.appendChild(ripple)

  setTimeout(() => {
    ripple.remove()
  }, 600)
}

function pourWaterAnimation(cup, idx) {
  cup.style.transform = "scale(1.2)"
  cup.style.transition = "transform 0.2s ease"

  setTimeout(() => {
    cup.style.transform = "scale(1)"
  }, 200)

  highlightCups(idx)
}

function highlightCups(idx) {
  if (
    smallCups[idx].classList.contains("full") &&
    !smallCups[idx].nextElementSibling?.classList.contains("full")
  ) {
    idx--
  }

  smallCups.forEach((cup, idx2) => {
    if (idx2 <= idx) {
      cup.classList.add("full")
    } else {
      cup.classList.remove("full")
    }
  })
  updateBigCup()
}

function updateBigCup() {
  const fullCups = document.querySelectorAll(".cup-small.full").length
  const totalCups = smallCups.length
  const percentageValue = Math.round((fullCups / totalCups) * 100)

  if (fullCups === 0) {
    percentage.style.visibility = "hidden"
    percentage.style.height = 0
  } else {
    percentage.style.visibility = "visible"
    percentage.style.height = `${(fullCups / totalCups) * 330}px`
    percentage.innerText = `${percentageValue}%`
  }

  if (fullCups === totalCups) {
    remained.style.visibility = "hidden"
    remained.style.height = 0
    motivation.innerText = motivationMessages[7]
  } else {
    remained.style.visibility = "visible"
    liters.innerText = `${(2 - (250 * fullCups) / 1000).toFixed(1)}L`

    if (percentageValue >= 87) {
      motivation.innerText = motivationMessages[6]
    } else if (percentageValue >= 75) {
      motivation.innerText = motivationMessages[5]
    } else if (percentageValue >= 50) {
      motivation.innerText = motivationMessages[4]
    } else if (percentageValue >= 25) {
      motivation.innerText = motivationMessages[3]
    } else if (percentageValue > 0) {
      motivation.innerText = motivationMessages[2]
    } else {
      motivation.innerText = motivationMessages[0]
    }
  }
}
