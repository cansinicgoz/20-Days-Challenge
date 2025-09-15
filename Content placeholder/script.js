const header = document.querySelector("#header")
const title = document.querySelector("#title")
const excerpt = document.querySelector("#excerpt")
const profile_img = document.querySelector("#profile_img")
const profile_name = document.querySelector("#name")
const date = document.querySelector("#date")

const animated_bg = document.querySelectorAll(".animated-bg")
const animated_bg_text = document.querySelectorAll(".animated-bg-text")

setTimeout(getData, 2600)

function getData() {
  header.innerHTML = '<img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop" alt="Closed laptop" class="placeholder-image">'
  title.innerHTML = "Lorem ipsum dolor sit amet consectetur"
  excerpt.innerHTML = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
  profile_img.innerHTML = '<img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="Alex Johnson" class="profile-img">'
  profile_name.innerHTML = "Alex Johnson"
  date.innerHTML = "Jan 15, 2025"
  animated_bg.forEach((bg) => bg.classList.remove("animated-bg"))
  animated_bg_text.forEach((bg) => bg.classList.remove("animated-bg-text"))
}

const card = document.querySelector(".card")

card.addEventListener("mousemove", (e) => {
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const rotateX = (y - centerY) / 12
  const rotateY = (centerX - x) / 12
  const shadowX = (x - centerX) / 8
  const shadowY = (y - centerY) / 8
  const shadowBlur = 25 + Math.abs(shadowX) + Math.abs(shadowY)
  const shadowOpacity = 0.25 + (Math.abs(shadowX) + Math.abs(shadowY)) / 120
  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  card.style.boxShadow = `${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity})`
})

card.addEventListener("mouseleave", () => {
  card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)"
  card.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.25)"
})
