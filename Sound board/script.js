const sounds = ["nope", "boo", "tada", "whoosh"]

sounds.forEach((sound) => {
  const btn = document.createElement("button")
  btn.classList.add("btn")
  btn.innerText = sound
  btn.addEventListener("click", () => {
    stopSongs()
    document.getElementById(sound).play()

    if (sound === "nope") {
      btn.style.position = "fixed"
      btn.style.top = "50%"
      btn.style.left = "50%"
      btn.style.transform = "translate(-50%, -50%)"
      btn.style.zIndex = "1000"
      btn.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
      btn.style.width = "100vw"
      btn.style.height = "100vh"
      btn.style.borderRadius = "0"
      btn.style.fontSize = "8rem"
      btn.style.fontWeight = "900"
      btn.style.backgroundColor = "#ff0000"
      btn.style.color = "#ffffff"
      btn.style.textShadow = "5px 5px 0px #000000"
      btn.style.boxShadow = "inset 0 0 50px rgba(0,0,0,0.5)"
      btn.style.animation = "shake 0.1s infinite"
      btn.innerText = "NOPE!"

      document.getElementById(sound).addEventListener(
        "ended",
        () => {
          btn.style.position = "static"
          btn.style.width = "auto"
          btn.style.height = "auto"
          btn.style.borderRadius = "5px"
          btn.style.fontSize = "1.2rem"
          btn.style.fontWeight = "normal"
          btn.style.backgroundColor = "rebeccapurple"
          btn.style.color = "#fff"
          btn.style.textShadow = "none"
          btn.style.boxShadow = "none"
          btn.style.animation = "none"
          btn.style.transform = "none"
          btn.style.zIndex = "auto"
          btn.innerText = "nope"
        },
        { once: true }
      )
    }

    if (sound === "boo") {
      createSpookyEffect()
      document.getElementById(sound).addEventListener(
        "ended",
        () => {
          document.querySelectorAll(".ghost").forEach((el) => el.remove())
        },
        { once: true }
      )
    }

    if (sound === "tada") {
      createStars()
      createConfetti()
      document.getElementById(sound).addEventListener(
        "ended",
        () => {
          document
            .querySelectorAll(".star, .confetti")
            .forEach((el) => el.remove())
        },
        { once: true }
      )
    }

    if (sound === "whoosh") {
      createWindEffect()
      document.getElementById(sound).addEventListener(
        "ended",
        () => {
          document
            .querySelectorAll(".wind-particle")
            .forEach((el) => el.remove())
        },
        { once: true }
      )
    }
  })
  document.getElementById("button").appendChild(btn)
})

function stopSongs() {
  sounds.forEach((sound) => {
    const song = document.getElementById(sound)

    song.pause()
    song.currentTime = 0
  })
}

function createStars() {
  for (let i = 0; i < 30; i++) {
    const star = document.createElement("div")
    star.className = "star"
    star.innerHTML = "⭐"
    star.style.position = "fixed"
    star.style.fontSize = Math.random() * 20 + 15 + "px"
    star.style.left = Math.random() * 100 + "%"
    star.style.top = Math.random() * 100 + "%"
    star.style.zIndex = "999"
    star.style.animation = `starTwinkle ${
      Math.random() * 2 + 1
    }s ease-in-out infinite`
    star.style.pointerEvents = "none"

    document.body.appendChild(star)

    setTimeout(() => {
      if (star.parentNode) {
        star.remove()
      }
    }, 3000)
  }
}

function createConfetti() {
  const colors = [
    "#ff6b6b",
    "#4ecdc4",
    "#45b7d1",
    "#96ceb4",
    "#feca57",
    "#ff9ff3",
    "#a8e6cf",
    "#ffd3a5",
  ]

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div")
    confetti.className = "confetti"
    confetti.style.position = "fixed"
    confetti.style.width = Math.random() * 8 + 4 + "px"
    confetti.style.height = confetti.style.width
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)]
    confetti.style.left = Math.random() * 100 + "%"
    confetti.style.top = "-10px"
    confetti.style.zIndex = "998"
    confetti.style.borderRadius = "50%"
    confetti.style.animation = `confettiFall ${
      Math.random() * 1 + 1
    }s linear forwards`
    confetti.style.pointerEvents = "none"

    document.body.appendChild(confetti)

    setTimeout(() => {
      if (confetti.parentNode) {
        confetti.remove()
      }
    }, 2000)
  }
}

function createSpookyEffect() {
  for (let i = 0; i < 12; i++) {
    setTimeout(() => {
      const ghost = document.createElement("div")
      ghost.className = "ghost"
      ghost.innerHTML = "👻"
      ghost.style.position = "fixed"
      ghost.style.fontSize = Math.random() * 40 + 30 + "px"
      ghost.style.left = Math.random() * 100 + "%"
      ghost.style.top = Math.random() * 100 + "%"
      ghost.style.zIndex = "996"
      ghost.style.animation = `ghostFloat ${
        Math.random() * 2 + 2
      }s ease-in-out infinite`
      ghost.style.pointerEvents = "none"
      ghost.style.opacity = Math.random() * 0.6 + 0.4

      document.body.appendChild(ghost)

      setTimeout(() => {
        if (ghost.parentNode) {
          ghost.remove()
        }
      }, 3000)
    }, i * 150)
  }
}

function createWindEffect() {
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      const wind = document.createElement("div")
      wind.className = "wind-particle"
      wind.innerHTML = "💨"
      wind.style.position = "fixed"
      wind.style.fontSize = "120px"
      wind.style.left = "-150px"
      wind.style.top = Math.random() * 100 + "%"
      wind.style.transform = "translateY(-50%)"
      wind.style.zIndex = "997"
      wind.style.animation = "windSweep 1.2s ease-out forwards"
      wind.style.pointerEvents = "none"
      wind.style.opacity = Math.random() * 0.4 + 0.6

      document.body.appendChild(wind)

      setTimeout(() => {
        if (wind.parentNode) {
          wind.remove()
        }
      }, 1200)
    }, i * 150)
  }
}

function createFireworks() {
  const colors = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#ff00ff",
    "#00ffff",
    "#ff8800",
    "#8800ff",
  ]

  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const centerX = Math.random() * window.innerWidth
      const centerY =
        Math.random() * window.innerHeight * 0.6 + window.innerHeight * 0.2

      for (let j = 0; j < 20; j++) {
        const firework = document.createElement("div")
        firework.className = "firework"
        firework.style.position = "fixed"
        firework.style.width = "4px"
        firework.style.height = "4px"
        firework.style.backgroundColor =
          colors[Math.floor(Math.random() * colors.length)]
        firework.style.left = centerX + "px"
        firework.style.top = centerY + "px"
        firework.style.zIndex = "998"
        firework.style.borderRadius = "50%"
        firework.style.boxShadow = "0 0 10px currentColor"

        const angle = (j / 20) * Math.PI * 2
        const velocity = Math.random() * 200 + 100
        const endX = centerX + Math.cos(angle) * velocity
        const endY = centerY + Math.sin(angle) * velocity

        firework.style.animation = `firework 1.5s ease-out forwards`
        firework.style.setProperty("--endX", endX - centerX + "px")
        firework.style.setProperty("--endY", endY - centerY + "px")

        document.body.appendChild(firework)

        setTimeout(() => {
          if (firework.parentNode) {
            firework.remove()
          }
        }, 1500)
      }
    }, i * 300)
  }
}
